#!/usr/bin/env node
// © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md.
// Coletor Jarvis: o programa do computador da empresa, com dois modos (os dois podem ficar ligados juntos):
//   • PASTA (Jarvis Reforma › Ligar uma pasta): vigia a pasta dos XML recebidos e emitidos (com as subpastas), abre os ZIP
//     aqui mesmo e manda só os XML novos para a função reforma-coletor, que confere com as regras do Jarvis Reforma;
//   • SEFAZ (desde 26/11/2026): busca na SEFAZ as notas destinadas à empresa (Distribuição DF-e da NF-e e do CT-e), com o
//     certificado A1 que fica SÓ neste computador, e manda o que chegou ao Jarvis (Notas da SEFAZ); faz também a
//     manifestação do destinatário (assinada aqui). Pelo servidor do Jarvis a SEFAZ não aceita o certificado (ela pede por
//     renegociação TLS, que só o Node daqui faz).
// Sem dependências: só o Node.js 20 ou mais novo. Leia o README.md desta pasta.
// Uso:  node coletor.mjs [config.json]                 liga (uma volta agora e depois de N em N minutos)
//       node coletor.mjs --testar [config.json]        só confere o token e o endereço
//       node coletor.mjs --uma-vez [config.json]       uma volta e sai (para o Agendador de Tarefas, se preferir)
//       node coletor.mjs --certificado [config.json]   aponta o .pfx da empresa e a senha (guardados só aqui, cifrados)
//       node coletor.mjs --diagnostico [config.json]   testa o token, o certificado, a conexão com a SEFAZ e uma consulta
//       node coletor.mjs --certificado --pfx=<arquivo> --senha-stdin [--cnpj=<CNPJ>]   o mesmo, sem perguntas (o
//                                                      instalador de um duplo clique, instalar.ps1; a senha pela entrada)
//       node coletor.mjs --empresa [config.json]       a empresa e o CNPJ pelo Jarvis, numa linha JSON (o instalador)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import readline from 'node:readline';
import { spawnSync } from 'node:child_process';
import { lerEstado, gravarEstado, intervalo } from './lib/varredura.mjs';
import { umaVolta, espera, VERSAO } from './lib/envio.mjs';
import { abrirPfx, ErroCertificado, mesmaEmpresa } from './lib/certificado.mjs';
import { lerSegredo, gravarSegredo } from './lib/segredo.mjs';
import { umaVoltaSefaz, redeSefaz, estadoVazio, PADROES } from './lib/sefaz.mjs';
import { diagnostico, textoDiagnostico } from './lib/diagnostico.mjs';

const args = process.argv.slice(2);
const arquivo = path.resolve(args.find((a) => !a.startsWith('--') && /\.json$/i.test(a)) || 'config.json');
const pastaDoConfig = path.dirname(arquivo);
let cfg;
try { cfg = JSON.parse(fs.readFileSync(arquivo, 'utf8')); }
catch (e) { console.error(`Não consegui ler ${arquivo}: ${e.message}. Copie o config.exemplo.json para config.json (ou baixe o config.json no Jarvis) e preencha.`); process.exit(1); }

const LOG = path.join(pastaDoConfig, 'coletor.log');
function log(...m) {
  const linha = `${new Date().toISOString()} ${m.join(' ')}`;
  console.log(linha);
  try {
    if (fs.existsSync(LOG) && fs.statSync(LOG).size > 1024 * 1024) fs.renameSync(LOG, `${LOG}.1`); // guarda 1 MB e o anterior
    fs.appendFileSync(LOG, `${linha}\n`);
  } catch { /* sem disco para o log: segue */ }
}

