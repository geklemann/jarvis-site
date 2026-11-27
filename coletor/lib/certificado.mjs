// © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md.
// Coletor Jarvis › o certificado A1 (.pfx) da empresa, aberto AQUI, no computador da empresa (o certificado nunca vai para
// o Jarvis por este caminho). Sem dependências (node:crypto e node:tls):
//   • o TLS usa o próprio .pfx (https.request com pfx e passphrase; o OpenSSL do Node faz a renegociação que a SEFAZ pede);
//   • o certificado (para a assinatura e para conferir validade e CNPJ) sai do contexto TLS (getCertificate), sem decifrar;
//   • a chave privada (só para assinar a manifestação) sai do PKCS#12: um leitor DER/BER pequeno acha o
//     pkcs8ShroudedKeyBag e o Node o decifra (createPrivateKey, PKCS#8 cifrado: PBES2 ou o PBE-SHA1-3DES do PKCS#12). Se a
//     chave estiver dentro de um bloco cifrado (encryptedData), decifra aqui o PBES2 (PBKDF2 + AES/3DES) e o
//     pbeWithSHAAnd3-KeyTripleDES-CBC (a derivação do PKCS#12, RFC 7292 apêndice B).
// O .pfx antigo cifrado com RC2 precisa do Node com --openssl-legacy-provider (o coletor.mjs se religa sozinho assim).
// Nada daqui vai para o log: nem a senha, nem a chave. Testes: testes/coletor_sefaz.test.mjs (certificados de TESTE).
import crypto from 'node:crypto';
import tls from 'node:tls';
import net from 'node:net';

export class ErroCertificado extends Error {}

const OID = Object.freeze({
  data: '1.2.840.113549.1.7.1', encryptedData: '1.2.840.113549.1.7.6',
  keyBag: '1.2.840.113549.1.12.10.1.1', shroudedKeyBag: '1.2.840.113549.1.12.10.1.2',
  pbes2: '1.2.840.113549.1.5.13', pbkdf2: '1.2.840.113549.1.5.12',
  pbeSha3Des: '1.2.840.113549.1.12.1.3',
  hmacSha1: '1.2.840.113549.2.7', hmacSha256: '1.2.840.113549.2.9', hmacSha384: '1.2.840.113549.2.10', hmacSha512: '1.2.840.113549.2.11',
  aes128: '2.16.840.1.101.3.4.1.2', aes192: '2.16.840.1.101.3.4.1.22', aes256: '2.16.840.1.101.3.4.1.42', des3: '1.2.840.113549.3.7',
});

// ── leitor DER/BER (comprimento indefinido e OCTET STRING construída, que o Windows às vezes grava) ──
/** Um elemento: { tag, construido, conteudo (Buffer), filhos(), bruto (o elemento inteiro, quando definido) }. */
export function lerAsn1(b, ini = 0) {
  const tagByte = b[ini];
  if (tagByte === undefined) throw new ErroCertificado('O arquivo não é um .pfx (fim inesperado).');
  let p = ini + 1;
  let len = b[p++];
  let indefinido = false;
  if (len === 0x80) indefinido = true;
  else if (len & 0x80) { const n = len & 0x7f; if (n > 4) throw new ErroCertificado('O arquivo não é um .pfx (comprimento inválido).'); len = 0; for (let i = 0; i < n; i++) len = len * 256 + b[p++]; }
  const construido = !!(tagByte & 0x20);
  let fim, conteudo;
  if (indefinido) {
    // os filhos até o 00 00
    let q = p;
    while (!(b[q] === 0 && b[q + 1] === 0)) { if (q >= b.length) throw new ErroCertificado('O arquivo não é um .pfx (BER sem fim).'); q = lerAsn1(b, q).fim; }
    conteudo = b.subarray(p, q); fim = q + 2;
  } else {
    if (p + len > b.length) throw new ErroCertificado('O arquivo não é um .pfx (cortado).');
    conteudo = b.subarray(p, p + len); fim = p + len;
  }
  return {
    tag: tagByte, construido, conteudo, fim, indefinido, bruto: b.subarray(ini, fim),
    filhos() { const out = []; let q = 0; while (q < conteudo.length) { if (conteudo[q] === 0 && conteudo[q + 1] === 0 && indefinido) break; const f = lerAsn1(conteudo, q); out.push(f); q = f.fim; } return out; },
  };
}
const oidTexto = (e) => {
  const b = e.conteudo; const out = [Math.floor(b[0] / 40), b[0] % 40]; let v = 0;
  for (let i = 1; i < b.length; i++) { v = v * 128 + (b[i] & 0x7f); if (!(b[i] & 0x80)) { out.push(v); v = 0; } }
  return out.join('.');
};
/** Os bytes de uma OCTET STRING (a construída é a junção dos pedaços). */
const octetos = (e) => (e.construido ? Buffer.concat(e.filhos().map(octetos)) : Buffer.from(e.conteudo));
const inteiro = (e) => e.conteudo.reduce((v, x) => v * 256 + x, 0);
/** Regrava o elemento em DER (comprimentos definidos; OCTET STRING construída vira uma só). */
function der(e) {
  const corpo = e.construido && (e.tag & 0x1f) === 4 ? octetos(e) : e.construido ? Buffer.concat(e.filhos().map(der)) : Buffer.from(e.conteudo);
  const tag = e.construido && (e.tag & 0x1f) === 4 ? e.tag & ~0x20 : e.tag;
  return Buffer.concat([Buffer.from([tag]), comprimento(corpo.length), corpo]);
}
function comprimento(n) {
  if (n < 0x80) return Buffer.from([n]);
  const bs = []; while (n > 0) { bs.unshift(n & 0xff); n = Math.floor(n / 256); }
  return Buffer.from([0x80 | bs.length, ...bs]);
}

