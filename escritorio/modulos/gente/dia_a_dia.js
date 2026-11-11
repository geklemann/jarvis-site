/*! © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md. */
import{esc as r}from"../../comum/nucleo.js";import*as n from"../../motor/gente/dia_a_dia.js";import{preparar as i}from"./desenvolvimento.js";export{n as A};export{restrito}from"./desempenho.js";export const dataHora=e=>e?new Date(e).toLocaleString("pt-BR",{weekday:"short",day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit",timeZone:"America/Sao_Paulo"}).replace(","," ·"):"";export function haQuanto(e,o=new Date().toLocaleDateString("sv-SE")){if(!e)return"";const t=new Date(e).toLocaleDateString("sv-SE",{timeZone:"America/Sao_Paulo"}),a=Math.round((Date.parse(`${o}T12:00:00Z`)-Date.parse(`${t}T12:00:00Z`))/864e5);return a<=0?"hoje":a===1?"ontem":a<30?`há ${a} dias`:`em ${t.split("-").reverse().join("/")}`}export const paraIso=e=>e?new Date(`${e}:00-03:00`).toISOString():null,deIso=e=>e?new Date(new Date(e).getTime()-3*36e5).toISOString().slice(0,16):"",COR_CADENCIA=Object.freeze({"em dia":"",atrasado:"verm","sem 1:1":"ouro"}),COR_SITUACAO=Object.freeze({agendado:"azul",realizado:"",cancelado:"cinza"}),COR_RESPONSAVEL=Object.freeze({dp:"#0891b2",ti:"#64748b",gestor:"var(--gp-a)",rh:"#65a30d",colaborador:"#d97706"}),selo=(e,o="")=>`<span class="gp-selo ${o}">${r(e)}</span>`;export function preparar(e){if(i(e),typeof document<"u"&&document.head&&!document.getElementById("mod-gente-dia-a-dia-css")){const o=document.createElement("style");o.id="mod-gente-dia-a-dia-css",o.textContent=p,document.head.append(o)}return e}const p=`
.mod-gente .ga-cad{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
.mod-gente .ga-pessoa{display:flex;flex-direction:column;gap:10px;padding:14px 16px;border-radius:14px;border:1px solid var(--borda);background:var(--painel);box-shadow:var(--gp-sombra)}
.mod-gente .ga-pessoa.atrasado{border-left:4px solid var(--verm)}.mod-gente .ga-pessoa.sem{border-left:4px solid var(--ouro)}
.mod-gente .ga-pessoa-topo{display:flex;align-items:center;gap:10px}
.mod-gente .ga-pessoa-topo .gp-tx{flex:1;display:flex;flex-direction:column;min-width:0;line-height:1.3}
.mod-gente .ga-pessoa-topo .gp-tx b{font-size:14px;font-weight:600}.mod-gente .ga-pessoa-topo .gp-tx small{font-size:12px;color:var(--texto3)}
.mod-gente .ga-linhas{display:flex;flex-direction:column;gap:3px;font-size:12.5px;color:var(--texto3)}
.mod-gente .ga-linhas b{color:var(--texto);font-weight:600}
.mod-gente .ga-reunioes{display:flex;flex-direction:column}
.mod-gente .ga-reuniao{display:flex;align-items:center;gap:14px;padding:12px 4px;border-top:1px solid var(--linha);color:var(--texto);text-decoration:none!important;border-radius:10px}
.mod-gente .ga-reuniao:first-child{border-top:0}
.mod-gente a.ga-reuniao:hover{background:var(--gp-af);color:var(--texto)}
.mod-gente .ga-data{flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;width:52px;height:52px;border-radius:14px;background:var(--painel2);line-height:1.05}
.mod-gente .ga-data b{font-size:18px;font-weight:700}.mod-gente .ga-data small{font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--texto3);font-weight:650}
.mod-gente .ga-data.prox{background:var(--gp-grad);color:#fff}.mod-gente .ga-data.prox small{color:rgba(255,255,255,.8)}
.mod-gente .ga-reuniao .gp-tx{flex:1;display:flex;flex-direction:column;min-width:0;line-height:1.35}
.mod-gente .ga-reuniao .gp-tx b{font-size:14px;font-weight:600}.mod-gente .ga-reuniao .gp-tx span{font-size:12.5px;color:var(--texto3)}
.mod-gente .ga-pauta{display:flex;flex-direction:column;gap:6px}
.mod-gente .ga-topico{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:12px;background:var(--painel2)}
.mod-gente .ga-topico input[type=checkbox]{margin-top:3px;width:17px;height:17px;accent-color:var(--gp-a)}
.mod-gente .ga-topico .gp-tx{flex:1;display:flex;flex-direction:column;gap:1px;font-size:13.5px;line-height:1.4}
.mod-gente .ga-topico .gp-tx small{font-size:11.5px;color:var(--texto3)}
.mod-gente .ga-topico.feito .gp-tx>span{text-decoration:line-through;text-decoration-color:color-mix(in srgb,var(--texto3) 60%,transparent);color:var(--texto3)}
.mod-gente .ga-novo{display:flex;gap:8px;margin-top:10px}
.mod-gente .ga-novo input{flex:1;height:38px;border-radius:11px;border:1px solid var(--borda);background:var(--painel);color:var(--texto);font:inherit;font-size:13px;padding:0 12px}
.mod-gente .ga-novo input:focus,.mod-gente .ga-privada textarea:focus{outline:none;border-color:var(--gp-a);box-shadow:0 0 0 3px var(--gp-af)}
.mod-gente .ga-privada{border:1px dashed color-mix(in srgb,var(--texto3) 45%,transparent);background:repeating-linear-gradient(135deg,var(--painel),var(--painel) 10px,color-mix(in srgb,var(--painel2) 70%,var(--painel)) 10px,color-mix(in srgb,var(--painel2) 70%,var(--painel)) 20px)}
.mod-gente .ga-privada textarea{width:100%;min-height:120px;border-radius:12px;border:1px solid var(--borda);background:var(--painel);color:var(--texto);font:inherit;font-size:13.5px;padding:10px 12px;resize:vertical}
.mod-gente .ga-fb{display:flex;gap:12px;padding:14px 4px;border-top:1px solid var(--linha)}
.mod-gente .ga-fb:first-child{border-top:0}
.mod-gente .ga-fb .gp-tx{flex:1;display:flex;flex-direction:column;gap:4px;min-width:0}
.mod-gente .ga-fb .gp-tx>small{font-size:12px;color:var(--texto3)}
.mod-gente .ga-fb .gp-tx>p{margin:0;font-size:13.5px;line-height:1.5}
.mod-gente .ga-mural{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}
.mod-gente .ga-rec{position:relative;display:flex;flex-direction:column;gap:12px;padding:18px;border-radius:var(--gp-raio);background:var(--painel);border:1px solid var(--borda);box-shadow:var(--gp-sombra);overflow:hidden}
.mod-gente .ga-rec::before{content:"";position:absolute;inset:0 0 auto 0;height:4px;background:var(--ga-cor,var(--gp-a))}
.mod-gente .ga-rec-de{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--texto3)}
.mod-gente .ga-rec-de b{color:var(--texto)}
.mod-gente .ga-rec-para{display:flex;align-items:center;gap:12px}
.mod-gente .ga-rec-para .gp-tx{display:flex;flex-direction:column;line-height:1.3}
.mod-gente .ga-rec-para .gp-tx b{font-size:15.5px;font-weight:650}.mod-gente .ga-rec-para .gp-tx small{font-size:12px;color:var(--texto3)}
.mod-gente .ga-rec>p{margin:0;font-size:14px;line-height:1.55}
.mod-gente .ga-rec-pe{display:flex;align-items:center;gap:8px;justify-content:space-between;flex-wrap:wrap}
.mod-gente .ga-valor{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 10px;border-radius:999px;font-size:11.5px;font-weight:650;color:#fff;background:var(--ga-cor,var(--gp-a))}
.mod-gente .ga-aplauso{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-radius:999px;border:1px solid var(--borda);background:var(--painel);color:var(--texto2);font:inherit;font-size:12.5px;font-weight:600;cursor:pointer;transition:background-color .15s,border-color .15s,transform .1s}
.mod-gente .ga-aplauso:hover{border-color:var(--gp-a)}
.mod-gente .ga-aplauso .ic{width:15px;height:15px}
.mod-gente .ga-aplauso[aria-pressed="true"] .ic{fill:currentColor}
.mod-gente .ga-aplauso[aria-pressed="true"]{background:var(--gp-af);border-color:var(--gp-a);color:var(--gp-a)}
.mod-gente .ga-aplauso:active{transform:scale(.96)}
.mod-gente .ga-filtro{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
.mod-gente .ga-filtro button{height:32px;padding:0 12px;border-radius:999px;border:1px solid var(--borda);background:var(--painel);color:var(--texto2);font:inherit;font-size:12.5px;font-weight:600;cursor:pointer}
.mod-gente .ga-filtro button[aria-pressed="true"]{background:var(--gp-g);border-color:var(--gp-g);color:#fff}
:root[data-tema="escuro"] .mod-gente .ga-filtro button[aria-pressed="true"]{background:var(--gp-af);border-color:var(--gp-a);color:var(--gp-a)}
@media (prefers-color-scheme:dark){:root:not([data-tema="claro"]) .mod-gente .ga-filtro button[aria-pressed="true"]{background:var(--gp-af);border-color:var(--gp-a);color:var(--gp-a)}}
.mod-gente .ga-jornadas{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px}
.mod-gente .ga-jornada{display:flex;flex-direction:column;gap:12px;color:var(--texto);text-decoration:none!important;transition:transform .15s,border-color .15s}
.mod-gente a.ga-jornada:hover{transform:translateY(-2px);border-color:color-mix(in srgb,var(--gp-a) 35%,var(--borda));color:var(--texto)}
.mod-gente .ga-resp{display:flex;gap:6px;flex-wrap:wrap}
.mod-gente .ga-resp span{display:inline-flex;align-items:center;gap:5px;height:22px;padding:0 8px;border-radius:999px;background:var(--painel2);font-size:11.5px;font-weight:600;color:var(--texto2)}
.mod-gente .ga-resp i{width:8px;height:8px;border-radius:50%;background:var(--ga-cor)}
.mod-gente .ga-grupo{display:flex;flex-direction:column;gap:6px}
.mod-gente .ga-grupo>header{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:650;margin:6px 0 2px}
.mod-gente .ga-grupo>header i{width:10px;height:10px;border-radius:50%;background:var(--ga-cor)}
.mod-gente .ga-grupo>header small{margin-left:auto;color:var(--texto3);font-weight:600}
.mod-gente .ga-item{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;border:1px solid var(--borda);background:var(--painel)}
.mod-gente .ga-item input[type=checkbox]{width:18px;height:18px;accent-color:var(--gp-a);flex:none}
.mod-gente .ga-item .gp-tx{flex:1;display:flex;flex-direction:column;gap:1px;min-width:0;font-size:13.5px;line-height:1.4}
.mod-gente .ga-item .gp-tx small{font-size:12px;color:var(--texto3)}
.mod-gente .ga-item.feito{background:color-mix(in srgb,var(--gp-af) 55%,var(--painel))}
.mod-gente .ga-item.feito .gp-tx>span{text-decoration:line-through;color:var(--texto3)}
.mod-gente .ga-avisos{display:flex;flex-direction:column}
.mod-gente .ga-aviso{position:relative;display:flex;align-items:center;gap:14px;padding:13px 14px;border-top:1px solid var(--linha);color:var(--texto);text-decoration:none!important;border-radius:12px}
.mod-gente .ga-aviso:first-child{border-top:0}
.mod-gente a.ga-aviso:hover{background:var(--gp-af);color:var(--texto)}
.mod-gente .ga-aviso.novo{background:color-mix(in srgb,var(--gp-af) 60%,transparent)}
.mod-gente .ga-aviso.novo::after{content:"";position:absolute;right:14px;top:50%;width:8px;height:8px;margin-top:-4px;border-radius:50%;background:var(--gp-a)}
.mod-gente .ga-aviso .gp-tx{flex:1;display:flex;flex-direction:column;gap:1px;min-width:0;line-height:1.35;padding-right:16px}
.mod-gente .ga-aviso .gp-tx b{font-size:14px;font-weight:600}.mod-gente .ga-aviso .gp-tx span{font-size:12.5px;color:var(--texto3)}
.mod-gente .ga-aviso .gp-ic.verm{background:var(--verm-bg);color:var(--verm)}
@media (max-width:760px){
  .mod-gente .ga-cad,.mod-gente .ga-mural,.mod-gente .ga-jornadas{grid-template-columns:minmax(0,1fr)}
}
`;
