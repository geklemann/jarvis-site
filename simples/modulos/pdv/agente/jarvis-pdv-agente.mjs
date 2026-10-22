#!/usr/bin/env node
// Agente local de periféricos do caixa do Jarvis Simples (PDV). Roda no computador do caixa (Node 18+, sem dependências)
// e atende só em 127.0.0.1: o navegador do caixa manda os comandos e o agente fala com o que o navegador não alcança.
//   • POST /imprimir   { dados: base64 }   → manda os bytes ESC/POS para a impressora (USB, rede 9100 ou compartilhada);
//   • POST /gaveta                          → pulso de abrir a gaveta (pelo conector da impressora);
//   • POST /balanca/peso { protocolo }      → pergunta o peso à balança do checkout pela serial (ENQ → STX peso ETX);
//   • POST /assinar    { texto }            → assinatura RSA-SHA1 em Base64 com a chave do certificado A1 do emitente
//                                             (QR Code 3.00 da NFC-e em contingência; a chave nunca sai do computador);
//   • POST /mfe/venda  { xml }              → entrega o CF-e ao Integrador Fiscal do MFE (Ceará) e espera o retorno;
//   • POST /pinpad                          → preparado: o PinPad é do serviço do provedor de TEF (SiTef, PayGo…);
//   • GET  /estado                          → versão, o que está configurado e o último erro.
// Segurança: só 127.0.0.1, token de pareamento (cabeçalho x-jarvis-token; gerado na primeira vez e mostrado no
// terminal), origens permitidas (CORS + Private Network Access) e nada de segredo no Jarvis: o token fica só no
// navegador do caixa e a chave do certificado só neste computador.
//
// Uso: node jarvis-pdv-agente.mjs [--config caminho.json]
// O arquivo de configuração (criado na primeira vez, ao lado deste arquivo) tem:
//   { "porta": 17800, "token": "…", "origens": ["https://app.jarvis…"],
//     "impressora": { "destino": "arquivo:/dev/usb/lp0" | "tcp:192.168.0.50:9100" | "compartilhada:\\\\localhost\\TERMICA" },
//     "balanca": { "porta": "/dev/ttyUSB0" | "COM3", "baudRate": 9600, "protocolo": "toledo" },
//     "certificado": { "chave_pem": "C:/jarvis/chave.pem" },   // openssl pkcs12 -in cert.pfx -nocerts -nodes -out chave.pem
//     "mfe": { "entrada": "C:/Integrador/Input", "saida": "C:/Integrador/Output", "espera_ms": 30000 } }
import http from 'node:http';
import net from 'node:net';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const VERSAO = '1.0.0';
const ENQ = 0x05;

/** Configuração com os padrões (gera o token na primeira vez). */
export function configPadrao(cfg = {}) {
  return { porta: 17800, token: cfg.token || crypto.randomBytes(18).toString('base64url'), origens: [], impressora: {}, balanca: {}, certificado: {}, mfe: {}, ...cfg };
}

/** Envia os bytes ao destino da impressora. */
export async function enviarImpressora(destino, bytes) {
  const d = String(destino || '');
  if (!d) throw new Error('Impressora não configurada no agente (impressora.destino).');
  if (d.startsWith('tcp:')) {
    const [host, porta] = d.slice(4).split(':');
    await new Promise((ok, falha) => {
      const s = net.createConnection({ host, port: Number(porta) || 9100 }, () => { s.end(Buffer.from(bytes)); });
      s.setTimeout(8000, () => { s.destroy(); falha(new Error('A impressora de rede não respondeu.')); });
      s.on('error', falha); s.on('close', () => ok());
    });
    return;
  }
  if (d.startsWith('arquivo:')) { fs.appendFileSync(d.slice(8), Buffer.from(bytes)); return; }
  if (d.startsWith('compartilhada:')) {
    const tmp = path.join(fs.mkdtempSync(path.join(process.env.TEMP || '/tmp', 'jarvis-')), 'cupom.bin');
    fs.writeFileSync(tmp, Buffer.from(bytes));
    execFileSync('cmd', ['/c', 'copy', '/b', tmp, d.slice(14)], { stdio: 'ignore' });
    fs.rmSync(path.dirname(tmp), { recursive: true, force: true });
    return;
  }
  throw new Error(`Destino da impressora não reconhecido: ${d}`);
}

