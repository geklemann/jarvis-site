// © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md.
// Coletor Jarvis › o modo SEFAZ (26/11/2026, decisão do dono): a busca das notas destinadas à empresa na SEFAZ roda AQUI,
// no computador da empresa, com o certificado A1 dela. Motivo: a SEFAZ (IIS) pede o certificado do cliente por
// renegociação TLS e o servidor do Jarvis (Deno/rustls) não renegocia — a Maral recebeu "Connection reset by peer". O Node
// (OpenSSL) renegocia: https.request com pfx e passphrase.
//
// Uma volta:
//   1. pergunta ao Jarvis (função reforma-coletor, ação sefaz_estado, com o token jvc_ da empresa) onde a empresa busca, o
//      CNPJ, a UF, o ambiente, o NSU de onde parou de cada serviço, a hora da próxima consulta permitida, as manifestações
//      na fila e as notas que pedem o XML completo;
//   2. para cada serviço vencido (NF-e e, se ligado, CT-e): o laço de lotes da captura (o mesmo baixarLotes do servidor),
//      cada lote mandado ao Jarvis na hora (ação sefaz_lote), que grava em cap_documentos/cap_nsu pelo mesmo
//      cap_registrar_consulta e confere os XML completos; respeita a espera de 1 hora depois de 137/656 e do fim da fila
//      (NT 2014.002) e um máximo de consultas por hora (padrão 20 por serviço);
//   3. a manifestação do destinatário: o evento assinado AQUI (XMLDSig RSA-SHA1 com a chave do .pfx) e o retorno mandado
//      ao Jarvis (sefaz_evento); o que não chegou ao Jarvis fica guardado e vai na próxima volta;
//   4. o XML completo das notas com ciência (consChNFe), dentro da mesma cota.
// A rede e o Jarvis entram por parâmetro (o teste usa de mentira). Nada do XML nem da senha vai para o log.
import https from 'node:https';
import tls from 'node:tls';
import crypto from 'node:crypto';
import * as D from './sefaz_dfe.mjs';
import { classificar } from './envio.mjs';

export const PADROES = Object.freeze({ maxConsultasHora: 20, bytesPorEnvio: 4.5 * 1024 * 1024, baixarPorVolta: 10, intervaloMin: 5 });
const NOMES = { nfe: 'NF-e', cte: 'CT-e', nfse: 'NFS-e' };
const hora = (ms) => new Date(ms).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

// ───────────────────────── a rede (Node + OpenSSL) ─────────────────────────
/**
 * O cliente da SEFAZ com o certificado: { soap(url, acao, corpo) → texto, get(url) → { status, texto }, fechar() }.
 * Um agente com keep-alive: a renegociação acontece uma vez por conexão. ca (opcional): a cadeia pública extra.
 */
export function redeSefaz(cert, { ca = null, timeout = 60000, rejeitarNaoAutorizado = true } = {}) {
  const agente = new https.Agent({ keepAlive: true, maxSockets: 2, pfx: cert.tls.pfx, passphrase: cert.tls.passphrase, ...(ca ? { ca: [...tls.rootCertificates, ...[].concat(ca)] } : {}), rejectUnauthorized: rejeitarNaoAutorizado, minVersion: 'TLSv1.2' });
  const pedir = (url, { metodo = 'GET', corpo = null, cabecalhos = {} } = {}) => new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({ hostname: u.hostname, port: u.port || 443, path: `${u.pathname}${u.search}`, method: metodo, agent: agente, headers: { ...cabecalhos, ...(corpo != null ? { 'Content-Length': Buffer.byteLength(corpo) } : {}) }, timeout }, (res) => {
      const partes = [];
      res.on('data', (d) => partes.push(d));
      res.on('end', () => resolve({ status: res.statusCode || 0, texto: Buffer.concat(partes).toString('utf8') }));
      res.on('error', reject);
    });
    req.on('timeout', () => req.destroy(new Error(`sem resposta em ${Math.round(timeout / 1000)} s`)));
    req.on('error', reject);
    if (corpo != null) req.write(corpo);
    req.end();
  });
  return {
    async soap(url, acao, corpo) { const r = await pedir(url, { metodo: 'POST', corpo, cabecalhos: { 'Content-Type': D.tipoSoap(acao) } }); return D.respostaSoap(r.status, r.texto); },
    get: (url) => pedir(url, { cabecalhos: { Accept: 'application/json' } }),
    fechar() { agente.destroy(); },
  };
}

