// © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md.
// Coletor Jarvis › onde fica o caminho do .pfx e a senha do certificado: SÓ neste computador, num arquivo à parte do
// config.json (segredo-sefaz.json). No Windows, cifrado com a DPAPI do usuário (ProtectedData, escopo CurrentUser, pelo
// PowerShell que já vem no Windows): só o mesmo usuário, neste mesmo computador, abre — copiar o arquivo para outra máquina
// não adianta. Fora do Windows, o arquivo fica com permissão só do dono (600) e o README avisa que não é cifrado.
// A senha nunca vai para o log nem para o Jarvis. Testes: testes/coletor_sefaz.test.mjs (a DPAPI de verdade quando o
// teste roda no Windows; a troca por uma de mentira nos outros).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const PS_PROTEGER = "Add-Type -AssemblyName System.Security; $b=[Convert]::FromBase64String([Console]::In.ReadToEnd().Trim()); [Convert]::ToBase64String([Security.Cryptography.ProtectedData]::Protect($b,$null,'CurrentUser'))";
const PS_ABRIR = "Add-Type -AssemblyName System.Security; $b=[Convert]::FromBase64String([Console]::In.ReadToEnd().Trim()); [Convert]::ToBase64String([Security.Cryptography.ProtectedData]::Unprotect($b,$null,'CurrentUser'))";
const powershell = (script, entrada) => execFileSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', script], { input: entrada, encoding: 'utf8', windowsHide: true, timeout: 60000 }).trim();

/** A DPAPI do Windows (proteger/abrir base64 → base64), ou null fora do Windows. */
export const dpapiDoWindows = () => (process.platform === 'win32'
  ? { proteger: (b64) => powershell(PS_PROTEGER, b64), abrir: (b64) => powershell(PS_ABRIR, b64) }
  : null);

/** Grava { pfx (caminho), senha }. dpapi: dpapiDoWindows() (padrão) ou null (arquivo com permissão 600). */
export function gravarSegredo(arquivo, { pfx, senha }, { dpapi = dpapiDoWindows() } = {}) {
  const claro = Buffer.from(JSON.stringify({ pfx: String(pfx), senha: String(senha ?? '') }), 'utf8').toString('base64');
  const conteudo = dpapi ? { versao: 1, forma: 'dpapi', dados: dpapi.proteger(claro) } : { versao: 1, forma: 'arquivo', dados: claro };
  fs.mkdirSync(path.dirname(path.resolve(arquivo)), { recursive: true });
  const tmp = `${arquivo}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(conteudo), { mode: 0o600 });
  fs.renameSync(tmp, arquivo);
  try { fs.chmodSync(arquivo, 0o600); } catch { /* Windows: a DPAPI é a proteção */ }
  return conteudo.forma;
}

/** Lê { pfx, senha } ou null (sem o arquivo). Lança com a mensagem em português se não abrir. */
export function lerSegredo(arquivo, { dpapi = dpapiDoWindows() } = {}) {
  if (!fs.existsSync(arquivo)) return null;
  let c;
  try { c = JSON.parse(fs.readFileSync(arquivo, 'utf8')); } catch { throw new Error(`O arquivo ${path.basename(arquivo)} está corrompido: configure o certificado de novo (node coletor.mjs --certificado).`); }
  let claro = c?.dados;
  if (c?.forma === 'dpapi') {
    if (!dpapi) throw new Error('O certificado foi guardado com a proteção do Windows (DPAPI) e só abre no mesmo computador e usuário.');
    try { claro = dpapi.abrir(c.dados); } catch { throw new Error('O Windows não abriu o certificado guardado (outro usuário ou outro computador?): configure de novo com "node coletor.mjs --certificado".'); }
  }
  try { const j = JSON.parse(Buffer.from(String(claro), 'base64').toString('utf8')); return { pfx: String(j.pfx || ''), senha: String(j.senha ?? '') }; }
  catch { throw new Error(`O arquivo ${path.basename(arquivo)} está corrompido: configure o certificado de novo.`); }
}
