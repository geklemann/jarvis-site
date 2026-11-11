/*! © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md. */
import{esc as r,ic as c,toast as I}from"../../../comum/nucleo.js";import{preparar as M,cabecalho as S,aviso as A,falhou as C,lerRegras as j}from"../base.js";import{prepararVistas as N,rotaAud as m}from"./vistas.js";import{rotaReconferir as L}from"./novidades.js";import*as n from"../novidades.js";import{mapaDeAnalises as E}from"../analises.js";import{montarAcoes as F,htmlAcoes as R,lerDadosAcoes as _,CSS_ACOES as H}from"../acoes_agora.js";const B=`
.mod-auditor .au-grade>.c8{grid-column:span 8}
.mod-auditor .rd-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:10px}
.mod-auditor .rd-kpi{display:flex;gap:12px;align-items:center;background:var(--painel);border:1px solid var(--borda);border-radius:var(--raio);padding:12px 14px;min-width:0;color:inherit;text-decoration:none}
.mod-auditor a.rd-kpi:hover{border-color:var(--azul);text-decoration:none}
.mod-auditor .rd-kpi .rd-kpi-ic{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:var(--azul-bg);color:var(--azul)}
.mod-auditor .rd-kpi .rd-kpi-ic .ic{width:20px;height:20px}
.mod-auditor .rd-kpi.laranja .rd-kpi-ic{background:var(--ouro-bg);color:var(--ouro)}.mod-auditor .rd-kpi.teal .rd-kpi-ic{background:var(--verde-bg);color:var(--verde)}.mod-auditor .rd-kpi.ardosia .rd-kpi-ic{background:var(--painel2);color:var(--texto2)}.mod-auditor .rd-kpi.verde .rd-kpi-ic{background:var(--verde-bg);color:var(--verde)}
.mod-auditor .rd-kpi div{min-width:0}
.mod-auditor .rd-kpi small{display:block;font-size:11.5px;color:var(--texto3);text-transform:uppercase;letter-spacing:.03em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mod-auditor .rd-kpi b{display:block;font-size:24px;line-height:1.15;font-variant-numeric:tabular-nums}
.mod-auditor .rd-kpi span{display:block;font-size:12px;color:var(--texto2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mod-auditor .rd-destaque{position:relative;overflow:hidden;display:flex;flex-direction:column;gap:8px;padding:18px 20px}
.mod-auditor .rd-destaque h2{font-size:21px;line-height:1.3;margin:0;overflow-wrap:anywhere;letter-spacing:-.015em}
.mod-auditor .rd-destaque p{margin:0;font-size:13.5px;color:var(--texto2);overflow-wrap:anywhere}
.mod-auditor .rd-meta{display:flex;gap:6px 8px;flex-wrap:wrap;align-items:center;font-size:12.5px;color:var(--texto3)}
.mod-auditor .rd-vivo{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--verm);background:var(--verm-bg);border-radius:999px;padding:2px 10px 2px 8px}
.mod-auditor .rd-vivo i{width:8px;height:8px;border-radius:50%;background:currentColor;box-shadow:0 0 0 0 currentColor;animation:rd-pulso 1.6s ease-out infinite}
.mod-auditor .rd-vivo.calmo{color:var(--texto2);background:var(--painel2)}.mod-auditor .rd-vivo.calmo i{animation:none}
@keyframes rd-pulso{0%{box-shadow:0 0 0 0 color-mix(in srgb,currentColor 55%,transparent)}70%{box-shadow:0 0 0 8px transparent}100%{box-shadow:0 0 0 0 transparent}}
.mod-auditor .rd-acoes{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px}
.mod-auditor .rd-contagem{display:flex;flex-direction:column;gap:10px}
.mod-auditor .rd-contagem-topo{display:flex;gap:14px;align-items:center}
.mod-auditor .rd-anel{flex:none;width:118px;height:118px}
.mod-auditor .rd-anel circle{fill:none;stroke-width:10}
.mod-auditor .rd-anel .fundo-anel{stroke:var(--painel2)}
.mod-auditor .rd-anel .valor{stroke:url(#rd-grad);stroke-linecap:round;stroke-dasharray:var(--c) var(--c);stroke-dashoffset:var(--alvo);animation:rd-anel 1.4s cubic-bezier(.2,.7,.2,1) both}
@keyframes rd-anel{from{stroke-dashoffset:var(--c)}to{stroke-dashoffset:var(--alvo)}}
.mod-auditor .rd-anel text{fill:var(--texto);font-weight:750;font-size:30px;font-variant-numeric:tabular-nums}
.mod-auditor .rd-anel text.peq{font-size:11px;font-weight:500;fill:var(--texto3)}
.mod-auditor .rd-contagem h3{margin:0 0 2px;font-size:14px}
.mod-auditor .rd-contagem p{margin:0;font-size:12.5px;color:var(--texto2);overflow-wrap:anywhere}
.mod-auditor .rd-proximas{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.mod-auditor .rd-proximas li{display:grid;grid-template-columns:84px minmax(0,1fr);gap:8px;align-items:center;font-size:12.5px;padding:6px 8px;border-radius:var(--raio);background:var(--painel2)}
.mod-auditor .rd-proximas b{font-variant-numeric:tabular-nums}
.mod-auditor .rd-proximas span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mod-auditor .rd-tempo{list-style:none;margin:0;padding:0;position:relative}
.mod-auditor .rd-tempo-dia{font-size:11.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--texto3);margin:10px 0 4px 40px}
.mod-auditor .rd-tempo-dia:first-child{margin-top:0}
.mod-auditor .rd-tempo-it{position:relative;display:grid;grid-template-columns:30px minmax(0,1fr);gap:10px;align-items:start;padding:2px 0}
.mod-auditor .rd-tempo-it::before{content:"";position:absolute;left:14px;top:34px;bottom:-6px;width:2px;background:var(--borda)}
.mod-auditor .rd-tempo-it:last-child::before{display:none}
.mod-auditor .rd-bola{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:color-mix(in srgb,var(--cor) 14%,var(--painel));color:var(--cor);border:1px solid color-mix(in srgb,var(--cor) 35%,transparent)}
.mod-auditor .rd-bola .ic{width:15px;height:15px}
.mod-auditor .rd-tempo-it a{display:block;min-width:0;color:inherit;text-decoration:none;padding:2px 8px;border-radius:var(--raio)}
.mod-auditor .rd-tempo-it a:hover,.mod-auditor .rd-tempo-it a:focus-visible{background:var(--painel2)}
.mod-auditor .rd-tempo-it b{display:block;font-size:13px;font-weight:600;overflow-wrap:anywhere}
.mod-auditor .rd-tempo-it small{display:flex;gap:6px;flex-wrap:wrap;align-items:center;font-size:11.5px;color:var(--texto3)}
.mod-auditor .rd-barras{list-style:none;margin:0;padding:0;display:grid;gap:9px}
.mod-auditor .rd-barras li{font-size:12.5px;min-width:0}
.mod-auditor .rd-barras .rot{display:flex;justify-content:space-between;gap:8px}
.mod-auditor .rd-barras .rot span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mod-auditor .rd-barras .rot b{font-variant-numeric:tabular-nums}
.mod-auditor .rd-barras .trilho{height:9px;border-radius:5px;background:var(--painel2);margin-top:3px;overflow:hidden}
.mod-auditor .rd-barras .trilho i{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,var(--rd-g1,var(--azul)),var(--rd-g2,var(--azul)));transform-origin:left;animation:rd-barra 1.1s cubic-bezier(.2,.7,.2,1) both}
.mod-auditor .rd-barras li:nth-child(2) .trilho i{animation-delay:.08s}.mod-auditor .rd-barras li:nth-child(3) .trilho i{animation-delay:.16s}.mod-auditor .rd-barras li:nth-child(4) .trilho i{animation-delay:.24s}.mod-auditor .rd-barras li:nth-child(n+5) .trilho i{animation-delay:.32s}
@keyframes rd-barra{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.mod-auditor .rd-tipos{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
.mod-auditor .rd-rosca{flex:none;width:110px;height:110px}
.mod-auditor .rd-rosca circle{fill:none;stroke-width:14}
.mod-auditor .rd-rosca .seg{animation:rd-surge .9s ease-out both}
@keyframes rd-surge{from{opacity:0}to{opacity:1}}
.mod-auditor .rd-rosca text{fill:var(--texto);font-weight:750;font-size:22px}
.mod-auditor .rd-rosca text.peq{font-size:8px;font-weight:500;fill:var(--texto3)}
.mod-auditor .rd-leg{list-style:none;margin:0;padding:0;display:grid;gap:4px;font-size:12.5px;min-width:0;flex:1}
.mod-auditor .rd-leg li{display:flex;gap:6px;align-items:center}
.mod-auditor .rd-leg i{flex:none;width:10px;height:10px;border-radius:3px;background:var(--cor)}
.mod-auditor .rd-leg b{margin-left:auto;font-variant-numeric:tabular-nums}
.mod-auditor .rd-fontes{display:flex;flex-direction:column;gap:8px;align-items:flex-start;font-size:13px}
.mod-auditor .rd-fontes .rd-ok{display:flex;gap:8px;align-items:center;font-weight:650;color:var(--verde);font-size:14px}
.mod-auditor .rd-fontes .rd-ok.falha{color:var(--ouro)}
.mod-auditor .rd-fontes .rd-ok .ic{width:18px;height:18px}
.mod-auditor .rd-fontes .rd-ok .ic{flex:none}
.mod-auditor .rd-conf{margin-top:18px}
.mod-auditor .rd-conf-cab{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;margin:0 0 10px}
.mod-auditor .rd-conf-cab h2{margin:0;font-size:17px}
.mod-auditor .rd-conf .au-cab{display:none}
.mod-auditor .rd-conf [data-novidades]{display:none}
${H}
.mod-auditor .rd-anel-esq{display:grid;place-items:center;width:118px;height:118px;border-radius:50%;border:10px solid var(--painel2)}
@media (max-width:1100px){.mod-auditor .rd-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.mod-auditor .au-grade>.c8,.mod-auditor .au-grade>.rd-contagem{grid-column:span 12}}
@media (max-width:760px){.mod-auditor .rd-destaque{padding:14px}.mod-auditor .rd-destaque h2{font-size:17px}.mod-auditor .rd-kpi b{font-size:20px}.mod-auditor .rd-kpi{padding:10px}.mod-auditor .rd-kpi .rd-kpi-ic{width:34px;height:34px}}
@media (max-width:420px){.mod-auditor .rd-kpis{gap:8px}.mod-auditor .rd-kpi .rd-kpi-ic{display:none}}
@media (prefers-reduced-motion:reduce){.mod-auditor .rd-vivo i,.mod-auditor .rd-anel .valor,.mod-auditor .rd-barras .trilho i,.mod-auditor .rd-rosca .seg{animation:none!important}}
`;function V(){if(typeof document>"u"||document.getElementById("mod-auditor-radar-css"))return;const a=document.createElement("style");a.id="mod-auditor-radar-css",a.textContent=B,document.head.append(a)}const T=864e5,z=a=>a?String(a).slice(0,10).split("-").reverse().join("/"):"",D=(a,o,l)=>`${a} ${a===1?o:l}`,G=a=>/^https?:\/\//i.test(String(a?.link||""))?a.link:null;export function escolherDestaque(a=[]){return a.find(o=>o.relevancia==="alta"&&o.nova)||a.find(o=>o.relevancia==="alta")||a[0]||null}export function porOrgao(a=[],{dias:o=30,agora:l=Date.now()}={}){const i=new Map;for(const e of a)Date.parse(n.quandoDe(e))>=l-o*T&&i.set(e.orgao,(i.get(e.orgao)||0)+1);return[...i].map(([e,s])=>({orgao:e,n:s})).sort((e,s)=>s.n-e.n||e.orgao.localeCompare(s.orgao,"pt-BR"))}export function porTipo(a=[]){return Object.entries(n.TIPOS).map(([o,l])=>({tipo:o,rotulo:l,n:a.filter(i=>i.tipo===o).length,cor:n.COR_TIPO[o]})).filter(o=>o.n)}export function proximasDatas(a){if(!a?.proximaData)return null;const o=[];for(const l of a.datas)if(!(l.data<=a.proximaData||o.some(i=>i.data===l.data))&&(o.push(l),o.length===3))break;return{data:a.proximaData,dias:a.diasParaProxima,eventos:a.proxima,seguintes:o}}export function htmlDestaque(a,o,l=null){if(!a)return'<section class="au-cartao rd-destaque c8" data-destaque><span class="rd-vivo calmo"><i></i> Radar ligado</span><h2>Nada novo nos sites oficiais por enquanto</h2><p>Os sites oficiais da Reforma são lidos a cada 2 horas. A primeira novidade aparece aqui, em destaque.</p></section>';const i=n.RELEVANCIA[a.relevancia]||n.RELEVANCIA.baixa,e=G(a);return`<section class="au-cartao rd-destaque c8" data-destaque data-id="${r(a.id)}" style="--cor:var(--${r(n.COR_TIPO[a.tipo]||"azul")})">
    <div class="rd-meta">${a.nova?'<span class="rd-vivo" data-vivo><i aria-hidden="true"></i> Ao vivo</span>':'<span class="rd-vivo calmo"><i aria-hidden="true"></i> Mais recente</span>'}${i.cor?`<span class="selo ${i.cor}">${r(i.rotulo)}</span>`:""}<span class="selo">${c(n.ICONE_TIPO[a.tipo]||"doc")} ${r(n.TIPOS[a.tipo]||a.tipo)}</span>
      <span>${r(a.orgao)}</span><span aria-hidden="true">·</span><time datetime="${r(n.quandoDe(a))}">${r(n.diaBrasilia(n.quandoDe(a)))}</time></div>
    <h2>${r(a.titulo)}</h2>
    ${a.trecho?`<p>${r(a.trecho)}</p>`:""}
    ${(a.tags||[]).length?`<div class="au-chips">${a.tags.map(s=>`<span class="selo">${r(s)}</span>`).join("")}</div>`:""}
    ${n.htmlImpacto(a.impacto,{reconferir:L(o),versoes:m(o,"versoes")})}
    <div class="rd-acoes">${e?`<a class="btn pri" href="${r(e)}" target="_blank" rel="noopener noreferrer" data-oficial>${c("link")} Ler no site oficial</a>`:""}
      ${a.nova?`<button type="button" class="btn" data-a="lida">${c("ok")} Marcar como lida</button>`:""}
      ${l==="analisada"?`<a class="btn" href="${r(m(o,"analise",[],{id:a.id}))}" data-ver-analise>${c("analise")} Ver análise</a>`:""}<a class="btn fant" href="${r(m(o,"novidades",[],{id:a.id}))}">${c("sino")} Ver nas novidades</a></div>
  </section>`}export function htmlContagem(a,o){if(!a)return`<section class="au-cartao rd-contagem c4" data-contagem><h3>${c("agenda")} Próxima data da Reforma</h3><p>Nenhuma data por vir no calendário.</p></section>`;const l=50,i=2*Math.PI*l,e=Math.max(.04,Math.min(1,1-a.dias/120)),s=a.eventos[0];return`<section class="au-cartao rd-contagem c4" data-contagem data-dias="${r(a.dias)}">
    <div class="au-cartao-cab"><div><h3>${c("agenda")} Próxima data da Reforma</h3><p>${r(z(a.data))}</p></div><a class="btn peq fant" href="${r(m(o,"calendario"))}">Calendário</a></div>
    <div class="rd-contagem-topo">
      <svg class="rd-anel" viewBox="0 0 120 120" role="img" aria-label="${r(a.dias===0?"É hoje":`Faltam ${a.dias} dias`)}" style="--c:${i.toFixed(2)};--alvo:${(i*(1-e)).toFixed(2)}">
        <defs><linearGradient id="rd-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--rd-g1,var(--azul))"/><stop offset="1" style="stop-color:var(--rd-g2,var(--azul))"/></linearGradient></defs>
        <circle class="fundo-anel" cx="60" cy="60" r="${l}"/><circle class="valor" cx="60" cy="60" r="${l}" transform="rotate(-90 60 60)"/>
        <text x="60" y="64" text-anchor="middle" data-contar="${r(a.dias)}">${r(a.dias)}</text><text class="peq" x="60" y="82" text-anchor="middle">${a.dias===1?"dia":"dias"}</text></svg>
      <div><h3>${r(s?.titulo||"")}</h3>${a.eventos.length>1?`<p>e mais ${r(D(a.eventos.length-1,"evento","eventos"))} na mesma data</p>`:""}${s?.documentos?.length?`<p class="mut">${r(s.documentos.join(" · "))}</p>`:""}</div>
    </div>
    ${a.seguintes.length?`<ul class="rd-proximas">${a.seguintes.map(t=>`<li title="${r(t.titulo)}"><b>${r(z(t.data))}</b><span>${r(t.titulo)}</span></li>`).join("")}</ul>`:""}
  </section>`}export function htmlLinhaDoTempo(a,o,l=Date.now()){const i=a.slice(0,10),e=i.length?`<div class="rd-tempo" data-linha-tempo>${n.agruparPorDia(i,l).map(s=>`<div class="rd-tempo-dia" data-dia="${r(s.dia)}">${r(s.rotulo)}</div>${s.itens.map(t=>`<div class="rd-tempo-it" data-id="${r(t.id)}" style="--cor:var(--${r(n.COR_TIPO[t.tipo]||"azul")})">
      <span class="rd-bola" title="${r(n.TIPOS[t.tipo]||t.tipo)}">${c(n.ICONE_TIPO[t.tipo]||"doc")}</span>
      <a href="${r(m(o,"novidades",[],{id:t.id}))}"><b>${r(t.titulo)}</b><small>${t.nova?'<span class="selo azul">Nova</span>':""}${t.relevancia==="alta"?'<span class="selo verm">Importante</span>':""}<span>${r(t.orgao)}</span><span aria-hidden="true">·</span><span>${r(n.TIPOS[t.tipo]||t.tipo)}</span></small></a></div>`).join("")}`).join("")}</div>`:'<p class="mut peq">Nenhuma publicação ainda.</p>';return`<section class="au-cartao c7" data-tempo-novidades><div class="au-cartao-cab"><div><h3>${c("relogio")} Linha do tempo</h3><p>As últimas publicações dos órgãos oficiais</p></div><a class="btn peq fant" href="${r(m(o,"novidades"))}">Ver todas</a></div>${e}</section>`}export function htmlGraficos(a,o=Date.now(),l=""){const i=porOrgao(a,{agora:o}),e=Math.max(1,...i.map(d=>d.n)),s=i.length?`<ul class="rd-barras" data-por-orgao>${i.map(d=>`<li title="${r(d.orgao)}: ${d.n}"><div class="rot"><span>${r(d.orgao)}</span><b>${d.n}</b></div><div class="trilho" aria-hidden="true"><i style="width:${(100*d.n/e).toFixed(1)}%"></i></div></li>`).join("")}</ul>`:'<p class="mut peq">Nenhuma publicação nos últimos 30 dias.</p>',t=porTipo(a),x=t.reduce((d,g)=>d+g.n,0),p=40,u=2*Math.PI*p;let h=0;const f=t.map(d=>{const g=u*d.n/Math.max(1,x),y=`<circle class="seg" cx="55" cy="55" r="${p}" style="stroke:var(--${r(d.cor)})" stroke-dasharray="${Math.max(0,g-2).toFixed(2)} ${u.toFixed(2)}" stroke-dashoffset="${(-h).toFixed(2)}" transform="rotate(-90 55 55)"/>`;return h+=g,y}).join(""),v=x?`<div class="rd-tipos" data-por-tipo><svg class="rd-rosca" viewBox="0 0 110 110" role="img" aria-label="${r(t.map(d=>`${d.rotulo}: ${d.n}`).join(", "))}"><circle cx="55" cy="55" r="${p}" style="stroke:var(--painel2)"/>${f}<text x="55" y="59" text-anchor="middle" data-contar="${x}">${x}</text><text class="peq" x="55" y="73" text-anchor="middle">publicações</text></svg>
      <ul class="rd-leg">${t.map(d=>`<li style="--cor:var(--${r(d.cor)})"><i aria-hidden="true"></i>${r(d.rotulo)}<b>${d.n}</b></li>`).join("")}</ul></div>`:"";return`<div class="c5 rd-coluna" style="display:grid;gap:10px;align-content:start">
    <section class="au-cartao" style="margin:0" data-graf-orgao><div class="au-cartao-cab"><div><h3>${c("grafico")} Por órgão</h3><p>Publicações nos últimos 30 dias</p></div></div>${s}</section>
    ${v?`<section class="au-cartao" style="margin:0" data-graf-tipo><div class="au-cartao-cab"><div><h3>${c("radar")} Por tipo</h3><p>Todas as publicações acompanhadas</p></div></div>${v}</section>`:""}
    ${l}
  </div>`}export function htmlFontes(a,o,l=Date.now()){if(!a)return"";const i=n.saudeFontes(a);return i.total?`<section class="au-cartao rd-fontes" style="margin:0" data-saude-fontes><span class="rd-ok${i.problemas?" falha":""}">${c(i.problemas?"alerta":"ok")}<span><span data-contar="${i.ok}">${i.ok}</span> de ${i.total} fontes oficiais lidas sem problema</span></span>
    <span class="mut peq">${i.ultima?`Última leitura ${r(n.haQuanto(i.ultima,l))}`:"Ainda sem leitura"} · verificadas a cada 2 horas${i.problemas?` · ${r(D(i.problemas,"fonte com problema","fontes com problema"))} (a equipe Jarvis já foi avisada)`:""}</span></section>`:`<section class="au-cartao rd-fontes" style="margin:0" data-saude-fontes>${c("info")}<span>As fontes oficiais aparecem aqui depois da primeira leitura (a cada 2 horas).</span></section>`}const X=(a,o)=>a?$("Próxima data",a.dias,a.dias===1?`dia · ${z(a.data)}`:`dias · ${z(a.data)}`,"agenda","ardosia",m(o,"calendario"),"data-kpi-prox"):$("Próxima data",0,"nenhuma por vir","agenda","ardosia","","data-kpi-prox"),J=()=>`<section class="au-cartao rd-contagem c4" data-contagem aria-busy="true"><div class="au-cartao-cab"><div><h3>${c("agenda")} Próxima data da Reforma</h3><p>lendo o calendário…</p></div></div><div class="rd-contagem-topo"><span class="rd-anel-esq"></span><div class="rd-esq" style="flex:1"><i style="height:16px"></i><i style="height:16px;width:70%"></i></div></div></section>`,$=(a,o,l,i,e="",s="",t="")=>`<${s?`a href="${r(s)}"`:"div"}${t?` ${t}`:""} class="rd-kpi ${e}"><span class="rd-kpi-ic">${c(i)}</span><div><small>${r(a)}</small><b data-contar="${r(o)}">${r(o)}</b><span>${r(l)}</span></div></${s?"a":"div"}>`;export async function render(a,o,l=[],i={}){M(a),N(),V(),i.conferencia||o.titulo?.("Radar da Reforma"),a.innerHTML=`${S("Radar da Reforma","O que fazer agora e o que mudou na Reforma Tributária. As publicações oficiais são lidas a cada 2 horas; o documento que vale é sempre o do site oficial.",`<a class="btn pri" href="${r(m(o,"novidades"))}">${c("sino")} Todas as novidades</a><a class="btn" href="${r(m(o,"calendario"))}">${c("agenda")} Calendário</a>`)}
    ${i.comeco?"<div data-comeco></div>":""}
    <div data-agora-alvo>${i.semAcoes?"":R([],{carregando:!0})}</div>
    <div data-radar><div class="rd-kpis" aria-busy="true">${'<div class="rd-kpi"><div class="rd-esq" style="flex:1"><i style="height:40px"></i></div></div>'.repeat(4)}</div></div>
    ${i.conferencia?`<section class="rd-conf" data-conferencia><div class="rd-conf-cab"><h2>${c("escudo")} Conferência de hoje</h2><span class="mut peq">${r(o.escritorio&&!o.config?"a carteira do escritório":"as notas da empresa")}</span></div><div data-conf-corpo><div class="vazio">Carregando a conferência…</div></div></section>`:""}`;const e=a.querySelector("[data-radar]");let s=!0;async function t(){const p=Date.now(),u=(async()=>{const[w,{CRONOGRAMA:P},O]=await Promise.all([j(),import("../../../motor/reforma_transicao.js"),import("../../../motor/auditor/calendario.js")]);return O.montarCalendario({regras:w,cronograma:P,futuras:!0})})().catch(()=>null),h=i.semAcoes?Promise.resolve(null):_(o,{agora:p}).catch(()=>null),[f,v,d,g]=await Promise.all([n.listarNovidades(o,{}),n.lerNaoLidas(o,{renovar:!0}).catch(()=>null),n.lerFontes(o).catch(()=>null),E(o).catch(()=>null)]);if(!s)return;if(n.atualizarSelos(v),f===null){e.innerHTML=A("As Novidades da Reforma ainda não foram instaladas no banco. Assim que forem, o radar mostra aqui as publicações oficiais.","azul"),await x(h,u);return}const y=f.filter(w=>Date.parse(n.quandoDe(w))>=p-30*T).length,b=v||{total:0,importantes:0};e.innerHTML=`<div class="rd-kpis" data-radar-kpis>
        ${$("Não lidas",b.total,b.total?"desde a sua última visita":"você está em dia","sino",b.total?"":"verde",m(o,"novidades",[],{nao_lidas:"1"}))}
        ${$("Importantes",b.importantes,"NT, norma ou tabela não lida","alerta",b.importantes?"laranja":"verde",m(o,"novidades",[],{importantes:"1"}))}
        ${$("Nos últimos 30 dias",y,"publicações acompanhadas","grafico","teal")}
        ${$("Próxima data","…","lendo o calendário","agenda","ardosia","","data-kpi-prox")}
      </div>
      <div class="au-grade">
        ${htmlDestaque(escolherDestaque(f),o,g?.get?.(escolherDestaque(f)?.id)??null)}
        ${J()}
        ${htmlLinhaDoTempo(f,o,p)}
        ${htmlGraficos(f,p,htmlFontes(d,o,p))}
      </div>`,e.querySelector('[data-a="lida"]')?.addEventListener("click",async()=>{const w=escolherDestaque(f);try{await n.marcarLidas(o,w?.coletado_em||null),I("Marcada como lida."),await t()}catch(P){C(P)}});const k=proximasDatas(await u);if(!s)return;e.querySelector("[data-contagem]")?.insertAdjacentHTML("afterend",htmlContagem(k,o)),e.querySelector("[data-contagem][aria-busy]")?.remove();const q=e.querySelector("[data-kpi-prox]");q&&(q.outerHTML=X(k,o)),await x(h,u)}async function x(p,u){if(i.semAcoes)return;const[h,f]=await Promise.all([p,u]);if(!s)return;const v=a.querySelector("[data-agora-alvo]");if(!v)return;const d=proximasDatas(f),g={...h||{},proxima:d?{data:d.data,dias:d.dias,titulo:d.eventos?.[0]?.titulo||"data da Reforma"}:null},y=F(g,{rota:(b,k=[],q={})=>m(o,b,k,q)});v.innerHTML=R(y,{todas:m(o,"pendencias")})}if(i.comeco)try{await i.comeco(a.querySelector("[data-comeco]"),o)}catch{}try{await t()}catch(p){e.innerHTML="",C(p)}if(i.conferencia){const p=a.querySelector("[data-conf-corpo]");try{await i.conferencia(p,o)}catch(u){p.innerHTML=A(r(u?.message||u),"verm")}}return{sair(){s=!1},recarregar:t}}
