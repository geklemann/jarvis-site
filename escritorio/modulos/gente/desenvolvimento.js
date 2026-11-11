/*! © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md. */
import{esc as i,ic as d,baixar as p}from"../../comum/nucleo.js";import*as n from"../../motor/gente/desenvolvimento.js";import{preparar as l,nota as c}from"./desempenho.js";export{n as V,c as nota};export{restrito}from"./desempenho.js";export function avaliadoDe(e,o=[]){const a=e?.avaliado;return a?n.avaliadoPorCompetencia({competencias:o,ciclo:{tipo:a.tipo,pesos:a.pesos},porRelacao:a.por_relacao}):{}}export const porCargo=(e=[])=>e.reduce((o,a)=>{var t;return(o[t=a.cargo_id]||(o[t]=[])).push(a),o},{}),COR_SITUACAO=Object.freeze({atende:"",perto:"ouro",lacuna:"verm","sem avaliação":"cinza"}),ROTULO_SITUACAO=Object.freeze({atende:"Atende",perto:"Perto",lacuna:"Lacuna","sem avaliação":"Sem avaliação"}),seloSituacao=e=>`<span class="gp-selo ${COR_SITUACAO[e]??""}">${i(ROTULO_SITUACAO[e]||e)}</span>`,COR_PRAZO=Object.freeze({atrasada:"verm",vence:"ouro","no prazo":"cinza"}),COR_ACAO=Object.freeze({pendente:"cinza",andamento:"azul",concluida:"",cancelada:"cinza"}),ICONE_CONTEUDO=Object.freeze({link:"link",arquivo:"doc",presencial:"equipe"}),COR_RISCO=Object.freeze({descoberto:"verm",frágil:"ouro",atenção:"azul",coberto:""}),COR_PRONTIDAO=Object.freeze({agora:"","1-2":"azul","3+":"cinza"}),anelPct=(e,o=`${Math.round((Number(e)||0)*100)}%`,a="")=>`<span class="gv-anel ${a}" style="--p:${Math.round(Math.max(0,Math.min(1,Number(e)||0))*100)}"><b>${i(o)}</b></span>`;export function barra702010(e,{legenda:o=!0}={}){return`<div class="gv-702010"><div class="gv-702010-b">${Object.entries(n.TIPOS_ACAO).map(([t,r])=>`<i class="t-${t}" style="width:${e.pct[t]}%" title="${i(`${r.rotulo}: ${e.pct[t]}%`)}"></i>`).join("")}<s style="left:70%"></s><s style="left:90%"></s></div>
    ${o?`<div class="gv-702010-l">${Object.entries(n.TIPOS_ACAO).map(([t,r])=>`<span><i class="t-${t}"></i>${i(r.rotulo)} <b>${e.pct[t]}%</b> <small>(ref. ${r.pct}%)</small></span>`).join("")}</div>`:""}</div>`}export async function baixarCertificado(e,o,a=null){const t=await e.api.rpc("gente_certificado",{p_trilha:o,p_empregado:a});if(!t)throw new Error("Certificado não encontrado.");const r=n.pdfCertificado({...t,ficticio:e.api?.modo==="demo"}),g=`certificado-${String(t.trilha).normalize("NFD").replace(/[^\w]+/g,"-").toLowerCase()}-${String(t.nome).split(" ")[0].normalize("NFD").replace(/[^\w]+/g,"").toLowerCase()}.pdf`;return p(g,new Blob([r],{type:"application/pdf"})),t}export function preparar(e){if(l(e),typeof document<"u"&&document.head&&!document.getElementById("mod-gente-desenvolvimento-css")){const o=document.createElement("style");o.id="mod-gente-desenvolvimento-css",o.textContent=x,document.head.append(o)}return e}export{d as ic};const x=`
.mod-gente .gv-anel{--p:0;flex:none;display:grid;place-items:center;width:58px;height:58px;border-radius:50%;background:conic-gradient(var(--gp-a) calc(var(--p) * 1%),var(--painel2) 0);position:relative}
.mod-gente .gv-anel::before{content:"";position:absolute;inset:6px;border-radius:50%;background:var(--painel)}
.mod-gente .gv-anel b{position:relative;font-size:13.5px;font-weight:700;font-variant-numeric:tabular-nums}
.mod-gente .gv-anel.g{width:84px;height:84px}.mod-gente .gv-anel.g b{font-size:18px}
.mod-gente .gp-heroi .gv-anel{background:conic-gradient(#5eead4 calc(var(--p) * 1%),rgba(255,255,255,.16) 0)}
.mod-gente .gp-heroi .gv-anel::before{background:#123b3a}
/* mapa de lacunas */
.mod-gente .gv-mapa-caixa{overflow-x:auto;border-radius:var(--gp-raio);border:1px solid var(--borda);background:var(--painel);box-shadow:var(--gp-sombra)}
.mod-gente .gv-mapa{border-collapse:separate;border-spacing:0;width:100%;min-width:720px;font-size:12.5px}
.mod-gente .gv-mapa th{position:sticky;top:0;background:var(--painel2);color:var(--texto3);font-size:11px;font-weight:650;text-transform:uppercase;letter-spacing:.04em;padding:10px 8px;text-align:center;border-bottom:1px solid var(--borda);white-space:normal;line-height:1.25}
.mod-gente .gv-mapa th:first-child,.mod-gente .gv-mapa td:first-child{text-align:left;position:sticky;left:0;z-index:1;background:var(--painel);min-width:220px;padding-left:16px}
.mod-gente .gv-mapa th:first-child{background:var(--painel2);z-index:2}
.mod-gente .gv-mapa td{padding:6px;border-top:1px solid var(--linha);text-align:center}
.mod-gente .gv-mapa tr[data-pessoa]{cursor:pointer}
.mod-gente .gv-mapa tr[data-pessoa]:hover td{background:color-mix(in srgb,var(--gp-af) 70%,var(--painel))}
.mod-gente .gv-cel{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;min-width:58px;height:40px;border-radius:10px;font-variant-numeric:tabular-nums;line-height:1.1}
.mod-gente .gv-cel b{font-size:13px}.mod-gente .gv-cel small{font-size:10.5px;opacity:.8}
.mod-gente .gv-cel.atende{background:var(--gp-af);color:var(--gp-a)}
.mod-gente .gv-cel.perto{background:var(--ouro-bg);color:var(--ouro)}
.mod-gente .gv-cel.lacuna{background:var(--verm-bg);color:var(--verm)}
.mod-gente .gv-cel.sem{background:var(--painel2);color:var(--texto3)}
.mod-gente .gv-cel.nao{color:var(--texto3);opacity:.5}
.mod-gente .gv-legenda{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:var(--texto3);margin:10px 2px 0}
.mod-gente .gv-legenda span{display:inline-flex;align-items:center;gap:6px}
.mod-gente .gv-legenda i{width:12px;height:12px;border-radius:4px}
.mod-gente .gv-regua{position:relative;height:10px;border-radius:99px;background:var(--painel2);margin:8px 0 4px}
.mod-gente .gv-regua i{position:absolute;inset:0 auto 0 0;width:var(--v);border-radius:inherit;background:linear-gradient(90deg,var(--gp-a),var(--gp-a2))}
.mod-gente .gv-regua.perto i{background:linear-gradient(90deg,#d97706,#f59e0b)}.mod-gente .gv-regua.lacuna i{background:linear-gradient(90deg,#dc2626,#ef4444)}
.mod-gente .gv-regua s{position:absolute;top:-4px;bottom:-4px;left:var(--e);width:3px;border-radius:2px;background:var(--texto);text-decoration:none}
.mod-gente .gv-lac{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 12px;align-items:center;padding:12px 0;border-top:1px solid var(--linha)}
.mod-gente .gv-lac:first-child{border-top:0}
.mod-gente .gv-lac .gv-regua{grid-column:1/-1}
.mod-gente .gv-lac small{grid-column:1/-1;color:var(--texto3);font-size:12px}
.mod-gente .gv-chips{display:flex;flex-wrap:wrap;gap:6px}
.mod-gente .gv-chip{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;border-radius:999px;background:var(--painel2);font-size:12px;font-weight:600;color:var(--texto2)}
.mod-gente .gv-chip b{color:var(--gp-a)}
/* PDI */
.mod-gente .gv-avisos{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
.mod-gente .gv-aviso{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;background:var(--ouro-bg);color:var(--texto);font-size:13px;text-decoration:none!important}
.mod-gente .gv-aviso.verm{background:var(--verm-bg)}
.mod-gente .gv-aviso .ic{flex:none;width:17px;height:17px;color:var(--ouro)}.mod-gente .gv-aviso.verm .ic{color:var(--verm)}
.mod-gente .gv-aviso b{font-weight:650}.mod-gente .gv-aviso span{flex:1;min-width:0}
.mod-gente .gv-aviso em{font-style:normal;font-weight:650;color:var(--ouro);white-space:nowrap}.mod-gente .gv-aviso.verm em{color:var(--verm)}
.mod-gente .gv-pdis{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:16px}
.mod-gente .gv-pdi{display:flex;flex-direction:column;gap:12px;color:var(--texto);text-decoration:none!important;transition:transform .15s,border-color .15s}
.mod-gente a.gv-pdi:hover{transform:translateY(-2px);border-color:color-mix(in srgb,var(--gp-a) 35%,var(--borda));color:var(--texto)}
.mod-gente .gv-pdi-topo{display:flex;align-items:center;gap:12px}
.mod-gente .gv-pdi-topo .gp-tx{flex:1;display:flex;flex-direction:column;min-width:0;line-height:1.3}
.mod-gente .gv-pdi-topo h3{font-size:15px;font-weight:650}
.mod-gente .gv-pdi-topo small{color:var(--texto3);font-size:12.5px}
.mod-gente .gv-702010{display:flex;flex-direction:column;gap:8px}
.mod-gente .gv-702010-b{position:relative;display:flex;height:10px;border-radius:99px;background:var(--painel2);overflow:visible}
.mod-gente .gv-702010-b i{height:100%}.mod-gente .gv-702010-b i:first-child{border-radius:99px 0 0 99px}.mod-gente .gv-702010-b i:last-of-type{border-radius:0 99px 99px 0}
.mod-gente .gv-702010-b s{position:absolute;top:-3px;bottom:-3px;width:2px;background:var(--texto3);opacity:.6;text-decoration:none}
.mod-gente .t-pratica{background:var(--gp-a)}.mod-gente .t-social{background:#0891b2}.mod-gente .t-formal{background:#65a30d}
.mod-gente .gv-702010-l{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:var(--texto3)}
.mod-gente .gv-702010-l span{display:inline-flex;align-items:center;gap:6px}.mod-gente .gv-702010-l b{color:var(--texto)}
.mod-gente .gv-702010-l i{width:10px;height:10px;border-radius:3px}
.mod-gente .gv-colunas{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.mod-gente .gv-coluna{display:flex;flex-direction:column;gap:10px;padding:14px;border-radius:var(--gp-raio);background:color-mix(in srgb,var(--painel2) 60%,transparent);border:1px solid var(--borda)}
.mod-gente .gv-coluna>header{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:650}
.mod-gente .gv-coluna>header i{width:10px;height:10px;border-radius:3px}
.mod-gente .gv-coluna>header small{margin-left:auto;color:var(--texto3);font-weight:600}
.mod-gente .gv-acao{display:flex;flex-direction:column;gap:8px;padding:12px 14px;border-radius:12px;background:var(--painel);border:1px solid var(--borda);box-shadow:0 1px 2px rgba(15,23,30,.04)}
.mod-gente .gv-acao.concluida{opacity:.78}
.mod-gente .gv-acao.concluida b{text-decoration:line-through;text-decoration-color:color-mix(in srgb,var(--texto3) 60%,transparent)}
.mod-gente .gv-acao>b{font-size:13.5px;font-weight:600;line-height:1.35}
.mod-gente .gv-acao .gv-meta{display:flex;gap:6px;flex-wrap:wrap;align-items:center;font-size:12px;color:var(--texto3)}
.mod-gente .gv-acao .gv-evid{font-size:12.5px;color:var(--texto2);background:var(--gp-af);border-radius:9px;padding:7px 10px;line-height:1.4}
.mod-gente .gv-acao .gp-acoes .btn{height:28px;font-size:12px}
.mod-gente .gv-tempo{display:flex;flex-direction:column;gap:12px}
.mod-gente .gv-reg{display:flex;gap:12px}
.mod-gente .gv-reg .gp-tx{flex:1;display:flex;flex-direction:column;gap:2px;background:var(--painel2);border-radius:12px;padding:10px 12px;font-size:13px;line-height:1.45}
.mod-gente .gv-reg .gp-tx small{color:var(--texto3);font-size:11.5px}
/* trilhas */
.mod-gente .gv-trilhas{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.mod-gente .gv-trilha{display:flex;flex-direction:column;gap:12px;color:var(--texto);text-decoration:none!important;transition:transform .15s,border-color .15s}
.mod-gente a.gv-trilha:hover{transform:translateY(-2px);border-color:color-mix(in srgb,var(--gp-a) 35%,var(--borda));color:var(--texto)}
.mod-gente .gv-trilha-capa{display:flex;align-items:center;gap:12px}
.mod-gente .gv-trilha-capa .gp-ic{width:44px;height:44px;border-radius:14px;background:var(--gp-grad);color:#fff}
.mod-gente .gv-trilha-capa .gp-tx{flex:1;display:flex;flex-direction:column;min-width:0}
.mod-gente .gv-trilha-capa h3{font-size:15px;font-weight:650;line-height:1.3}
.mod-gente .gv-trilha-capa small{color:var(--texto3);font-size:12.5px}
.mod-gente .gv-conteudos{display:flex;flex-direction:column}
.mod-gente .gv-conteudo{display:flex;align-items:center;gap:14px;padding:14px 4px;border-top:1px solid var(--linha)}
.mod-gente .gv-conteudo:first-child{border-top:0}
.mod-gente .gv-conteudo .gv-n{flex:none;display:grid;place-items:center;width:34px;height:34px;border-radius:50%;border:2px solid var(--borda);color:var(--texto3);font-weight:700;font-size:13px}
.mod-gente .gv-conteudo.feito .gv-n{background:var(--gp-a);border-color:var(--gp-a);color:#fff}
.mod-gente .gv-conteudo .gp-tx{flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}
.mod-gente .gv-conteudo .gp-tx b{font-size:14px;font-weight:600}
.mod-gente .gv-conteudo .gp-tx span{font-size:12.5px;color:var(--texto3)}
.mod-gente .gv-cert{display:flex;align-items:center;gap:16px;padding:18px 20px;border-radius:var(--gp-raio);background:var(--gp-grad);color:#fff;box-shadow:0 18px 40px -24px rgba(15,23,30,.6)}
.mod-gente .gv-cert .ic{width:34px;height:34px;flex:none}
.mod-gente .gv-cert .gp-tx{flex:1;display:flex;flex-direction:column;gap:2px}
.mod-gente .gv-cert .gp-tx span{color:rgba(255,255,255,.78);font-size:12.5px}
.mod-gente .gv-cert .btn{background:#fff;color:var(--gp-g);border-color:#fff}
/* carreira */
.mod-gente .gv-escada{display:flex;align-items:stretch;gap:0;overflow-x:auto;padding:6px 2px 10px;scrollbar-width:thin}
.mod-gente .gv-degrau{position:relative;flex:1 0 150px;display:flex;flex-direction:column;gap:4px;padding:12px 14px 12px 18px;margin-right:10px;border-radius:12px;background:var(--painel2);border:1px solid var(--borda);font-size:12.5px;color:var(--texto2)}
.mod-gente .gv-degrau::after{content:"";position:absolute;right:-11px;top:50%;width:10px;height:2px;background:var(--borda)}
.mod-gente .gv-degrau:last-child::after{display:none}
.mod-gente .gv-degrau b{font-size:13.5px;color:var(--texto);font-weight:650;line-height:1.3}
.mod-gente .gv-degrau small{color:var(--texto3);font-size:11.5px;line-height:1.35}
.mod-gente .gv-degrau .gv-ordem{font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--texto3)}
.mod-gente .gv-degrau.feito{background:var(--gp-af);border-color:transparent}
.mod-gente .gv-degrau.atual{background:var(--gp-grad);border-color:transparent;color:#fff;box-shadow:0 12px 26px -16px rgba(15,118,110,.8)}
.mod-gente .gv-degrau.atual :is(b,small,.gv-ordem){color:#fff}
.mod-gente .gv-degrau.proximo{border-color:var(--gp-a);border-style:dashed;background:var(--painel)}
.mod-gente .gv-crit{display:flex;align-items:flex-start;gap:12px;padding:11px 0;border-top:1px solid var(--linha);font-size:13.5px}
.mod-gente .gv-crit:first-child{border-top:0}
.mod-gente .gv-crit .gv-ok{flex:none;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:var(--painel2);color:var(--texto3)}
.mod-gente .gv-crit .gv-ok .ic{width:14px;height:14px}
.mod-gente .gv-crit.ok .gv-ok{background:var(--gp-a);color:#fff}
.mod-gente .gv-crit .gp-tx{flex:1;display:flex;flex-direction:column;gap:1px}
.mod-gente .gv-crit .gp-tx small{color:var(--verm);font-size:12px}
.mod-gente .gv-crit.ok .gp-tx small{color:var(--texto3)}
/* sucessão */
.mod-gente .gv-chaves{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:16px}
.mod-gente .gv-chave{display:flex;flex-direction:column;gap:12px;border-left:4px solid var(--gp-a)}
.mod-gente .gv-chave.descoberto{border-left-color:var(--verm)}.mod-gente .gv-chave.fragil{border-left-color:var(--ouro)}.mod-gente .gv-chave.atencao{border-left-color:var(--azul)}
.mod-gente .gv-chave-topo{display:flex;align-items:flex-start;gap:12px}
.mod-gente .gv-chave-topo .gp-tx{flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}
.mod-gente .gv-chave-topo h3{font-size:15.5px;font-weight:650;line-height:1.3}
.mod-gente .gv-chave-topo small{color:var(--texto3);font-size:12.5px}
.mod-gente .gv-sucs{display:flex;flex-direction:column;gap:8px}
.mod-gente .gv-suc{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;background:var(--painel2)}
.mod-gente .gv-suc{flex-wrap:wrap}
.mod-gente .gv-suc .gp-tx{flex:1 1 180px;display:flex;flex-direction:column;min-width:0;line-height:1.3}
.mod-gente .gv-suc .gp-tx b{font-size:13.5px;font-weight:600}.mod-gente .gv-suc .gp-tx small{font-size:12px;color:var(--texto3)}
.mod-gente .gv-suc select{flex:none;width:auto;max-width:150px;height:30px;border-radius:9px;border:1px solid var(--borda);background:var(--painel);color:var(--texto);font:inherit;font-size:12px;padding:0 6px}
.mod-gente .gv-form-linhas{display:flex;flex-direction:column;gap:8px}
.mod-gente .gv-form-linha{display:grid;grid-template-columns:minmax(0,2fr) 90px 90px minmax(0,1.6fr) 34px;gap:8px;align-items:end;padding:10px;border-radius:12px;background:var(--painel2)}
.mod-gente .gv-form-linha .campo{margin:0}
.mod-gente .gv-form-linha select[multiple]{min-height:62px}
@media (max-width:760px){
  .mod-gente .gv-colunas{grid-template-columns:minmax(0,1fr)}
  .mod-gente .gv-pdis,.mod-gente .gv-trilhas,.mod-gente .gv-chaves{grid-template-columns:minmax(0,1fr)}
  .mod-gente .gv-form-linha{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
  .mod-gente .gv-form-linha>:first-child,.mod-gente .gv-form-linha>:nth-child(4){grid-column:1/-1}
  .mod-gente .gv-cert{flex-direction:column;align-items:flex-start}
  .mod-gente .gv-degrau{flex-basis:132px}
}
`;