/** O erro de rede/TLS em português, com o que fazer. */
export function explicarFalha(e) {
  const m = String(e?.message || e || '');
  const c = String(e?.code || '');
  if (/ECONNRESET|socket hang up/i.test(m + c)) return `A SEFAZ fechou a conexão (${m}). Confira se o certificado é o A1 da empresa e está na validade.`;
  if (/ENOTFOUND|EAI_AGAIN/i.test(m + c)) return `Sem internet ou sem DNS neste computador (${m}).`;
  if (/ETIMEDOUT|sem resposta/i.test(m + c)) return `A SEFAZ não respondeu a tempo (${m}). Tente de novo mais tarde.`;
  if (/UNABLE_TO_GET_ISSUER|SELF_SIGNED|CERT_UNTRUSTED|unable to verify/i.test(m + c)) return `Este computador não reconheceu o certificado do servidor da SEFAZ (${m}). Atualize o Windows e o Node.js; se continuar, ponha a cadeia pública em "sefaz.cadeia" no config.json.`;
  if (/handshake|alert|bad certificate|certificate required/i.test(m)) return `A SEFAZ não aceitou o certificado no TLS (${m}). Confira se é o e-CNPJ A1 da empresa, na validade.`;
  return m.slice(0, 250);
}

// ───────────────────────── a assinatura da manifestação ─────────────────────────
/** Assina o infEvento (RSA-SHA1 sobre o SignedInfo, digest SHA-1 do infEvento canonicalizado), como a captura-nfe. */
export function assinarEvento(envEvento, cert) {
  const id = D.idDoEvento(envEvento);
  const digest = crypto.createHash('sha1').update(D.infEventoCanonico(envEvento), 'utf8').digest('base64');
  const si = D.signedInfo(id, digest);
  const assinatura = crypto.sign('sha1', Buffer.from(si, 'utf8'), cert.chave()).toString('base64');
  return D.inserirAssinatura(envEvento, si, assinatura, cert.certBase64);
}

// ───────────────────────── um lote ─────────────────────────
/** Um lote de distribuição (NF-e, CT-e ou NFS-e do ADN): os documentos descompactados, sem ler (quem lê é o Jarvis). */
export async function consultarLote(rede, s, servico, ultNsu) {
  const ambiente = s.ambiente || 'producao';
  const abrir = async (itens) => {
    const docs = []; let ilegiveis = 0;
    for (const d of itens) { try { docs.push({ nsu: d.nsu, schema: d.schema || '', chave: d.chave ?? null, xml: await D.descompactar(d.conteudo) }); } catch { ilegiveis++; } }
    return { docs, ilegiveis };
  };
  if (servico === 'nfse') {
    const r = await rede.get(D.urlAdn(ambiente, ultNsu, s.cnpj));
    const ret = D.lerRespostaAdn(r.status, r.texto, ultNsu);
    const { docs, ilegiveis } = await abrir(ret.docs);
    return D.loteAdn(ret, docs, ilegiveis);
  }
  const cte = servico === 'cte';
  const pedido = cte ? D.envelope('cte_distribuicao', D.xmlDistribuicaoCte({ ambiente, uf: s.uf, cnpj: s.cnpj, ultNSU: ultNsu })) : D.envelope('distribuicao', D.xmlDistribuicao({ ambiente, uf: s.uf, cnpj: s.cnpj, ultNSU: ultNsu }));
  const ret = D.lerRetornoDistribuicao(await rede.soap(cte ? D.ENDERECOS.cte_distribuicao[ambiente] : D.ENDERECOS.nfe_distribuicao[ambiente], cte ? D.SOAP_ACTION.cte_distribuicao : D.SOAP_ACTION.distribuicao, pedido));
  const { docs, ilegiveis } = await abrir(ret.docs);
  return D.loteSefaz(ret, docs, ilegiveis);
}

/**
 * O lote em partes que cabem num envio (até ~4,5 MB): cada parte leva os seus documentos e um "retorno" com o maior NSU dela
 * (como um lote menor, cStat 138); a última leva o retorno de verdade. O NSU no Jarvis só anda para a frente, então a ordem
 * importa e é preservada.
 */
