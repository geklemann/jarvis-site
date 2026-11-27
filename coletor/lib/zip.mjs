// © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md.
// Coletor Jarvis › leitor de ZIP sem dependências (node:zlib): os ZIP da pasta são abertos AQUI, no computador da
// empresa, e só os XML de dentro vão para o Jarvis. Métodos 0 (armazenado) e 8 (deflate), ZIP dentro de ZIP (até 3
// níveis), contra o "zip bomba": no máximo 20.000 arquivos e 512 MB descompactados. Sem ZIP64 e sem senha (erro com o
// nome do arquivo). Formato: APPNOTE.TXT da PKWARE (4.3.7, 4.3.12 e 4.3.16).
import zlib from 'node:zlib';

const LIMITE = { arquivos: 20000, bytes: 512 * 1024 * 1024 };
export const ehZip = (b) => b?.length >= 4 && b[0] === 0x50 && b[1] === 0x4b && (b[2] === 3 || b[2] === 5) && (b[3] === 4 || b[3] === 6);

/** Lê o ZIP: [{ nome, dados (Buffer) }] só com os arquivos (as pastas saem). Lança com a mensagem em português. */
export function lerZip(entrada, { nivel = 0, prefixo = '', usados = { arquivos: 0, bytes: 0 } } = {}) {
  const b = Buffer.isBuffer(entrada) ? entrada : Buffer.from(entrada);
  let fim = -1;
  for (let i = b.length - 22; i >= Math.max(0, b.length - 65557); i--) if (b.readUInt32LE(i) === 0x06054b50) { fim = i; break; }
  if (fim < 0) throw new Error(`${prefixo || 'ZIP'}: não é um ZIP válido (registro final não encontrado).`);
  const total = b.readUInt16LE(fim + 10), inicio = b.readUInt32LE(fim + 16);
  if (total === 0xffff || inicio === 0xffffffff) throw new Error(`${prefixo || 'ZIP'}: ZIP64 (maior que 4 GB ou com mais de 65 mil arquivos): extraia antes.`);
  const saida = [];
  let p = inicio;
  for (let k = 0; k < total; k++) {
    if (p + 46 > b.length || b.readUInt32LE(p) !== 0x02014b50) throw new Error(`${prefixo || 'ZIP'}: corrompido (diretório central inválido).`);
    const flags = b.readUInt16LE(p + 8), metodo = b.readUInt16LE(p + 10);
    const comp = b.readUInt32LE(p + 20), tam = b.readUInt32LE(p + 24), local = b.readUInt32LE(p + 42);
    const nl = b.readUInt16LE(p + 28), el = b.readUInt16LE(p + 30), cl = b.readUInt16LE(p + 32);
    const nome = b.subarray(p + 46, p + 46 + nl).toString(flags & 0x800 ? 'utf8' : 'latin1');
    p += 46 + nl + el + cl;
    if (nome.endsWith('/')) continue;
    if (flags & 1) throw new Error(`${prefixo}${nome}: protegido por senha no ZIP.`);
    if (local + 30 > b.length || b.readUInt32LE(local) !== 0x04034b50) throw new Error(`${prefixo}${nome}: cabeçalho não encontrado (ZIP corrompido).`);
    usados.arquivos++;
    usados.bytes += tam;
    if (usados.arquivos > LIMITE.arquivos) throw new Error(`O ZIP tem mais de ${LIMITE.arquivos} arquivos.`);
    if (usados.bytes > LIMITE.bytes) throw new Error('O ZIP descompactado passa de 512 MB: divida em arquivos menores.');
    const ini = local + 30 + b.readUInt16LE(local + 26) + b.readUInt16LE(local + 28);
    const bruto = b.subarray(ini, ini + comp);
    let dados;
    if (metodo === 0) dados = Buffer.from(bruto);
    else if (metodo === 8) dados = zlib.inflateRawSync(bruto, { maxOutputLength: Math.max(1, tam) + 1 });
    else throw new Error(`${prefixo}${nome}: compressão ${metodo} não suportada (só "armazenado" e "deflate").`);
    if (dados.length !== tam) throw new Error(`${prefixo}${nome}: tamanho diferente do informado no ZIP (corrompido).`);
    if (ehZip(dados) && /\.zip$/i.test(nome) && nivel < 3) { saida.push(...lerZip(dados, { nivel: nivel + 1, prefixo: `${prefixo}${nome}/`, usados })); continue; }
    saida.push({ nome: `${prefixo}${nome}`, dados });
  }
  return saida;
}
