/*! © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md. */
import{esc as r,ic as n,toast as g}from"../../comum/nucleo.js";import{PAPEIS_GENTE as d,tempoDeCasa as s}from"../../motor/gente/pessoas.js";export{d as PAPEIS_GENTE};export const hoje=()=>new Date().toLocaleDateString("sv-SE"),mensagem=e=>String(e?.message||e||"Erro").replace(/^Error:\s*/,""),falhou=e=>g(mensagem(e),"erro"),ehDemo=e=>e.api?.modo==="demo",dataBR=e=>e?String(e).slice(0,10).split("-").reverse().join("/"):"";const l=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];export const diaMes=e=>{const o=String(e||""),[,t,a]=o.length===5?["",...o.split("-")]:o.slice(0,10).split("-");return t?`${Number(a)} ${l[Number(t)-1]}`:""},brl=e=>e==null?"":Number(e).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}),plural=(e,o,t)=>`${Number(e).toLocaleString("pt-BR")} ${Number(e)===1?o:t}`,CHAVE_VER_COMO="jarvis-pessoas:ver-como";export function verComo(){try{return sessionStorage.getItem(CHAVE_VER_COMO)||""}catch{return""}}export async function contexto(e,{recarregar:o=!1}={}){const t=e.empresa?.id||null;if(!o&&e.gente&&e.gente.empresa_id===t)return e.gente;let a={papel:null};if(t)try{a=await e.api.rpc("gente_contexto",{p_empresa:t})||{papel:null}}catch(i){console.warn("gente_contexto",i)}return e.gente={...a,empresa_id:t},e.gente}export const ehRh=e=>e.gente?.papel==="rh",lidera=e=>["rh","gestor"].includes(e.gente?.papel),pessoas=async e=>await e.api.rpc("gente_pessoas",{p_empresa:e.empresa.id})||[],painel=e=>e.api.rpc("gente_painel",{p_empresa:e.empresa.id}),perfil=(e,o)=>e.api.rpc("gente_perfil",{p_empresa:e.empresa.id,p_empregado:o}),estrutura=e=>e.api.rpc("gente_estrutura",{p_empresa:e.empresa.id}),rota=(e,o,t=[])=>e.rota({modulo:"gente",item:o,params:t}),rotaPerfil=(e,o)=>rota(e,"perfil",o?[o]:[]);const p=["#0f766e","#115e59","#0e7490","#155e75","#334155","#475569","#1f5f54","#3f5560"];export const tom=e=>{let o=0;for(const t of String(e||""))o=o*31+t.charCodeAt(0)>>>0;return p[o%p.length]},iniciais=e=>{const o=String(e||"").replace(/\([^)]*\)/g," ").split(/\s+/).filter(t=>t&&!/^(da|de|do|das|dos|e)$/i.test(t));return((o[0]?.[0]||"")+(o.length>1?o[o.length-1][0]:"")).toUpperCase()||"?"},avatar=(e,o="m")=>`<span class="gp-av gp-av-${o}" style="--gp-tom:${tom(e)}" aria-hidden="true">${r(iniciais(e))}</span>`,selo=(e,o="")=>`<span class="gp-selo ${o}">${r(e)}</span>`,STATUS=Object.freeze({ativo:["","Ativo"],ferias:["azul","Em férias"],afastado:["ouro","Afastado"],desligado:["cinza","Desligado"],admissao_pendente:["ouro","Admissão pendente"]}),seloStatus=e=>{const[o,t]=STATUS[e]||["",e||""];return e&&e!=="ativo"?selo(t,o):""},casa=e=>e?.admissao&&s(e.admissao,hoje(),e.demissao)?.texto||"",cabecalho=(e,o="",t="")=>`<header class="gp-cab"><div><h1>${r(e)}</h1>${o?`<p>${o}</p>`:""}</div>${t?`<div class="gp-acoes">${t}</div>`:""}</header>`,vazio=(e,o="",t="equipe",a="")=>`<div class="gp-vazio">${n(t)}<h3>${r(e)}</h3>${o?`<p>${o}</p>`:""}${a?`<div class="gp-acoes">${a}</div>`:""}</div>`,vazioMini=(e,o="info")=>`<div class="gp-vazio gp-vazio-mini">${n(o)}<p>${r(e)}</p></div>`,carregando=(e="Carregando…")=>`<div class="gp-carregando" role="status"><span></span><span></span><span></span><em>${r(e)}</em></div>`;export function semAcesso(e,o){e.innerHTML=vazio("Você ainda não tem acesso às pessoas desta empresa",`Peça ao RH para ligar a sua conta${o.usuario?.email?` (<b>${r(o.usuario.email)}</b>)`:""} ao seu cadastro de colaborador — ou, se você é do RH, peça ao dono a permissão do módulo Gestão de pessoas.`,"cadeado")}export function preparar(e){if(typeof document<"u"&&document.head&&!document.getElementById("mod-gente-css")){const o=document.createElement("style");o.id="mod-gente-css",o.textContent=m,document.head.append(o)}return e?.classList?.add("mod-gente"),e}const m=`
.mod-gente{--gp-a:#0f766e;--gp-a2:#0d9488;--gp-af:color-mix(in srgb,#0d9488 10%,transparent);--gp-g:#1f2a30;--gp-g2:#334047;--gp-grad:linear-gradient(135deg,#1f2a30 0%,#134e4a 55%,#0f766e 100%);--gp-raio:16px;--gp-sombra:0 1px 2px rgba(15,23,30,.04),0 8px 24px -16px rgba(15,23,30,.18);min-width:0}
:root[data-tema="escuro"] .mod-gente{--gp-a:#2dd4bf;--gp-a2:#14b8a6;--gp-af:color-mix(in srgb,#2dd4bf 12%,transparent);--gp-g:#0b1114;--gp-g2:#1b252a;--gp-grad:linear-gradient(135deg,#0f1a1e 0%,#0f3d3a 60%,#115e59 100%);--gp-sombra:0 1px 0 rgba(255,255,255,.03) inset,0 10px 30px -18px rgba(0,0,0,.7)}
@media (prefers-color-scheme:dark){:root:not([data-tema="claro"]) .mod-gente{--gp-a:#2dd4bf;--gp-a2:#14b8a6;--gp-af:color-mix(in srgb,#2dd4bf 12%,transparent);--gp-g:#0b1114;--gp-g2:#1b252a;--gp-grad:linear-gradient(135deg,#0f1a1e 0%,#0f3d3a 60%,#115e59 100%);--gp-sombra:0 1px 0 rgba(255,255,255,.03) inset,0 10px 30px -18px rgba(0,0,0,.7)}}
.mod-gente *{min-width:0}
.mod-gente .gp-cab{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin:2px 0 18px}
.mod-gente .gp-cab h1{font-size:26px;font-weight:700;letter-spacing:-.03em;line-height:1.15}
.mod-gente .gp-cab p{margin:4px 0 0;color:var(--texto3);font-size:13.5px}
.mod-gente .gp-acoes{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.mod-gente .gp-cab>.gp-acoes{flex:0 1 auto;justify-content:flex-end}
.mod-gente .gp-card{background:var(--painel);border:1px solid var(--borda);border-radius:var(--gp-raio);padding:18px 20px;box-shadow:var(--gp-sombra)}
.mod-gente .gp-card>h2{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:650;letter-spacing:.01em;color:var(--texto2);margin:0 0 14px}
.mod-gente .gp-card>h2 .ic{width:16px;height:16px;color:var(--gp-a)}
.mod-gente .gp-card>h2 small{margin-left:auto;font-weight:500;color:var(--texto3);font-size:12px}
.mod-gente .gp-grade{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:16px}
.mod-gente .gp-c3{grid-column:span 3}.mod-gente .gp-c4{grid-column:span 4}.mod-gente .gp-c5{grid-column:span 5}.mod-gente .gp-c6{grid-column:span 6}.mod-gente .gp-c7{grid-column:span 7}.mod-gente .gp-c8{grid-column:span 8}.mod-gente .gp-c12{grid-column:span 12}
.mod-gente .gp-kpi{position:relative;display:flex;flex-direction:column;gap:2px;padding:16px 18px;border-radius:var(--gp-raio);background:var(--painel);border:1px solid var(--borda);box-shadow:var(--gp-sombra);text-decoration:none!important;color:var(--texto);overflow:hidden;transition:transform .18s,box-shadow .2s,border-color .2s}
.mod-gente a.gp-kpi:hover{transform:translateY(-2px);border-color:color-mix(in srgb,var(--gp-a) 35%,var(--borda));color:var(--texto)}
.mod-gente .gp-kpi small{font-size:12px;font-weight:600;color:var(--texto3);display:flex;align-items:center;gap:6px}
.mod-gente .gp-kpi small .ic{width:15px;height:15px;color:var(--gp-a)}
.mod-gente .gp-kpi b{font-size:30px;font-weight:700;letter-spacing:-.035em;line-height:1.15;font-variant-numeric:tabular-nums}
.mod-gente .gp-kpi b.gp-txt{font-size:20px;letter-spacing:-.02em;padding:6px 0 3px}
.mod-gente .gp-kpi span{font-size:12.5px;color:var(--texto3)}
.mod-gente .gp-kpi.destaque{background:var(--gp-grad);border-color:transparent;color:#fff}
.mod-gente .gp-kpi.destaque :is(small,span,small .ic){color:rgba(255,255,255,.78)}
.mod-gente .gp-kpi.destaque::after{content:"";position:absolute;right:-40px;top:-60px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,rgba(45,212,191,.35),transparent 70%);pointer-events:none}
.mod-gente .gp-sobe{color:var(--gp-a);font-weight:650}.mod-gente .gp-desce{color:var(--verm);font-weight:650}
.mod-gente .gp-kpi.destaque .gp-sobe{color:#99f6e4}.mod-gente .gp-kpi.destaque .gp-desce{color:#fecaca}
.mod-gente .gp-av{flex:none;display:inline-grid;place-items:center;border-radius:50%;background:var(--gp-tom,#0f766e);color:#fff;font-weight:650;letter-spacing:.02em;box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)}
.mod-gente .gp-av-p{width:28px;height:28px;font-size:11px}.mod-gente .gp-av-m{width:38px;height:38px;font-size:13px}.mod-gente .gp-av-g{width:76px;height:76px;font-size:25px;box-shadow:0 0 0 4px var(--painel),0 10px 26px -12px rgba(15,23,30,.5)}
.mod-gente .gp-selo{display:inline-flex;align-items:center;height:22px;padding:0 9px;border-radius:999px;font-size:11.5px;font-weight:600;background:var(--gp-af);color:var(--gp-a);white-space:nowrap}
.mod-gente .gp-selo.azul{background:var(--azul-bg);color:var(--azul)}.mod-gente .gp-selo.ouro{background:var(--ouro-bg);color:var(--ouro)}.mod-gente .gp-selo.verm{background:var(--verm-bg);color:var(--verm)}.mod-gente .gp-selo.cinza{background:var(--painel2);color:var(--texto3)}
.mod-gente .gp-barras{display:flex;flex-direction:column;gap:10px}
.mod-gente .gp-barra{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 12px;align-items:center;font-size:13px}
.mod-gente .gp-barra i{grid-column:1/-1;display:block;height:8px;border-radius:99px;background:var(--painel2);overflow:hidden}
.mod-gente .gp-barra i::before{content:"";display:block;height:100%;width:var(--v);border-radius:inherit;background:linear-gradient(90deg,var(--gp-a),var(--gp-a2));transform-origin:left;animation:gp-cresce .9s cubic-bezier(.2,.7,.2,1) both}
.mod-gente .gp-barra b{font-variant-numeric:tabular-nums}
.mod-gente .gp-itens{display:flex;flex-direction:column}
.mod-gente .gp-item{display:flex;align-items:center;gap:12px;padding:10px 4px;border-top:1px solid var(--linha);color:var(--texto);text-decoration:none!important;border-radius:10px;transition:background-color .15s}
.mod-gente .gp-item:first-child{border-top:0}
.mod-gente a.gp-item:hover{background:var(--gp-af)}
.mod-gente .gp-item .gp-tx{flex:1;display:flex;flex-direction:column;line-height:1.3;min-width:0}
.mod-gente .gp-item .gp-tx b{font-weight:600;font-size:13.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mod-gente .gp-item .gp-tx span{font-size:12.5px;color:var(--texto3);overflow:hidden;text-overflow:ellipsis}
.mod-gente .gp-item .gp-dir{flex:none;text-align:right;font-size:12.5px;color:var(--texto3);white-space:nowrap}
.mod-gente .gp-item .gp-dir b{display:block;color:var(--texto);font-size:13px}
.mod-gente .gp-ic{flex:none;display:grid;place-items:center;width:34px;height:34px;border-radius:11px;background:var(--gp-af);color:var(--gp-a)}
.mod-gente .gp-ic .ic{width:17px;height:17px}
.mod-gente .gp-ic.alerta{background:var(--ouro-bg);color:var(--ouro)}
.mod-gente .gp-vazio{display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;padding:36px 16px;color:var(--texto3)}
.mod-gente .gp-vazio .ic{width:34px;height:34px;color:var(--gp-a);opacity:.85}
.mod-gente .gp-vazio h3{color:var(--texto);font-size:15px;margin-top:4px}
.mod-gente .gp-vazio p{max-width:520px;font-size:13px;margin:0}
.mod-gente .gp-vazio-mini{padding:22px 12px;gap:8px}.mod-gente .gp-vazio-mini .ic{width:24px;height:24px;opacity:.7}.mod-gente .gp-vazio-mini p{font-size:13px;color:var(--texto3)}
.mod-gente .gp-mini{padding:12px 0 2px;font-size:13px;color:var(--texto3)}
.mod-gente .gp-carregando{display:flex;align-items:center;gap:6px;padding:40px 8px;color:var(--texto3)}
.mod-gente .gp-carregando span{width:7px;height:7px;border-radius:50%;background:var(--gp-a);animation:gp-ponto 1s ease-in-out infinite}
.mod-gente .gp-carregando span:nth-child(2){animation-delay:.15s}.mod-gente .gp-carregando span:nth-child(3){animation-delay:.3s}
.mod-gente .gp-carregando em{font-style:normal;margin-left:6px;font-size:13px}
.mod-gente .gp-seg{display:inline-flex;padding:3px;border-radius:12px;background:var(--painel2);border:1px solid var(--borda);gap:2px}
.mod-gente .gp-seg button{border:0;background:none;color:var(--texto2);font:inherit;font-size:12.5px;font-weight:600;height:30px;padding:0 12px;border-radius:9px;cursor:pointer}
.mod-gente .gp-seg button[aria-pressed="true"]{background:var(--painel);color:var(--texto);box-shadow:0 1px 3px rgba(15,23,30,.12)}
.mod-gente .gp-ver-como{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--texto3)}
.mod-gente .gp-abas{display:flex;gap:4px;margin:16px 0 0;padding:4px;border-radius:14px;background:var(--painel);border:1px solid var(--borda);overflow-x:auto;scrollbar-width:none;box-shadow:var(--gp-sombra)}
.mod-gente .gp-abas::-webkit-scrollbar{display:none}
.mod-gente .gp-abas button{flex:none;border:0;background:none;color:var(--texto2);font:inherit;font-size:13px;font-weight:600;height:36px;padding:0 14px;border-radius:10px;cursor:pointer;white-space:nowrap;transition:background-color .15s,color .15s}
.mod-gente .gp-abas button:hover{background:var(--gp-af);color:var(--texto)}
.mod-gente .gp-abas button[aria-pressed="true"]{background:var(--gp-g);color:#fff}
:root[data-tema="escuro"] .mod-gente .gp-abas button[aria-pressed="true"]{background:var(--gp-af);color:var(--gp-a)}
@media (prefers-color-scheme:dark){:root:not([data-tema="claro"]) .mod-gente .gp-abas button[aria-pressed="true"]{background:var(--gp-af);color:var(--gp-a)}}
.mod-gente .gp-abas-n{display:inline-grid;place-items:center;min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:var(--ouro-bg);color:var(--ouro);font-size:11px;margin-left:4px}
.mod-gente .gp-portal-sec.mod-funcionario{max-width:none;margin:16px 0 0;padding:0}
.mod-gente .mod-funcionario .fu-cartao{border-radius:var(--gp-raio);padding:18px 20px;box-shadow:var(--gp-sombra);margin-bottom:14px}
.mod-gente .mod-funcionario h2{font-size:15px;font-weight:650}
.mod-gente .mod-funcionario .fu-grade>.fu-cartao{margin-bottom:0}
.mod-gente .mod-funcionario .fu-marcar{border-radius:14px}
.mod-gente .mod-funcionario .fu-aviso{border-left-color:var(--gp-a)}
.mod-gente .mod-funcionario input,.mod-gente .mod-funcionario select,.mod-gente .mod-funcionario textarea{border-radius:10px}
/* Lista de pessoas */
.mod-gente .gp-filtros{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:14px}
.mod-gente .gp-busca{position:relative;flex:1 1 260px}
.mod-gente .gp-busca .ic{position:absolute;left:12px;top:50%;width:16px;height:16px;transform:translateY(-50%);color:var(--texto3);pointer-events:none}
.mod-gente .gp-busca input{width:100%;height:40px;padding:0 12px 0 36px;border-radius:12px;border:1px solid var(--borda);background:var(--painel);color:var(--texto);font:inherit}
.mod-gente .gp-filtros select{height:40px;border-radius:12px;border:1px solid var(--borda);background:var(--painel);color:var(--texto);font:inherit;font-size:13px;padding:0 30px 0 12px;max-width:100%;flex:0 1 190px}
.mod-gente :is(.gp-busca input,.gp-filtros select):focus{outline:none;border-color:var(--gp-a);box-shadow:0 0 0 3px var(--gp-af)}
.mod-gente .gp-tabela{background:var(--painel);border:1px solid var(--borda);border-radius:var(--gp-raio);box-shadow:var(--gp-sombra);overflow:hidden}
.mod-gente .gp-linha{display:grid;grid-template-columns:minmax(0,2.4fr) minmax(0,1.4fr) minmax(0,1.4fr) minmax(0,1fr) 24px;gap:14px;align-items:center;padding:11px 18px;border-top:1px solid var(--linha);color:var(--texto);text-decoration:none!important;transition:background-color .15s}
.mod-gente .gp-linha:first-child{border-top:0}
.mod-gente a.gp-linha:hover{background:var(--gp-af);color:var(--texto)}
.mod-gente .gp-linha.gp-th{font-size:11.5px;font-weight:650;color:var(--texto3);text-transform:uppercase;letter-spacing:.05em;padding-top:10px;padding-bottom:10px;background:var(--painel2)}
.mod-gente .gp-quem{display:flex;align-items:center;gap:12px}
.mod-gente .gp-quem>span:last-child{display:flex;flex-direction:column;line-height:1.3;min-width:0}
.mod-gente .gp-quem b{font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mod-gente .gp-quem small{color:var(--texto3);font-size:12.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mod-gente .gp-cel{font-size:13px;color:var(--texto2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mod-gente .gp-linha .ic.gp-seta{width:16px;height:16px;color:var(--texto3);transition:transform .15s}
.mod-gente a.gp-linha:hover .ic.gp-seta{transform:translateX(3px);color:var(--gp-a)}
.mod-gente .gp-contagem{font-size:12.5px;color:var(--texto3);margin:0 2px 10px}
/* Perfil 360 */
.mod-gente .gp-heroi{position:relative;display:flex;gap:20px;align-items:center;padding:24px;border-radius:20px;background:var(--gp-grad);color:#fff;overflow:hidden;box-shadow:0 18px 40px -24px rgba(15,23,30,.6)}
.mod-gente .gp-heroi::after{content:"";position:absolute;right:-90px;top:-120px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(45,212,191,.28),transparent 68%);pointer-events:none}
.mod-gente .gp-heroi>*{position:relative;z-index:1}
.mod-gente .gp-heroi .gp-av-g{box-shadow:0 0 0 4px rgba(255,255,255,.14),0 10px 26px -12px rgba(0,0,0,.6)}
.mod-gente .gp-heroi h1{font-size:26px;font-weight:700;letter-spacing:-.03em;line-height:1.15}
.mod-gente .gp-heroi p{margin:4px 0 0;color:rgba(255,255,255,.78)}
.mod-gente .gp-heroi .gp-selo{background:rgba(255,255,255,.14);color:#fff}
.mod-gente .gp-heroi .gp-selos{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
.mod-gente .gp-heroi .gp-acoes{margin-left:auto;align-self:flex-start}
.mod-gente .gp-heroi .btn{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.28);color:#fff}
.mod-gente .gp-heroi .btn:hover{background:rgba(255,255,255,.22);color:#fff}
.mod-gente .gp-fatos{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px 18px;margin:0}
.mod-gente .gp-fatos div{display:flex;flex-direction:column;gap:2px}
.mod-gente .gp-fatos dt{font-size:11.5px;font-weight:650;color:var(--texto3);text-transform:uppercase;letter-spacing:.05em}
.mod-gente .gp-fatos dd{margin:0;font-size:14px;font-weight:550;overflow-wrap:anywhere}
.mod-gente .gp-oculto{filter:blur(6px);user-select:none;transition:filter .2s}
.mod-gente .gp-revelar{border:0;background:none;color:var(--gp-a);font:inherit;font-size:12px;font-weight:600;cursor:pointer;padding:0;margin-left:6px}
.mod-gente .gp-tempo{position:relative;list-style:none;margin:0;padding:0 0 0 6px}
.mod-gente .gp-tempo::before{content:"";position:absolute;left:22px;top:8px;bottom:8px;width:2px;border-radius:2px;background:linear-gradient(var(--gp-a),color-mix(in srgb,var(--gp-a) 10%,transparent))}
.mod-gente .gp-tempo li{position:relative;display:flex;gap:14px;padding:8px 0}
.mod-gente .gp-tempo .gp-ponto{position:relative;z-index:1;flex:none;display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--painel);border:2px solid var(--gp-a);color:var(--gp-a)}
.mod-gente .gp-tempo .gp-ponto .ic{width:15px;height:15px}
.mod-gente .gp-tempo li.admissao .gp-ponto{background:var(--gp-a);color:#fff}
.mod-gente .gp-tempo li.desligamento .gp-ponto{border-color:var(--texto3);color:var(--texto3)}
.mod-gente .gp-tempo .gp-ev{flex:1;padding:5px 0 0;display:flex;flex-direction:column;line-height:1.35}
.mod-gente .gp-tempo .gp-ev b{font-weight:600;font-size:14px}
.mod-gente .gp-tempo .gp-ev span{font-size:12.5px;color:var(--texto3)}
.mod-gente .gp-tempo .gp-ev time{font-size:12px;color:var(--gp-a);font-weight:650;letter-spacing:.01em}
.mod-gente .gp-tempo li.gp-ano{padding:14px 0 4px 48px;font-size:12px;font-weight:700;color:var(--texto3);letter-spacing:.08em}
/* Organograma: de cima para baixo no computador; recuado no celular */
.mod-gente .gp-org-palco{position:relative;overflow:auto;border-radius:var(--gp-raio);border:1px solid var(--borda);background:radial-gradient(circle at 1px 1px,color-mix(in srgb,var(--texto3) 22%,transparent) 1px,transparent 0) 0 0/22px 22px,var(--painel);min-height:420px;max-height:calc(100vh - 230px);cursor:grab}
.mod-gente .gp-org-palco.arrastando{cursor:grabbing;user-select:none}
.mod-gente .gp-org-zoom{padding:28px 24px 40px;width:max-content;min-width:100%}
.mod-gente .gp-org,.mod-gente .gp-org ul{list-style:none;margin:0;padding:0;display:flex;justify-content:center}
.mod-gente .gp-org ul{padding-top:22px;position:relative}
.mod-gente .gp-org li{position:relative;display:flex;flex-direction:column;align-items:center;padding:22px 6px 0}
.mod-gente .gp-org>li{padding-top:0}
.mod-gente .gp-org ul>li::before,.mod-gente .gp-org ul>li::after{content:"";position:absolute;top:0;width:50%;height:22px;border-top:2px solid color-mix(in srgb,var(--gp-a) 45%,var(--borda))}
.mod-gente .gp-org ul>li::before{right:50%}.mod-gente .gp-org ul>li::after{left:50%;border-left:2px solid color-mix(in srgb,var(--gp-a) 45%,var(--borda))}
.mod-gente .gp-org ul>li:only-child::before,.mod-gente .gp-org ul>li:only-child::after{border-top:0}
.mod-gente .gp-org ul>li:only-child{padding-top:0}
.mod-gente .gp-org ul>li:first-child::before,.mod-gente .gp-org ul>li:last-child::after{border-top:0}
.mod-gente .gp-org ul>li:last-child::before{border-right:2px solid color-mix(in srgb,var(--gp-a) 45%,var(--borda));border-top-right-radius:10px}
.mod-gente .gp-org ul>li:first-child::after{border-top-left-radius:10px}
.mod-gente .gp-org ul::before{content:"";position:absolute;top:0;left:50%;height:22px;border-left:2px solid color-mix(in srgb,var(--gp-a) 45%,var(--borda))}
.mod-gente .gp-no{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;width:158px;padding:14px 10px 12px;border-radius:16px;background:var(--painel);border:1px solid var(--borda);box-shadow:var(--gp-sombra);text-align:center;transition:transform .18s,box-shadow .2s,border-color .2s}
.mod-gente .gp-no:hover{transform:translateY(-2px);border-color:color-mix(in srgb,var(--gp-a) 40%,var(--borda))}
.mod-gente .gp-no.achado{border-color:var(--gp-a);box-shadow:0 0 0 4px var(--gp-af),var(--gp-sombra)}
.mod-gente .gp-no.voce{border-color:var(--gp-a)}
.mod-gente .gp-no a{color:var(--texto);text-decoration:none!important;display:flex;flex-direction:column;align-items:center;gap:6px}
.mod-gente .gp-no a>span:last-child{display:flex;flex-direction:column;align-items:center;gap:1px}
.mod-gente .gp-no b{font-size:13px;font-weight:650;line-height:1.25}
.mod-gente .gp-no small{font-size:11.5px;color:var(--texto3);line-height:1.3}
.mod-gente .gp-no-dep{font-size:10.5px;font-weight:650;letter-spacing:.05em;text-transform:uppercase;color:var(--gp-a)}
.mod-gente .gp-no-abre{position:absolute;bottom:-12px;left:50%;transform:translateX(-50%);z-index:2;height:22px;min-width:30px;padding:0 8px;border-radius:999px;border:1px solid var(--borda);background:var(--painel);color:var(--texto2);font:inherit;font-size:11px;font-weight:650;cursor:pointer;box-shadow:var(--gp-sombra)}
.mod-gente .gp-no-abre:hover{border-color:var(--gp-a);color:var(--gp-a)}
.mod-gente .gp-org li.fechado>ul{display:none}
.mod-gente .gp-org-barra{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px}
.mod-gente .gp-org-barra .gp-busca{flex:1 1 240px}
/* Cargos e departamentos, acessos */
.mod-gente .gp-deps{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}
.mod-gente .gp-dep{display:flex;flex-direction:column;gap:4px;padding:14px 16px;border-radius:14px;border:1px solid var(--borda);background:var(--painel)}
.mod-gente .gp-dep b{font-size:14px}.mod-gente .gp-dep span{font-size:12.5px;color:var(--texto3)}
.mod-gente .gp-dep .gp-dep-meta{font-size:11.5px;color:var(--texto3);opacity:.85;margin-top:2px}
.mod-gente .gp-dep .gp-num{font-size:24px;font-weight:700;letter-spacing:-.03em;color:var(--gp-a)}
.mod-gente .gp-dep-topo{display:flex;align-items:center;justify-content:space-between;gap:8px}
.mod-gente .gp-faixa{position:relative;height:6px;border-radius:99px;background:var(--painel2);margin-top:6px}
.mod-gente .gp-faixa i{position:absolute;top:0;bottom:0;border-radius:inherit;background:linear-gradient(90deg,var(--gp-a),var(--gp-a2))}
.mod-gente .gp-portal-oi{font-size:28px;font-weight:700;letter-spacing:-.035em;line-height:1.15}
.mod-gente .gp-anel{--p:0;flex:none;display:grid;place-items:center;width:92px;height:92px;border-radius:50%;background:conic-gradient(#5eead4 calc(var(--p) * 1%),rgba(255,255,255,.14) 0);position:relative}
.mod-gente .gp-anel::before{content:"";position:absolute;inset:8px;border-radius:50%;background:color-mix(in srgb,#0f1a1e 70%,transparent)}
.mod-gente .gp-anel b{position:relative;font-size:20px;font-weight:700;line-height:1;text-align:center}
.mod-gente .gp-anel b small{display:block;font-size:10.5px;font-weight:600;opacity:.75;margin-top:2px}
/* Entrada em cascata */
.mod-gente .gp-entra>*{animation:gp-sobe .55s cubic-bezier(.2,.7,.2,1) both}
.mod-gente .gp-entra>:nth-child(2){animation-delay:.04s}.mod-gente .gp-entra>:nth-child(3){animation-delay:.08s}.mod-gente .gp-entra>:nth-child(4){animation-delay:.12s}
.mod-gente .gp-entra>:nth-child(5){animation-delay:.16s}.mod-gente .gp-entra>:nth-child(6){animation-delay:.2s}.mod-gente .gp-entra>:nth-child(n+7){animation-delay:.24s}
@keyframes gp-sobe{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes gp-cresce{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes gp-ponto{0%,100%{opacity:.25;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
@media (max-width:1100px){.mod-gente :is(.gp-c3,.gp-c4,.gp-c5,.gp-c7,.gp-c8){grid-column:span 6}}
@media (max-width:760px){
  .mod-gente .gp-grade{gap:12px}
  .mod-gente :is(.gp-c3,.gp-c4,.gp-c5,.gp-c6,.gp-c7,.gp-c8){grid-column:1/-1}
  .mod-gente .gp-kpis-2 .gp-c3{grid-column:span 6}
  .mod-gente .gp-cab h1,.mod-gente .gp-heroi h1{font-size:21px}
  .mod-gente .gp-card{padding:14px 14px}
  .mod-gente .gp-kpi{padding:13px 14px}.mod-gente .gp-kpi b{font-size:25px}.mod-gente .gp-kpi b.gp-txt{font-size:17px}
  .mod-gente .gp-linha{grid-template-columns:minmax(0,1fr) 20px;padding:11px 14px}
  .mod-gente .gp-linha>.gp-cel{display:none}
  .mod-gente .gp-linha.gp-th{display:none}
  .mod-gente .gp-filtros select{flex:1 1 140px}
  .mod-gente .gp-heroi{flex-direction:column;align-items:flex-start;padding:18px;gap:14px}
  .mod-gente .gp-heroi .gp-acoes{margin-left:0}
  /* organograma recuado: cada nível um degrau, com a linha à esquerda */
  .mod-gente .gp-org-palco{max-height:none;min-height:0;cursor:default;background:var(--painel)}
  .mod-gente .gp-org-zoom{zoom:1!important;width:auto;min-width:0;padding:12px 10px 16px}
  .mod-gente .gp-org,.mod-gente .gp-org ul{display:block}
  .mod-gente .gp-org ul{padding:0 0 0 18px;margin-left:12px;border-left:2px solid color-mix(in srgb,var(--gp-a) 35%,var(--borda))}
  .mod-gente .gp-org ul::before,.mod-gente .gp-org ul>li::before,.mod-gente .gp-org ul>li::after{display:none}
  .mod-gente .gp-org li,.mod-gente .gp-org ul>li:only-child{display:block;padding:8px 0 0}
  .mod-gente .gp-no{flex-direction:row;width:auto;text-align:left;padding:10px 12px}
  .mod-gente .gp-no a{flex-direction:row;align-items:center;gap:10px;flex:1}
  .mod-gente .gp-no a>span:last-child{display:flex;flex-direction:column;align-items:flex-start}
  .mod-gente .gp-no-abre{position:static;transform:none;margin-left:auto}
  .mod-gente .gp-zoom{display:none}
  .mod-gente .gp-anel{width:76px;height:76px}
  .mod-gente .gp-portal-oi{font-size:22px}
}
@media (prefers-reduced-motion:reduce){.mod-gente *,.mod-gente *::before,.mod-gente *::after{animation:none!important;transition:none!important}}
`;