/** Lê o peso pela serial: configura a porta, manda ENQ e junta a resposta até o ETX (ou o tempo acabar). */
export async function lerSerial({ porta, baudRate = 9600, espera = 1500 } = {}) {
  if (!porta) throw new Error('Balança não configurada no agente (balanca.porta).');
  const win = process.platform === 'win32';
  if (win) execFileSync('mode', [porta, `BAUD=${baudRate}`, 'PARITY=n', 'DATA=8', 'STOP=1'], { stdio: 'ignore', shell: true });
  else execFileSync('stty', ['-F', porta, String(baudRate), 'cs8', '-cstopb', '-parenb', 'raw', '-echo'], { stdio: 'ignore' });
  const caminho = win ? `\\\\.\\${porta}` : porta;
  const fd = fs.openSync(caminho, 'r+');
  try {
    fs.writeSync(fd, Buffer.from([ENQ]));
    return await new Promise((ok) => {
      const dados = [];
      const st = fs.createReadStream(null, { fd, autoClose: false });
      const fim = () => { st.destroy(); ok(Uint8Array.from(dados)); };
      const t = setTimeout(fim, espera);
      st.on('data', (c) => { dados.push(...c); if (c.includes(0x03)) { clearTimeout(t); fim(); } });
      st.on('error', () => { clearTimeout(t); fim(); });
    });
  } finally { try { fs.closeSync(fd); } catch { /* ok */ } }
}

/** Assina o texto com a chave privada (PEM) do certificado: RSA-SHA1, Base64. */
export function assinarTexto(texto, chavePem) {
  if (!chavePem) throw new Error('Certificado não configurado no agente (certificado.chave_pem).');
  return crypto.createSign('RSA-SHA1').update(String(texto), 'utf8').sign(chavePem, 'base64');
}

