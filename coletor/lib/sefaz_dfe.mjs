// © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md.
// Captura de documentos › a parte PURA do cliente da Distribuição DF-e, usada nos DOIS lados (26/11/2026):
//   • no servidor, pela função captura-nfe (captura-nfe/sefaz.ts reexporta daqui e soma a leitura dos documentos);
//   • no Coletor Jarvis do computador da empresa (ops/coletor-xml/lib/sefaz_dfe.mjs é uma CÓPIA deste arquivo, refeita por
//     `node ops/coletor-xml/copiar-sefaz.mjs`; o teste coletor_sefaz.test.mjs acusa a diferença).
// Por que dois lados: a SEFAZ (IIS) só pede o certificado do cliente por RENEGOCIAÇÃO TLS depois do pedido (conferido em
// 26/11/2026 com o openssl: www1.nfe, www1.cte e www.nfe — a recepção de eventos — respondem "No client certificate CA
// names sent" no primeiro aperto de mão, TLS 1.2 com "Secure Renegotiation IS supported"), e o Deno das Edge Functions
// (rustls) não faz renegociação ("Connection reset by peer"). O Node com OpenSSL faz: a busca na SEFAZ roda pelo Coletor.
// O ADN da NFS-e pede o certificado já no primeiro aperto de mão (TLS 1.3): continua no servidor.
// Sem dependências, sem rede, sem Deno nem Node: só JavaScript (DecompressionStream e atob existem nos dois).
// Conteúdo: pedidos (distDFeInt da NF-e 1.01 e do CT-e 1.00, envEvento 1.00, a URL do ADN), envelopes SOAP 1.2, a leitura
// dos retornos (retDistDFeInt, retEnvEvento, a falha SOAP, o JSON do ADN), o lote (cStat 137/138/656), a espera de 1 hora
// (NT 2014.002), o laço de lotes (Sincronizador.BaixarServico do CRIVO), o gzip do docZip e as peças da assinatura
// XMLDSig do infEvento (RSA-SHA1/SHA-1, C14N; a conta RSA fica com quem tem a chave). Testes: cap_servidor, cap_servicos e
// coletor_sefaz (sem rede).

/** @typedef {'producao'|'homologacao'} Ambiente */
/** @typedef {'nfe'|'cte'|'nfse'} Servico */

export const TP_AMB = Object.freeze({ producao: '1', homologacao: '2' });
export const ENDERECOS = Object.freeze({
  nfe_distribuicao: Object.freeze({ producao: 'https://www1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx', homologacao: 'https://hom1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx' }),
  nfe_evento: Object.freeze({ producao: 'https://www.nfe.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx', homologacao: 'https://hom1.nfe.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx' }),
  cte_distribuicao: Object.freeze({ producao: 'https://www1.cte.fazenda.gov.br/CTeDistribuicaoDFe/CTeDistribuicaoDFe.asmx', homologacao: 'https://hom1.cte.fazenda.gov.br/CTeDistribuicaoDFe/CTeDistribuicaoDFe.asmx' }),
  nfse_adn: Object.freeze({ producao: 'https://adn.nfse.gov.br/contribuintes/DFe', homologacao: 'https://adn.producaorestrita.nfse.gov.br/contribuintes/DFe' }),
});
export const WSDL = Object.freeze({
  distribuicao: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe',
  evento: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeRecepcaoEvento4',
  cte_distribuicao: 'http://www.portalfiscal.inf.br/cte/wsdl/CTeDistribuicaoDFe',
});
/** @type {Servico[]} */
export const SERVICOS = ['nfe', 'cte', 'nfse'];
/** Os serviços que só funcionam pelo Coletor (a SEFAZ pede o certificado por renegociação TLS). */
export const SERVICOS_DO_COLETOR = Object.freeze(['nfe', 'cte']);
export const CODIGO_UF = Object.freeze({ RO: '11', AC: '12', AM: '13', RR: '14', PA: '15', AP: '16', TO: '17', MA: '21', PI: '22', CE: '23', RN: '24', PB: '25', PE: '26', AL: '27', SE: '28', BA: '29', MG: '31', ES: '32', RJ: '33', SP: '35', PR: '41', SC: '42', RS: '43', MS: '50', MT: '51', GO: '52', DF: '53' });
export const UF_DO_CODIGO = Object.freeze(Object.fromEntries(Object.entries(CODIGO_UF).map(([u, c]) => [c, u])));
export const EVENTOS = Object.freeze({
  '210210': { desc: 'Ciencia da Operacao', conclusivo: false }, '210200': { desc: 'Confirmacao da Operacao', conclusivo: true },
  '210220': { desc: 'Desconhecimento da Operacao', conclusivo: true }, '210240': { desc: 'Operacao nao Realizada', conclusivo: true },
});

