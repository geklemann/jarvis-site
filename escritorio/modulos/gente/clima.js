/*! © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md. */
import{esc as i,ic as d}from"../../comum/nucleo.js";import*as p from"../../motor/gente/clima.js";import*as l from"../../motor/gente/indicadores.js";import{preparar as s}from"./dia_a_dia.js";export{p as C,l as I};export{restrito}from"./desempenho.js";export const corFav=e=>e==null?"cinza":e>=70?"":e>=50?"ouro":"verm",COR_ZONA=Object.freeze({crítica:"verm",aperfeiçoamento:"ouro",qualidade:"azul",excelência:""});export function barraEscala(e){const o=e.n||0,t=["#dc2626","#f59e0b","#94a3b8","#14b8a6","#0f766e"];return`<span class="gc-escala" title="${i(e.distribuicao.map((a,n)=>`${n+1}: ${a}`).join(" · "))}">${e.distribuicao.map((a,n)=>a?`<i style="width:${a/o*100}%;background:${t[n]}"></i>`:"").join("")}</span>`}export function medidorEnps(e){const o=e==null?50:(Number(e)+100)/2,t=p.zonaEnps(e);return`<div class="gc-enps"><div class="gc-enps-trilho"><i style="left:${o}%"></i></div><div class="gc-enps-zonas"><span>−100</span><span>0</span><span>50</span><span>75</span><span>100</span></div><b>${e==null?"—":e>0?`+${e}`:e}</b><small class="gp-selo ${COR_ZONA[t]??"cinza"}">${i(t?`zona de ${t}`:"sem dado")}</small></div>`}export function barrasSerie(e=[],{max:o=null,altura:t=120,sufixo:a=""}={}){const n=o??Math.max(1,...e.map(r=>Number(r.valor)||0));return`<div class="gc-serie" style="--n:${e.length};--h:${t}px">${e.map(r=>`<div title="${i(r.titulo||"")}"><b>${r.valor===null||r.valor===void 0?"—":i(r.texto??`${r.valor}${a}`)}</b><span class="gc-col">${(r.partes||[{valor:r.valor,cor:r.cor}]).map(g=>`<i style="height:${Math.max(0,(Number(g.valor)||0)/n*100)}%;background:${g.cor||"var(--gp-a)"}"></i>`).join("")}</span><small>${i(r.rotulo)}</small></div>`).join("")}</div>`}export const PERGUNTA_ENPS=Object.freeze({texto:"De 0 a 10, quanto você recomendaria a empresa como um bom lugar para trabalhar?",tipo:"nps",tema:null}),MODELO_CLIMA=Object.freeze([["Liderança","O meu gestor me dá retorno sobre o meu trabalho."],["Liderança","Confio no meu gestor."],["Reconhecimento","Sou reconhecido quando faço um bom trabalho."],["Carreira","Vejo como crescer aqui."],["Ambiente","Tenho as ferramentas para fazer o meu trabalho."],["Comunicação","Sei o que está acontecendo na empresa."],["Bem-estar","Consigo equilibrar o trabalho e a vida pessoal."]]);export function perguntasDoTexto(e,{enps:o=!1}={}){const t=String(e||"").split(/\r?\n/).map(a=>a.trim()).filter(Boolean).map(a=>{const n=a.match(/^([^:]{2,40}):\s*(.+)$/);return n?{texto:n[2].trim(),tipo:"escala",tema:n[1].trim()}:{texto:a,tipo:"escala",tema:null}});return[...o?[{...PERGUNTA_ENPS}]:[],...t].map((a,n)=>({id:`q${n+1}`,...a}))}export const textoDasPerguntas=(e=[])=>e.filter(o=>o.tipo==="escala").map(o=>o.tema?`${o.tema}: ${o.texto}`:o.texto).join(`
`),rotuloGrupo=(e,o)=>e==="casa"?p.FAIXAS_CASA[o.chave]||o.chave:o.rotulo||o.chave,periodo=e=>`${String(e.abre_em||"").split("-").reverse().join("/")} a ${String(e.fecha_em||"").split("-").reverse().join("/")}`;export function cartaoGrupo(e,o,t){const a=p.resumoDistribuicao(o,t.distribuicao||{},t.n);return`<article class="gc-grupo"><header><b>${i(e)}</b><span class="gp-selo cinza">${t.n} respostas</span>${a.favoravel===null?"":`<span class="gp-selo ${corFav(a.favoravel)}">${a.favoravel}% favorável</span>`}</header>
    ${a.porTema.map(n=>`<div class="gc-tema"><span>${i(n.tema)}</span><b>${n.favoravel}%</b><i style="--v:${n.favoravel}%"></i></div>`).join("")}
    ${a.enps===null?"":`<div class="gc-tema"><span>eNPS</span><b>${a.enps>0?`+${a.enps}`:a.enps}</b></div>`}
    ${(t.comentarios||[]).length?`<details><summary class="gp-mini" style="padding:0;cursor:pointer">${(t.comentarios||[]).length} ${(t.comentarios||[]).length===1?"comentário":"comentários"}</summary><div class="gc-com" style="margin-top:8px">${t.comentarios.map(n=>`<p>${i(n)}</p>`).join("")}</div></details>`:""}</article>`}export const bloqueio=(e,o)=>`<div class="gc-bloqueio" role="note">${d("cadeado")}<span class="gp-tx"><b>${i(e)}</b><span>${o}</span></span></div>`;export function preparar(e){if(s(e),typeof document<"u"&&document.head&&!document.getElementById("mod-gente-clima-css")){const o=document.createElement("style");o.id="mod-gente-clima-css",o.textContent=c,document.head.append(o)}return e}const c=`
.mod-gente .gc-perg{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(140px,1fr) 70px;gap:14px;align-items:center;padding:11px 0;border-top:1px solid var(--linha);font-size:13.5px}
.mod-gente .gc-perg:first-child{border-top:0}
.mod-gente .gc-perg small{display:block;color:var(--texto3);font-size:11.5px;margin-top:2px}
.mod-gente .gc-perg>b{text-align:right;font-variant-numeric:tabular-nums}
.mod-gente .gc-escala{display:flex;height:12px;border-radius:99px;overflow:hidden;background:var(--painel2)}
.mod-gente .gc-escala i{height:100%}
.mod-gente .gc-legenda{display:flex;gap:12px;flex-wrap:wrap;font-size:11.5px;color:var(--texto3);margin-top:10px}
.mod-gente .gc-legenda span{display:inline-flex;align-items:center;gap:5px}.mod-gente .gc-legenda i{width:10px;height:10px;border-radius:3px}
.mod-gente .gc-enps{display:grid;grid-template-columns:1fr auto;gap:6px 14px;align-items:center}
.mod-gente .gc-enps-trilho{grid-column:1;position:relative;height:14px;border-radius:99px;background:linear-gradient(90deg,#dc2626 0%,#dc2626 50%,#f59e0b 50%,#f59e0b 75%,#0891b2 75%,#0891b2 87.5%,#0f766e 87.5%)}
.mod-gente .gc-enps-trilho i{position:absolute;top:-5px;width:4px;height:24px;margin-left:-2px;border-radius:3px;background:var(--texto);box-shadow:0 0 0 3px var(--painel)}
.mod-gente .gc-enps-zonas{grid-column:1;display:flex;justify-content:space-between;font-size:11px;color:var(--texto3);position:relative}
.mod-gente .gc-enps-zonas span:nth-child(2){position:absolute;left:50%;transform:translateX(-50%)}.mod-gente .gc-enps-zonas span:nth-child(3){position:absolute;left:75%;transform:translateX(-50%)}.mod-gente .gc-enps-zonas span:nth-child(4){position:absolute;left:87.5%;transform:translateX(-50%)}
.mod-gente .gc-enps>b{grid-column:2;grid-row:1/3;font-size:34px;font-weight:700;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.mod-gente .gc-enps>small{grid-column:1/-1;justify-self:start}
.mod-gente .gc-serie{display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr));gap:8px;align-items:end;padding-top:6px}
.mod-gente .gc-serie>div{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0}
.mod-gente .gc-serie b{font-size:11.5px;font-variant-numeric:tabular-nums}
.mod-gente .gc-col{display:flex;flex-direction:column-reverse;width:70%;max-width:38px;height:var(--h);border-radius:8px 8px 3px 3px;background:var(--painel2);overflow:hidden}
.mod-gente .gc-col i{display:block;width:100%;transform-origin:bottom;animation:gd-sobe .8s cubic-bezier(.2,.7,.2,1) both}
.mod-gente .gc-serie small{font-size:11px;color:var(--texto3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.mod-gente .gc-bloqueio{display:flex;gap:14px;align-items:center;padding:16px 18px;border-radius:var(--gp-raio);border:1px dashed color-mix(in srgb,var(--texto3) 45%,transparent);background:repeating-linear-gradient(135deg,var(--painel),var(--painel) 10px,color-mix(in srgb,var(--painel2) 70%,var(--painel)) 10px,color-mix(in srgb,var(--painel2) 70%,var(--painel)) 20px)}
.mod-gente .gc-bloqueio .ic{flex:none;width:28px;height:28px;color:var(--texto3)}
.mod-gente .gc-bloqueio .gp-tx{display:flex;flex-direction:column;gap:3px;font-size:13px;line-height:1.45}
.mod-gente .gc-grupos{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}
.mod-gente .gc-grupo{display:flex;flex-direction:column;gap:8px;padding:14px 16px;border-radius:14px;border:1px solid var(--borda);background:var(--painel)}
.mod-gente .gc-grupo header{display:flex;align-items:center;gap:8px}
.mod-gente .gc-grupo header b{flex:1;font-size:14px;font-weight:650}
.mod-gente .gc-grupo .gc-tema{display:grid;grid-template-columns:minmax(0,1fr) 48px;gap:8px;font-size:12.5px;align-items:center}
.mod-gente .gc-grupo .gc-tema i{grid-column:1/-1;display:block;height:6px;border-radius:99px;background:var(--painel2);overflow:hidden}
.mod-gente .gc-grupo .gc-tema i::before{content:"";display:block;height:100%;width:var(--v);background:var(--gp-a);border-radius:inherit}
.mod-gente .gc-grupo .gc-tema b{text-align:right;font-variant-numeric:tabular-nums}
.mod-gente .gc-com{display:flex;flex-direction:column;gap:8px}
.mod-gente .gc-com p{margin:0;padding:10px 12px;border-radius:12px;background:var(--painel2);font-size:13px;line-height:1.5}
.mod-gente .gc-form{display:flex;flex-direction:column;gap:12px;max-width:820px}
.mod-gente .gc-nps{display:grid;grid-template-columns:repeat(11,minmax(0,1fr));gap:5px}
.mod-gente .gc-nps label{position:relative;display:grid;place-items:center;height:44px;border-radius:11px;border:1px solid var(--borda);background:var(--painel2);font-weight:700;cursor:pointer;transition:background-color .15s,border-color .15s,color .15s}
.mod-gente .gc-nps input{position:absolute;opacity:0;pointer-events:none}
.mod-gente .gc-nps label:has(input:checked){background:var(--gp-a);border-color:var(--gp-a);color:#fff}
.mod-gente .gc-nps label:has(input:focus-visible){outline:2px solid var(--gp-a);outline-offset:2px}
.mod-gente .gc-nps-pontas{display:flex;justify-content:space-between;font-size:11.5px;color:var(--texto3);margin-top:4px}
.mod-gente .gc-risco{display:flex;flex-direction:column}
.mod-gente .gc-pessoa{border-top:1px solid var(--linha)}
.mod-gente .gc-pessoa:first-child{border-top:0}
.mod-gente .gc-pessoa>summary{list-style:none;display:grid;grid-template-columns:minmax(0,1.6fr) minmax(140px,1fr) 90px 24px;gap:14px;align-items:center;padding:12px 16px;cursor:pointer}
.mod-gente .gc-pessoa>summary::-webkit-details-marker{display:none}
.mod-gente .gc-pessoa>summary:hover{background:var(--gp-af)}
.mod-gente .gc-pessoa[open]>summary .ic.gp-seta{transform:rotate(90deg)}
.mod-gente .gc-so-celular{display:none}
.mod-gente .gc-fatores{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px;padding:4px 16px 16px}
.mod-gente .gc-fator{display:flex;flex-direction:column;gap:4px;padding:10px 12px;border-radius:12px;border:1px solid var(--borda);background:var(--painel)}
.mod-gente .gc-fator.pesa{border-color:color-mix(in srgb,var(--ouro) 45%,var(--borda));background:color-mix(in srgb,var(--ouro-bg) 60%,var(--painel))}
.mod-gente .gc-fator.cheio{border-color:color-mix(in srgb,var(--verm) 45%,var(--borda));background:color-mix(in srgb,var(--verm-bg) 60%,var(--painel))}
.mod-gente .gc-fator header{display:flex;justify-content:space-between;gap:8px;font-size:13px;font-weight:650}
.mod-gente .gc-fator header span{font-variant-numeric:tabular-nums;color:var(--texto2)}
.mod-gente .gc-fator small{font-size:12px;color:var(--texto3);line-height:1.4}
.mod-gente .gp-barra.ouro i::before{background:linear-gradient(90deg,#d97706,#f59e0b)}.mod-gente .gp-barra.verm i::before{background:linear-gradient(90deg,#b91c1c,#ef4444)}
.mod-gente .gc-pesq{flex-wrap:wrap}.mod-gente .gc-pesq .gp-tx b{white-space:normal}
.mod-gente .gc-pesq .gp-ic{flex:none;display:grid;place-items:center;width:36px;height:36px;border-radius:11px;background:var(--gp-af);color:var(--gp-a)}
.mod-gente .gc-pesq .gp-ic .ic{width:18px;height:18px}
.mod-gente .gc-acoes{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.mod-gente .gc-acoes .gp-selo .ic{width:13px;height:13px;vertical-align:-2px}
.mod-gente .gc-anon{display:flex;gap:14px;align-items:flex-start;margin-top:4px}
.mod-gente .gc-anon>.ic{flex:none;width:22px;height:22px;color:var(--gp-a);margin-top:2px}
.mod-gente .gc-anon .gp-tx{display:flex;flex-direction:column;gap:4px;font-size:13px;line-height:1.55;color:var(--texto2)}
.mod-gente .gc-anon .gp-tx b{color:var(--texto);font-size:13.5px}
.mod-gente .gc-q{border:0;margin:0;padding:14px 0;border-top:1px solid var(--linha);display:flex;flex-direction:column;gap:10px;min-width:0}
.mod-gente .gc-q:first-child{border-top:0;padding-top:0}
.mod-gente .gc-q legend{float:left;width:100%;display:flex;gap:10px;align-items:flex-start;padding:0;margin-bottom:2px;font-size:14.5px;font-weight:600;line-height:1.4}
.mod-gente .gc-q legend+*{clear:both}
.mod-gente .gc-q legend small{display:block;font-size:11.5px;font-weight:500;color:var(--texto3);margin-top:2px}
.mod-gente .gc-q-n{flex:none;display:grid;place-items:center;width:24px;height:24px;border-radius:8px;background:var(--painel2);font-size:12px;font-weight:700;color:var(--texto2);transition:background-color .2s,color .2s}
.mod-gente .gc-q.feito .gc-q-n{background:var(--gp-a);color:#fff}
.mod-gente .gc-q-tit{font-size:14.5px;font-weight:600}.mod-gente .gc-q-tit small{font-weight:500;color:var(--texto3)}
.mod-gente .gc-nps.gc-cinco{grid-template-columns:repeat(5,minmax(0,1fr))}
.mod-gente .gc-enviar{display:flex;gap:14px;align-items:center;flex-wrap:wrap;padding-top:6px}
.mod-gente .gc-sec{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:650;margin:0 0 10px}
.mod-gente .gc-sec .ic{width:16px;height:16px;color:var(--gp-a)}
.mod-gente .gc-tabela{width:100%;border-collapse:collapse;font-size:13px}
.mod-gente .gc-tabela th{font-size:11.5px;font-weight:650;color:var(--texto3);text-transform:uppercase;letter-spacing:.05em;text-align:left;padding:8px 10px;border-bottom:1px solid var(--linha)}
.mod-gente .gc-tabela td{padding:10px;border-bottom:1px solid var(--linha);font-variant-numeric:tabular-nums}
.mod-gente .gc-tabela tr:last-child td{border-bottom:0}
.mod-gente .gc-tabela :is(th,td).n{text-align:right}
.mod-gente .gc-rolar{overflow-x:auto;margin:0 -4px}
.mod-gente .gc-medidor-risco{display:flex;align-items:center;gap:8px;font-size:12.5px;font-variant-numeric:tabular-nums}
.mod-gente .gc-medidor-risco i{flex:1;display:block;height:8px;border-radius:99px;background:var(--painel2);overflow:hidden}
.mod-gente .gc-medidor-risco i::before{content:"";display:block;height:100%;width:var(--v);border-radius:inherit;background:var(--cor,var(--gp-a))}
.mod-gente .gc-pnd{display:flex;height:30px;border-radius:10px;overflow:hidden;gap:2px}
.mod-gente .gc-pnd span{display:grid;place-items:center;min-width:34px;color:#fff;font-size:12px;font-weight:700;font-variant-numeric:tabular-nums}
.mod-gente .gc-pnd span[style*="flex:0;"]{display:none}
.mod-gente .gc-zona{display:grid;grid-template-columns:12px minmax(0,1fr) auto;gap:10px;align-items:center;padding:7px 10px;border-radius:10px;font-size:13px}
.mod-gente .gc-zona i{width:12px;height:12px;border-radius:4px}
.mod-gente .gc-zona b{font-weight:600}.mod-gente .gc-zona span{color:var(--texto3);font-variant-numeric:tabular-nums}
.mod-gente .gc-zona.atual{background:var(--gp-af);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--gp-a) 40%,transparent)}
.mod-gente .gc-evol{display:grid;grid-template-columns:repeat(var(--n),minmax(0,180px));justify-content:space-around;gap:12px;align-items:end}
.mod-gente .gc-evol>div{display:flex;flex-direction:column;align-items:center;gap:5px;min-width:0;text-align:center}
.mod-gente .gc-evol b{font-size:15px;font-variant-numeric:tabular-nums}
.mod-gente .gc-evol-col{position:relative;width:44px;height:150px;border-radius:10px;background:var(--painel2)}
.mod-gente .gc-evol-col::after{content:"";position:absolute;left:-6px;right:-6px;top:50%;height:1px;background:var(--texto3);opacity:.5}
.mod-gente .gc-evol-col i{position:absolute;left:0;right:0;border-radius:6px;animation:gd-sobe .8s cubic-bezier(.2,.7,.2,1) both}
.mod-gente .gc-evol small{font-size:11.5px;color:var(--texto3);max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@media (max-width:760px){
  .mod-gente .gc-pesq .gc-acoes{width:100%;padding-left:48px}
  .mod-gente .gc-q-n{display:none}.mod-gente .gc-so-celular{display:inline}
  .mod-gente .gc-perg{grid-template-columns:minmax(0,1fr) 56px}.mod-gente .gc-perg>.gc-escala{grid-column:1/-1;grid-row:2}
  .mod-gente .gc-nps{grid-template-columns:repeat(6,minmax(0,1fr))}
  .mod-gente .gc-pessoa>summary{grid-template-columns:minmax(0,1fr) 70px 20px}.mod-gente .gc-pessoa>summary>.gp-cel{display:none}
  .mod-gente .gc-grupos{grid-template-columns:minmax(0,1fr)}
}
`;
