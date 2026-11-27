// © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md.
// Coletor Jarvis › a varredura da pasta (sem rede; testes/aud_coletor_programa.test.mjs): os XML e ZIP da pasta e das
// subpastas, o que mudou desde a última volta (tamanho e data, sem abrir), a abertura (o ZIP aqui mesmo), o hash de cada
// XML (o SHA-256 do texto em UTF-8, o mesmo que o servidor confere) e o estado em disco (o que já foi lido e enviado,
// sem o conteúdo). As regras de "o que entra" e "o que mudou" são as mesmas da pasta ligada no navegador
// (web/escritorio/motor/auditor/pasta.js; o teste compara as duas).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { lerZip, ehZip } from './zip.mjs';

export const LIMITES = Object.freeze({ arquivos: 50000, bytesArquivo: 50 * 1024 * 1024, bytesXml: 2 * 1024 * 1024 });

/** O arquivo entra? Só .xml e .zip, sem os ocultos, os temporários do Office e os downloads pela metade. */
export function entraNaLeitura(caminho) {
  const partes = String(caminho ?? '').split(/[\\/]+/).filter(Boolean);
  if (!partes.length) return false;
  const nome = partes[partes.length - 1];
  if (partes.slice(0, -1).some((p) => p.startsWith('.') || /^(\$recycle\.bin|system volume information|__macosx)$/i.test(p))) return false;
  if (nome.startsWith('.') || nome.startsWith('~$')) return false;
  if (/\.(crdownload|part|partial|tmp|download)$/i.test(nome)) return false;
  return ['.xml', '.zip'].some((e) => nome.toLowerCase().endsWith(e));
}
export const assinatura = (f) => `${Number(f?.tamanho) || 0}|${Number(f?.modificado) || 0}`;

/** Os arquivos da pasta (com as subpastas): [{ caminho (relativo, com "/"), completo, tamanho, modificado }]. */
export async function varrer(raiz, { limite = LIMITES.arquivos } = {}) {
  const out = [];
  async function andar(dir, rel) {
    let itens;
    try { itens = await fs.promises.readdir(dir, { withFileTypes: true }); } catch { return; }
    for (const d of itens) {
      if (out.length >= limite) return;
      const r = rel ? `${rel}/${d.name}` : d.name;
      const completo = path.join(dir, d.name);
      if (d.isDirectory()) { if (!d.name.startsWith('.')) await andar(completo, r); continue; }
      if (!d.isFile() || !entraNaLeitura(r)) continue;
      try { const st = await fs.promises.stat(completo); out.push({ caminho: r, completo, tamanho: st.size, modificado: Math.round(st.mtimeMs) }); } catch { /* sumiu no meio */ }
    }
  }
  await andar(raiz, '');
  return out;
}

/** O que mudou: { novos, mudaram, pendentes, iguais, sumiram } (pendentes: os que não foram enviados da outra vez). */
export function mudancas(indice = {}, arquivos = []) {
  const novos = [], mudaram = [], iguais = [], pendentes = [];
  const vistos = new Set();
  for (const f of arquivos) {
    if (!f?.caminho || vistos.has(f.caminho)) continue;
    vistos.add(f.caminho);
    const antes = indice[f.caminho];
    if (!antes) novos.push(f);
    else if (antes.assinatura !== assinatura(f)) mudaram.push(f);
    else if (antes.situacao === 'pendente') pendentes.push(f);
    else iguais.push(f);
  }
  return { novos, mudaram, iguais, pendentes, sumiram: Object.keys(indice).filter((c) => !vistos.has(c)) };
}

/** Bytes → texto (UTF-8; a declaração ISO-8859-1/Windows-1252 é respeitada, como na tela). */
export function textoDeBytes(bytes) {
  const ini = Buffer.from(bytes.subarray(0, 120)).toString('latin1');
  const enc = /encoding=["']([\w-]+)["']/i.exec(ini)?.[1]?.toLowerCase();
  const t = new TextDecoder(enc && /8859|latin|1252/.test(enc) ? 'windows-1252' : 'utf-8').decode(bytes);
  return t.replace(/^﻿/, '');
}
const pareceXml = (b) => b[0] === 0x3c || (b[0] === 0xef && b[3] === 0x3c) || (b[0] <= 0x20 && b.subarray(0, 64).toString().trimStart().startsWith('<'));
export const sha256 = (texto) => crypto.createHash('sha256').update(Buffer.from(String(texto), 'utf8')).digest('hex');

/** Abre o arquivo: [{ nome, texto, hash } | { nome, erro }] (o ZIP vira os XML de dentro). */
export function abrir(nome, bytes) {
  if (bytes.length > LIMITES.bytesArquivo) return [{ nome, erro: 'Arquivo maior que 50 MB.' }];
  if (ehZip(bytes) || /\.zip$/i.test(nome)) {
    try {
      return lerZip(bytes).map((a) => {
        const n = `${nome}/${a.nome}`;
        if (!/\.xml$/i.test(a.nome) && !pareceXml(a.dados)) return { nome: n, erro: 'Não é XML: ignorado.' };
        return comHash(n, textoDeBytes(a.dados));
      });
    } catch (e) { return [{ nome, erro: String(e?.message || e) }]; }
  }
  if (!pareceXml(bytes) && !/\.xml$/i.test(nome)) return [{ nome, erro: 'Não é XML nem ZIP.' }];
  return [comHash(nome, textoDeBytes(bytes))];
}
function comHash(nome, texto) {
  if (Buffer.byteLength(texto, 'utf8') > LIMITES.bytesXml) return { nome, erro: 'XML maior que 2 MB.' };
  return { nome, texto, hash: sha256(texto) };
}

/** O estado em disco: { arquivos: { caminho: { assinatura, situacao, hashes } }, enviados: [hash], ultima }. */
export function lerEstado(arquivo) {
  try { const e = JSON.parse(fs.readFileSync(arquivo, 'utf8')); return { arquivos: e.arquivos || {}, enviados: new Set(e.enviados || []), ultima: e.ultima || null }; }
  catch { return { arquivos: {}, enviados: new Set(), ultima: null }; }
}
/** Grava o estado de forma atômica (nunca fica meio arquivo). */
export function gravarEstado(arquivo, e) {
  const tmp = `${arquivo}.tmp`;
  fs.mkdirSync(path.dirname(path.resolve(arquivo)), { recursive: true });
  fs.writeFileSync(tmp, JSON.stringify({ arquivos: e.arquivos, enviados: [...e.enviados], ultima: e.ultima }));
  fs.renameSync(tmp, arquivo);
}

/** O intervalo entre as voltas, em minutos (1 a 1440; padrão 10). */
export function intervalo(min) {
  const n = Math.round(Number(min));
  return Number.isFinite(n) && n > 0 ? Math.min(1440, Math.max(1, n)) : 10;
}