/** Só os dígitos. @param {unknown} v */
export const so = (v) => String(v ?? '').replace(/\D/g, '');
/** @param {unknown} s */
export const xe = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c] || c);
/** @param {string} s */
export const des = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
/** O NSU com 15 dígitos. @param {unknown} n */
export const formatarNsu = (n) => String(BigInt(so(n) || '0')).padStart(15, '0');
/** @param {unknown} v */
export const r2 = (v) => Math.round((Number(v) || 0) * 100) / 100;

/** DV módulo 11 da chave de 44 dígitos. @param {string} chave */
export function chaveValida(chave) {
  const c = so(chave);
  if (c.length !== 44) return false;
  let soma = 0, peso = 2;
  for (let k = 42; k >= 0; k--) { soma += Number(c[k]) * peso; peso = peso === 9 ? 2 : peso + 1; }
  const r = soma % 11;
  return (r < 2 ? 0 : 11 - r) === Number(c[43]);
}

// ── pedidos ──
/**
 * O pedido da distribuição da NF-e (distDFeInt 1.01): distNSU (pelo último NSU), consNSU ou consChNFe.
 * @param {{ ambiente?: Ambiente, uf?: string, cnpj?: string, cpf?: string, ultNSU?: number|string|null, nsu?: number|string|null, chave?: string|null }} o
 */
export function xmlDistribuicao(o) {
  const cUF = CODIGO_UF[o.uf || 'SC'] || so(o.uf) || '91';
  const doc = so(o.cnpj) ? `<CNPJ>${so(o.cnpj)}</CNPJ>` : `<CPF>${so(o.cpf)}</CPF>`;
  const pedido = o.chave ? `<consChNFe><chNFe>${so(o.chave)}</chNFe></consChNFe>` : o.nsu != null ? `<consNSU><NSU>${formatarNsu(o.nsu)}</NSU></consNSU>` : `<distNSU><ultNSU>${formatarNsu(o.ultNSU || 0)}</ultNSU></distNSU>`;
  return `<distDFeInt xmlns="http://www.portalfiscal.inf.br/nfe" versao="1.01"><tpAmb>${TP_AMB[o.ambiente || 'producao']}</tpAmb><cUFAutor>${cUF}</cUFAutor>${doc}${pedido}</distDFeInt>`;
}
/** @param {string} evento @param {string} chave @param {number} [seq] */
export const idEvento = (evento, chave, seq = 1) => `ID${evento}${so(chave)}${String(seq).padStart(2, '0')}`;
/** A data e hora de Brasília (-03:00). @param {Date} [d] */
export function dataHoraBrasilia(d = new Date()) { return `${new Date(d.getTime() - 3 * 3600e3).toISOString().slice(0, 19)}-03:00`; }
/**
 * O evento da manifestação do destinatário (envEvento 1.00, cOrgao 91), ainda sem a assinatura.
 * @param {{ ambiente?: Ambiente, cnpj?: string, cpf?: string, chave: string, evento: string, sequencia?: number, dhEvento?: string, justificativa?: string|null, lote?: number|string }} o
 */
