// © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md.
// Coletor Jarvis › o diagnóstico do modo SEFAZ (node coletor.mjs --diagnostico): passo a passo, cada um com ok/falha e o
// que fazer — o token com o Jarvis, o certificado (abre, validade, mesmo CNPJ da empresa), a conexão TLS com a SEFAZ (o
// certificado do servidor) e uma consulta de verdade em HOMOLOGAÇÃO (a renegociação com o certificado do cliente; não
// mexe no NSU de produção). Respeita a espera de 1 hora também em homologação. A rede entra por parâmetro.
import tls from 'node:tls';
import * as D from './sefaz_dfe.mjs';
import { consultarLote, explicarFalha } from './sefaz.mjs';
import { mesmaEmpresa } from './certificado.mjs';

/** A conexão TLS com o servidor da SEFAZ (sem certificado do cliente): o certificado do servidor confere? */
export function testarTls(url, { timeout = 20000 } = {}) {
  const u = new URL(url);
  return new Promise((resolve, reject) => {
    const s = tls.connect({ host: u.hostname, port: Number(u.port || 443), servername: u.hostname, timeout }, () => {
      const p = s.getPeerCertificate();
      resolve({ protocolo: s.getProtocol(), emissor: p?.issuer?.CN || '', ate: p?.valid_to || '' });
      s.end();
    });
    s.on('timeout', () => s.destroy(new Error('sem resposta')));
    s.on('error', reject);
  });
}

/**
 * Os passos: [{ nome, ok (true/false/null = não testado), mensagem }]. dep: { enviar, certificado(), abrirRede(cert, s),
 * testarTls(url), estado (estado-sefaz), agora() }.
 */
export async function diagnostico(dep) {
  const agora = dep.agora ?? Date.now;
  const passos = [];
  const passo = (nome, ok, mensagem) => { passos.push({ nome, ok, mensagem }); return ok; };
  // 1) o token e o que o Jarvis diz da empresa
  let s = null;
  try {
    const r = await dep.enviar({ acao: 'sefaz_estado' });
    if (r.status !== 200) passo('Token do Coletor', false, `O Jarvis respondeu ${r.status}: ${r.corpo?.error || 'erro'}. Confira o config.json (url e token).`);
    else { s = r.corpo?.sefaz || {}; passo('Token do Coletor', true, `Empresa ${r.corpo?.empresa || ''} (CNPJ ${s.cnpj || 'sem CNPJ'}); busca na SEFAZ: ${s.onde_buscar === 'coletor' ? 'pelo Coletor' : 'pelo servidor do Jarvis'}${s.ligada ? '' : ' (captura desligada no Jarvis)'}.`); }
  } catch (e) { passo('Token do Coletor', false, `Sem conexão com o Jarvis: ${e?.message || e}`); }
  // 2) o certificado
  let cert = null;
  try {
    cert = dep.certificado();
    const dias = Math.floor((cert.validade.getTime() - agora()) / 86400000);
    if (dias < 0) passo('Certificado A1', false, `${cert.titular}: venceu em ${cert.validade.toLocaleDateString('pt-BR')}. Instale o novo com "node coletor.mjs --certificado".`);
    else if (s?.cnpj && !mesmaEmpresa(cert.documento, s.cnpj)) passo('Certificado A1', false, `O certificado é de ${cert.documento || 'outro titular'}, e a empresa no Jarvis é ${s.cnpj}. Aponte o .pfx da empresa certa.`);
    else passo('Certificado A1', true, `${cert.titular} (${cert.documento || 'sem documento'}), válido até ${cert.validade.toLocaleDateString('pt-BR')}${dias <= 30 ? ` — vence em ${dias} dia(s): renove` : ''}. A chave ${(() => { try { cert.chave(); return 'abriu (assina a manifestação)'; } catch (e) { return `não abriu para assinar: ${e.message}`; } })()}.`);
  } catch (e) { const m = String(e?.message || e); passo('Certificado A1', false, /--certificado/.test(m) ? m : `${m} Use "node coletor.mjs --certificado" para apontar o .pfx e a senha.`); }
  // 3) a conexão TLS com a SEFAZ (sem o certificado do cliente)
  const url = D.ENDERECOS.nfe_distribuicao.homologacao;
  try { const t = await (dep.testarTls ?? testarTls)(url); passo('Conexão com a SEFAZ', true, `${new URL(url).hostname}: ${t.protocolo}, certificado do servidor emitido por ${t.emissor || '?'}.`); }
  catch (e) { passo('Conexão com a SEFAZ', false, explicarFalha(e)); }
  // 4) uma consulta em homologação (a renegociação com o certificado)
  if (!cert || !s?.cnpj) passo('Consulta de teste (NF-e, homologação)', null, 'Não testada: falta o certificado ou o CNPJ da empresa.');
  else {
    const chave = 'nfe|homologacao';
    const espera = Number(dep.estado?.espera?.[chave] || 0);
    if (espera > agora()) passo('Consulta de teste (NF-e, homologação)', null, `A SEFAZ pede 1 hora entre as consultas sem documento: tente depois das ${new Date(espera).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.`);
    else {
      let rede;
      try {
        rede = dep.abrirRede(cert, s);
        const l = await consultarLote(rede, { ...s, ambiente: 'homologacao' }, 'nfe', 0);
        if (dep.estado && D.pedeEspera(l)) dep.estado.espera[chave] = agora() + D.ESPERA_MS;
        passo('Consulta de teste (NF-e, homologação)', l.sucesso, l.sucesso ? `A SEFAZ aceitou o certificado e respondeu ${l.cStat} – ${l.motivo}. A busca pelo Coletor funciona.` : `A SEFAZ respondeu ${l.cStat} – ${l.motivo}.`);
      } catch (e) { passo('Consulta de teste (NF-e, homologação)', false, explicarFalha(e)); }
      finally { try { rede?.fechar(); } catch { /* ok */ } }
    }
  }
  return passos;
}

export const textoDiagnostico = (passos) => passos.map((p) => `${p.ok === true ? '[ok]   ' : p.ok === false ? '[FALHA]' : '[--]   '} ${p.nome}: ${p.mensagem}`).join('\n');
