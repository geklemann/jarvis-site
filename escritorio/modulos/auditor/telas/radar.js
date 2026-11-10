/*! © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md. */
import{esc as r,ic as p,toast as O}from"../../../comum/nucleo.js";import{preparar as R,cabecalho as D,aviso as k,falhou as z,lerRegras as I}from"../base.js";import{prepararVistas as T,rotaAud as f}from"./vistas.js";import{rotaReconferir as j}from"./novidades.js";import*as d from"../novidades.js";const M=`
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
@media (max-width:1100px){.mod-auditor .rd-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.mod-auditor .au-grade>.c8,.mod-auditor .au-grade>.rd-contagem{grid-column:span 12}}
@media (max-width:760px){.mod-auditor .rd-destaque{padding:14px}.mod-auditor .rd-destaque h2{font-size:17px}.mod-auditor .rd-kpi b{font-size:20px}.mod-auditor .rd-kpi{padding:10px}.mod-auditor .rd-kpi .rd-kpi-ic{width:34px;height:34px}}
@media (max-width:420px){.mod-auditor .rd-kpis{gap:8px}.mod-auditor .rd-kpi .rd-kpi-ic{display:none}}
@media (prefers-reduced-motion:reduce){.mod-auditor .rd-vivo i,.mod-auditor .rd-anel .valor,.mod-auditor .rd-barras .trilho i,.mod-auditor .rd-rosca .seg{animation:none!important}}
`;function N(){if(typeof document>"u"||document.getElementById("mod-auditor-radar-css"))return;const a=document.createElement("style");a.id="mod-auditor-radar-css",a.textContent=M,document.head.append(a)}const q=864e5,$=a=>a?String(a).slice(0,10).split("-").reverse().join("/"):"",P=(a,o,t)=>`${a} ${a===1?o:t}`,A=a=>/^https?:\/\//i.test(String(a?.link||""))?a.link:null;export function escolherDestaque(a=[]){return a.find(o=>o.relevancia==="alta"&&o.nova)||a.find(o=>o.relevancia==="alta")||a[0]||null}export function porOrgao(a=[],{dias:o=30,agora:t=Date.now()}={}){const i=new Map;for(const s of a)Date.parse(d.quandoDe(s))>=t-o*q&&i.set(s.orgao,(i.get(s.orgao)||0)+1);return[...i].map(([s,n])=>({orgao:s,n})).sort((s,n)=>n.n-s.n||s.orgao.localeCompare(n.orgao,"pt-BR"))}export function porTipo(a=[]){return Object.entries(d.TIPOS).map(([o,t])=>({tipo:o,rotulo:t,n:a.filter(i=>i.tipo===o).length,cor:d.COR_TIPO[o]})).filter(o=>o.n)}export function proximasDatas(a){if(!a?.proximaData)return null;const o=[];for(const t of a.datas)if(!(t.data<=a.proximaData||o.some(i=>i.data===t.data))&&(o.push(t),o.length===3))break;return{data:a.proximaData,dias:a.diasParaProxima,eventos:a.proxima,seguintes:o}}export function htmlDestaque(a,o){if(!a)return'<section class="au-cartao rd-destaque c8" data-destaque><span class="rd-vivo calmo"><i></i> Radar ligado</span><h2>Nada novo nos sites oficiais por enquanto</h2><p>Os sites oficiais da Reforma são lidos a cada 2 horas. A primeira novidade aparece aqui, em destaque.</p></section>';const t=d.RELEVANCIA[a.relevancia]||d.RELEVANCIA.baixa,i=A(a);return`<section class="au-cartao rd-destaque c8" data-destaque data-id="${r(a.id)}" style="--cor:var(--${r(d.COR_TIPO[a.tipo]||"azul")})">
    <div class="rd-meta">${a.nova?'<span class="rd-vivo" data-vivo><i aria-hidden="true"></i> Ao vivo</span>':'<span class="rd-vivo calmo"><i aria-hidden="true"></i> Mais recente</span>'}${t.cor?`<span class="selo ${t.cor}">${r(t.rotulo)}</span>`:""}<span class="selo">${p(d.ICONE_TIPO[a.tipo]||"doc")} ${r(d.TIPOS[a.tipo]||a.tipo)}</span>
      <span>${r(a.orgao)}</span><span aria-hidden="true">·</span><time datetime="${r(d.quandoDe(a))}">${r(d.diaBrasilia(d.quandoDe(a)))}</time></div>
    <h2>${r(a.titulo)}</h2>
    ${a.trecho?`<p>${r(a.trecho)}</p>`:""}
    ${(a.tags||[]).length?`<div class="au-chips">${a.tags.map(s=>`<span class="selo">${r(s)}</span>`).join("")}</div>`:""}
    ${d.htmlImpacto(a.impacto,{reconferir:j(o),versoes:f(o,"versoes")})}
    <div class="rd-acoes">${i?`<a class="btn pri" href="${r(i)}" target="_blank" rel="noopener noreferrer" data-oficial>${p("link")} Ler no site oficial</a>`:""}
      ${a.nova?`<button type="button" class="btn" data-a="lida">${p("ok")} Marcar como lida</button>`:""}
      <a class="btn fant" href="${r(f(o,"novidades",[],{id:a.id}))}">${p("sino")} Ver nas novidades</a></div>
  </section>`}export function htmlContagem(a,o){if(!a)return`<section class="au-cartao rd-contagem c4" data-contagem><h3>${p("agenda")} Próxima data da Reforma</h3><p>Nenhuma data por vir no calendário.</p></section>`;const t=50,i=2*Math.PI*t,s=Math.max(.04,Math.min(1,1-a.dias/120)),n=a.eventos[0];return`<section class="au-cartao rd-contagem c4" data-contagem data-dias="${r(a.dias)}">
    <div class="au-cartao-cab"><div><h3>${p("agenda")} Próxima data da Reforma</h3><p>${r($(a.data))}</p></div><a class="btn peq fant" href="${r(f(o,"calendario"))}">Calendário</a></div>
    <div class="rd-contagem-topo">
      <svg class="rd-anel" viewBox="0 0 120 120" role="img" aria-label="${r(a.dias===0?"É hoje":`Faltam ${a.dias} dias`)}" style="--c:${i.toFixed(2)};--alvo:${(i*(1-s)).toFixed(2)}">
        <defs><linearGradient id="rd-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--rd-g1,var(--azul))"/><stop offset="1" style="stop-color:var(--rd-g2,var(--azul))"/></linearGradient></defs>
        <circle class="fundo-anel" cx="60" cy="60" r="${t}"/><circle class="valor" cx="60" cy="60" r="${t}" transform="rotate(-90 60 60)"/>
        <text x="60" y="64" text-anchor="middle" data-contar="${r(a.dias)}">${r(a.dias)}</text><text class="peq" x="60" y="82" text-anchor="middle">${a.dias===1?"dia":"dias"}</text></svg>
      <div><h3>${r(n?.titulo||"")}</h3>${a.eventos.length>1?`<p>e mais ${r(P(a.eventos.length-1,"evento","eventos"))} na mesma data</p>`:""}${n?.documentos?.length?`<p class="mut">${r(n.documentos.join(" · "))}</p>`:""}</div>
    </div>
    ${a.seguintes.length?`<ul class="rd-proximas">${a.seguintes.map(e=>`<li title="${r(e.titulo)}"><b>${r($(e.data))}</b><span>${r(e.titulo)}</span></li>`).join("")}</ul>`:""}
  </section>`}export function htmlLinhaDoTempo(a,o,t=Date.now()){const i=a.slice(0,10),s=i.length?`<div class="rd-tempo" data-linha-tempo>${d.agruparPorDia(i,t).map(n=>`<div class="rd-tempo-dia" data-dia="${r(n.dia)}">${r(n.rotulo)}</div>${n.itens.map(e=>`<div class="rd-tempo-it" data-id="${r(e.id)}" style="--cor:var(--${r(d.COR_TIPO[e.tipo]||"azul")})">
      <span class="rd-bola" title="${r(d.TIPOS[e.tipo]||e.tipo)}">${p(d.ICONE_TIPO[e.tipo]||"doc")}</span>
      <a href="${r(f(o,"novidades",[],{id:e.id}))}"><b>${r(e.titulo)}</b><small>${e.nova?'<span class="selo azul">Nova</span>':""}${e.relevancia==="alta"?'<span class="selo verm">Importante</span>':""}<span>${r(e.orgao)}</span><span aria-hidden="true">·</span><span>${r(d.TIPOS[e.tipo]||e.tipo)}</span></small></a></div>`).join("")}`).join("")}</div>`:'<p class="mut peq">Nenhuma publicação ainda.</p>';return`<section class="au-cartao c7" data-tempo-novidades><div class="au-cartao-cab"><div><h3>${p("relogio")} Linha do tempo</h3><p>As últimas publicações dos órgãos oficiais</p></div><a class="btn peq fant" href="${r(f(o,"novidades"))}">Ver todas</a></div>${s}</section>`}export function htmlGraficos(a,o=Date.now(),t=""){const i=porOrgao(a,{agora:o}),s=Math.max(1,...i.map(l=>l.n)),n=i.length?`<ul class="rd-barras" data-por-orgao>${i.map(l=>`<li title="${r(l.orgao)}: ${l.n}"><div class="rot"><span>${r(l.orgao)}</span><b>${l.n}</b></div><div class="trilho" aria-hidden="true"><i style="width:${(100*l.n/s).toFixed(1)}%"></i></div></li>`).join("")}</ul>`:'<p class="mut peq">Nenhuma publicação nos últimos 30 dias.</p>',e=porTipo(a),c=e.reduce((l,u)=>l+u.n,0),m=40,x=2*Math.PI*m;let b=0;const y=e.map(l=>{const u=x*l.n/Math.max(1,c),g=`<circle class="seg" cx="55" cy="55" r="${m}" style="stroke:var(--${r(l.cor)})" stroke-dasharray="${Math.max(0,u-2).toFixed(2)} ${x.toFixed(2)}" stroke-dashoffset="${(-b).toFixed(2)}" transform="rotate(-90 55 55)"/>`;return b+=u,g}).join(""),v=c?`<div class="rd-tipos" data-por-tipo><svg class="rd-rosca" viewBox="0 0 110 110" role="img" aria-label="${r(e.map(l=>`${l.rotulo}: ${l.n}`).join(", "))}"><circle cx="55" cy="55" r="${m}" style="stroke:var(--painel2)"/>${y}<text x="55" y="59" text-anchor="middle" data-contar="${c}">${c}</text><text class="peq" x="55" y="73" text-anchor="middle">publicações</text></svg>
      <ul class="rd-leg">${e.map(l=>`<li style="--cor:var(--${r(l.cor)})"><i aria-hidden="true"></i>${r(l.rotulo)}<b>${l.n}</b></li>`).join("")}</ul></div>`:"";return`<div class="c5 rd-coluna" style="display:grid;gap:10px;align-content:start">
    <section class="au-cartao" style="margin:0" data-graf-orgao><div class="au-cartao-cab"><div><h3>${p("grafico")} Por órgão</h3><p>Publicações nos últimos 30 dias</p></div></div>${n}</section>
    ${v?`<section class="au-cartao" style="margin:0" data-graf-tipo><div class="au-cartao-cab"><div><h3>${p("radar")} Por tipo</h3><p>Todas as publicações acompanhadas</p></div></div>${v}</section>`:""}
    ${t}
  </div>`}export function htmlFontes(a,o,t=Date.now()){if(!a)return"";const i=d.saudeFontes(a);return i.total?`<section class="au-cartao rd-fontes" style="margin:0" data-saude-fontes><span class="rd-ok${i.problemas?" falha":""}">${p(i.problemas?"alerta":"ok")}<span><span data-contar="${i.ok}">${i.ok}</span> de ${i.total} fontes oficiais lidas sem problema</span></span>
    <span class="mut peq">${i.ultima?`Última leitura ${r(d.haQuanto(i.ultima,t))}`:"Ainda sem leitura"} · verificadas a cada 2 horas${i.problemas?` · ${r(P(i.problemas,"fonte com problema","fontes com problema"))} (a equipe Jarvis já foi avisada)`:""}</span></section>`:`<section class="au-cartao rd-fontes" style="margin:0" data-saude-fontes>${p("info")}<span>As fontes oficiais aparecem aqui depois da primeira leitura (a cada 2 horas).</span></section>`}const h=(a,o,t,i,s="",n="")=>`<${n?`a href="${r(n)}"`:"div"} class="rd-kpi ${s}"><span class="rd-kpi-ic">${p(i)}</span><div><small>${r(a)}</small><b data-contar="${r(o)}">${r(o)}</b><span>${r(t)}</span></div></${n?"a":"div"}>`;export async function render(a,o,t=[],i={}){R(a),T(),N(),i.conferencia||o.titulo?.("Radar da Reforma"),a.innerHTML=`${D("Radar da Reforma","O que saiu e o que vem por aí na Reforma Tributária: as publicações oficiais lidas a cada 2 horas, a próxima data do calendário e a situação das fontes. O documento que vale é sempre o do site oficial.",`<a class="btn pri" href="${r(f(o,"novidades"))}">${p("sino")} Todas as novidades</a><a class="btn" href="${r(f(o,"calendario"))}">${p("agenda")} Calendário</a>`)}
    <div data-radar><div class="vazio">Ligando o radar…</div></div>
    ${i.conferencia?`<section class="rd-conf" data-conferencia><div class="rd-conf-cab"><h2>${p("escudo")} Conferência de hoje</h2><span class="mut peq">${r(o.escritorio&&!o.config?"a carteira do escritório":"as notas da empresa")}</span></div><div data-conf-corpo><div class="vazio">Carregando a conferência…</div></div></section>`:""}`;const s=a.querySelector("[data-radar]");let n=!0;async function e(){const c=Date.now(),[m,x,b,y]=await Promise.all([d.listarNovidades(o,{}),d.lerNaoLidas(o,{renovar:!0}).catch(()=>null),d.lerFontes(o).catch(()=>null),(async()=>{const[g,{CRONOGRAMA:w},C]=await Promise.all([I(),import("../../../motor/reforma_transicao.js"),import("../../../motor/auditor/calendario.js")]);return C.montarCalendario({regras:g,cronograma:w,futuras:!0})})().catch(()=>null)]);if(!n)return;if(d.atualizarSelos(x),m===null){s.innerHTML=k("As Novidades da Reforma ainda não foram instaladas no banco. Assim que forem, o radar mostra aqui as publicações oficiais.","azul");return}const v=proximasDatas(y),l=m.filter(g=>Date.parse(d.quandoDe(g))>=c-30*q).length,u=x||{total:0,importantes:0};s.innerHTML=`<div class="rd-kpis" data-radar-kpis>
        ${h("Não lidas",u.total,u.total?"desde a sua última visita":"você está em dia","sino",u.total?"":"verde",f(o,"novidades",[],{nao_lidas:"1"}))}
        ${h("Importantes",u.importantes,"NT, norma ou tabela não lida","alerta",u.importantes?"laranja":"verde",f(o,"novidades",[],{importantes:"1"}))}
        ${h("Nos últimos 30 dias",l,"publicações acompanhadas","grafico","teal")}
        ${v?h("Próxima data",v.dias,v.dias===1?`dia · ${$(v.data)}`:`dias · ${$(v.data)}`,"agenda","ardosia",f(o,"calendario")):h("Próxima data",0,"nenhuma por vir","agenda","ardosia")}
      </div>
      <div class="au-grade">
        ${htmlDestaque(escolherDestaque(m),o)}
        ${htmlContagem(v,o)}
        ${htmlLinhaDoTempo(m,o,c)}
        ${htmlGraficos(m,c,htmlFontes(b,o,c))}
      </div>`,s.querySelector('[data-a="lida"]')?.addEventListener("click",async()=>{const g=escolherDestaque(m);try{await d.marcarLidas(o,g?.coletado_em||null),O("Marcada como lida."),await e()}catch(w){z(w)}})}try{await e()}catch(c){s.innerHTML="",z(c)}if(i.conferencia){const c=a.querySelector("[data-conf-corpo]");try{await i.conferencia(c,o)}catch(m){c.innerHTML=k(r(m?.message||m),"verm")}}return{sair(){n=!1},recarregar:e}}