export function xmlEvento(o) {
  const ev = EVENTOS[o.evento];
  if (!ev) throw new Error('Evento de manifestação desconhecido.');
  if (!chaveValida(o.chave)) throw new Error('Chave de acesso inválida (44 dígitos e DV).');
  const just = String(o.justificativa || '').trim();
  if (o.evento === '210240' && (just.length < 15 || just.length > 255)) throw new Error('Escreva a justificativa da operação não realizada (de 15 a 255 caracteres).');
  const doc = so(o.cnpj) ? `<CNPJ>${so(o.cnpj)}</CNPJ>` : `<CPF>${so(o.cpf)}</CPF>`;
  const xj = just && ev.conclusivo ? `<xJust>${xe(just)}</xJust>` : '';
  const seq = o.sequencia || 1;
  return `<envEvento xmlns="http://www.portalfiscal.inf.br/nfe" versao="1.00"><idLote>${String(o.lote ?? 1).slice(0, 15)}</idLote><evento versao="1.00"><infEvento Id="${idEvento(o.evento, o.chave, seq)}"><cOrgao>91</cOrgao><tpAmb>${TP_AMB[o.ambiente || 'producao']}</tpAmb>${doc}<chNFe>${so(o.chave)}</chNFe><dhEvento>${o.dhEvento || dataHoraBrasilia()}</dhEvento><tpEvento>${o.evento}</tpEvento><nSeqEvento>${seq}</nSeqEvento><verEvento>1.00</verEvento><detEvento versao="1.00"><descEvento>${ev.desc}</descEvento>${xj}</detEvento></infEvento></evento></envEvento>`;
}
/**
 * O pedido da distribuição de CT-e (distDFeInt 1.00, namespace do CT-e): só pelo último NSU, como o CRIVO.
 * @param {{ ambiente?: Ambiente, uf?: string, cnpj?: string, cpf?: string, ultNSU?: number|string|null }} o
 */
export function xmlDistribuicaoCte(o) {
  const cUF = CODIGO_UF[o.uf || 'SC'] || so(o.uf) || '91';
  const doc = so(o.cnpj) && so(o.cnpj).length !== 11 ? `<CNPJ>${so(o.cnpj)}</CNPJ>` : `<CPF>${so(o.cpf) || so(o.cnpj)}</CPF>`;
  return `<distDFeInt xmlns="http://www.portalfiscal.inf.br/cte" versao="1.00"><tpAmb>${TP_AMB[o.ambiente || 'producao']}</tpAmb><cUFAutor>${cUF}</cUFAutor>${doc}<distNSU><ultNSU>${formatarNsu(o.ultNSU || 0)}</ultNSU></distNSU></distDFeInt>`;
}
/**
 * O endereço da consulta ao ADN: o próximo NSU depois do último lido. ENDERECOS.nfse_adn já termina em /contribuintes/DFe.
 * @param {Ambiente} ambiente @param {number|string|null} ultNSU @param {string} cnpj
 */
export function urlAdn(ambiente, ultNSU, cnpj) {
  const base = ENDERECOS.nfse_adn[ambiente].replace(/\/+$/, '');
  return `${base}/${Number(so(ultNSU) || 0) + 1}?cnpjConsulta=${encodeURIComponent(so(cnpj))}&lote=true`;
}
/**
 * O envelope SOAP 1.2 com o XML do pedido dentro de nfeDadosMsg (ou cteDadosMsg, na distribuição de CT-e).
 * @param {'distribuicao'|'evento'|'cte_distribuicao'} servico @param {string} corpo
 */