export function partirLote(lote, bytesMax = PADROES.bytesPorEnvio) {
  const docs = [...lote.documentos].sort((a, b) => a.nsu - b.nsu);
  const partes = [];
  let atual = [], tam = 0;
  for (const d of docs) {
    const t = Buffer.byteLength(d.xml, 'utf8') + 300;
    if (atual.length && tam + t > bytesMax) { partes.push(atual); atual = []; tam = 0; }
    atual.push(d); tam += t;
  }
  partes.push(atual);
  return partes.map((p, i) => (i === partes.length - 1
    ? { ret: { cStat: lote.cStat, motivo: lote.motivo, ultNSU: lote.ultNSU, maxNSU: lote.maxNSU }, documentos: p, ilegiveis: lote.ilegiveis }
    : { ret: { cStat: 138, motivo: lote.motivo, ultNSU: Math.max(...p.map((d) => d.nsu)), maxNSU: lote.maxNSU }, documentos: p, ilegiveis: 0 }));
}

// ───────────────────────── o estado local ─────────────────────────
/** { consultas: { servico: [ms…] }, espera: { 'servico|ambiente': ms }, eventos: [retornos ainda não entregues], ultima } */
export const estadoVazio = () => ({ consultas: {}, espera: {}, eventos: [], ultima: null });
/** Quantas consultas ainda cabem na hora (e limpa as antigas). */
export function cota(estado, servico, max, agora) {
  const l = (estado.consultas[servico] || []).filter((t) => agora - t < 3600_000);
  estado.consultas[servico] = l;
  return Math.max(0, max - l.length);
}
const contar = (estado, servico, agora) => { (estado.consultas[servico] ||= []).push(agora); };

/** O serviço está vencido? Na hora (frequência da empresa ou "Buscar agora" na tela) e fora da espera da SEFAZ. */
export function vencido(n = {}, s = {}, estado, servico, agora) {
  const esperaLocal = Number(estado.espera[`${servico}|${s.ambiente || 'producao'}`] || 0);
  const prox = Date.parse(n.proxima_consulta || '') || 0;
  if (Math.max(esperaLocal, prox) > agora) return { vencido: false, ate: Math.max(esperaLocal, prox), motivo: 'espera' };
  const pedido = Date.parse(s.pedido_em || '') || 0;
  const ultima = Date.parse(n.ultima_consulta || '') || 0;
  if (pedido > ultima) return { vencido: true, motivo: 'pedido' };
  const freq = Number(s.frequencia_horas ?? 1);
  if (!(freq > 0)) return { vencido: false, motivo: 'so_quando_pedir' };
  if (!ultima || agora - ultima >= freq * 3600_000 - 5 * 60_000) return { vencido: true, motivo: 'frequencia' };
  return { vencido: false, ate: ultima + freq * 3600_000 - 5 * 60_000, motivo: 'frequencia' };
}

async function chamar(enviar, corpo) {
  let res;
  try { res = await enviar(corpo); } catch (e) { return { parou: { acao: 'esperar', motivo: `Sem rede com o Jarvis: ${e?.message || e}` } }; }
  const c = classificar(res.status, res.corpo);
  if (c.acao === 'ok') return { corpo: res.corpo };
  if (c.acao === 'dividir') return { parou: { acao: 'esperar', motivo: 'O Jarvis recusou um envio grande demais.' } };
  return { parou: c.acao === 'descartar' ? { acao: 'esperar', motivo: c.motivo } : c };
}

/**
 * Uma volta do modo SEFAZ. dep: { enviar(corpo) → { status, corpo }, abrirRede(cert, s) → rede, certificado() → cert (de
 * abrirPfx), log, agora() }. Muda o estado (gravar fora). Devolve { resumo, parou, servicos: [...], eventos, baixados }.
 */
