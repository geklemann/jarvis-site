// © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md.
// Coletor Jarvis › o envio para a função reforma-coletor (a rede entra por parâmetro: o teste troca por uma de mentira).
// Uma volta: abre o que é novo ou mudou, pergunta ao Jarvis quais hashes ele já tem (não manda de novo), manda o resto em
// lotes (até 50 arquivos e 5 MB) e anota no estado o que foi aceito. Sem rede ou com o servidor ocupado, para e tenta na
// próxima volta (o que não foi aceito fica "pendente"); com o token revogado, para e avisa. Nada do XML vai para o log.
import fs from 'node:fs';
import { varrer, mudancas, assinatura, abrir } from './varredura.mjs';

export const VERSAO = '2.1.0';
export const LOTE = Object.freeze({ arquivos: 50, bytes: 5 * 1024 * 1024, hashes: 1000 });

/** O que fazer com a resposta: ok, esperar (rede/servidor/limite), dividir (413), parar (token/acesso) ou descartar (400). */
export function classificar(status, corpo = {}) {
  if (status >= 200 && status < 300) return { acao: 'ok' };
  if (status === 401) return { acao: 'parar', motivo: 'Token do coletor inválido ou revogado: crie outro no Jarvis (Reforma › Ligar uma pasta) e troque no config.json.' };
  if (status === 403) return { acao: 'parar', motivo: corpo?.error || 'Sem acesso à empresa.' };
  if (status === 429) return { acao: 'esperar', segundos: Number(corpo?.tentar_em_seg) || 60 };
  if (status === 413) return { acao: 'dividir' };
  if (status === 400 || status === 405) return { acao: 'descartar', motivo: corpo?.error || 'Lote recusado pelo servidor.' };
  return { acao: 'esperar' };
}
/** Espera antes da tentativa n: 30 s, 1 min, 2 min… até 30 min. */
export const espera = (n) => Math.min(1800, 30 * 2 ** Math.max(0, n - 1));

/** Lotes de até 50 arquivos e 5 MB (o arquivo maior que o lote vai sozinho). */
export function montarLotes(itens, { arquivos = LOTE.arquivos, bytes = LOTE.bytes } = {}) {
  const lotes = [];
  let atual = [], tam = 0;
  for (const i of itens) {
    const t = Buffer.byteLength(i.xml, 'utf8') + 200;
    if (atual.length && (atual.length >= arquivos || tam + t > bytes)) { lotes.push(atual); atual = []; tam = 0; }
    atual.push(i); tam += t;
  }
  if (atual.length) lotes.push(atual);
  return lotes;
}

/**
 * Uma volta do coletor. cfg: { pasta, computador }; estado: lerEstado(); enviar(corpo) → { status, corpo } (ou lança sem
 * rede); ler(caminho) → Buffer. Volta { lidos, novos, enviados, ja, erros, conferidas, parou, resumo } e muda o estado.
 */