export function envelope(servico, corpo) {
  const operacao = servico === 'distribuicao' ? `<nfeDistDFeInteresse xmlns="${WSDL.distribuicao}"><nfeDadosMsg>${corpo}</nfeDadosMsg></nfeDistDFeInteresse>`
    : servico === 'cte_distribuicao' ? `<cteDistDFeInteresse xmlns="${WSDL.cte_distribuicao}"><cteDadosMsg>${corpo}</cteDadosMsg></cteDistDFeInteresse>`
      : `<nfeDadosMsg xmlns="${WSDL.evento}">${corpo}</nfeDadosMsg>`;
  return `<?xml version="1.0" encoding="utf-8"?><soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"><soap12:Body>${operacao}</soap12:Body></soap12:Envelope>`;
}
export const SOAP_ACTION = Object.freeze({ distribuicao: `${WSDL.distribuicao}/nfeDistDFeInteresse`, evento: `${WSDL.evento}/nfeRecepcaoEvento`, cte_distribuicao: `${WSDL.cte_distribuicao}/cteDistDFeInteresse` });
/** O Content-Type do SOAP 1.2 com a action. @param {string} acao */
export const tipoSoap = (acao) => `application/soap+xml; charset=utf-8; action="${acao}"`;

// ── leitura (regex tolerante; o XML vem da SEFAZ) ──
/** O texto do primeiro elemento (sem prefixo de namespace), já sem as entidades. @param {string} xml @param {string} nome */
export const tag = (xml, nome) => { const m = new RegExp(`<(?:\\w+:)?${nome}(?:\\s[^>]*)?>([\\s\\S]*?)</(?:\\w+:)?${nome}>`).exec(xml); return m ? des(m[1].trim()) : ''; };
/** Todos os elementos com o nome: [{ atributos, corpo }]. @param {string} xml @param {string} nome */
export const blocos = (xml, nome) => [...xml.matchAll(new RegExp(`<(?:\\w+:)?${nome}(\\s[^>]*)?>([\\s\\S]*?)</(?:\\w+:)?${nome}>`, 'g'))].map((m) => ({ atributos: m[1] || '', corpo: m[2] }));
/** @param {string} atrs @param {string} nome */
export const atributo = (atrs, nome) => new RegExp(`${nome}="([^"]*)"`).exec(atrs)?.[1] ?? '';

/** @typedef {{ nsu: number, schema: string, conteudo: string }} DocZip */
/**
 * O retorno da distribuição (NF-e ou CT-e): cStat, motivo, ultNSU, maxNSU e os docZip (ainda compactados).
 * @param {string} xml
 * @returns {{ cStat: number|null, motivo: string, ultNSU: number, maxNSU: number, docs: DocZip[] }}
 */
export function lerRetornoDistribuicao(xml) {
  const ret = blocos(xml, 'retDistDFeInt')[0]?.corpo ?? '';
  if (!ret) throw new Error('Retorno da distribuição não encontrado (falta retDistDFeInt).');
  const docs = blocos(ret, 'docZip').map((b) => ({ nsu: Number(so(atributo(b.atributos, 'NSU'))) || 0, schema: atributo(b.atributos, 'schema'), conteudo: b.corpo.trim() }));
  return { cStat: Number(tag(ret, 'cStat')) || null, motivo: tag(ret, 'xMotivo'), ultNSU: Number(so(tag(ret, 'ultNSU'))) || 0, maxNSU: Number(so(tag(ret, 'maxNSU'))) || 0, docs };
}
/**
 * O retorno da recepção de eventos (retEnvEvento).
 * @param {string} xml
 * @returns {{ cStat: number|null, motivo: string, eventos: { chave: string, evento: string, sequencia: number, cStat: number|null, motivo: string, protocolo: string|null, registrado_em: string|null }[] }}
 */
export function lerRetornoEvento(xml) {
  const ret = blocos(xml, 'retEnvEvento')[0]?.corpo ?? '';
  if (!ret) throw new Error('Retorno do evento não encontrado (falta retEnvEvento).');
  return {
    cStat: Number(tag(ret, 'cStat')) || null, motivo: tag(ret, 'xMotivo'),
    eventos: blocos(ret, 'retEvento').map((b) => { const i = blocos(b.corpo, 'infEvento')[0]?.corpo ?? b.corpo; return { chave: tag(i, 'chNFe'), evento: tag(i, 'tpEvento'), sequencia: Number(tag(i, 'nSeqEvento')) || 1, cStat: Number(tag(i, 'cStat')) || null, motivo: tag(i, 'xMotivo'), protocolo: tag(i, 'nProt') || null, registrado_em: tag(i, 'dhRegEvento') || null }; }),
  };
}
/**
 * A resposta HTTP do serviço SOAP: o texto, ou o erro em português (status sem envelope ou soap:Fault).
 * @param {number} status @param {string} txt
 */