export async function umaVoltaSefaz(cfg, estado, dep) {
  const agora = dep.agora ?? Date.now;
  const log = dep.log ?? (() => {});
  const max = Math.max(1, Math.min(60, Number(cfg.max_consultas_hora) || PADROES.maxConsultasHora));
  const base = { computador: cfg.computador || '', versao: cfg.versao || '' };
  const r = { servicos: [], eventos: 0, baixados: 0, parou: null, resumo: '' };

  // 0) retornos de manifestação que não chegaram ao Jarvis na volta passada
  for (const ev of [...estado.eventos]) {
    const x = await chamar(dep.enviar, { ...base, acao: 'sefaz_evento', ...ev });
    if (x.parou) { r.parou = x.parou; break; }
    estado.eventos = estado.eventos.filter((y) => y !== ev);
  }
  if (r.parou) return fim(r, estado, agora);

  // 1) o que o Jarvis quer
  const e = await chamar(dep.enviar, { ...base, acao: 'sefaz_estado' });
  if (e.parou) { r.parou = e.parou; return fim(r, estado, agora); }
  const s = e.corpo?.sefaz || {};
  if (s.onde_buscar !== 'coletor') { r.resumo = 'SEFAZ: esta empresa busca pelo servidor do Jarvis (a opção "onde buscar" em Empresas e certificados); o Coletor não consulta.'; estado.ultima = new Date(agora()).toISOString(); return r; }
  if (!s.ligada) { r.resumo = 'SEFAZ: a captura desta empresa está desligada no Jarvis.'; estado.ultima = new Date(agora()).toISOString(); return r; }
  if (!s.cnpj) { r.resumo = 'SEFAZ: a empresa não tem CNPJ no Jarvis.'; return r; }

  const pendentes = (s.servicos || []).map((sv) => ({ sv, v: vencido(s.nsu?.[sv], s, estado, sv, agora()) })).filter((x) => x.v.vencido);
  const temTrabalho = pendentes.length || (s.manifestacoes || []).length || (s.baixar || []).length;
  for (const sv of s.servicos || []) if (!pendentes.some((x) => x.sv === sv)) { const v = vencido(s.nsu?.[sv], s, estado, sv, agora()); r.servicos.push({ servico: sv, pulado: v.motivo, ate: v.ate || null }); }
  if (!temTrabalho) return fim(r, estado, agora);

  // 2) o certificado e a rede (só quando há o que fazer)
  // a fila de manifestações já saiu do Jarvis como "enviada": a que não for mandada volta para a fila (devolver)
  const manifestacoes = [...(s.manifestacoes || [])];
  const devolverFila = async () => {
    for (const m of manifestacoes.splice(0)) {
      const x = await chamar(dep.enviar, { ...base, acao: 'sefaz_evento', id: m.id, devolver: true });
      if (x.parou) estado.eventos.push({ id: m.id, devolver: true });
    }
  };
  let cert, rede;
  try { cert = dep.certificado(); } catch (err) { r.parou = { acao: 'certificado', motivo: err.message }; await devolverFila(); return fim(r, estado, agora); }
  if (cert.validade.getTime() < agora()) { r.parou = { acao: 'certificado', motivo: `O certificado venceu em ${cert.validade.toLocaleDateString('pt-BR')}: instale o novo (node coletor.mjs --certificado).` }; await devolverFila(); return fim(r, estado, agora); }
  try {
    rede = dep.abrirRede(cert, s);
    // 2a) a manifestação do destinatário (assinada aqui), antes da distribuição: é rápida e a fila não fica presa
    while (manifestacoes.length) {
      const m = manifestacoes.shift();
      let ret;
      try {
        const env = assinarEvento(D.xmlEvento({ ambiente: s.ambiente || 'producao', cnpj: s.cnpj, chave: m.chave, evento: m.evento, sequencia: m.sequencia, justificativa: m.justificativa, lote: agora() }), cert);
        const lido = D.lerRetornoEvento(await rede.soap(D.ENDERECOS.nfe_evento[s.ambiente || 'producao'], D.SOAP_ACTION.evento, D.envelope('evento', env)));
        const x = lido.eventos[0] || { cStat: lido.cStat, motivo: lido.motivo, protocolo: null, registrado_em: null };
        ret = { id: m.id, cStat: x.cStat, motivo: x.motivo, protocolo: x.protocolo, registrado_em: x.registrado_em };
      } catch (err) { ret = { id: m.id, cStat: 999, motivo: `Falha no envio: ${explicarFalha(err)}`.slice(0, 250), protocolo: null, registrado_em: null }; }
      r.eventos++;
      const x = await chamar(dep.enviar, { ...base, acao: 'sefaz_evento', ...ret });
      if (x.parou) {
        // o Jarvis não recebeu: o retorno fica guardado; as que faltam mandar voltam para a fila na próxima volta
        estado.eventos.push(ret, ...manifestacoes.splice(0).map((y) => ({ id: y.id, devolver: true })));
        r.parou = x.parou;
      }
    }
    // 2b) distribuição
    for (const { sv } of r.parou ? [] : pendentes) {
      const livre = cota(estado, sv, max, agora());
      if (!livre) { r.servicos.push({ servico: sv, pulado: 'cota' }); continue; }
      let pedido = Number(s.nsu?.[sv]?.ult_nsu || 0); // o NSU pedido (a idempotência do Jarvis é por ele)
      const res = await D.baixarLotes({
        ultNsu: pedido,
        maxLotes: Math.min(D.LOTES_POR_CHAMADA, livre),
        consultar: async (nsu) => { pedido = nsu; contar(estado, sv, agora()); return consultarLote(rede, s, sv, nsu); },
        registrar: async (lote) => {
          let de = pedido;
          for (const p of partirLote(lote)) {
            const x = await chamar(dep.enviar, { ...base, acao: 'sefaz_lote', servico: sv, ambiente: s.ambiente || 'producao', nsu_de: de, ...p });
            if (x.parou) { const err = new Error(x.parou.motivo || 'O Jarvis não recebeu o lote.'); err.parou = x.parou; throw err; }
            de = Math.max(de, Number(p.ret.ultNSU) || 0);
          }
        },
      }).catch((err) => { if (err.parou) { r.parou = err.parou; return null; } throw err; });
      if (!res) break;
      if (res.ultimo && D.pedeEspera(res.ultimo)) estado.espera[`${sv}|${s.ambiente || 'producao'}`] = agora() + D.ESPERA_MS;
      r.servicos.push({ servico: sv, lotes: res.lotes, documentos: res.documentos, cStat: res.ultimo?.cStat ?? null, motivo: res.ultimo?.motivo || '', erro: res.erro ? explicarFalha(res.erro) : null });
      if (res.ultimo?.cStat === 656) log(`${NOMES[sv]}: a SEFAZ acusou consumo indevido (656): a próxima consulta só depois de 1 hora.`);
    }
    // 2c) o XML completo das notas com ciência (consChNFe), dentro da cota da NF-e
    for (const chave of r.parou ? [] : (s.baixar || []).slice(0, PADROES.baixarPorVolta)) {
      if (!cota(estado, 'nfe', max, agora())) break;
      contar(estado, 'nfe', agora());
      try {
        const ret = D.lerRetornoDistribuicao(await rede.soap(D.ENDERECOS.nfe_distribuicao[s.ambiente || 'producao'], D.SOAP_ACTION.distribuicao, D.envelope('distribuicao', D.xmlDistribuicao({ ambiente: s.ambiente, uf: s.uf, cnpj: s.cnpj, chave }))));
        const documentos = [];
        for (const z of ret.docs) { try { documentos.push({ nsu: z.nsu, schema: z.schema, xml: await D.descompactar(z.conteudo) }); } catch { /* ilegível */ } }
        if (!documentos.length) continue;
        const x = await chamar(dep.enviar, { ...base, acao: 'sefaz_lote', modo: 'chave', servico: 'nfe', ambiente: s.ambiente || 'producao', ret: { cStat: ret.cStat, motivo: ret.motivo }, documentos });
        if (x.parou) { r.parou = x.parou; break; }
        r.baixados++;
      } catch (err) { log(`XML completo de uma nota: ${explicarFalha(err)}`); }
    }
  } finally { try { rede?.fechar(); } catch { /* já fechada */ } }
  return fim(r, estado, agora);
}

