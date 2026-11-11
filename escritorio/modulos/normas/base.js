/*! © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md. */
import{esc as n,ic as u,brl as k,dataBR as w}from"../../comum/nucleo.js";import{NORMAS as C,acharNorma as S,CONSULTADO_EM as E}from"../../motor/normas/catalogo.js";import{contaDoPlano as R,contaReferencial as j,totaisDaPartida as _,totaisDoExemplo as O}from"../../motor/normas/roteiros.js";import{NOMES_SITUACAO as y,comandoAprovar as T,normasCitadas as D}from"../../motor/normas/revisao.js";import{GLOSSARIO as A,textoFonte as P}from"../../motor/normas/glossario.js";import{guardadosDe as F}from"./guardados.js";export{n as esc,u as ic,k as brl,w as dataBR,E as CONSULTADO_EM};const L=`
.mod-normas{--nm-max:1100px;--nm-acc:var(--verde);--nm-acc-bg:var(--verde-bg);--nm-raio:var(--raio2,14px);--nm-dur:.45s}
.mod-normas .nm-cab{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px}
.mod-normas .nm-cab h1{font-size:21px;margin:0;overflow-wrap:anywhere;letter-spacing:-.02em}
.mod-normas .nm-cab .nm-sobre{display:block;font-size:11.5px;font-weight:650;letter-spacing:.06em;text-transform:uppercase;color:var(--nm-acc);margin-bottom:2px}
.mod-normas .nm-cab p{margin:4px 0 0;color:var(--texto2);font-size:13.5px;max-width:860px}
.mod-normas .nm-acoes{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.mod-normas .nm-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-bottom:12px}
.mod-normas .nm-kpi{background:var(--painel);border:1px solid var(--borda);border-radius:var(--raio);padding:9px 12px;min-width:0}
.mod-normas .nm-kpi small{display:block;color:var(--texto3);font-size:11.5px;text-transform:uppercase;letter-spacing:.02em}
.mod-normas .nm-kpi b{display:block;font-size:18px;font-variant-numeric:tabular-nums}
.mod-normas .nm-kpi span{display:block;color:var(--texto2);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mod-normas .nm-kpi.verde b{color:var(--verde)}.mod-normas .nm-kpi.ouro b{color:var(--ouro)}.mod-normas .nm-kpi.verm b{color:var(--verm)}.mod-normas .nm-kpi.azul b{color:var(--azul)}
.mod-normas .nm-aviso{display:flex;gap:10px;align-items:flex-start;border:1px solid var(--borda);border-left:4px solid var(--ouro);background:var(--painel);border-radius:var(--raio);padding:9px 12px;margin-bottom:10px;font-size:13px}
.mod-normas .nm-aviso.verm{border-left-color:var(--verm)}.mod-normas .nm-aviso.verde{border-left-color:var(--verde)}.mod-normas .nm-aviso.azul{border-left-color:var(--azul)}
.mod-normas .nm-aviso>.ic{flex:none;margin-top:2px}
.mod-normas .nm-aviso>div{min-width:0;flex:1;overflow-wrap:anywhere}
.mod-normas .nm-cartao{background:var(--painel);border:1px solid var(--borda);border-radius:var(--nm-raio);padding:12px 14px;min-width:0;margin-bottom:12px}
.mod-normas .nm-cartao h3{margin:0 0 8px;font-size:14.5px;display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.mod-normas .nm-cartao h3 a{color:inherit}
.mod-normas .nm-cartao h3>.ic{color:var(--nm-acc)}
.mod-normas .nm-cartao p{margin:4px 0;font-size:13.5px;overflow-wrap:anywhere}
.mod-normas .nm-grade{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}
.mod-normas .nm-duas{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(0,1fr);gap:14px;align-items:start}
.mod-normas .nm-def{display:grid;grid-template-columns:minmax(0,170px) minmax(0,1fr);gap:4px 10px;font-size:13px;margin:0}
.mod-normas .nm-def dt{color:var(--texto3)}.mod-normas .nm-def dd{margin:0;overflow-wrap:anywhere}
.mod-normas .nm-tab{width:100%;border-collapse:collapse;font-size:13px}
.mod-normas .nm-tab th{text-align:left;font-weight:600;color:var(--texto3);font-size:12px;border-bottom:1px solid var(--borda);padding:6px 8px}
.mod-normas .nm-tab td{border-bottom:1px solid var(--linha);padding:6px 8px;vertical-align:top;overflow-wrap:anywhere}
.mod-normas .nm-tab td.num,.mod-normas .nm-tab th.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.mod-normas .nm-tab tr.total td{font-weight:700;border-bottom:0}
.mod-normas .nm-tab tr.nm-pt td{padding-top:12px;color:var(--texto2)}
.mod-normas .nm-tab td.nm-cred{padding-left:26px}
.mod-normas .nm-fecha{display:inline-flex;align-items:center;gap:4px;color:var(--verde);font-weight:650}
.mod-normas .nm-fecha.nao{color:var(--verm)}
.mod-normas .nm-rolagem{overflow-x:auto;max-width:100%}
.mod-normas .nm-cod{font-family:var(--mono);font-size:11.5px;background:var(--painel2);border:1px solid var(--borda);border-radius:4px;padding:0 5px;overflow-wrap:anywhere}
.mod-normas .nm-comando{display:flex;gap:6px;align-items:stretch;flex-wrap:wrap;margin:6px 0}
.mod-normas .nm-comando code{flex:1 1 240px;min-width:0;font-family:var(--mono);font-size:12px;background:var(--painel2);border:1px solid var(--borda);border-radius:var(--raio);padding:6px 8px;overflow-wrap:anywhere}
.mod-normas .nm-item{border-top:1px dashed var(--borda);padding:8px 0;font-size:13.5px;min-width:0}
.mod-normas .nm-item:target,.mod-normas .nm-item.alvo{background:var(--azul-bg);border-radius:var(--raio);padding:8px}
.mod-normas .nm-item .n{font-weight:700;margin-right:6px}
.mod-normas .nm-item .s{color:var(--texto3);font-size:12px}
.mod-normas .nm-item p{margin:4px 0;white-space:pre-line;overflow-wrap:anywhere;line-height:1.6}
.mod-normas .nm-item.anterior{opacity:.65}
.mod-normas .nm-res{border-top:1px solid var(--linha);padding:11px 0;min-width:0}
.mod-normas .nm-res a.t{font-weight:600;font-size:14.5px}
.mod-normas .nm-res p{margin:4px 0;font-size:13px;color:var(--texto2);overflow-wrap:anywhere}
.mod-normas mark{background:var(--nm-marca,#fde68a);color:inherit;border-radius:3px;padding:0 1px}
:root[data-tema="escuro"] .mod-normas mark{--nm-marca:rgba(250,204,21,.28)}
@media (prefers-color-scheme:dark){:root:not([data-tema="claro"]) .mod-normas mark{--nm-marca:rgba(250,204,21,.28)}}
.mod-normas .nm-busca{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px}
.mod-normas .nm-busca input[type=search]{flex:1 1 260px;min-width:0;height:40px;font-size:15px}
.mod-normas .nm-filtros{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px}
.mod-normas .nm-filtros select,.mod-normas .nm-filtros input{min-width:0;max-width:100%}
.mod-normas .nm-fund li{margin:8px 0}
.mod-normas details.nm-det>summary{cursor:pointer;font-size:13px;color:var(--azul)}
.mod-normas .nm-texto-oficial{border-left:3px solid var(--borda2);padding:4px 10px;margin:6px 0;font-size:12.5px;color:var(--texto2);white-space:pre-line}
.mod-normas .nm-lista{margin:0;padding-left:20px;font-size:13.5px}.mod-normas .nm-lista li{margin:4px 0}
.mod-normas .nm-mut{color:var(--texto3);font-size:12.5px}
/* Busca em destaque (início, roteiros e busca) */
.mod-normas .nm-heroi{position:relative;overflow:hidden;border-radius:calc(var(--nm-raio) + 4px);padding:22px 22px 18px;margin-bottom:16px;background:linear-gradient(135deg,color-mix(in srgb,var(--nm-acc) 12%,var(--painel)),var(--painel) 62%);border:1px solid color-mix(in srgb,var(--nm-acc) 22%,var(--borda))}
.mod-normas .nm-heroi h1{font-size:25px;letter-spacing:-.025em;margin:0 0 4px}
.mod-normas .nm-heroi>p{margin:0 0 14px;color:var(--texto2);font-size:14px;max-width:720px}
.mod-normas .nm-heroi .nm-busca{margin:0}
.mod-normas .nm-heroi .nm-busca input[type=search]{height:48px;font-size:16px;border-radius:12px;padding-left:14px;background:var(--painel)}
.mod-normas .nm-heroi .nm-busca .btn{height:48px;padding:0 18px;border-radius:12px}
.mod-normas kbd.nm-tecla{font-family:var(--mono);font-size:11px;border:1px solid var(--borda2);border-bottom-width:2px;border-radius:5px;padding:0 5px;color:var(--texto2);background:var(--painel)}
.mod-normas .nm-chips{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-top:10px}
.mod-normas .nm-chips>span{font-size:12px;color:var(--texto3);margin-right:2px}
.mod-normas .nm-chip{display:inline-flex;align-items:center;gap:5px;min-height:30px;border:1px solid var(--borda);background:var(--painel);color:var(--texto);border-radius:999px;padding:3px 11px;font:inherit;font-size:12.5px;cursor:pointer;text-decoration:none!important;transition:border-color .15s,background-color .15s,transform .15s}
.mod-normas .nm-chip:hover{border-color:color-mix(in srgb,var(--nm-acc) 55%,var(--borda));background:var(--nm-acc-bg);color:var(--texto)}
.mod-normas .nm-chip[aria-pressed="true"],.mod-normas .nm-chip.atual{background:var(--nm-acc);border-color:var(--nm-acc);color:#fff}
.mod-normas .nm-chip b{font-variant-numeric:tabular-nums}
.mod-normas .nm-chip .ic{width:14px;height:14px}
/* Fatos comuns em cartões */
.mod-normas .nm-fatos{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px;margin-bottom:14px}
.mod-normas a.nm-fato{position:relative;display:flex;flex-direction:column;gap:6px;min-width:0;background:var(--painel);border:1px solid var(--borda);border-radius:var(--nm-raio);padding:13px 14px 12px;color:var(--texto);text-decoration:none!important;transition:transform .18s,box-shadow .2s,border-color .2s}
.mod-normas a.nm-fato:hover{transform:translateY(-2px);border-color:color-mix(in srgb,var(--nm-acc) 45%,var(--borda));box-shadow:0 10px 24px -16px color-mix(in srgb,var(--nm-acc) 70%,transparent)}
.mod-normas .nm-fato-ic{display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:var(--nm-acc-bg);color:var(--nm-acc)}
.mod-normas .nm-fato-ic .ic{width:18px;height:18px}
.mod-normas .nm-fato b{font-size:14.5px;line-height:1.3}
.mod-normas .nm-fato small{color:var(--texto2);font-size:12.5px;line-height:1.4}
.mod-normas .nm-fato .selo{align-self:flex-start;margin-top:auto}
.mod-normas .nm-secao-t{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:18px 0 8px;font-size:15px}
.mod-normas .nm-secao-t a{font-size:13px;font-weight:500}
/* Estrela dos favoritos */
.mod-normas .nm-estrela{display:inline-flex;align-items:center;gap:6px}
.mod-normas .nm-estrela[aria-pressed="true"] .ic{color:var(--ouro);fill:currentColor}
/* Termos do glossário: explicados ao passar o mouse, tocar ou com o Tab */
.mod-normas abbr.nm-termo{position:relative;text-decoration:underline dotted color-mix(in srgb,currentColor 55%,transparent);text-underline-offset:3px;cursor:help;border-radius:3px}
.mod-normas abbr.nm-termo:focus-visible{outline:2px solid var(--azul);outline-offset:2px}
.mod-normas abbr.nm-termo::after{content:attr(data-dica);position:absolute;left:50%;bottom:calc(100% + 8px);transform:translateX(-50%);z-index:60;width:max-content;max-width:min(300px,78vw);padding:8px 10px;border-radius:10px;background:var(--tinta,#0f172a);color:var(--tinta-txt,#fff);font-size:12.5px;font-weight:500;line-height:1.4;text-transform:none;letter-spacing:0;white-space:normal;text-align:left;box-shadow:0 10px 28px -12px rgba(0,0,0,.5);display:none;pointer-events:none}
.mod-normas abbr.nm-termo:hover::after,.mod-normas abbr.nm-termo:focus::after{display:block;animation:nm-aparece .12s ease-out both}
@keyframes nm-aparece{from{opacity:0}to{opacity:1}}
/* Índice das seções do roteiro */
.mod-normas .nm-indice{position:sticky;top:0;z-index:5;display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;padding:6px 0;margin:-4px 0 10px;background:color-mix(in srgb,var(--bg) 88%,transparent);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.mod-normas .nm-indice::-webkit-scrollbar{display:none}
.mod-normas .nm-indice button{flex:none;font:inherit;font-size:12.5px;padding:4px 10px;border:0;border-radius:999px;background:none;color:var(--texto2);cursor:pointer}
.mod-normas .nm-indice button:hover{background:var(--nm-acc-bg);color:var(--texto)}
.mod-normas [id^="nm-s-"]{scroll-margin-top:56px}
/* Simulador */
.mod-normas .nm-sim{border-color:color-mix(in srgb,var(--nm-acc) 35%,var(--borda));background:linear-gradient(180deg,color-mix(in srgb,var(--nm-acc) 5%,var(--painel)),var(--painel) 120px)}
.mod-normas .nm-sim-campos{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px 10px;margin:8px 0 10px}
.mod-normas .nm-sim-campos label{display:flex;flex-direction:column;gap:3px;font-size:12px;color:var(--texto2);min-width:0}
.mod-normas .nm-sim-campos input{height:36px;font-size:14px;font-variant-numeric:tabular-nums;text-align:right;min-width:0}
.mod-normas .nm-sim-resumo{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:6px;margin:8px 0}
.mod-normas .nm-sim-resumo div{background:var(--painel2);border-radius:var(--raio);padding:6px 10px;min-width:0}
.mod-normas .nm-sim-resumo small{display:block;color:var(--texto3);font-size:11.5px}
.mod-normas .nm-sim-resumo b{font-variant-numeric:tabular-nums}
/* "Como lançar?" guiado */
.mod-normas .nm-guia{max-width:820px}
.mod-normas .nm-trilha{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:0 0 12px;font-size:12.5px;color:var(--texto3)}
.mod-normas .nm-trilha button{border:0;background:var(--painel2);color:var(--texto2);border-radius:999px;padding:3px 10px;font:inherit;cursor:pointer}
.mod-normas .nm-trilha button:hover{background:var(--nm-acc-bg);color:var(--texto)}
.mod-normas .nm-pergunta h2{font-size:21px;letter-spacing:-.02em;margin:0 0 4px}
.mod-normas .nm-pergunta>p{color:var(--texto2);margin:0 0 12px}
.mod-normas .nm-opcoes{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px}
.mod-normas button.nm-opcao{display:flex;gap:10px;align-items:flex-start;text-align:left;width:100%;min-height:56px;padding:12px 14px;border:1px solid var(--borda);border-radius:var(--nm-raio);background:var(--painel);color:var(--texto);font:inherit;cursor:pointer;transition:border-color .15s,transform .15s,box-shadow .2s}
.mod-normas button.nm-opcao:hover{border-color:var(--nm-acc);transform:translateY(-1px);box-shadow:0 8px 20px -14px color-mix(in srgb,var(--nm-acc) 80%,transparent)}
.mod-normas button.nm-opcao b{display:block;font-size:14px;font-weight:600}
.mod-normas button.nm-opcao small{display:block;color:var(--texto3);font-size:12.5px;margin-top:2px}
.mod-normas button.nm-opcao .nm-n{flex:none;display:grid;place-items:center;width:24px;height:24px;border-radius:7px;background:var(--nm-acc-bg);color:var(--nm-acc);font-size:12px;font-weight:700}
.mod-normas .nm-conclusao{border:1px solid color-mix(in srgb,var(--nm-acc) 40%,var(--borda));border-left:4px solid var(--nm-acc);border-radius:var(--nm-raio);background:var(--painel);padding:14px 16px}
.mod-normas .nm-conclusao h2{font-size:19px;margin:0 0 6px}
/* Linha do tempo (IFRS 18) */
.mod-normas .nm-tempo{list-style:none;margin:6px 0 0;padding:0 0 0 18px;border-left:2px solid var(--borda)}
.mod-normas .nm-tempo li{position:relative;margin:0 0 12px;padding-left:8px;font-size:13.5px}
.mod-normas .nm-tempo li::before{content:"";position:absolute;left:-25px;top:4px;width:12px;height:12px;border-radius:50%;background:var(--painel);border:2px solid var(--borda2)}
.mod-normas .nm-tempo li.feito::before{background:var(--nm-acc);border-color:var(--nm-acc)}
.mod-normas .nm-tempo li.proximo::before{border-color:var(--nm-acc);box-shadow:0 0 0 4px color-mix(in srgb,var(--nm-acc) 22%,transparent)}
.mod-normas .nm-tempo b{display:block}
.mod-normas .nm-contagem{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.mod-normas .nm-contagem b{font-size:34px;letter-spacing:-.03em;color:var(--nm-acc);font-variant-numeric:tabular-nums;line-height:1}
/* Comparador CPC × IFRS */
.mod-normas .nm-lado{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.mod-normas .nm-lado>div{border:1px solid var(--borda);border-radius:var(--raio);padding:10px 12px;min-width:0;background:var(--painel2)}
.mod-normas .nm-lado h4{margin:0 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:var(--texto3)}
.mod-normas .nm-lado b.nm-codigo{display:block;font-size:20px;letter-spacing:-.02em}
.mod-normas .selo.ifrs{background:color-mix(in srgb,#0e7490 14%,transparent);color:#0e7490}
:root[data-tema="escuro"] .mod-normas .selo.ifrs{color:#67e8f9}
@media (prefers-color-scheme:dark){:root:not([data-tema="claro"]) .mod-normas .selo.ifrs{color:#67e8f9}}
/* Entrada suave (sem movimento com prefers-reduced-motion) */
.mod-normas .nm-entra>*{animation:nm-sobe var(--nm-dur) cubic-bezier(.2,.7,.2,1) both}
.mod-normas .nm-entra>:nth-child(2){animation-delay:.04s}.mod-normas .nm-entra>:nth-child(3){animation-delay:.08s}.mod-normas .nm-entra>:nth-child(4){animation-delay:.12s}
.mod-normas .nm-entra>:nth-child(5){animation-delay:.16s}.mod-normas .nm-entra>:nth-child(n+6){animation-delay:.2s}
@keyframes nm-sobe{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.mod-normas *{animation:none!important;transition:none!important}}
@media (max-width:900px){.mod-normas .nm-duas{grid-template-columns:minmax(0,1fr)}}
@media (max-width:760px){
  .mod-normas .nm-cab h1{font-size:19px}
  .mod-normas .nm-heroi{padding:16px 14px 14px}
  .mod-normas .nm-heroi h1{font-size:21px}
  .mod-normas .nm-heroi .nm-busca .btn{flex:1 1 auto}
  .mod-normas .nm-so-teclado{display:none}
  .mod-normas .nm-def{grid-template-columns:minmax(0,1fr)}
  .mod-normas .nm-def dt{margin-top:4px}
  .mod-normas .nm-grade,.mod-normas .nm-lado{grid-template-columns:minmax(0,1fr)}
  .mod-normas .nm-tab.empilha thead{display:none}
  .mod-normas .nm-tab.empilha tr{display:block;border-bottom:1px solid var(--borda);padding:6px 0}
  .mod-normas .nm-tab.empilha td{display:block;border:0;padding:2px 4px}
  .mod-normas .nm-tab.empilha td[data-r]::before{content:attr(data-r) ': ';color:var(--texto3);font-size:12px}
  .mod-normas .nm-tab td.nm-cred{padding-left:12px}
}
@media print{.mod-normas .nm-indice,.mod-normas .nm-acoes,.mod-normas .nm-sim-campos{display:none}}`;export function preparar(a){if(typeof document<"u"&&!document.getElementById("mod-normas-css")){const o=document.createElement("style");o.id="mod-normas-css",o.textContent=L,document.head.append(o)}return a?.classList?.add("mod-normas"),a}export const cabecalho=(a,o="",r="",e="")=>`<div class="nm-cab"><div>${e?`<span class="nm-sobre">${n(e)}</span>`:""}<h1>${n(a)}</h1>${o?`<p>${o}</p>`:""}</div>${r?`<div class="nm-acoes">${r}</div>`:""}</div>`,kpi=(a,o,r="",e="")=>`<div class="nm-kpi ${e}"><small>${n(a)}</small><b>${n(o)}</b>${r?`<span>${n(r)}</span>`:""}</div>`,aviso=(a,o="")=>`<div class="nm-aviso ${o}">${u(o==="verde"?"ok":o==="azul"?"info":"alerta")}<div>${a}</div></div>`,selo=(a,o="",r="")=>`<span class="selo ${o}">${r?u(r):""}${n(a)}</span>`,aConferir=(a="a conferir")=>selo(a,"ouro","alerta");const g=a=>k(a).replace(/^R\$\s?/,"");export const valorBR=g,link=(a,o,r=[],e="",t="",s=null)=>`<a ${t?`class="${t}" `:""}href="${n(a.rota({modulo:a.modulo?.id||"normas",item:o,params:r,...s?{query:s}:{}}))}">${e}</a>`,rotaDe=(a,o,r=[],e=null)=>a.rota({modulo:a.modulo?.id||"normas",item:o,params:r,...e?{query:e}:{}});export function revisorLocal(){try{return/^(localhost|127\.0\.0\.1|\[::1\])$/.test(globalThis.location?.hostname||"")}catch{return!1}}export function seloRoteiro(a){return a.valido?selo(`${y.revisado} · ${a.revisao.nome}, CRC ${a.revisao.crc}, ${w(a.revisao.data)}`,"verde","escudo"):a.situacao==="vencido"?selo(y.vencido,"verm","alerta"):selo(y.aguarda,"ouro","relogio")}export const seloSituacao=a=>a.situacao==="vigente"?selo("Vigente","verde"):selo(a.nota?`${{revogada:"Revogada",transformada:"Transformada","nao-editado":"Não editado"}[a.situacao]||a.situacao}`:a.situacao,a.situacao==="revogada"?"verm":"");export function linkNorma(a,o,r=null,e=null){const t=S(o,C),s=n(e??(r?`${o}, item ${r}`:o));if(!t)return s;const l=r?String(r).split(/\s*(?:,|;| e | a )\s*/)[0].replace(/\(.*$/,""):null;return link(a,"normas",l?[t.slug,l]:[t.slug],s)}export const FATOS=Object.freeze({"cpc06-aluguel-antecipado-curto-prazo":{frase:"Paguei aluguel adiantado",icone:"agenda"},"cpc27-veiculo-financiado":{frase:"Comprei um carro financiado",icone:"banco"},"cpc47-venda-entrega-futura":{frase:"Recebi do cliente antes de entregar",icone:"carrinho"},"cpc27-depreciacao-valor-residual":{frase:"Comprei uma máquina e vou depreciar",icone:"engrenagem"},"cpc48-perda-estimada-credito":{frase:"O cliente pode não pagar",icone:"alerta"},"cpc25-provisao-contingencia":{frase:"A empresa tem um processo trabalhista",icone:"escudo"},"cpc06-arrendamento-arrendatario":{frase:"Aluguei um bem por mais de 12 meses",icone:"predio"},"cpc12-avp-recebivel":{frase:"Vendi a prazo com juros embutidos",icone:"calc"},"cpc07-subvencao-governamental":{frase:"Recebi dinheiro do governo para comprar um bem",icone:"estrela"},"ibs-cbs-compra-venda":{frase:"Comprei e vendi com IBS e CBS",icone:"tabela"}}),fatoDe=a=>FATOS[a.id]||{frase:a.titulo,icone:"livro"},EXEMPLOS_BUSCA=Object.freeze(["paguei aluguel adiantado","comprei um carro financiado","cliente não pagou","leasing","PCLD","CPC 47 item 31","IFRS 18 subtotais"]);export function cartaoFato(a,o,r){const e=fatoDe(o);return`<a class="nm-fato" href="${n(rotaDe(a,"roteiros",[o.id]))}" data-fato="${n(o.id)}"><span class="nm-fato-ic">${u(e.icone)}</span><b>${n(e.frase)}</b><small>${n(o.titulo)}</small><span class="nm-mut">${n(D(o).join(" · "))}</span>${r?seloRoteiro(r):""}</a>`}export function termo(a,o=null){const r=A[a],e=o??r?.termo??a;if(!r)return n(e);const t=`${r.texto}${r.fonte?` (${P(r.fonte)})`:""}`;return`<abbr class="nm-termo" tabindex="0" data-termo="${n(a)}" data-dica="${n(t)}" aria-label="${n(`${e}: ${t}`)}">${n(e)}</abbr>`}const N=Object.freeze([["arrendamento de curto prazo","curto-prazo"],["valor residual","valor-residual"],["vida útil","vida-util"],["valor depreciável","valor-depreciavel"],["direito de uso","direito-de-uso"],["passivo de arrendamento","passivo-arrendamento"],["taxa incremental","taxa-incremental"],["obrigação de performance","obrigacao-performance"],["passivo de contrato","passivo-contrato"],["preço da transação","preco-transacao"],["valor justo","valor-justo"],["custo amortizado","custo-amortizado"],["taxa efetiva","juros-efetivos"],["perda de crédito esperada","perda-esperada"],["perdas de crédito esperadas","perda-esperada"],["matriz de provisão","matriz-provisao"],["passivo contingente","passivo-contingente"],["regime de competência","competencia"],["subvenção governamental","subvencao"],["despesa antecipada","despesa-antecipada"],["ativo qualificável","ativo-qualificavel"],["plano referencial","plano-referencial"],["valor recuperável","valor-recuperavel"],["faturar e manter","faturar-manter"],["ajuste a valor presente","avp"]]),M=a=>a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),q=N.map(([a,o])=>[new RegExp(`(?<![\\p{L}\\p{N}])${M(a)}(?![\\p{L}\\p{N}])`,"iu"),o]);export function comTermos(a){let o=n(a);const r=[];for(const[e,t]of q)o=o.replace(e,s=>(r.push(termo(t,s)),`\0${r.length-1}\0`));return o.replace(/\u0000(\d+)\u0000/g,(e,t)=>r[Number(t)])}export const guardados=a=>F(a?.usuario?.id);export function botaoEstrela(a,o,{peq:r=!1}={}){const e=guardados(a).eFavorito(o.tipo,o.id);return`<button type="button" class="btn${r?" peq":""} nm-estrela" data-estrela="${n(JSON.stringify(o))}" aria-pressed="${e}" title="${e?"Tirar dos favoritos":"Guardar nos favoritos (fica neste navegador)"}">${u("estrela")}<span>${e?"Favorito":"Favoritar"}</span></button>`}export function ligarEstrelas(a,o,r=null){a.addEventListener("click",e=>{const t=e.target.closest?.("[data-estrela]");if(!t||!a.contains(t))return;let s=null;try{s=JSON.parse(t.dataset.estrela)}catch{return}const l=guardados(o).alternar(s);t.setAttribute("aria-pressed",String(l)),t.title=l?"Tirar dos favoritos":"Guardar nos favoritos (fica neste navegador)";const x=t.querySelector("span");x&&(x.textContent=l?"Favorito":"Favoritar"),r?.(l?"Guardado nos favoritos.":"Tirado dos favoritos.")})}export function htmlPartidas(a,o,{totalRotulo:r="Total"}={}){const e=a.contas||{},t=d=>n(e[d]?.nome||d);let s=0,l=0,x=o.length>0;return`<div class="nm-rolagem"><table class="nm-tab nm-partidas"><thead><tr><th>Conta</th><th class="num">Débito</th><th class="num">Crédito</th></tr></thead><tbody>${o.map(d=>{const f=_(d);s+=Math.round(f.debitos*100),l+=Math.round(f.creditos*100),x=x&&f.fecha;const m=(a.lancamentos||[]).find(c=>c.id===d.lancamento),p=[...d.linhas].sort((c,i)=>c.tipo===i.tipo?0:c.tipo==="D"?-1:1);return`<tr class="nm-pt"><td colspan="3"><b>${n(w(d.data))}</b> · ${n(m?.evento||d.lancamento)} — <span class="nm-mut">${n(d.historico)}</span></td></tr>
      ${p.map(c=>`<tr><td class="${c.tipo==="C"?"nm-cred":""}">${c.tipo==="C"?'<span class="nm-mut">a</span> ':""}${t(c.conta)}</td><td class="num">${c.tipo==="D"?g(c.valor):""}</td><td class="num">${c.tipo==="C"?g(c.valor):""}</td></tr>`).join("")}
      <tr class="total"><td>${f.fecha?`<span class="nm-fecha">${u("ok")} fecha</span>`:`<span class="nm-fecha nao">${u("alerta")} não fecha</span>`}</td><td class="num">${g(f.debitos)}</td><td class="num">${g(f.creditos)}</td></tr>`}).join("")}
    <tr class="total"><td>${n(r)} ${x?selo("débitos = créditos","verde","ok"):selo("não fecha","verm","alerta")}</td><td class="num">${g(s/100)}</td><td class="num">${g(l/100)}</td></tr></tbody></table></div>`}export const SECOES_ROTEIRO=Object.freeze([["quando","Quando usar"],["lancamentos","Lançamentos"],["simulador","Simular"],["exemplo","Exemplo"],["contas","Contas"],["fundamento","Fundamento"],["vigencia","Vigência e avisos"]]);export function htmlRoteiro(a,o,r,{citacoes:e=new Map,motor:t=null,simulador:s=!1,indice:l=!1}={}){const x=o.contas||{},v=i=>n(x[i]?.nome||i),d=(o.lancamentos||[]).map(i=>`<tr><td data-r="Evento"><b>${n(i.evento)}</b></td><td data-r="Débito">${i.debito.map(v).join("<br>")}</td><td data-r="Crédito">${i.credito.map(v).join("<br>")}</td><td data-r="Histórico">${n(i.historico)}</td><td data-r="Base de cálculo">${comTermos(i.base)}</td></tr>`).join(""),f=([,i])=>{const b=i.escritorio?R(i.escritorio):null,$=i.referencial?j(i.referencial):null;return`<tr><td data-r="Conta"><b>${n(i.nome)}</b><br><span class="mut">${n(i.natureza||"")}</span></td>
      <td data-r="Plano do Escritório">${b?`<span class="nm-cod">${n(b.classificacao)}</span> ${n(b.nome)}`:`${selo("criar no plano","azul")} <span class="mut">${n(i.sugestao||"")}</span>`}</td>
      <td data-r="Plano referencial">${$?`<span class="nm-cod">${n($.codigo)}</span> ${n($.descricao)} ${aConferir("referencial a conferir")}`:'<span class="mut">a definir com a tabela oficial do PVA</span>'}</td></tr>`},m=(o.fundamento||[]).map(i=>{const b=e.get(`${i.norma}|${i.item}`),$=i.conferir?aConferir("a conferir no texto oficial"):b?.existe===!1?selo("item não achado no texto importado","verm","alerta"):selo("conferido no texto oficial","verde","ok");return`<li><b>${linkNorma(a,i.norma,i.item,`${i.norma}, item ${i.item}`)}</b> ${$}<br>${comTermos(i.texto)}
      ${b?.textos?.length?`<details class="nm-det"><summary>Ver o texto oficial do item</summary>${b.textos.map(z=>`<div class="nm-texto-oficial"><b>${n(z.numero)}.</b> ${n(z.texto)}</div>`).join("")}</details>`:""}</li>`}).join(""),p=O(o),c=SECOES_ROTEIRO.filter(([i])=>s||i!=="simulador");return`
    ${l?`<nav class="nm-indice" aria-label="Partes do roteiro">${c.map(([i,b])=>`<button type="button" data-ir="nm-s-${i}">${n(b)}</button>`).join("")}</nav>`:""}
    <div class="nm-cartao" id="nm-s-quando"><h3>${seloRoteiro(r)}</h3>
      ${r.valido?"":aviso(`<b>Sugestão a conferir.</b> Este roteiro ainda não foi revisado por contador${r.situacao==="vencido"?" (o selo anterior caiu: "+n(r.motivos.join(" "))+")":""}. Use como ponto de partida e confira o fundamento antes de lançar.`)}
      <p><b>Quando usar:</b> ${comTermos(o.quando)}</p>
      <p class="mut">Palavras-chave: ${(o.palavras||[]).map(n).join(" · ")}</p></div>
    <div class="nm-cartao" id="nm-s-lancamentos"><h3>${u("livro")} Lançamentos</h3><div class="nm-rolagem"><table class="nm-tab empilha"><thead><tr><th>Evento</th><th>Débito</th><th>Crédito</th><th>Histórico</th><th>Base de cálculo</th></tr></thead><tbody>${d}</tbody></table></div></div>
    ${s?`<section class="nm-cartao nm-sim" id="nm-s-simulador" data-simulador aria-labelledby="nm-sim-t"><h3 id="nm-sim-t">${u("calc")} Simule com os seus valores</h3><p class="mut">Carregando o simulador…</p></section>`:""}
    <div class="nm-cartao" id="nm-s-exemplo"><h3>${u("calc")} Exemplo numérico ${p.fecha?selo("débitos = créditos","verde","ok"):selo("não fecha","verm","alerta")}</h3>
      <p>${comTermos(o.exemplo?.enunciado||"")}</p>
      ${t?`<p>${t}</p>`:""}
      ${htmlPartidas(o,o.exemplo?.partidas||[],{totalRotulo:"Total do exemplo"})}</div>
    <div class="nm-cartao" id="nm-s-contas"><h3>${u("doc")} Contas sugeridas <span class="nm-mut" style="font-weight:400">· ${termo("plano-referencial","plano referencial")} da ECD</span></h3><div class="nm-rolagem"><table class="nm-tab empilha"><thead><tr><th>Conta</th><th>Plano do Escritório (modelo)</th><th>Plano referencial da ECD</th></tr></thead><tbody>${Object.entries(x).map(f).join("")}</tbody></table></div></div>
    <div class="nm-cartao" id="nm-s-fundamento"><h3>${u("escudo")} Fundamento</h3><ul class="nm-lista nm-fund">${m}</ul></div>
    <div class="nm-cartao" id="nm-s-vigencia"><h3>${u("relogio")} Vigência</h3><p>${n(o.vigencia?.texto||"")} ${o.vigencia?.conferir?aConferir():""}</p>
      ${(o.avisos||[]).length?`<h3 style="margin-top:12px">${u("alerta")} Avisos</h3><ul class="nm-lista">${o.avisos.map(i=>`<li>${comTermos(i)}</li>`).join("")}</ul>`:""}</div>
    <p class="mut" style="font-size:12px">Resumo SHA-256 do conteúdo: <span class="nm-cod">${n(r.resumo.slice(0,16))}…</span>${r.valido?"":revisorLocal()?` · para aprovar (só o dono): <span class="nm-cod">${n(T(o.id))}</span>`:" · o selo é gravado pelo contador revisor, com nome e CRC, e cai sozinho se o conteúdo mudar."}</p>`}export async function conferirCitacoes(a,o,r){const e=new Map;for(const t of a.fundamento||[]){if(!o.tem(t.norma))continue;const s=r(t.item),l=[];for(const x of s){const v=await o.item(t.norma,x);v&&l.push(v)}e.set(`${t.norma}|${t.item}`,{existe:l.length===s.length,textos:l})}return e}const B=(a,o=105)=>Math.max(1,Math.ceil(String(a).length/o)),h=(a,o={})=>({_texto:a,_linhas:B(a),...o});export function modeloImpressao({ctx:a,r:o,s:r,partidas:e=null,simulado:t=!1,montarRelatorio:s,baseRelatorio:l}){const x=o.contas||{},v=m=>o.lancamentos?.find(p=>p.id===m)?.evento||m,d=[{_secao:"Quando usar"},h(o.quando),{_branco:!0},{_secao:"Lançamentos"},...(o.lancamentos||[]).map(m=>h(`${m.evento}: D ${m.debito.map(p=>x[p]?.nome||p).join(" + ")} · C ${m.credito.map(p=>x[p]?.nome||p).join(" + ")} — base: ${m.base}`)),{_branco:!0},{_secao:t?"Partidas simuladas com os valores informados":"Exemplo numérico"},...t?[]:[h(o.exemplo?.enunciado||"")]];for(const m of e||o.exemplo?.partidas||[]){d.push({data:m.data,conta:`${v(m.lancamento)} — ${m.historico}`,_negrito:!0,_semTotal:!0});for(const p of[...m.linhas].sort((c,i)=>c.tipo===i.tipo?0:c.tipo==="D"?-1:1))d.push({data:"",conta:`${p.tipo==="C"?"    a ":""}${x[p.conta]?.nome||p.conta}`,debito:p.tipo==="D"?p.valor:null,credito:p.tipo==="C"?p.valor:null})}d.push({_branco:!0},{_secao:"Fundamento"},...(o.fundamento||[]).map(m=>h(`${m.norma}, item ${m.item}${m.conferir?" (a conferir no texto oficial)":""}: ${m.texto}`))),d.push({_branco:!0},{_secao:"Vigência"},h(o.vigencia?.texto||"")),(o.avisos||[]).length&&d.push({_branco:!0},{_secao:"Avisos"},...o.avisos.map(m=>h(`• ${m}`))),d.push({_branco:!0},h(r?.valido?`Revisado por contador: ${r.revisao.nome}, CRC ${r.revisao.crc}, em ${w(r.revisao.data)}.`:"Sugestão a conferir: este roteiro ainda não foi revisado por contador. Confira o fundamento antes de lançar.",{_negrito:!0}));const f=l(a,null);return s({...f,empresa:null,rodape:{...f.rodape||{},sistema:"Jarvis Normas"},titulo:o.titulo,subtitulo:`Roteiro de lançamento · ${t?"valores simulados":"exemplo do roteiro"} · ${r?.valido?"revisado por contador":"aguarda revisão"}`,colunas:[{id:"data",rotulo:"Data",tipo:"data",largura:20},{id:"conta",rotulo:"Evento e contas",flex:1},{id:"debito",rotulo:"Débito",tipo:"moeda",total:"soma",largura:28},{id:"credito",rotulo:"Crédito",tipo:"moeda",total:"soma",largura:28}],linhas:d,totais:{rotulo:"Total (débitos = créditos)"},nomeArquivo:`Roteiro - ${o.titulo}`})}
