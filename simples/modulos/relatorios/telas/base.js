import{esc as p,ic as c,brl as u,num as v,dataBR as d,compBR as b,hojeIso as l,toast as x,confirmar as h,baixar as M}from"../../../../escritorio/comum/nucleo.js";import{mascarar as f}from"../../../../escritorio/comum/kit/mascaras.js";import{resolverPeriodo as w,linhasDaFonte as y,camposDaFonte as z}from"../../../motor/gestao_relatorios.js";const _=`
.M .gs-cab{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:10px}
.M .gs-cab h1{font-size:20px;margin:0}
.M .gs-cab p{margin:3px 0 0;color:var(--texto2);font-size:13px;max-width:860px}
.M .gs-acoes{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.M .gs-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-bottom:10px}
.M .gs-kpi{background:var(--painel);border:1px solid var(--borda);border-radius:var(--raio);padding:8px 12px;min-width:0}
.M .gs-kpi small{display:block;color:var(--texto3);font-size:11.5px;text-transform:uppercase;letter-spacing:.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.M .gs-kpi b{display:block;font-size:17px;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.M .gs-kpi span{display:block;color:var(--texto2);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.M .gs-kpi.verde b{color:var(--verde)}.M .gs-kpi.verm b{color:var(--verm)}.M .gs-kpi.ouro b{color:var(--ouro)}.M .gs-kpi.azul b{color:var(--azul)}
.M .gs-aviso{display:flex;gap:8px;align-items:flex-start;border:1px solid var(--borda);border-left:3px solid var(--ouro);background:var(--painel);border-radius:var(--raio);padding:8px 10px;margin-bottom:10px;font-size:13px}
.M .gs-aviso.verm{border-left-color:var(--verm)}.M .gs-aviso.verde{border-left-color:var(--verde)}.M .gs-aviso.azul{border-left-color:var(--azul)}
.M .gs-aviso .ic{flex:none;margin-top:1px}
.M .gs-aviso ol,.M .gs-aviso ul{margin:4px 0 0 18px;padding:0}
.M .gs-cartao{background:var(--painel);border:1px solid var(--borda);border-radius:var(--raio);padding:10px 12px;min-width:0}
.M .gs-cartao h3{font-size:14px;margin:0 0 8px;display:flex;gap:6px;align-items:center;justify-content:space-between;flex-wrap:wrap}
.M .gs-grade{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;margin-bottom:10px}
.M .gs-lado{display:grid;grid-template-columns:minmax(0,340px) minmax(0,1fr);gap:12px;align-items:start}
.M .gs-dupla{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px}
.M .gs-secao{font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:var(--texto3);margin:12px 0 6px}
.M .gs-num{font-variant-numeric:tabular-nums;text-align:right;white-space:nowrap}
.M .gs-mono{font-family:var(--mono);font-size:12px;word-break:break-all}
.M .gs-lista{list-style:none;margin:0;padding:0}
.M .gs-lista li{display:flex;gap:10px;padding:6px 0;border-bottom:1px solid var(--borda);font-size:13px;align-items:baseline;flex-wrap:wrap}
.M .gs-lista li .gs-num{margin-left:auto}
.M .gs-chips{display:flex;gap:6px;flex-wrap:wrap}
.M .gs-chip{border:1px solid var(--borda2);background:var(--painel);color:var(--texto2);border-radius:20px;padding:2px 10px;font:inherit;font-size:12.5px;cursor:pointer;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.M .gs-chip.ativo{background:var(--tinta);border-color:var(--tinta);color:var(--tinta-txt)}
.M .gs-chip .ic{width:13px;height:13px}
.M .gs-linha{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.M .gs-linha>.campo{margin:0;min-width:0}
.M .gs-barra{display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;background:var(--painel);border:1px solid var(--borda);border-radius:var(--raio);padding:8px 10px;margin-bottom:10px}
.M .gs-barra .campo{margin:0;min-width:0}
.M .gs-barra input,.M .gs-barra select{min-width:0;max-width:100%}
.M .gs-tab{width:100%;border-collapse:collapse;font-size:12.5px}
.M .gs-tab th,.M .gs-tab td{border-bottom:1px solid var(--borda);padding:4px 6px;text-align:left;vertical-align:middle}
.M .gs-tab th{font-size:11.5px;color:var(--texto3);font-weight:600;background:var(--painel2);position:sticky;top:0}
.M .gs-tab td.c,.M .gs-tab th.c{text-align:center}
.M .gs-rolar{overflow:auto;max-width:100%}
.M .gs-filtro{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(0,1.2fr) auto;gap:6px;align-items:center;margin-bottom:6px}
.M .gs-filtro input,.M .gs-filtro select{width:100%;min-width:0}
.M .gs-filtro .gs-dois{display:flex;gap:4px;min-width:0}.M .gs-filtro .gs-dois input{flex:1 1 0}
.M .gs-filtro .gs-perg{grid-column:1/-1;margin:0}
.M .gs-colunas{display:flex;flex-direction:column;gap:2px;max-height:330px;overflow:auto;border:1px solid var(--borda);border-radius:8px;padding:4px}
.M .gs-colunas label{display:flex;gap:6px;align-items:center;font-size:12.5px;padding:2px 4px;border-radius:6px;cursor:pointer;min-width:0}
.M .gs-colunas label:hover{background:var(--painel2)}
.M .gs-colunas label span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.M .gs-colunas .gs-ord{display:flex;gap:2px}
.M .gs-colunas .gs-ord button{padding:0 4px;min-height:20px;line-height:1}
.M .gs-sel{display:flex;flex-direction:column;gap:3px}
.M .gs-sel .gs-item{display:flex;gap:6px;align-items:center;border:1px solid var(--borda);border-radius:8px;padding:3px 6px;font-size:12.5px;background:var(--painel);min-width:0}
.M .gs-sel .gs-item b{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:550}
.M .gs-sel .gs-item select{max-width:110px}
.M .gs-pre{font-family:var(--mono);font-size:11.5px;background:var(--painel2);border:1px solid var(--borda);border-radius:8px;padding:8px;max-height:220px;overflow:auto;white-space:pre;max-width:100%}
.M .gs-ok{color:var(--verde);font-weight:600}.M .gs-erro{color:var(--verm);font-weight:600}.M .gs-ouro{color:var(--ouro);font-weight:600}
.M .gs-mapa{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr) minmax(0,1.2fr);gap:4px 10px;align-items:center;font-size:12.5px}
.M .gs-mapa>div{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.M .gs-mapa select{width:100%}
.M .gs-matriz td.c input{width:16px;height:16px}
.M .gs-matriz td.pers{background:color-mix(in srgb,var(--ouro) 12%,transparent)}
.M .gs-matriz tr:hover td{background:var(--painel2)}
.M .gs-ab{display:none}
.M .gs-matriz td:first-child{min-width:120px}
.M .gs-logo{display:flex;gap:16px;align-items:center;flex-wrap:wrap}
.M .gs-logo .gs-logo-img{min-width:160px;min-height:56px;max-width:100%;display:flex;align-items:center;justify-content:center;border:1px dashed var(--borda2);border-radius:10px;padding:8px;background:#fff}
.M .gs-logo .gs-logo-img img{max-height:64px;max-width:240px}
.M .gs-papel{background:#fff;color:#14171f;border-color:#d9dde5}
.M .gs-papel .peq{color:#4a5160}
.M .gs-difs{width:100%;border-collapse:collapse;font-size:12.5px}
.M .gs-difs td,.M .gs-difs th{border-bottom:1px solid var(--borda);padding:4px 6px;vertical-align:top;text-align:left;word-break:break-word}
.M .gs-difs .antes{color:var(--verm)}.M .gs-difs .depois{color:var(--verde)}
.M .gs-passo{font-size:13px}
.M .gs-graf{--gs-graf-texto:var(--texto2);--gs-graf-eixo:var(--borda2);--gs-graf-grade:var(--borda);--gs-graf-fundo:var(--painel);--gs-graf-1:var(--azul);--gs-graf-2:var(--verde);--gs-graf-3:var(--ouro);--gs-graf-4:var(--roxo);--gs-graf-5:var(--verm);min-width:0}
.M .gs-graf svg{display:block;max-width:100%;height:auto}
.M .gs-calc{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,110px) auto;gap:4px;align-items:center;border:1px solid var(--borda);border-radius:8px;padding:5px 6px;margin-bottom:6px}
.M .gs-calc input,.M .gs-calc select{width:100%;min-width:0}
.M .gs-calc .gs-formula{grid-column:1/-1;font-family:var(--mono);font-size:12px}
.M .gs-calc .gs-erro{grid-column:1/-1;font-size:12px;font-weight:500}
.M .gs-cruz{width:100%;border-collapse:collapse;font-size:12.5px}
.M .gs-cruz th,.M .gs-cruz td{border-bottom:1px solid var(--borda);padding:4px 6px;white-space:nowrap}
.M .gs-cruz th{font-size:11.5px;color:var(--texto3);background:var(--painel2);position:sticky;top:0;text-align:right}
.M .gs-cruz th:first-child,.M .gs-cruz td:first-child{text-align:left;position:sticky;left:0;background:var(--painel);max-width:220px;overflow:hidden;text-overflow:ellipsis}
.M .gs-cruz td{text-align:right;font-variant-numeric:tabular-nums}
.M .gs-cruz tr.tot td,.M .gs-cruz td.tot{font-weight:650}
.M .gs-cruz tr.tot td{border-top:2px solid var(--borda2)}
.M .gs-cruz td.calor{background:color-mix(in srgb,var(--azul) var(--k,0%),transparent)}
@media (max-width:760px){
  .M .gs-lado,.M .gs-dupla{grid-template-columns:minmax(0,1fr)}
  .M .gs-filtro{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
  .M .gs-mapa{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
  .M .gs-mapa .gs-amostra{display:none}
  .M .gs-barra>*{flex:1 1 140px}
  .M .gs-cab h1{font-size:18px}
  .M .gs-matriz{font-size:11.5px}
  .M .gs-lg{display:none}.M .gs-ab{display:inline}
  .M .gs-matriz th,.M .gs-matriz td{padding:3px 2px}
  .M .gs-matriz td:first-child{min-width:0;max-width:110px;white-space:normal}
}`;export function preparar(o,a="relatorios"){if(typeof document<"u"&&!document.getElementById(`mod-${a}-css`)){const e=document.createElement("style");e.id=`mod-${a}-css`,e.textContent=_.replaceAll(".M ",`.mod-${a} `).replaceAll(".M{",`.mod-${a}{`),document.head.append(e)}return o.classList.add(`mod-${a}`),o}export const semEmpresa=o=>{o.innerHTML=`<div class="cartao"><div class="vazio">${c("predio")}<h3>Escolha a empresa</h3><p>Use F8 para escolher a empresa ativa.</p></div></div>`},cab=(o,a="",e="")=>`<div class="gs-cab"><div><h1>${p(o)}</h1>${a?`<p>${a}</p>`:""}</div><div class="gs-acoes">${e}</div></div>`,kpi=(o,a,e="",s="")=>`<div class="gs-kpi ${s}"><small>${p(o)}</small><b>${a}</b>${e?`<span>${e}</span>`:""}</div>`,aviso=(o,a="",e="info")=>`<div class="gs-aviso ${a}">${c(e)}<div>${o}</div></div>`,selo=(o,a="")=>`<span class="selo ${a}">${p(o)}</span>`,avisar=o=>x(String(o?.message||o).replace(/^Error:\s*/,""),"erro"),toast=o=>x(o),auditar=(o,a,e)=>o.auditar?.(a,e)?.catch?.(()=>{}),hoje=()=>l(),ehDemo=o=>o.api?.modo==="demo",pode=(o,a="ver",e)=>o.pode?o.pode(a,e):!0,doc=o=>o?f("cpfcnpj",o):"",rotuloData=o=>!o||!o.de&&!o.ate?"Todo o período":o.de&&o.ate?`${d(o.de)} a ${d(o.ate)}`:o.ate?`até ${d(o.ate)}`:`desde ${d(o.de)}`,pctTxt=(o,a=1)=>o==null?"—":`${(Number(o)||0).toLocaleString("pt-BR",{minimumFractionDigits:a,maximumFractionDigits:a})}%`;export{p as esc,c as ic,u as brl,v as num,d as dataBR,b as compBR,f as mascarar,h as confirmar,M as baixar,l as hojeIso};const r=(o,a,e={})=>o.api.listar(a,{...e,eq:{empresa_id:o.empresa.id,...e.eq||{}}}),k={pessoas:o=>r(o,"erp_pessoas",{ordem:"nome",limite:2e4}),produtos:o=>r(o,"erp_produtos",{ordem:"nome",limite:2e4}),categorias:o=>r(o,"erp_categorias",{ordem:"codigo"}),contas:o=>r(o,"erp_contas_bancarias",{ordem:"nome"}),formas:o=>r(o,"erp_formas_pagamento",{ordem:"nome"}),depositos:o=>r(o,"erp_depositos",{ordem:"nome"}),vendas:o=>r(o,"erp_vendas",{ordem:"data",limite:5e4}),os:o=>r(o,"erp_os",{ordem:"numero",limite:2e4}),titulos:o=>r(o,"erp_titulos",{ordem:"vencimento",limite:5e4}),movs:o=>r(o,"erp_mov_bancarios",{ordem:"data",limite:1e5}),estoque:o=>r(o,"erp_estoque_mov",{ordem:"data",limite:1e5}),compras:o=>r(o,"erp_compras",{ordem:"emissao",limite:2e4}),profissionais:o=>r(o,"erp_profissionais",{ordem:"nome"}),camposExtras:o=>r(o,"erp_campos_extras",{ordem:"ordem"}),camposValores:o=>r(o,"erp_campos_valores",{limite:5e4}),salvos:o=>r(o,"erp_relatorios_salvos",{ordem:"nome"}),importacoes:o=>r(o,"erp_importacoes",{ordem:"created_at desc",limite:500}),permissoes:o=>r(o,"erp_permissoes"),excecoes:o=>r(o,"erp_permissoes_usuario"),seguranca:o=>r(o,"erp_seguranca"),aprovacoes:o=>r(o,"erp_aprovacoes",{ordem:"solicitado_em desc",limite:2e3}),sessoes:o=>r(o,"erp_sessoes",{ordem:"ultimo_sinal desc",limite:2e3}),complementos:o=>r(o,"ctb_empresa_complementos"),notasConfig:o=>r(o,"erp_notas_config"),usuarios:o=>r(o,"ctb_empresa_usuarios"),centros:o=>r(o,"ctb_centros_custo",{ordem:"codigo"}),tabelasPreco:o=>r(o,"erp_tabelas_preco",{ordem:"nome"})};export async function carregar(o,a){const e=await Promise.all(a.map(t=>k[t](o).catch(()=>[]))),s=Object.fromEntries(a.map((t,i)=>[t,e[i]||[]]));return s.hoje=l(),s}export const porId=o=>new Map((o||[]).map(a=>[a.id,a]));export function extrasPorCadastro(o=[],{soRelatorio:a=!1}={}){var s;const e={};for(const t of o)t.ativo===!1||a&&t.mostrar_relatorio===!1||(e[s=t.cadastro]||(e[s]=[])).push(t);for(const t of Object.keys(e))e[t].sort((i,n)=>(i.ordem??0)-(n.ordem??0)||String(i.rotulo).localeCompare(String(n.rotulo),"pt-BR"));return e}const $={vendas:["vendas","pessoas","formas","produtos"],itens:["vendas","pessoas","produtos"],titulos:["titulos","pessoas","categorias","contas","formas"],movimentos:["movs","contas","categorias","pessoas"],estoque:["estoque","produtos"],mov_estoque:["estoque","produtos","depositos"],compras:["compras","pessoas"],os:["os","pessoas","profissionais"],clientes:["pessoas","vendas","titulos"],produtos:["produtos","estoque","vendas"]};export async function dadosDaFonte(o,a,e,s=null){const t=[...new Set([...$[a]||[],"camposExtras","camposValores"])],i=s&&t.every(m=>m in s)?s:{...s||{},...await carregar(o,t.filter(m=>!s||!(m in s)))},n=w(e,l()),g=extrasPorCadastro(i.camposExtras,{soRelatorio:!0});return{linhas:y(a,i,{hoje:l(),periodo:n,extras:g}),campos:z(a,g),periodo:n,extras:g,dados:i}}export const naoConfigurado=(o,a=[])=>aviso(`<b>${p(o)}: não configurado.</b> Para ligar:<ol>${a.map(e=>`<li>${p(e)}</li>`).join("")}</ol>`,"azul","cadeado");export function baixarBytes(o,a,e="application/octet-stream"){if(typeof document>"u"||typeof URL?.createObjectURL!="function")return;const s=URL.createObjectURL(new Blob([a],{type:e})),t=document.createElement("a");t.href=s,t.download=o,document.body.append(t),t.click(),t.remove(),setTimeout(()=>URL.revokeObjectURL(s),2e3)}export function paraCsv(o){const a=e=>{if(e==null)return"";if(typeof e=="number")return String(e).replace(".",",");let s=String(e);return/^[=+\-@\t\r]/.test(s)&&(s=`'${s}`),/[";\n\r]/.test(s)?`"${s.replace(/"/g,'""')}"`:s};return`\uFEFF${o.map(e=>e.map(a).join(";")).join(`\r
`)}`}