function fim(r, estado, agora) {
  estado.ultima = new Date(agora()).toISOString();
  r.resumo = resumoSefaz(r);
  return r;
}

/** Uma linha para o log. */
export function resumoSefaz(r) {
  const partes = r.servicos.map((x) => {
    if (x.pulado === 'espera') return `${NOMES[x.servico]}: esperando a SEFAZ até ${hora(x.ate)}`;
    if (x.pulado === 'cota') return `${NOMES[x.servico]}: cota de consultas da hora cheia`;
    if (x.pulado === 'frequencia') return `${NOMES[x.servico]}: próxima busca ~${hora(x.ate)}`;
    if (x.pulado === 'so_quando_pedir') return `${NOMES[x.servico]}: só quando pedirem na tela`;
    if (x.erro) return `${NOMES[x.servico]}: falhou (${x.erro})`;
    return `${NOMES[x.servico]}: ${x.documentos} documento(s) em ${x.lotes} lote(s), cStat ${x.cStat}${x.motivo ? ` ${x.motivo}` : ''}`;
  });
  if (r.eventos) partes.push(`${r.eventos} manifestação(ões) enviada(s)`);
  if (r.baixados) partes.push(`${r.baixados} XML completo(s) baixado(s)`);
  const txt = partes.length ? `SEFAZ: ${partes.join('; ')}.` : 'SEFAZ: nada a fazer agora.';
  return r.parou ? `${txt} Parou: ${r.parou.motivo || 'o Jarvis não respondeu'}.` : txt;
}