// ── decifrar o bloco encryptedData (raro: quando a chave está dentro dele) ──
/** A derivação do PKCS#12 (RFC 7292, apêndice B.2) com SHA-1: id 1 = chave, 2 = IV. */
export function kdfPkcs12(senha, sal, iteracoes, id, tamanho) {
  const u = 20, v = 64;
  const P0 = Buffer.alloc(senha.length * 2 + 2);
  for (let i = 0; i < senha.length; i++) P0.writeUInt16BE(senha.charCodeAt(i), i * 2);
  const repetir = (x, n) => { const out = Buffer.alloc(n); for (let i = 0; i < n; i++) out[i] = x[i % x.length]; return out; };
  const S = sal.length ? repetir(sal, v * Math.ceil(sal.length / v)) : Buffer.alloc(0);
  const P = senha.length ? repetir(P0, v * Math.ceil(P0.length / v)) : Buffer.alloc(0);
  let I = Buffer.concat([S, P]);
  const D = Buffer.alloc(v, id);
  const out = [];
  for (let n = 0; n < Math.ceil(tamanho / u); n++) {
    let A = crypto.createHash('sha1').update(Buffer.concat([D, I])).digest();
    for (let k = 1; k < iteracoes; k++) A = crypto.createHash('sha1').update(A).digest();
    out.push(A);
    const B = repetir(A, v);
    for (let j = 0; j < I.length / v; j++) {
      let carry = 1;
      for (let k = v - 1; k >= 0; k--) { const s = I[j * v + k] + B[k] + carry; I[j * v + k] = s & 0xff; carry = s >> 8; }
    }
  }
  return Buffer.concat(out).subarray(0, tamanho);
}
function decifrar(alg, cifrado, senha) {
  const [oidAlg, params] = alg.filhos();
  const o = oidTexto(oidAlg);
  if (o === OID.pbeSha3Des) {
    const [sal, it] = params.filhos();
    const s = octetos(sal), n = inteiro(it);
    const d = crypto.createDecipheriv('des-ede3-cbc', kdfPkcs12(senha, s, n, 1, 24), kdfPkcs12(senha, s, n, 2, 8));
    return Buffer.concat([d.update(cifrado), d.final()]);
  }
  if (o === OID.pbes2) {
    const [kdf, esquema] = params.filhos();
    const [kOid, kPar] = kdf.filhos();
    if (oidTexto(kOid) !== OID.pbkdf2) throw new ErroCertificado('Derivação de chave do .pfx não suportada.');
    const kp = kPar.filhos();
    const sal = octetos(kp[0]), it = inteiro(kp[1]);
    const prf = kp.find((x) => x.tag === 0x30);
    const hash = { [OID.hmacSha1]: 'sha1', [OID.hmacSha256]: 'sha256', [OID.hmacSha384]: 'sha384', [OID.hmacSha512]: 'sha512' }[prf ? oidTexto(prf.filhos()[0]) : OID.hmacSha1];
    const [eOid, iv] = esquema.filhos();
    const cifra = { [OID.aes128]: ['aes-128-cbc', 16], [OID.aes192]: ['aes-192-cbc', 24], [OID.aes256]: ['aes-256-cbc', 32], [OID.des3]: ['des-ede3-cbc', 24] }[oidTexto(eOid)];
    if (!hash || !cifra) throw new ErroCertificado('Cifra do .pfx não suportada.');
    const chave = crypto.pbkdf2Sync(Buffer.from(senha, 'utf8'), sal, it, cifra[1], hash);
    const d = crypto.createDecipheriv(cifra[0], chave, octetos(iv));
    return Buffer.concat([d.update(cifrado), d.final()]);
  }
  throw new ErroCertificado('Cifra antiga no .pfx (RC2): a chave está num bloco que o Coletor não abre. Exporte o certificado de novo com a criptografia AES ou 3DES.');
}

/** As bolsas (SafeBag) de um SafeContents: [{ oid, valor }]. */
const bolsas = (safeContents) => lerAsn1(safeContents).filhos().map((b) => { const [id, val] = b.filhos(); return { oid: oidTexto(id), valor: val.filhos()[0] }; });