export async function umaVolta(cfg, estado, { enviar, ler = (c) => fs.readFileSync(c), log = () => {} } = {}) {
  const r = { arquivos: 0, lidos: 0, xml: 0, enviados: 0, ja: 0, erros: 0, conferidas: 0, comErro: 0, outraEmpresa: 0, parou: null };
  const base = { computador: cfg.computador || '', versao: VERSAO };
  const lista = await varrer(cfg.pasta);
  r.arquivos = lista.length;
  const m = mudancas(estado.arquivos, lista);
  for (const c of m.sumiram) delete estado.arquivos[c];
  const aLer = [...m.novos, ...m.mudaram, ...m.pendentes];
  // 1) abrir (o ZIP aqui mesmo) e juntar os XML que ainda não foram enviados
  const itens = [];
  const porArquivo = new Map();
  for (const f of aLer) {
    r.lidos++;
    let bytes;
    try { bytes = ler(f.completo); } catch (e) { r.erros++; log(`Não deu para abrir ${f.caminho}: ${e.code || e.message}`); estado.arquivos[f.caminho] = { assinatura: assinatura(f), situacao: 'erro' }; continue; }
    const abertos = abrir(f.caminho, bytes);
    const hashes = [];
    for (const a of abertos) {
      if (a.erro) { r.erros++; log(`${a.nome}: ${a.erro}`); continue; }
      r.xml++;
      hashes.push(a.hash);
      if (estado.enviados.has(a.hash)) { r.ja++; continue; }
      if (!itens.some((x) => x.hash === a.hash)) itens.push({ nome: a.nome.slice(0, 200), hash: a.hash, xml: a.texto });
    }
    porArquivo.set(f.caminho, { f, hashes });
  }
  // 2) o Jarvis já tem algum? (outro coletor, a reinstalação do programa)
  const conhecidos = new Set();
  for (let i = 0; i < itens.length && !r.parou; i += LOTE.hashes) {
    const res = await chamar(enviar, { ...base, acao: 'consultar', hashes: itens.slice(i, i + LOTE.hashes).map((x) => x.hash) });
    if (res.parou) { r.parou = res.parou; break; }
    for (const h of res.corpo?.conhecidos || []) conhecidos.add(h);
  }
  for (const h of conhecidos) estado.enviados.add(h);
  r.ja += conhecidos.size;
  // 3) mandar o resto em lotes
  const fila = r.parou ? [] : montarLotes(itens.filter((x) => !conhecidos.has(x.hash)));
  while (fila.length && !r.parou) {
    const lote = fila.shift();
    const res = await chamar(enviar, { ...base, acao: 'enviar', arquivos: lote });
    if (res.dividir) { if (lote.length > 1) { const meio = Math.ceil(lote.length / 2); fila.unshift(lote.slice(0, meio), lote.slice(meio)); } else { r.erros++; estado.enviados.add(lote[0].hash); log(`${lote[0].nome}: grande demais para o Jarvis.`); } continue; }
    if (res.descartar) { for (const x of lote) estado.enviados.add(x.hash); r.erros += lote.length; log(`Lote recusado: ${res.motivo}`); continue; }
    if (res.parou) { r.parou = res.parou; break; }
    for (const x of lote) estado.enviados.add(x.hash);
    r.enviados += lote.length;
    r.conferidas += Number(res.corpo?.conferidas) || 0;
    r.comErro += Number(res.corpo?.com_erro) || 0;
    r.outraEmpresa += Number(res.corpo?.outra_empresa) || 0;
  }
  // 4) o estado de cada arquivo: lido (tudo enviado) ou pendente (tenta na próxima volta)
  for (const [c, { f, hashes }] of porArquivo) estado.arquivos[c] = { assinatura: assinatura(f), situacao: hashes.every((h) => estado.enviados.has(h)) ? 'lido' : 'pendente' };
  // 5) sem nada para mandar, um "testar" mantém o último contato em dia na tela
  if (!itens.length && !r.parou) { const t = await chamar(enviar, { ...base, acao: 'testar' }); if (t.parou) r.parou = t.parou; }
  estado.ultima = new Date().toISOString();
  r.resumo = resumo(r);
  return r;
}

async function chamar(enviar, corpo) {
  let res;
  try { res = await enviar(corpo); } catch (e) { return { parou: { acao: 'esperar', motivo: `Sem rede: ${e?.message || e}` } }; }
  const c = classificar(res.status, res.corpo);
  if (c.acao === 'ok') return { corpo: res.corpo };
  if (c.acao === 'dividir') return { dividir: true };
  if (c.acao === 'descartar') return { descartar: true, motivo: c.motivo };
  return { parou: c };
}

export function resumo(r) {
  if (r.parou) return `Parou: ${r.parou.motivo || 'servidor ocupado'}${r.enviados ? ` (${r.enviados} arquivo(s) enviados antes)` : ''}.`;
  if (!r.lidos) return `Nada novo na pasta (${r.arquivos} arquivo(s)).`;
  return `${r.lidos} arquivo(s) lido(s), ${r.enviados} XML enviado(s), ${r.conferidas} nota(s) conferida(s)${r.comErro ? `, ${r.comErro} com erro` : ''}${r.ja ? `, ${r.ja} já estavam no Jarvis` : ''}${r.outraEmpresa ? `, ${r.outraEmpresa} de outra empresa` : ''}${r.erros ? `, ${r.erros} com erro de leitura` : ''}.`;
}