export function respostaSoap(status, txt) {
  if ((status < 200 || status >= 300) && !txt.includes('Envelope')) throw new Error(`O serviço respondeu ${status}: ${txt.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200)}`);
  const falha = /<(?:\w+:)?Fault[\s>]([\s\S]*?)<\/(?:\w+:)?Fault>/.exec(txt);
  if (falha) throw new Error(`O serviço recusou a chamada: ${(/<(?:\w+:)?Text[^>]*>([\s\S]*?)<\//.exec(falha[1])?.[1] ?? falha[1]).replace(/<[^>]+>/g, ' ').trim().slice(0, 200)}`);
  return txt;
}

/**
 * O que um lote respondeu (LoteDeServico do CRIVO). semDocumentos pede a espera de uma hora antes de consultar de novo.
 * @template D
 * @typedef {{ sucesso: boolean, semDocumentos: boolean, temMais: boolean, cStat: number|null, motivo: string, ultNSU: number, maxNSU: number, documentos: D[], ilegiveis: number }} Lote
 */
/**
 * O retorno da distribuição (NF-e ou CT-e) → o lote. Sucesso em 137 e 138; tem mais enquanto ultNSU < maxNSU.
 * @template D
 * @param {{ cStat: number|null, motivo: string, ultNSU: number, maxNSU: number }} ret @param {D[]} documentos @param {number} [ilegiveis]
 * @returns {Lote<D>}
 */
export function loteSefaz(ret, documentos, ilegiveis = 0) {
  const sucesso = ret.cStat === 137 || ret.cStat === 138;
  return { sucesso, semDocumentos: ret.cStat === 137, temMais: ret.cStat === 138 && ret.ultNSU < ret.maxNSU, cStat: ret.cStat, motivo: ret.motivo, ultNSU: ret.ultNSU, maxNSU: ret.maxNSU, documentos, ilegiveis };
}
/**
 * A regra da SEFAZ (NT 2014.002): depois de "nenhum documento" (137), do consumo indevido (656) ou do fim da fila
 * (ultNSU = maxNSU), a próxima consulta só depois de 1 hora. A mesma conta de cap_registrar_consulta › v_esperar.
 * @param {{ cStat: number|null, ultNSU?: number, maxNSU?: number }} l
 */
export const pedeEspera = (l) => l.cStat === 137 || l.cStat === 656 || (l.cStat === 138 && Number(l.ultNSU || 0) >= Number(l.maxNSU || 0));
export const ESPERA_MS = 3600_000;

/** Campo do JSON sem diferenciar maiúsculas (o Swagger do ADN fica atrás do certificado). @param {unknown} o @param {string} nome */
function campo(o, nome) {
  if (!o || typeof o !== 'object' || Array.isArray(o)) return undefined;
  const k = Object.keys(o).find((x) => x.toLowerCase() === nome.toLowerCase());
  return k === undefined ? undefined : /** @type {Record<string, unknown>} */ (o)[k];
}
/** @typedef {{ sucesso: boolean, semDocumentos: boolean, temMais: boolean, situacao: string, motivo: string, cStat: number, ultNSU: number, docs: { nsu: number, chave: string|null, conteudo: string }[] }} RespostaAdn */
/**
 * A resposta do ADN (status HTTP + texto) → o lote (DistribuicaoNfseAdn.LerResposta do CRIVO). O ADN não tem cStat: guardamos
 * 137 para "nenhum documento" (a mesma espera de 1 hora da SEFAZ) e o status HTTP nos outros casos (200, 400, 403…).
 * @param {number} status @param {string} texto @param {number} ultNSU
 * @returns {RespostaAdn}
 */