/** A chave privada (KeyObject) do .pfx. Lança ErroCertificado com a mensagem em português. */
export function chaveDoPfx(pfx, senha) {
  let raiz;
  try { raiz = lerAsn1(Buffer.from(pfx)); } catch (e) { throw e instanceof ErroCertificado ? e : new ErroCertificado('O arquivo não é um .pfx.'); }
  const [, authSafe] = raiz.filhos();
  const [tipo, conteudo] = authSafe.filhos();
  if (oidTexto(tipo) !== OID.data) throw new ErroCertificado('.pfx assinado por chave pública não é suportado.');
  const infos = lerAsn1(octetos(conteudo.filhos()[0])).filhos();
  const todas = [];
  const comCifra = [];
  for (const ci of infos) {
    const [t, c] = ci.filhos();
    const o = oidTexto(t);
    if (o === OID.data) todas.push(...bolsas(octetos(c.filhos()[0])));
    else if (o === OID.encryptedData) comCifra.push(c.filhos()[0]);
  }
  const achar = (lista) => {
    const sh = lista.find((x) => x.oid === OID.shroudedKeyBag);
    if (sh) {
      try { return crypto.createPrivateKey({ key: der(sh.valor), format: 'der', type: 'pkcs8', passphrase: senha }); }
      catch (e) { throw new ErroCertificado(/bad decrypt|mac|password|passphrase|asn1|wrong tag|decod/i.test(String(e?.message)) ? 'Senha do certificado errada.' : `A chave do certificado não abriu (${String(e?.message || e).slice(0, 80)}).`); }
    }
    const kb = lista.find((x) => x.oid === OID.keyBag);
    return kb ? crypto.createPrivateKey({ key: der(kb.valor), format: 'der', type: 'pkcs8' }) : null;
  };
  const chave = achar(todas);
  if (chave) return chave;
  for (const ed of comCifra) {
    const [, eci] = ed.filhos();
    const partes = eci.filhos();
    const alg = partes[1], cont = partes[2];
    if (!cont) continue;
    let claro;
    try { claro = decifrar(alg, octetos(cont), senha); } catch (e) { if (e instanceof ErroCertificado && /RC2/.test(e.message)) continue; throw e instanceof ErroCertificado ? e : new ErroCertificado('Senha do certificado errada.'); }
    const k = achar(bolsas(claro));
    if (k) return k;
  }
  throw new ErroCertificado('O .pfx não tem a chave privada (exporte "com a chave privada").');
}

/** O documento do titular no certificado ICP-Brasil: o CN "RAZÃO:CNPJ" (ou o CPF) ou o OID 2.16.76.1.3.3 do SAN. */
export function documentoDoCertificado(x509) {
  const cn = /CN=([^\n]+)/.exec(x509.subject)?.[1] || '';
  const m = /:(\d{14}|\d{11})\s*$/.exec(cn);
  if (m) return m[1];
  const san = String(x509.subjectAltName || '');
  const d = /(\d{14})/.exec(san.replace(/[^\d,]/g, ' '));
  return d ? d[1] : null;
}

/**
 * Abre o .pfx: { tls: { pfx, passphrase } (o que vai no https.request), certDer, certBase64, x509, titular, documento,
 * validade (Date), chave() (KeyObject, só quando for assinar) }. Lança ErroCertificado (senha errada, RC2 sem o provedor
 * antigo, sem chave) — a mensagem nunca leva a senha.
 */
export function abrirPfx(pfx, senha) {
  const opcoesTls = { pfx: Buffer.from(pfx), passphrase: String(senha ?? '') };
  let ctx;
  try { ctx = tls.createSecureContext(opcoesTls); }
  catch (e) {
    const m = String(e?.message || e);
    if (/unsupported/i.test(m)) throw new ErroCertificado('O .pfx usa uma criptografia antiga (RC2): ligue o Coletor com "node --openssl-legacy-provider" (o coletor.mjs já faz isso sozinho).');
    if (/mac verify|bad decrypt|password/i.test(m)) throw new ErroCertificado('Senha do certificado errada.');
    throw new ErroCertificado(`O certificado não abriu: ${m.slice(0, 100)}`);
  }
  const s = new tls.TLSSocket(new net.Socket(), { secureContext: ctx, isServer: true });
  let raw;
  try { raw = s.getCertificate()?.raw; } finally { s.destroy(); }
  if (!raw) throw new ErroCertificado('O .pfx não tem o certificado.');
  const x509 = new crypto.X509Certificate(raw);
  let chave = null;
  return {
    tls: opcoesTls,
    certDer: Buffer.from(raw),
    certBase64: Buffer.from(raw).toString('base64'),
    x509,
    titular: (/CN=([^\n]+)/.exec(x509.subject)?.[1] || '').replace(/:\d{11,14}\s*$/, ''),
    documento: documentoDoCertificado(x509),
    validade: new Date(x509.validTo),
    inicio: new Date(x509.validFrom),
    chave() { chave ??= chaveDoPfx(opcoesTls.pfx, opcoesTls.passphrase); return chave; },
  };
}

/** O mesmo CNPJ-base (8 dígitos: matriz e filiais) ou o mesmo documento. */
export const mesmaEmpresa = (docCert, cnpj) => { const a = String(docCert || ''), b = String(cnpj || '').replace(/\D/g, ''); return !!a && !!b && (a === b || (a.length === 14 && b.length === 14 && a.slice(0, 8) === b.slice(0, 8))); };
