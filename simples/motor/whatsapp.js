import{foneWhatsApp as s,linkWhatsApp as p}from"./servicos.js";export{s as foneWhatsApp,p as linkWhatsApp};const r=e=>(Number(e)||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}),m=e=>e?String(e).slice(0,10).split("-").reverse().join("/"):"",i=e=>String(e||"").trim().split(/\s+/)[0]||"";export const VARIAVEIS=Object.freeze({cliente:"primeiro nome do cliente",empresa:"nome da sua empresa",numero:"número do documento",valor:"valor total",vencimento:"vencimento",validade:"validade do orçamento",itens:"lista dos itens",link:"link (aceite, DANFE ou rastreio)",chave:"chave de acesso da nota",linha:"linha digitável do boleto",pix:"Pix copia e cola"}),MODELOS_PADRAO=Object.freeze({orcamento:`Olá, {cliente}! Segue o orçamento nº {numero} da {empresa}, no valor de {valor}, válido até {validade}.
{itens}
Para ver e aceitar: {link}
Qualquer dúvida, é só responder.`,pedido:`Olá, {cliente}! Recebemos o seu pedido nº {numero} na {empresa}, no valor de {valor}.
{itens}
Acompanhe a entrega: {link}
Obrigado pela compra!`,nota:`Olá, {cliente}! A nota fiscal nº {numero} da {empresa}, de {valor}, foi emitida.
Chave de acesso: {chave}
DANFE: {link}`,titulo:`Olá, {cliente}! Segue a cobrança da {empresa}: {valor} com vencimento em {vencimento} ({numero}).
Pix copia e cola: {pix}
Linha digitável: {linha}
Se já pagou, desconsidere esta mensagem.`}),ROTULOS_MODELO=Object.freeze({orcamento:"Orçamento",pedido:"Pedido de venda",nota:"Nota fiscal",titulo:"Título a receber (boleto/Pix)"});export function modelosWhatsApp(e={}){const o=e?.whatsapp_modelos||{};return Object.fromEntries(Object.entries(MODELOS_PADRAO).map(([a,n])=>[a,typeof o[a]=="string"&&o[a].trim()?o[a]:n]))}export function preencher(e,o={}){const a=n=>o[n]==null||String(o[n]).trim()==="";return String(e||"").split(`
`).filter(n=>![...n.matchAll(/\{(\w+)\}/g)].some(([,t])=>t in VARIAVEIS&&a(t))).map(n=>n.replace(/\{(\w+)\}/g,(t,c)=>c in VARIAVEIS?String(o[c]):t)).join(`
`).replace(/\n{3,}/g,`

`).trim()}const l=e=>e?.fantasia||e?.razao||"",d=(e=[],o=8)=>{const a=(e||[]).filter(n=>Number(n.quantidade)>0).map(n=>`• ${String(Number(n.quantidade)).replace(".",",")} × ${n.nome||n.descricao||"item"}`);return a.length>o?[...a.slice(0,o),`• e mais ${a.length-o} item(ns)`].join(`
`):a.join(`
`)};export function camposVenda(e={},{empresa:o,cliente:a,numero:n,link:t=""}={}){return{cliente:i(a?.nome||e.cliente_nome),empresa:l(o),numero:n??e.numero??"",valor:r(e.total),validade:m(e.validade),itens:d(e.itens),link:t}}export function camposNota(e={},{empresa:o,link:a=""}={}){return{cliente:i(e.destinatario?.nome),empresa:l(o),numero:e.numero??"",valor:r(e.valor_total??e.totais?.vNF),chave:e.chave||"",link:a}}export function camposTitulo(e={},{empresa:o,pessoa:a,cobranca:n=null}={}){const t=e.parcelas>1?`parcela ${e.parcela}/${e.parcelas}`:"";return{cliente:i(a?.nome),empresa:l(o),numero:[e.numero||e.documento||e.descricao,t].filter(Boolean).join(" · "),valor:r((Number(e.valor)||0)-(Number(e.valor_pago)||0)),vencimento:m(e.vencimento),linha:n?.linha_digitavel||e.linha_digitavel||"",pix:n?.pix_copia_cola||e.pix_copia_cola||""}}export const celularDe=e=>[e?.celular,e?.fone,e?.extra?.whatsapp].map(o=>s(o)).find(Boolean)||"";