export function lerRespostaAdn(status, texto, ultNSU) {
  let raiz;
  try { raiz = JSON.parse(texto); } catch {
    return { sucesso: false, semDocumentos: false, temMais: false, situacao: String(status), motivo: 'O serviço da NFS-e não respondeu em JSON.', cStat: status, ultNSU, docs: [] };
  }
  const st = campo(raiz, 'StatusProcessamento');
  const situacao = typeof st === 'string' ? st : String(status);
  const lote = campo(raiz, 'LoteDFe');
  const docs = Array.isArray(lote) ? lote.filter((d) => typeof campo(d, 'ArquivoXml') === 'string').map((d) => {
    const n = campo(d, 'NSU'), c = campo(d, 'ChaveAcesso');
    return { nsu: typeof n === 'number' ? n : Number(so(n)) || 0, chave: typeof c === 'string' ? c : null, conteudo: String(campo(d, 'ArquivoXml')) };
  }) : [];
  const nenhum = situacao.toUpperCase().includes('NENHUM') || (status === 404 && docs.length === 0);
  const sucesso = status === 200 || nenhum;
  const ult = docs.length ? Math.max(ultNSU, ...docs.map((d) => d.nsu)) : ultNSU;
  const erros = campo(raiz, 'Erros');
  const motivo = sucesso ? situacao : Array.isArray(erros) && erros.length ? erros.map((x) => { const d = campo(x, 'Descricao'); return typeof d === 'string' ? d : JSON.stringify(x); }).join('; ') : situacao;
  return { sucesso, semDocumentos: nenhum, temMais: sucesso && docs.length > 0, situacao, motivo, cStat: nenhum ? 137 : status, ultNSU: ult, docs };
}
/**
 * A resposta do ADN já com os documentos lidos → o lote (o maior NSU é o próprio último: o ADN não informa).
 * @template D
 * @param {RespostaAdn} r @param {D[]} documentos @param {number} [ilegiveis]
 * @returns {Lote<D>}
 */
export function loteAdn(r, documentos, ilegiveis = 0) {
  return { sucesso: r.sucesso, semDocumentos: r.semDocumentos, temMais: r.temMais, cStat: r.cStat, motivo: r.motivo, ultNSU: r.ultNSU, maxNSU: r.ultNSU, documentos, ilegiveis };
}

/** docZip: base64 de um gzip → texto (DecompressionStream, nativo no Deno e no Node 18+). @param {string} base64 */
export async function descompactar(base64) {
  const bytes = Uint8Array.from(atob(base64.replace(/\s/g, '')), (c) => c.charCodeAt(0));
  const ds = new DecompressionStream('gzip');
  const saida = new Blob([bytes]).stream().pipeThrough(ds);
  return await new Response(saida).text();
}

// ── o laço de lotes ──
export const LOTES_POR_CHAMADA = 20;
/**
 * O laço de lotes da distribuição (Sincronizador.BaixarServico do CRIVO): pede a partir do último NSU, grava cada lote assim
 * que chega (o NSU nunca se perde) e continua enquanto houver fila (ultNSU < maxNSU; no ADN, enquanto vierem documentos),
 * até 20 lotes por chamada. Para na recusa (656 e outras: insistir prolonga o bloqueio), no fim da fila, sem progresso de
 * NSU e quando acaba o tempo. Uma falha de rede vira um lote "999" gravado no histórico. Quem consulta e quem grava vêm de
 * fora (o servidor e o Coletor usam o mesmo laço).
 * @template D
 * @param {{ ultNsu: number, consultar: (ultNsu: number) => Promise<Lote<D>>, registrar: (lote: Lote<D>) => Promise<unknown>, maxLotes?: number, ate?: number, agora?: () => number }} o
 * @returns {Promise<{ lotes: number, documentos: number, ultNsu: number, ultimo: Lote<D>|null, parou: 'fim'|'recusa'|'erro'|'limite'|'tempo', erro: string|null }>}
 */
