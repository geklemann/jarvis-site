/*! © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md. */
import{esc as d,ic as l}from"../../comum/nucleo.js";import*as i from"../../motor/gente/desempenho.js";import{preparar as m}from"./base.js";export{i as D};export const ciclos=async e=>await e.api.rpc("gente_ciclos",{p_empresa:e.empresa.id})||[],ciclo=(e,o)=>e.api.rpc("gente_ciclo",{p_ciclo:o}),minhasAvaliacoes=async e=>await e.api.rpc("gente_minhas_avaliacoes",{p_empresa:e.empresa.id})||[],nota=(e,o=1)=>e==null||!Number.isFinite(Number(e))?"—":Number(e).toLocaleString("pt-BR",{minimumFractionDigits:o,maximumFractionDigits:o}),pct=e=>`${Math.round((Number(e)||0)*100)}%`,periodoCiclo=e=>`${String(e.inicio||"").slice(0,10).split("-").reverse().join("/")} a ${String(e.fim||"").slice(0,10).split("-").reverse().join("/")}`,PAPEL_DE_QUEM_AVALIA=Object.freeze({auto:"Autoavaliação",gestor:"Você avalia como gestor",par:"Você avalia um colega",liderado:"Você avalia o seu gestor"}),COR_RELACAO=Object.freeze({auto:"#64748b",gestor:"var(--gp-a)",par:"#0891b2",liderado:"#65a30d"}),SELO_ETAPA=Object.freeze({rascunho:"cinza",autoavaliacao:"azul",gestor:"azul",pares:"azul",calibracao:"ouro",devolutiva:"",encerrado:"cinza"}),seloEtapa=e=>`<span class="gp-selo ${SELO_ETAPA[e]??""}">${d(i.NOMES_ETAPA[e]||e)}</span>`;export function etapasHtml(e){const o=i.etapasDo(e.tipo),a=o.indexOf(e.etapa);return`<ol class="gd-etapas" aria-label="Etapas do ciclo">${o.map((r,t)=>`<li class="${t<a?"feita":t===a?"atual":""}"${t===a?' aria-current="step"':""}><span>${t<a?l("ok"):t+1}</span><b>${d(i.NOMES_ETAPA[r])}</b></li>`).join("")}</ol>`}export function etapasMini(e){const o=i.etapasDo(e.tipo),a=o.indexOf(e.etapa);return`<div class="gd-mini" aria-label="${d(`Etapa ${a+1} de ${o.length}: ${i.NOMES_ETAPA[e.etapa]}`)}"><span class="gd-mini-seg">${o.map((r,t)=>`<i class="${t<a||e.etapa==="encerrado"?"feita":t===a?"atual":""}" title="${d(i.NOMES_ETAPA[r])}"></i>`).join("")}</span><small>Etapa ${a+1} de ${o.length}</small>${seloEtapa(e.etapa)}</div>`}export const progresso=(e,o=pct(e),a="")=>`<span class="gd-prog ${a}"><i style="--v:${Math.round(Math.max(0,Math.min(1,Number(e)||0))*100)}%"></i><b>${d(o)}</b></span>`;export function anel(e,o=i.ESCALA_PADRAO,a=`de ${o.max}`){const r=e==null?0:Math.round((Number(e)-o.min)/(o.max-o.min)*100);return`<span class="gp-anel" style="--p:${Math.max(0,Math.min(100,r))}"><b>${d(nota(e))}<small>${d(a)}</small></b></span>`}export function notasPorCompetencia(e=[],o=[],a=i.ESCALA_PADRAO){const r=o.filter(n=>!n.oculto);if(!r.length)return"";const t=n=>`${Math.round((Number(n)-a.min)/(a.max-a.min)*100)}%`;return`<div class="gd-legenda">${r.map(n=>`<span><i style="background:${COR_RELACAO[n.relacao]}"></i>${d(n.rotulo||i.NOMES_RELACAO[n.relacao])}</span>`).join("")}</div>
    <div class="gd-comps">${e.map(n=>`<div class="gd-comp"><span class="gd-comp-n">${d(n.nome)}</span><div class="gd-comp-b">${r.map(p=>{const g=p.notas?.[n.id];return g==null?'<span class="gd-b vazio"><i></i><b>—</b></span>':`<span class="gd-b" title="${d(`${p.rotulo||i.NOMES_RELACAO[p.relacao]}: ${nota(g)}`)}"><i style="--v:${t(g)};--cor:${COR_RELACAO[p.relacao]}"></i><b>${d(nota(g))}</b></span>`}).join("")}</div></div>`).join("")}</div>`}export function seriesDe(e=[],o=[],a=360){return i.RELACOES[a].map(r=>{const t=e.filter(g=>g.relacao===r&&g.situacao==="enviada");if(!t.length)return null;const n=t.reduce((g,s)=>g+(s.n||1),0),p=t.length===1?t[0].notas:i.mediasPorCompetencia(t,o,r);return{relacao:r,n,notas:p,rotulo:`${i.NOMES_RELACAO[r]}${r==="par"||r==="liderado"?` (${n})`:""}`}}).filter(Boolean)}export function restrito(e,o,a="do RH"){e.innerHTML=`<div class="gp-vazio">${l("cadeado")}<h3>Esta tela é ${d(a)}</h3><p>O que é seu fica em <b>Minhas avaliações</b>, <b>Minha devolutiva</b> e <b>Metas e OKRs</b>.</p><div class="gp-acoes"><a class="btn" href="${d(o.rota({modulo:"gente",item:"avaliar"}))}">${l("tarefa")} Minhas avaliações</a></div></div>`}export function preparar(e){if(m(e),typeof document<"u"&&document.head&&!document.getElementById("mod-gente-desempenho-css")){const o=document.createElement("style");o.id="mod-gente-desempenho-css",o.textContent=c,document.head.append(o)}return e}const c=`
.mod-gente .gd-etapas{display:flex;gap:0;list-style:none;margin:0;padding:0;counter-reset:e;overflow-x:auto;scrollbar-width:none}
.mod-gente .gd-etapas::-webkit-scrollbar{display:none}
.mod-gente .gd-etapas li{flex:1 1 0;min-width:96px;display:flex;flex-direction:column;align-items:center;gap:6px;position:relative;text-align:center;font-size:12px;color:var(--texto3)}
.mod-gente .gd-etapas li::before{content:"";position:absolute;top:14px;left:-50%;right:50%;height:2px;background:var(--borda)}
.mod-gente .gd-etapas li:first-child::before{display:none}
.mod-gente .gd-etapas li.feita::before,.mod-gente .gd-etapas li.atual::before{background:var(--gp-a)}
.mod-gente .gd-etapas span{position:relative;z-index:1;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--painel);border:2px solid var(--borda);font-weight:700;font-size:12.5px;color:var(--texto3)}
.mod-gente .gd-etapas span .ic{width:14px;height:14px}
.mod-gente .gd-etapas li.feita span{background:var(--gp-a);border-color:var(--gp-a);color:#fff}
.mod-gente .gd-etapas li.atual span{border-color:var(--gp-a);color:var(--gp-a);box-shadow:0 0 0 5px var(--gp-af)}
.mod-gente .gd-etapas li.atual b{color:var(--texto)}
.mod-gente .gd-etapas b{font-weight:600;line-height:1.25}
.mod-gente .gp-selo .ic{width:13px;height:13px;margin-right:4px}
.mod-gente .gd-mini{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.mod-gente .gd-mini-seg{display:flex;gap:4px;flex:1 1 140px}
.mod-gente .gd-mini-seg i{flex:1;height:6px;border-radius:99px;background:var(--painel2)}
.mod-gente .gd-mini-seg i.feita{background:var(--gp-a)}
.mod-gente .gd-mini-seg i.atual{background:linear-gradient(90deg,var(--gp-a),var(--gp-a2));box-shadow:0 0 0 3px var(--gp-af)}
.mod-gente .gd-mini small{font-size:12px;color:var(--texto3);font-weight:600}
.mod-gente .gd-prog{display:flex;align-items:center;gap:10px;min-width:0}
.mod-gente .gd-prog i{flex:1;display:block;height:8px;border-radius:99px;background:var(--painel2);overflow:hidden;min-width:40px}
.mod-gente .gd-prog i::before{content:"";display:block;height:100%;width:var(--v);border-radius:inherit;background:linear-gradient(90deg,var(--gp-a),var(--gp-a2));transform-origin:left;animation:gp-cresce .9s cubic-bezier(.2,.7,.2,1) both}
.mod-gente .gd-prog.ouro i::before{background:linear-gradient(90deg,#d97706,#f59e0b)}
.mod-gente .gd-prog.verm i::before{background:linear-gradient(90deg,#dc2626,#ef4444)}
.mod-gente .gd-prog b{flex:none;min-width:38px;text-align:right;font-size:12.5px;font-weight:650;font-variant-numeric:tabular-nums}
.mod-gente .gd-ciclos{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:16px}
.mod-gente .gd-ciclo{display:flex;flex-direction:column;gap:14px;color:var(--texto);text-decoration:none!important;transition:transform .15s,border-color .15s}
.mod-gente a.gd-ciclo:hover{transform:translateY(-2px);border-color:color-mix(in srgb,var(--gp-a) 35%,var(--borda));color:var(--texto)}
.mod-gente .gd-ciclo-topo{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.mod-gente .gd-ciclo-topo h3{font-size:16px;font-weight:650;letter-spacing:-.01em;line-height:1.3}
.mod-gente .gd-ciclo-topo small{display:block;color:var(--texto3);font-size:12.5px;margin-top:2px}
.mod-gente .gd-tipo{flex:none;display:grid;place-items:center;width:46px;height:46px;border-radius:14px;background:var(--gp-grad);color:#fff;font-weight:700;font-size:13px;letter-spacing:-.02em}
.mod-gente .gd-fatos{display:flex;gap:18px;flex-wrap:wrap;font-size:12.5px;color:var(--texto3)}
.mod-gente .gd-fatos b{display:block;font-size:17px;color:var(--texto);font-weight:700;font-variant-numeric:tabular-nums}
.mod-gente .gd-aviso{display:flex;gap:10px;align-items:flex-start;padding:12px 14px;border-radius:12px;background:var(--gp-af);color:var(--texto2);font-size:13px;line-height:1.45}
.mod-gente .gd-aviso .ic{flex:none;width:17px;height:17px;color:var(--gp-a);margin-top:1px}
.mod-gente .gd-aviso.ouro{background:var(--ouro-bg)}.mod-gente .gd-aviso.ouro .ic{color:var(--ouro)}
/* avaliar */
.mod-gente .gd-av-lista{display:flex;flex-direction:column;gap:10px}
.mod-gente .gd-av{display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:14px;border:1px solid var(--borda);background:var(--painel);color:var(--texto);text-decoration:none!important;transition:border-color .15s,background-color .15s}
.mod-gente a.gd-av:hover{border-color:color-mix(in srgb,var(--gp-a) 40%,var(--borda));background:color-mix(in srgb,var(--gp-af) 60%,var(--painel));color:var(--texto)}
.mod-gente .gd-av .gp-tx{flex:1;display:flex;flex-direction:column;line-height:1.3;min-width:0}
.mod-gente .gd-av .gp-tx b{font-weight:600;font-size:14px}
.mod-gente .gd-av .gp-tx span{font-size:12.5px;color:var(--texto3)}
.mod-gente .gd-av.feita{opacity:.72}
.mod-gente .gd-form{display:flex;flex-direction:column;gap:12px}
.mod-gente .gd-q{padding:16px 18px;border-radius:14px;border:1px solid var(--borda);background:var(--painel);transition:border-color .15s,box-shadow .15s}
.mod-gente .gd-q.ok{border-color:color-mix(in srgb,var(--gp-a) 40%,var(--borda))}
.mod-gente .gd-q{margin:0;min-inline-size:0}
.mod-gente .gd-q legend{float:left;width:100%;display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;padding:0;font-weight:650;font-size:14.5px}
.mod-gente .gd-q legend+*{clear:both}
.mod-gente .gd-escala-leg{display:none;font-size:12px;color:var(--texto3);margin:0}
.mod-gente .gd-q legend small{font-weight:500;color:var(--texto3);font-size:12px}
.mod-gente .gd-q p{margin:4px 0 12px;color:var(--texto3);font-size:12.5px}
.mod-gente .gd-escala{display:grid;grid-template-columns:repeat(var(--n,5),minmax(0,1fr));gap:6px}
.mod-gente .gd-escala label{position:relative;display:flex;flex-direction:column;align-items:center;gap:3px;padding:10px 4px 9px;border-radius:12px;border:1px solid var(--borda);background:var(--painel2);cursor:pointer;text-align:center;transition:background-color .15s,border-color .15s,color .15s,transform .1s}
.mod-gente .gd-escala label:hover{border-color:color-mix(in srgb,var(--gp-a) 45%,var(--borda))}
.mod-gente .gd-escala input{position:absolute;opacity:0;pointer-events:none}
.mod-gente .gd-escala b{font-size:18px;font-weight:700;line-height:1}
.mod-gente .gd-escala small{font-size:11px;color:var(--texto3);line-height:1.2}
.mod-gente .gd-escala label:has(input:checked){background:var(--gp-a);border-color:var(--gp-a);color:#fff;transform:translateY(-1px);box-shadow:0 6px 16px -8px var(--gp-a)}
.mod-gente .gd-escala label:has(input:checked) small{color:rgba(255,255,255,.85)}
.mod-gente .gd-escala label:has(input:focus-visible){outline:2px solid var(--gp-a);outline-offset:2px}
.mod-gente .gd-escala input:disabled+b{opacity:.8}
.mod-gente .gd-form textarea{width:100%;min-height:96px;border-radius:12px;border:1px solid var(--borda);background:var(--painel);color:var(--texto);font:inherit;padding:10px 12px;resize:vertical}
.mod-gente .gd-form textarea:focus{outline:none;border-color:var(--gp-a);box-shadow:0 0 0 3px var(--gp-af)}
.mod-gente .gd-barra-fixa{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:12px 16px;margin-top:4px;border-radius:14px;background:var(--painel);border:1px solid var(--borda);box-shadow:var(--gp-sombra)}
.mod-gente .gd-barra-fixa .gd-prog{flex:1 1 180px}
/* notas por competência */
.mod-gente .gd-legenda{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:var(--texto3);margin-bottom:12px}
.mod-gente .gd-legenda span{display:inline-flex;align-items:center;gap:6px}
.mod-gente .gd-legenda i{width:10px;height:10px;border-radius:3px}
.mod-gente .gd-comps{display:flex;flex-direction:column;gap:12px}
.mod-gente .gd-comp{display:grid;grid-template-columns:minmax(120px,200px) minmax(0,1fr);gap:12px;align-items:center}
.mod-gente .gd-comp-n{font-size:13px;font-weight:600}
.mod-gente .gd-comp-b{display:flex;flex-direction:column;gap:4px}
.mod-gente .gd-b{display:flex;align-items:center;gap:8px}
.mod-gente .gd-b i{flex:1;height:7px;border-radius:99px;background:var(--painel2);position:relative;overflow:hidden}
.mod-gente .gd-b i::before{content:"";position:absolute;inset:0 auto 0 0;width:var(--v,0);border-radius:inherit;background:var(--cor,var(--gp-a));transform-origin:left;animation:gp-cresce .9s cubic-bezier(.2,.7,.2,1) both}
.mod-gente .gd-b.vazio i::before{display:none}
.mod-gente .gd-b b{flex:none;width:30px;text-align:right;font-size:12px;font-weight:650;font-variant-numeric:tabular-nums}
/* 9-box */
.mod-gente .gd-9{display:grid;grid-template-columns:28px repeat(3,minmax(0,1fr));grid-template-rows:repeat(3,minmax(132px,auto)) 28px;gap:8px}
.mod-gente .gd-9-eixo{display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:650;letter-spacing:.06em;text-transform:uppercase;color:var(--texto3)}
.mod-gente .gd-9-eixo.v{writing-mode:vertical-rl;transform:rotate(180deg)}
.mod-gente .gd-q9{position:relative;display:flex;flex-direction:column;gap:6px;padding:10px;border-radius:14px;border:1px dashed color-mix(in srgb,var(--texto3) 35%,transparent);background:color-mix(in srgb,var(--gp-a) calc(var(--f,0) * 1%),var(--painel));transition:border-color .15s,box-shadow .15s,background-color .15s}
.mod-gente .gd-q9 header{display:flex;align-items:center;justify-content:space-between;gap:6px;font-size:12px;font-weight:650;color:var(--texto2)}
.mod-gente .gd-q9 header small{font-weight:600;color:var(--texto3)}
.mod-gente .gd-q9.sobre{border-style:solid;border-color:var(--gp-a);box-shadow:0 0 0 4px var(--gp-af)}
.mod-gente .gd-q9-ps{display:flex;flex-wrap:wrap;gap:5px}
.mod-gente .gd-chip{display:inline-flex;align-items:center;gap:5px;max-width:100%;height:30px;padding:0 8px 0 3px;border-radius:999px;border:1px solid var(--borda);background:var(--painel);color:var(--texto);font:inherit;font-size:12px;font-weight:600;cursor:grab;box-shadow:0 1px 2px rgba(15,23,30,.06);transition:transform .12s,box-shadow .12s,border-color .12s}
.mod-gente .gd-q9-ps .gd-chip{flex:0 1 calc(50% - 3px);min-width:0;padding-left:10px}
.mod-gente .gd-q9-ps .gd-chip .gp-av{display:none}
.mod-gente .gd-chip:hover{border-color:var(--gp-a);transform:translateY(-1px);box-shadow:0 6px 14px -8px rgba(15,23,30,.4)}
.mod-gente .gd-chip:focus-visible{outline:2px solid var(--gp-a);outline-offset:2px}
.mod-gente .gd-chip.arrastando{opacity:.45;cursor:grabbing}
.mod-gente .gd-chip[disabled]{cursor:default}
.mod-gente .gd-chip .gp-av{width:24px;height:24px;font-size:9.5px}
.mod-gente .gd-chip>span:not(.gp-av){overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mod-gente .gd-chip em{margin-left:auto;font-style:normal;color:var(--texto3);font-weight:650;font-variant-numeric:tabular-nums}
.mod-gente .gd-bandeja{display:flex;flex-wrap:wrap;gap:6px;min-height:46px;padding:10px;border-radius:14px;border:1px dashed var(--borda);background:var(--painel2)}
.mod-gente .gd-bandeja.sobre{border-color:var(--gp-a);box-shadow:0 0 0 4px var(--gp-af)}
/* curva */
.mod-gente .gd-curva{display:grid;grid-template-columns:repeat(var(--n,5),minmax(0,1fr));gap:10px;align-items:end;height:170px;padding-top:10px}
.mod-gente .gd-curva div{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:6px}
.mod-gente .gd-curva i{display:block;width:62%;max-width:46px;height:var(--h);min-height:3px;border-radius:8px 8px 3px 3px;background:linear-gradient(180deg,var(--gp-a2),var(--gp-a));animation:gd-sobe .8s cubic-bezier(.2,.7,.2,1) both;transform-origin:bottom}
.mod-gente .gd-curva s{position:absolute;left:12%;right:12%;bottom:calc(var(--e) + 22px);border-top:2px dashed color-mix(in srgb,var(--texto3) 70%,transparent);text-decoration:none}
.mod-gente .gd-curva b{font-size:12px;font-variant-numeric:tabular-nums}
.mod-gente .gd-curva small{font-size:11.5px;color:var(--texto3)}
@keyframes gd-sobe{from{transform:scaleY(0)}to{transform:scaleY(1)}}
/* OKRs */
.mod-gente .gd-okrs{display:flex;flex-direction:column;gap:12px}
.mod-gente .gd-okr{border-radius:var(--gp-raio);border:1px solid var(--borda);background:var(--painel);box-shadow:var(--gp-sombra);overflow:hidden}
.mod-gente .gd-okr.empresa{border-color:color-mix(in srgb,var(--gp-a) 35%,var(--borda))}
.mod-gente .gd-okr-cab{display:flex;align-items:center;gap:14px;padding:16px 18px}
.mod-gente .gd-okr.empresa>.gd-okr-cab{background:var(--gp-grad);color:#fff}
.mod-gente .gd-okr.empresa>.gd-okr-cab :is(small,.gd-okr-meta){color:rgba(255,255,255,.78)}
.mod-gente .gd-okr.empresa>.gd-okr-cab .gp-selo{background:rgba(255,255,255,.16);color:#fff}
.mod-gente .gd-okr.empresa>.gd-okr-cab .btn{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.28);color:#fff}
.mod-gente .gd-okr.empresa>.gd-okr-cab .btn:hover{background:rgba(255,255,255,.22);color:#fff}
.mod-gente .gd-okr-cab .gp-tx{flex:1;display:flex;flex-direction:column;gap:3px;min-width:0}
.mod-gente .gd-okr-cab h3{font-size:15.5px;font-weight:650;letter-spacing:-.01em;line-height:1.3}
.mod-gente .gd-okr-meta{display:flex;gap:8px;flex-wrap:wrap;align-items:center;font-size:12.5px;color:var(--texto3)}
.mod-gente .gd-pz{--p:0;flex:none;display:grid;place-items:center;width:54px;height:54px;border-radius:50%;background:conic-gradient(var(--gp-a) calc(var(--p) * 1%),var(--painel2) 0);position:relative}
.mod-gente .gd-pz::before{content:"";position:absolute;inset:5px;border-radius:50%;background:var(--painel)}
.mod-gente .gd-pz b{position:relative;font-size:13px;font-weight:700;font-variant-numeric:tabular-nums}
.mod-gente .gd-okr.empresa>.gd-okr-cab .gd-pz{background:conic-gradient(#5eead4 calc(var(--p) * 1%),rgba(255,255,255,.18) 0)}
.mod-gente .gd-okr.empresa>.gd-okr-cab .gd-pz::before{background:#123b3a}
.mod-gente .gd-krs{display:flex;flex-direction:column;border-top:1px solid var(--linha)}
.mod-gente .gd-kr{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(140px,1fr) auto;gap:14px;align-items:center;padding:11px 18px;border-top:1px solid var(--linha);font-size:13px}
.mod-gente .gd-kr:first-child{border-top:0}
.mod-gente .gd-kr .gp-tx{display:flex;flex-direction:column;line-height:1.35;min-width:0}
.mod-gente .gd-kr .gp-tx span{font-size:12px;color:var(--texto3)}
.mod-gente .gd-filhos{padding:4px 14px 14px 30px;display:flex;flex-direction:column;gap:10px;position:relative;background:color-mix(in srgb,var(--painel2) 55%,transparent)}
.mod-gente .gd-filhos::before{content:"";position:absolute;left:16px;top:0;bottom:22px;width:2px;border-radius:2px;background:color-mix(in srgb,var(--gp-a) 40%,var(--borda))}
.mod-gente .gd-filhos>.gd-okr{box-shadow:none}
.mod-gente .gd-periodo{display:inline-flex;align-items:center;gap:4px;padding:3px;border-radius:12px;border:1px solid var(--borda);background:var(--painel)}
.mod-gente .gd-periodo b{padding:0 10px;font-size:13px;font-weight:650;white-space:nowrap}
.mod-gente .gd-periodo button{border:0;background:none;color:var(--texto2);width:32px;height:32px;border-radius:9px;cursor:pointer;display:grid;place-items:center}
.mod-gente .gd-periodo button:hover{background:var(--gp-af);color:var(--gp-a)}
.mod-gente .gd-periodo .ic{width:16px;height:16px}
.mod-gente .gd-periodo .gd-prox .ic{transform:rotate(180deg)}
.mod-gente .gd-modal-campos{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.mod-gente .gd-modal-campos .lg-all{grid-column:1/-1}
@media (max-width:760px){
  .mod-gente .gd-ciclos{grid-template-columns:minmax(0,1fr)}
  .mod-gente .gd-etapas li{min-width:74px;font-size:11px}
  .mod-gente .gd-escala-leg{display:block}.mod-gente .gd-escala{gap:4px}.mod-gente .gd-escala label{padding:9px 2px 8px}.mod-gente .gd-escala small{display:none}
  .mod-gente .gd-comp{grid-template-columns:minmax(0,1fr)}
  .mod-gente .gd-9{grid-template-columns:20px repeat(3,minmax(0,1fr));grid-template-rows:repeat(3,minmax(110px,auto)) 22px;gap:5px}
  .mod-gente .gd-q9{padding:7px;border-radius:10px}
  .mod-gente .gd-q9 header{font-size:10.5px;flex-direction:column;align-items:flex-start;gap:0}
  .mod-gente .gd-q9-ps .gd-chip .gp-av{display:inline-grid}
  .mod-gente .gd-q9-ps .gd-chip,.mod-gente .gd-chip{flex:none;height:28px;padding:0 2px;gap:0;border-radius:50%}.mod-gente .gd-chip em,.mod-gente .gd-chip>span:not(.gp-av){display:none}
  .mod-gente .gd-kr{grid-template-columns:minmax(0,1fr) auto;padding:11px 14px}
  .mod-gente .gd-kr .gd-prog{grid-column:1/-1;grid-row:2}
  .mod-gente .gd-filhos{padding:4px 8px 10px 18px}.mod-gente .gd-filhos::before{left:8px}
  .mod-gente .gd-okr-cab{padding:14px}
  .mod-gente .gd-modal-campos{grid-template-columns:minmax(0,1fr)}
}
`;