if (!/^https:\/\//.test(cfg.url || '')) { console.error('config.json: "url" precisa ser o endereço https da função reforma-coletor (aparece no Jarvis ao criar o coletor).'); process.exit(1); }
if (!/^jvc_[0-9a-f]{64}$/.test(cfg.token || '')) { console.error('config.json: "token" precisa ser o token do coletor (jvc_…), mostrado uma vez no Jarvis ao criar o coletor.'); process.exit(1); }
const computador = String(cfg.computador || os.hostname()).slice(0, 80);

// ── o modo SEFAZ (config.json › "sefaz") ──
const sefazCfg = cfg.sefaz && cfg.sefaz.ligado !== false ? cfg.sefaz : null;
const arqSegredo = path.resolve(pastaDoConfig, sefazCfg?.segredo || './segredo-sefaz.json');
const arqEstadoSefaz = path.resolve(pastaDoConfig, sefazCfg?.estado || './estado-sefaz.json');
const cadeia = sefazCfg?.cadeia ? fs.readFileSync(path.resolve(pastaDoConfig, sefazCfg.cadeia), 'utf8') : null;
let certAberto = null;
function certificado() {
  if (certAberto) return certAberto;
  const s = lerSegredo(arqSegredo);
  if (!s) throw new ErroCertificado('O certificado ainda não foi apontado: rode "node coletor.mjs --certificado".');
  if (!fs.existsSync(s.pfx)) throw new ErroCertificado(`O arquivo do certificado não está mais em ${s.pfx}: aponte de novo com "node coletor.mjs --certificado".`);
  certAberto = abrirPfx(fs.readFileSync(s.pfx), s.senha);
  return certAberto;
}
const abrirRede = (cert) => redeSefaz(cert, { ca: cadeia });
const lerEstadoSefaz = () => { try { return { ...estadoVazio(), ...JSON.parse(fs.readFileSync(arqEstadoSefaz, 'utf8')) }; } catch { return estadoVazio(); } };
const gravarEstadoSefaz = (e) => { const tmp = `${arqEstadoSefaz}.tmp`; fs.writeFileSync(tmp, JSON.stringify(e)); fs.renameSync(tmp, arqEstadoSefaz); };

/** O .pfx antigo (RC2) só abre com o provedor antigo do OpenSSL: religa o Node com ele (uma vez). */
function religarSePreciso() {
  if (!sefazCfg || process.execArgv.includes('--openssl-legacy-provider') || !fs.existsSync(arqSegredo)) return;
  try { certificado(); } catch (e) {
    if (!/RC2/.test(String(e?.message))) return;
    log('O certificado usa criptografia antiga (RC2): religando o Coletor com --openssl-legacy-provider.');
    const r = spawnSync(process.execPath, ['--openssl-legacy-provider', ...process.argv.slice(1)], { stdio: 'inherit' });
    process.exit(r.status ?? 1);
  }
}

async function enviar(corpo) {
  const r = await fetch(cfg.url, { method: 'POST', headers: { Authorization: `Bearer ${cfg.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ computador, versao: VERSAO, ...corpo }), signal: AbortSignal.timeout(120000) });
  return { status: r.status, corpo: await r.json().catch(() => ({})) };
}

/** Pergunta no terminal (a senha sem aparecer na tela). */
function perguntar(texto, { oculto = false } = {}) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (oculto) rl._writeToOutput = (s) => { if (s.includes(texto)) rl.output.write(texto); };
    rl.question(texto, (r) => { rl.close(); if (oculto) process.stdout.write('\n'); resolve(r); });
  });
}

// ── comandos de uma vez ──
/** A senha mandada pelo instalador (instalar.ps1) na entrada padrão: nunca na linha de comando nem no ambiente. */
function lerEntrada() {
  return new Promise((resolve) => { let t = ''; process.stdin.setEncoding('utf8'); process.stdin.on('data', (c) => { t += c; }); process.stdin.on('end', () => resolve(t.replace(/\r?\n$/, ''))); });
}
const opcao = (nome) => args.find((a) => a.startsWith(`--${nome}=`))?.slice(nome.length + 3) ?? null;

if (args.includes('--certificado')) {
  // Sem perguntas (o instalador de um duplo clique): --pfx=<arquivo> --senha-stdin [--cnpj=<da empresa>].
  const semPerguntas = opcao('pfx') !== null;
  if (!semPerguntas) console.log('Aponte o certificado A1 (.pfx) da empresa. O caminho e a senha ficam SÓ neste computador, cifrados com a proteção do Windows (DPAPI); nada disso vai para o Jarvis.');
  const caminho = (semPerguntas ? opcao('pfx') : String(await perguntar('Caminho do arquivo .pfx (ex.: C:\\Certificados\\empresa.pfx): '))).trim().replace(/^"|"$/g, '');
  if (!caminho || !fs.existsSync(caminho)) { console.error(`Não achei o arquivo "${caminho}".`); process.exit(1); }
  const senha = semPerguntas ? (args.includes('--senha-stdin') ? await lerEntrada() : '') : await perguntar('Senha do certificado (não aparece na tela): ', { oculto: true });
  try {
    const c = abrirPfx(fs.readFileSync(caminho), senha);
    const cnpj = opcao('cnpj');
    if (cnpj && !mesmaEmpresa(c.documento, cnpj)) { console.error(`O certificado é de ${c.titular} (${c.documento || 'sem CNPJ'}), e a empresa do Coletor é ${cnpj}: escolha o certificado da empresa certa.`); process.exit(3); }
    if (Date.now() > c.validade.getTime()) { console.error(`O certificado de ${c.titular} venceu em ${c.validade.toLocaleDateString('pt-BR')}: use o certificado novo.`); process.exit(4); }
    const forma = gravarSegredo(arqSegredo, { pfx: path.resolve(caminho), senha });
    console.log(`Certificado de ${c.titular} (${c.documento || 'sem documento'}), válido até ${c.validade.toLocaleDateString('pt-BR')}. Guardado em ${arqSegredo} (${forma === 'dpapi' ? 'cifrado com a DPAPI do Windows' : 'arquivo só do seu usuário'}).`);
    if (!sefazCfg) console.log('Para ligar a busca na SEFAZ, ponha no config.json:  "sefaz": { "ligado": true }');
    process.exit(0);
  } catch (e) {
    if (/RC2/.test(String(e?.message)) && !process.execArgv.includes('--openssl-legacy-provider')) {
      console.log('O certificado usa criptografia antiga (RC2): tentando de novo com o provedor antigo do OpenSSL…');
      // sem perguntas, a senha já foi lida da entrada: vai de novo para o processo novo pela entrada dele
      const r = spawnSync(process.execPath, ['--openssl-legacy-provider', ...process.argv.slice(1)], semPerguntas ? { stdio: ['pipe', 'inherit', 'inherit'], input: senha } : { stdio: 'inherit' });
      process.exit(r.status ?? 1);
    }
    console.error(e?.message || e); process.exit(1);
  }
}

if (args.includes('--empresa')) {
  // Para o instalador: a empresa e o CNPJ pelo Jarvis (o certificado tem de ser do mesmo CNPJ-base), numa linha JSON.
  try {
    const r = await enviar({ acao: 'sefaz_estado' });
    if (r.status !== 200) { console.error(`O Jarvis respondeu ${r.status}: ${r.corpo?.error || 'erro'}`); process.exit(1); }
    console.log(JSON.stringify({ empresa: r.corpo?.empresa || '', cnpj: String(r.corpo?.sefaz?.cnpj || '').replace(/\D/g, '') }));
    process.exit(0);
  } catch (e) { console.error(`Sem conexão com o Jarvis: ${e.message}`); process.exit(1); }
}

if (args.includes('--testar')) {
  try {
    const r = await enviar({ acao: 'testar' });
    if (r.status === 200) log(`Tudo certo: coletor "${r.corpo.coletor}" da empresa ${r.corpo.empresa}.${cfg.pasta ? ` Pasta: ${path.resolve(pastaDoConfig, cfg.pasta)}` : ''}${sefazCfg ? ` SEFAZ: ${fs.existsSync(arqSegredo) ? 'certificado apontado' : 'falta apontar o certificado (node coletor.mjs --certificado)'}.` : ''}`);
    else log(`O Jarvis respondeu ${r.status}: ${r.corpo?.error || 'erro'}`);
    process.exit(r.status === 200 ? 0 : 1);
  } catch (e) { log(`Sem conexão com o Jarvis: ${e.message}`); process.exit(1); }
}

if (args.includes('--diagnostico')) {
  religarSePreciso();
  const estado = lerEstadoSefaz();
  const passos = await diagnostico({ enviar, certificado, abrirRede, estado });
  try { gravarEstadoSefaz(estado); } catch { /* ok */ }
  const texto = textoDiagnostico(passos);
  console.log(`Diagnóstico do Coletor Jarvis ${VERSAO} (${computador}):\n${texto}`);
  try { fs.appendFileSync(LOG, `${new Date().toISOString()} Diagnóstico:\n${texto}\n`); } catch { /* ok */ }
  process.exit(passos.some((p) => p.ok === false) ? 1 : 0);
}

// ── o modo PASTA ──
let pasta = null;
if (cfg.pasta) {
  pasta = path.resolve(pastaDoConfig, cfg.pasta);
  if (!fs.existsSync(pasta) || !fs.statSync(pasta).isDirectory()) { console.error(`config.json: a pasta "${pasta}" não existe. Troque "pasta" pela pasta onde ficam os XML (ou tire a linha, se for usar só a SEFAZ).`); process.exit(1); }
}
if (!pasta && !sefazCfg) { console.error('config.json: ligue a pasta ("pasta") ou a SEFAZ ("sefaz": { "ligado": true }).'); process.exit(1); }
religarSePreciso();
const estadoArq = path.resolve(pastaDoConfig, cfg.estado || './estado-coletor.json');
const minutos = intervalo(cfg.intervalo_min);
const minutosSefaz = intervalo(sefazCfg?.intervalo_min ?? PADROES.intervaloMin);

let falhas = 0, rodando = false, parado = false;
async function voltaPasta() {
  if (!pasta || rodando || parado) return;
  rodando = true;
  const estado = lerEstado(estadoArq);
  try {
    const r = await umaVolta({ pasta, computador }, estado, { enviar, log });
    gravarEstado(estadoArq, estado);
    log(r.resumo);
    if (r.parou?.acao === 'parar') { parado = true; log('O coletor parou. Corrija o config.json e ligue de novo.'); if (!args.includes('--uma-vez')) process.exit(1); }
    else if (r.parou) { falhas++; const s = r.parou.segundos || espera(falhas); log(`Nova tentativa em ${s} s.`); setTimeout(() => { rodando = false; voltaPasta(); }, s * 1000); return; }
    else falhas = 0;
  } catch (e) { log(`Erro na volta: ${e.message}`); try { gravarEstado(estadoArq, estado); } catch { /* ok */ } }
  rodando = false;
}

let rodandoSefaz = false;
async function voltaSefaz() {
  if (!sefazCfg || rodandoSefaz || parado) return;
  rodandoSefaz = true;
  const estado = lerEstadoSefaz();
  try {
    const r = await umaVoltaSefaz({ computador, versao: VERSAO, max_consultas_hora: sefazCfg.max_consultas_hora }, estado, { enviar, certificado: () => { certAberto = null; return certificado(); }, abrirRede, log });
    log(r.resumo);
    if (r.parou?.acao === 'parar') { parado = true; log('O coletor parou (token). Corrija o config.json e ligue de novo.'); }
  } catch (e) { log(`SEFAZ: erro na volta: ${e.message}`); }
  try { gravarEstadoSefaz(estado); } catch (e) { log(`SEFAZ: não gravei o estado: ${e.message}`); }
  rodandoSefaz = false;
}

log(`Coletor Jarvis ${VERSAO} ligado (${computador}):${pasta ? ` pasta ${pasta}, de ${minutos} em ${minutos} minuto(s);` : ''}${sefazCfg ? ` SEFAZ de ${minutosSefaz} em ${minutosSefaz} minuto(s) (a espera da SEFAZ e a frequência da empresa no Jarvis valem).` : ''}`);
await voltaPasta();
await voltaSefaz();
if (args.includes('--uma-vez')) process.exit(parado ? 1 : 0);
if (pasta) setInterval(() => { voltaPasta(); }, minutos * 60000);
if (sefazCfg) setInterval(() => { voltaSefaz(); }, minutosSefaz * 60000);