/** Entrega o XML do CF-e ao Integrador do MFE (pastas de entrada/saída) e espera o retorno. */
export async function enviarMfe(xml, { entrada, saida, espera_ms = 30000 } = {}, agora = Date.now) {
  if (!entrada || !saida) throw new Error('MFE não configurado no agente (mfe.entrada e mfe.saida).');
  const id = `jarvis-${agora()}-${crypto.randomBytes(3).toString('hex')}`;
  const envelope = `<?xml version="1.0" encoding="UTF-8"?><Integrador><Identificador><Valor>${id}</Valor></Identificador><Componente Nome="MF-e"><Metodo Nome="EnviarDadosVenda"><Parametros><Parametro><Nome>dadosVenda</Nome><Valor><![CDATA[${xml}]]></Valor></Parametro></Parametros></Metodo></Componente></Integrador>`;
  fs.writeFileSync(path.join(entrada, `${id}.xml`), envelope);
  const limite = agora() + Number(espera_ms);
  while (agora() < limite) {
    const arq = fs.readdirSync(saida).find((f) => f.includes(id));
    if (arq) { const t = fs.readFileSync(path.join(saida, arq), 'utf8'); fs.rmSync(path.join(saida, arq), { force: true }); const m = /<Retorno>([\s\S]*?)<\/Retorno>/.exec(t); return m ? m[1].trim() : t.trim(); }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error('O Integrador do MFE não respondeu a tempo.');
}

/**
 * O agente sem a parte de rede (testável): tratar({ metodo, caminho, cabecalhos, corpo }) → { status, cabecalhos, corpo }.
 * deps substitui o que fala com o hardware (impressora, serial, arquivo da chave) nos testes.
 */
export function criarAgente(cfg0 = {}, deps = {}) {
  const cfg = configPadrao(cfg0);
  const d = { enviarImpressora, lerSerial, assinarTexto, enviarMfe, lerArquivo: (f) => fs.readFileSync(f, 'utf8'), ...deps };
  let ultimoErro = null;
  const cors = (origem) => {
    const ok = !cfg.origens.length || cfg.origens.includes(origem);
    return ok && origem ? { 'access-control-allow-origin': origem, 'access-control-allow-headers': 'content-type, x-jarvis-token', 'access-control-allow-methods': 'GET, POST, OPTIONS', 'access-control-allow-private-network': 'true', vary: 'Origin' } : {};
  };
  return {
    cfg,
    async tratar({ metodo = 'GET', caminho = '/', cabecalhos = {}, corpo = null }) {
      const h = cors(cabecalhos.origin);
      if (metodo === 'OPTIONS') return { status: 204, cabecalhos: h, corpo: null };
      if (cabecalhos.origin && !Object.keys(h).length) return { status: 403, cabecalhos: {}, corpo: { erro: 'Origem não permitida neste agente.' } };
      if (cabecalhos['x-jarvis-token'] !== cfg.token) return { status: 401, cabecalhos: h, corpo: { erro: 'Token do agente não confere: pareie de novo em PDV › Configurar › Agente local.' } };
      try {
        if (metodo === 'GET' && caminho === '/estado') return { status: 200, cabecalhos: h, corpo: { versao: VERSAO, impressora: !!cfg.impressora?.destino, balanca: !!cfg.balanca?.porta, certificado: !!cfg.certificado?.chave_pem, mfe: !!(cfg.mfe?.entrada && cfg.mfe?.saida), pinpad: false, ultimoErro } };
        if (metodo !== 'POST') return { status: 405, cabecalhos: h, corpo: { erro: 'Método não permitido.' } };
        if (caminho === '/imprimir') {
          const b = Buffer.from(String(corpo?.dados || ''), 'base64');
          if (!b.length) throw new Error('Nada para imprimir.');
          if (b.length > 512 * 1024) throw new Error('Impressão grande demais.');
          await d.enviarImpressora(cfg.impressora?.destino, b);
          return { status: 200, cabecalhos: h, corpo: { ok: true, bytes: b.length } };
        }
        if (caminho === '/gaveta') { await d.enviarImpressora(cfg.impressora?.destino, Buffer.from([0x1b, 0x40, 0x1b, 0x70, 0x00, 0x19, 0xfa])); return { status: 200, cabecalhos: h, corpo: { ok: true } }; }
        if (caminho === '/balanca/peso') { const r = await d.lerSerial({ porta: cfg.balanca?.porta, baudRate: cfg.balanca?.baudRate || 9600 }); return { status: 200, cabecalhos: h, corpo: { ok: true, bytes: Buffer.from(r).toString('base64') } }; }
        if (caminho === '/assinar') {
          const texto = String(corpo?.texto || '');
          if (!texto || texto.length > 2000) throw new Error('Texto para assinar ausente ou grande demais.');
          const pem = cfg.certificado?.chave_pem ? (cfg.certificado.chave_pem.includes('BEGIN') ? cfg.certificado.chave_pem : d.lerArquivo(cfg.certificado.chave_pem)) : null;
          return { status: 200, cabecalhos: h, corpo: { ok: true, assinatura: d.assinarTexto(texto, pem) } };
        }
        if (caminho === '/mfe/venda') { const r = await d.enviarMfe(String(corpo?.xml || ''), cfg.mfe || {}); return { status: 200, cabecalhos: h, corpo: { ok: true, retorno: r } }; }
        if (caminho === '/pinpad') return { status: 200, cabecalhos: h, corpo: { ok: false, situacao: 'nao_configurado', mensagem: 'PinPad: instale o serviço do provedor de TEF (SiTef, PayGo, Cappta, Stone) — preparado.' } };
        return { status: 404, cabecalhos: h, corpo: { erro: 'Caminho desconhecido.' } };
      } catch (e) {
        ultimoErro = e.message;
        return { status: 500, cabecalhos: h, corpo: { erro: e.message } };
      }
    },
  };
}

/** Sobe o servidor em 127.0.0.1. */
export function iniciar(cfg) {
  const ag = criarAgente(cfg);
  const srv = http.createServer((req, res) => {
    let txt = '';
    req.on('data', (c) => { txt += c; if (txt.length > 1024 * 1024) req.destroy(); });
    req.on('end', async () => {
      let corpo = null;
      try { corpo = txt ? JSON.parse(txt) : null; } catch { corpo = null; }
      const r = await ag.tratar({ metodo: req.method, caminho: (req.url || '/').split('?')[0], cabecalhos: req.headers, corpo });
      res.writeHead(r.status, { 'content-type': 'application/json; charset=utf-8', ...r.cabecalhos });
      res.end(r.corpo == null ? '' : JSON.stringify(r.corpo));
    });
  });
  srv.listen(ag.cfg.porta, '127.0.0.1');
  return { servidor: srv, agente: ag };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const i = process.argv.indexOf('--config');
  const arq = i > 0 ? process.argv[i + 1] : path.join(path.dirname(fileURLToPath(import.meta.url)), 'jarvis-pdv-agente.json');
  let cfg = {};
  try { cfg = JSON.parse(fs.readFileSync(arq, 'utf8')); } catch { /* primeira vez */ }
  cfg = configPadrao(cfg);
  if (!fs.existsSync(arq)) fs.writeFileSync(arq, JSON.stringify(cfg, null, 2));
  iniciar(cfg);
  console.log(`Agente do caixa Jarvis ${VERSAO} em http://127.0.0.1:${cfg.porta}\nToken de pareamento: ${cfg.token}\nConfiguração: ${arq}`);
}
