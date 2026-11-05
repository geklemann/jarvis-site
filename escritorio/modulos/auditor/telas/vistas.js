/*! © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md. */
import{esc as r,brl as m}from"../../../comum/nucleo.js";import{ehSimples as u}from"../base.js";const c=`
.mod-auditor .au-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.mod-auditor .au-grade{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:10px;align-items:stretch;margin-bottom:10px}
.mod-auditor .au-grade>.au-cartao{margin-bottom:0}
.mod-auditor .c12{grid-column:span 12}.mod-auditor .c7{grid-column:span 7}.mod-auditor .c6{grid-column:span 6}.mod-auditor .c5{grid-column:span 5}.mod-auditor .c4{grid-column:span 4}
.mod-auditor .au-cartao-cab{display:flex;justify-content:space-between;gap:8px;align-items:flex-start;margin-bottom:8px}
.mod-auditor .au-cartao-cab h3{margin:0}.mod-auditor .au-cartao-cab p{margin:2px 0 0;font-size:12px;color:var(--texto3)}
.mod-auditor .au-saude{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
.mod-auditor .au-saude>div{flex:1;min-width:180px}
.mod-auditor .au-saude p{margin:0 0 8px;font-size:13px}
.mod-auditor .au-anel{flex:0 0 auto;width:96px;height:96px}
.mod-auditor .au-anel circle{fill:none;stroke-width:9}
.mod-auditor .au-anel .fundo-anel{stroke:var(--painel2)}
.mod-auditor .au-anel text{fill:var(--texto);font-size:19px;font-weight:700;font-variant-numeric:tabular-nums}
.mod-auditor .au-anel text.peq{font-size:9.5px;font-weight:400;fill:var(--texto3)}
.mod-auditor .au-pilhah{display:flex;gap:2px;height:10px;border-radius:5px;overflow:hidden;background:var(--painel2)}
.mod-auditor .au-pilhah i,.mod-auditor .au-pilha i{display:block;min-width:0}
.mod-auditor .au-s-ok{background:var(--verde)}.mod-auditor .au-s-alerta{background:var(--ouro)}.mod-auditor .au-s-erro{background:var(--verm)}.mod-auditor .au-s-serie{background:var(--azul)}
.mod-auditor .au-legenda{display:flex;gap:4px 12px;flex-wrap:wrap;font-size:12px;color:var(--texto2);margin-top:6px}
.mod-auditor .au-legenda span{display:inline-flex;gap:5px;align-items:center}
.mod-auditor .au-legenda i{display:inline-block;width:10px;height:10px;border-radius:2px}
.mod-auditor .au-graf{margin:0;min-width:0}
.mod-auditor .au-colunas{position:relative;display:flex;align-items:flex-end;gap:3px;height:170px;padding:16px 0 0;border-bottom:1px solid var(--borda2)}
.mod-auditor .au-colunas .au-max{position:absolute;top:0;left:0;font-size:11px;color:var(--texto3)}
.mod-auditor .au-colunas .au-guia{position:absolute;left:0;right:0;top:16px;border-top:1px dashed var(--linha)}
.mod-auditor .au-col{flex:1 1 0;min-width:0;height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;position:relative}
.mod-auditor .au-pilha{width:100%;max-width:34px;display:flex;flex-direction:column-reverse;gap:2px;border-radius:4px 4px 0 0;overflow:hidden}
.mod-auditor .au-col:hover .au-pilha,.mod-auditor .au-col:focus .au-pilha{outline:2px solid var(--azul);outline-offset:1px}
.mod-auditor .au-col:focus{outline:none}
.mod-auditor .au-eixo{display:flex;gap:3px;margin-top:4px}
.mod-auditor .au-eixo span{flex:1 1 0;min-width:0;text-align:center;font-size:10.5px;color:var(--texto3);white-space:nowrap;overflow:visible}
.mod-auditor .au-barras{display:grid;gap:8px;margin:0;padding:0;list-style:none}
.mod-auditor .au-barras li{min-width:0;font-size:12.5px}
.mod-auditor .au-barras .rot{display:flex;justify-content:space-between;gap:8px}
.mod-auditor .au-barras .rot span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mod-auditor .au-barras .rot b{white-space:nowrap;font-variant-numeric:tabular-nums}
.mod-auditor .au-barras .trilho{display:flex;gap:2px;height:8px;margin-top:3px}
.mod-auditor .au-barras .trilho i{display:block;border-radius:0 4px 4px 0;min-width:0}
.mod-auditor .au-medidor{height:6px;border-radius:3px;background:var(--painel2);overflow:hidden;min-width:40px}
.mod-auditor .au-medidor i{display:block;height:100%;border-radius:3px}
.mod-auditor .au-linhas{list-style:none;margin:0;padding:0;display:grid;gap:2px}
.mod-auditor .au-linhas a{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 10px;align-items:center;padding:6px 8px;border-radius:var(--raio);color:inherit;text-decoration:none;font-size:13px}
.mod-auditor .au-linhas a:hover,.mod-auditor .au-linhas a:focus-visible{background:var(--painel2)}
.mod-auditor .au-linhas .t{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mod-auditor .au-linhas small{display:block;color:var(--texto3);font-size:11.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mod-auditor .au-linhas .n{font-variant-numeric:tabular-nums;white-space:nowrap;text-align:right}
.mod-auditor .au-linhas .au-medidor{grid-column:1/-1}
.mod-auditor .au-num{font-variant-numeric:tabular-nums;white-space:nowrap}
.mod-auditor .au-conf{display:flex;gap:6px;align-items:center;min-width:0}.mod-auditor .au-conf .au-medidor{flex:1;max-width:90px}
.mod-auditor .au-chips{display:inline-flex;gap:4px;flex-wrap:wrap}
.mod-auditor .au-pend{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px;align-items:center}
.mod-auditor .au-pend h3{margin:0;font-size:14px}.mod-auditor .au-pend p{margin:2px 0 0;font-size:12.5px;color:var(--texto2)}
.mod-auditor .au-mini{display:flex;align-items:flex-end;gap:4px;height:90px;border-bottom:1px solid var(--borda2);padding-top:14px}
.mod-auditor .au-mini div{flex:1 1 0;min-width:0;max-width:44px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;font-size:10.5px;color:var(--texto3)}
.mod-auditor .au-mini i{display:block;width:100%;border-radius:4px 4px 0 0;min-height:2px}
.mod-auditor .au-mini-eixo{display:flex;gap:4px;margin-top:3px}.mod-auditor .au-mini-eixo span{flex:1 1 0;min-width:0;max-width:44px;text-align:center;font-size:10.5px;color:var(--texto3);white-space:nowrap}
.mod-auditor .au-item-desc{color:var(--texto2);font-size:12px;overflow-wrap:anywhere}
.mod-auditor .au-ficha2{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px 14px;font-size:13px;margin:0}
.mod-auditor .au-ficha2 dt{color:var(--texto3);font-size:11.5px}.mod-auditor .au-ficha2 dd{margin:0;overflow-wrap:anywhere}
.mod-auditor .au-boas{text-align:center;padding:22px 12px}
.mod-auditor .au-boas p{max-width:620px;margin:6px auto 14px;color:var(--texto2);font-size:13px}
.mod-auditor .au-boas .au-acoes{justify-content:center}
@media (max-width:1100px){.mod-auditor .c7,.mod-auditor .c5,.mod-auditor .c6{grid-column:span 12}.mod-auditor .c4{grid-column:span 6}}
@media (max-width:760px){
  .mod-auditor .au-grade{grid-template-columns:minmax(0,1fr)}
  .mod-auditor .au-grade>*{grid-column:1/-1 !important}
  .mod-auditor .au-colunas{height:140px}
  .mod-auditor .au-pend{grid-template-columns:minmax(0,1fr)}
}`;export function prepararVistas(){if(typeof document>"u"||document.getElementById("mod-auditor-vistas-css"))return;const a=document.createElement("style");a.id="mod-auditor-vistas-css",a.textContent=c,document.head.append(a)}export const SUBTELAS_SIMPLES=Object.freeze(["painel","fornecedores","pendencias","calendario","versoes","novidades"]);const x={painel:"painel-empresa",fornecedores:"fornecedores",pendencias:"pendencias",notas:"notas",calendario:"calendario",versoes:"versoes",novidades:"novidades"};export function rotaAud(a,o,i=[],e={}){if(u(a)){const d=o==="notas"||!SUBTELAS_SIMPLES.includes(o)?[]:[o];return a.rota({modulo:"fiscal",item:"conferencia",params:[...d,...i],query:e})}return a.rota({modulo:"auditor",item:x[o]||o,params:i,query:e})}export function rotaCaptura(a,o={}){const i=o.chave?{chave:String(o.chave)}:{};return u(a)?a.rota({modulo:"compras",item:"notas-sefaz",query:i}):a.rota({modulo:"captura",item:o.tipo==="cte"?"cte":o.tipo==="nfse"?"nfse-adn":"destinadas",query:i})}const p=a=>Number(a||0).toLocaleString("pt-BR");export const SITUACOES_GRAF=Object.freeze([["ok","Sem pendência"],["alerta","Com alerta"],["erro","Com erro"]]);const l=a=>`<div class="au-legenda">${a.map(([o,i])=>`<span><i class="au-s-${o}" aria-hidden="true"></i>${r(i)}</span>`).join("")}</div>`;export const corPct=a=>a>=85?"verde":a>=60?"ouro":"verm";export function rotuloPeriodo(a,o){return o?`${["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"][Number(a.slice(5,7))-1]}/${a.slice(2,4)}`:`${a.slice(8,10)}/${a.slice(5,7)}`}export function graficoTempo({porMes:a=!1,serie:o=[]}={}){if(!o.length)return'<p class="mut peq">Nenhuma nota conferida no período.</p>';const i=Math.max(1,...o.map(t=>t.ok+t.alerta+t.erro)),e=Math.max(1,Math.ceil(o.length/12)),d=t=>`${rotuloPeriodo(t.periodo,a)}: ${t.ok} sem pendência, ${t.alerta} com alerta, ${t.erro} com erro`;return`<figure class="au-graf" aria-label="Notas por ${a?"mês":"dia"} de emissão">
    <div class="au-colunas" aria-hidden="true"><span class="au-max">${p(i)} nota${i===1?"":"s"}</span><span class="au-guia"></span>
      ${o.map(t=>{const n=t.ok+t.alerta+t.erro;return`<div class="au-col" title="${r(d(t))}" data-periodo="${r(t.periodo)}"><div class="au-pilha" style="height:${100*n/i}%">${SITUACOES_GRAF.map(([s])=>t[s]?`<i class="au-s-${s}" style="flex:${t[s]} 1 0"></i>`:"").join("")}</div></div>`}).join("")}
    </div>
    <div class="au-eixo" aria-hidden="true">${o.map((t,n)=>`<span>${n%e===0?r(rotuloPeriodo(t.periodo,a)):""}</span>`).join("")}</div>
    ${l(SITUACOES_GRAF)}
    <table class="au-sr"><caption>Notas por ${a?"mês":"dia"}</caption><thead><tr><th>Período</th><th>Sem pendência</th><th>Com alerta</th><th>Com erro</th></tr></thead>
      <tbody>${o.map(t=>`<tr><td>${r(rotuloPeriodo(t.periodo,a))}</td><td>${t.ok}</td><td>${t.alerta}</td><td>${t.erro}</td></tr>`).join("")}</tbody></table>
  </figure>`}export function barraSituacao({ok:a=0,alerta:o=0,erro:i=0}){if(!(a+o+i))return"";const d={ok:a,alerta:o,erro:i};return`<div class="au-pilhah" role="img" aria-label="${a} sem pendência, ${o} com alerta, ${i} com erro">${SITUACOES_GRAF.map(([t])=>d[t]?`<i class="au-s-${t}" style="flex:${d[t]} 1 0" title="${r(SITUACOES_GRAF.find(n=>n[0]===t)[1])}: ${d[t]}"></i>`:"").join("")}</div>
    ${l(SITUACOES_GRAF.map(([t,n])=>[t,`${n} ${p(d[t])}`]))}`}export function graficoCamadas(a=[]){const o=a.filter(e=>e.erros+e.alertas>0);if(!o.length)return'<div class="au-tudo-certo"><span>Nenhuma divergência em aberto.</span></div>';const i=Math.max(1,...o.map(e=>e.erros+e.alertas));return`<ul class="au-barras">${o.map(e=>`<li title="${r(e.nome)}: ${e.erros} erro(s), ${e.alertas} alerta(s)"><div class="rot"><span>${r(e.nome)}</span><b>${e.erros} erro${e.erros===1?"":"s"} · ${e.alertas} alerta${e.alertas===1?"":"s"}</b></div>
      <div class="trilho" aria-hidden="true">${e.erros?`<i class="au-s-erro" style="width:${100*e.erros/i}%"></i>`:""}${e.alertas?`<i class="au-s-alerta" style="width:${100*e.alertas/i}%"></i>`:""}</div></li>`).join("")}</ul>
    ${l([["erro","Erros"],["alerta","Alertas"]])}`}export function anel(a,o="em ordem"){const e=2*Math.PI*38,d=Math.max(0,Math.min(100,Number(a)||0));return`<svg class="au-anel" viewBox="0 0 96 96" role="img" aria-label="${d}% das notas sem pendência"><circle class="fundo-anel" cx="48" cy="48" r="38"/><circle cx="48" cy="48" r="38" style="stroke:var(--${corPct(d)})" stroke-linecap="round" stroke-dasharray="${(e*d/100).toFixed(2)} ${e.toFixed(2)}" transform="rotate(-90 48 48)"/><text x="48" y="51" text-anchor="middle">${d}%</text><text class="peq" x="48" y="66" text-anchor="middle">${r(o)}</text></svg>`}export const medidor=(a,o=null)=>`<span class="au-medidor" aria-hidden="true"><i class="au-s-${o||(corPct(a)==="verde"?"ok":corPct(a)==="ouro"?"alerta":"erro")}" style="width:${Math.max(0,Math.min(100,Number(a)||0))}%"></i></span>`;export function graficoMeses(a=[]){if(!a.length)return'<p class="mut peq">Sem notas conferidas.</p>';const o=a.slice(-12);return`<figure class="au-graf" aria-label="Conformidade mês a mês"><div class="au-mini" aria-hidden="true">${o.map(i=>`<div title="${r(rotuloPeriodo(`${i.mes}-01`,!0))}: ${i.conformidade}% em ${i.notas} nota(s)">${i.conformidade}%<i class="au-s-${corPct(i.conformidade)==="verde"?"ok":corPct(i.conformidade)==="ouro"?"alerta":"erro"}" style="height:${Math.max(2,i.conformidade*.6)}px"></i></div>`).join("")}</div>
    <div class="au-mini-eixo" aria-hidden="true">${o.map(i=>`<span>${r(rotuloPeriodo(`${i.mes}-01`,!0))}</span>`).join("")}</div>
    <table class="au-sr"><caption>Conformidade por mês</caption><tbody>${o.map(i=>`<tr><td>${r(rotuloPeriodo(`${i.mes}-01`,!0))}</td><td>${i.conformidade}%</td><td>${i.notas} nota(s)</td></tr>`).join("")}</tbody></table></figure>`}export const linhaLink=(a,o,i="",e="",d="")=>`<li><a href="${r(a)}"><span class="t">${r(o)}${i?`<small>${r(i)}</small>`:""}</span><span class="n">${e}</span>${d}</a></li>`,fmtBrl=a=>r(m(a));