export async function baixarLotes(o) {
  const max = o.maxLotes ?? LOTES_POR_CHAMADA;
  const agora = o.agora ?? (() => Date.now());
  let nsu = o.ultNsu, documentos = 0, lotes = 0;
  /** @type {Lote<D>|null} */
  let ultimo = null;
  for (let i = 0; i < max; i++) {
    if (i > 0 && o.ate != null && agora() >= o.ate) return { lotes, documentos, ultNsu: nsu, ultimo, parou: 'tempo', erro: null };
    let r;
    try {
      r = await o.consultar(nsu);
    } catch (e) {
      const erro = String(/** @type {Error} */ (e)?.message || e).slice(0, 250);
      ultimo = { sucesso: false, semDocumentos: false, temMais: false, cStat: 999, motivo: `Falha ao falar com o serviço: ${erro}`, ultNSU: nsu, maxNSU: nsu, documentos: [], ilegiveis: 0 };
      await o.registrar(ultimo);
      return { lotes, documentos, ultNsu: nsu, ultimo, parou: 'erro', erro };
    }
    await o.registrar(r);
    lotes++;
    ultimo = r;
    documentos += r.documentos.length;
    const anterior = nsu;
    nsu = Math.max(nsu, r.ultNSU || 0);
    if (!r.sucesso) return { lotes, documentos, ultNsu: nsu, ultimo, parou: 'recusa', erro: null };
    // sem fila, ou o NSU não andou (resposta sem progresso): para, para não pedir o mesmo lote de novo
    if (!r.temMais || nsu <= anterior) return { lotes, documentos, ultNsu: nsu, ultimo, parou: 'fim', erro: null };
  }
  return { lotes, documentos, ultNsu: nsu, ultimo, parou: 'limite', erro: null };
}

// ── assinatura XMLDSig do infEvento (enveloped, C14N, RSA-SHA1/SHA-1 — padrão da NF-e; conferir no MOC) ──
/** O infEvento canonicalizado (C14N inclusivo do subelemento: herda o xmlns da NF-e). O XML vem de xmlEvento(). @param {string} envEvento */
export function infEventoCanonico(envEvento) {
  const m = /<infEvento\s[^>]*>[\s\S]*<\/infEvento>/.exec(envEvento);
  if (!m) throw new Error('infEvento não encontrado.');
  return m[0].replace(/^<infEvento\s/, '<infEvento xmlns="http://www.portalfiscal.inf.br/nfe" ');
}
const DSIG = 'http://www.w3.org/2000/09/xmldsig#';
/** O SignedInfo canonicalizado (é ele que se assina com a chave privada). @param {string} id @param {string} digestBase64 */
export function signedInfo(id, digestBase64) {
  return `<SignedInfo xmlns="${DSIG}"><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"></CanonicalizationMethod><SignatureMethod Algorithm="${DSIG}rsa-sha1"></SignatureMethod><Reference URI="#${id}"><Transforms><Transform Algorithm="${DSIG}enveloped-signature"></Transform><Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"></Transform></Transforms><DigestMethod Algorithm="${DSIG}sha1"></DigestMethod><DigestValue>${digestBase64}</DigestValue></Reference></SignedInfo>`;
}
/** Põe a assinatura (Signature com o SignedInfo, o valor e o certificado) logo depois do infEvento. @param {string} envEvento @param {string} signedInfoXml @param {string} assinaturaBase64 @param {string} certificadoBase64 */
export function inserirAssinatura(envEvento, signedInfoXml, assinaturaBase64, certificadoBase64) {
  const sig = `<Signature xmlns="${DSIG}">${signedInfoXml.replace(` xmlns="${DSIG}"`, '')}<SignatureValue>${assinaturaBase64}</SignatureValue><KeyInfo><X509Data><X509Certificate>${certificadoBase64}</X509Certificate></X509Data></KeyInfo></Signature>`;
  return envEvento.replace('</infEvento>', `</infEvento>${sig}`);
}
/** O Id do infEvento. @param {string} envEvento */
export const idDoEvento = (envEvento) => /Id="([^"]+)"/.exec(envEvento)?.[1] ?? '';
