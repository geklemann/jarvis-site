import{esc as m,ic as y,toast as z,hojeIso as _,compSomar as u}from"../../comum/nucleo.js";import{painelLateral as $}from"../../comum/kit/painel.js";import*as n from"../../motor/administrar.js";import{feriadosNacionais as S}from"../../motor/calendario.js";export{n as A};const D=`
.mod-administrar .ad-cab{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px}
.mod-administrar .ad-cab h1{font-size:20px;margin:0}
.mod-administrar .ad-cab p{margin:3px 0 0;color:var(--texto2);font-size:13px;max-width:960px}
.mod-administrar .ad-acoes{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.mod-administrar .ad-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-bottom:12px}
.mod-administrar .ad-kpi{background:var(--painel);border:1px solid var(--borda);border-radius:var(--raio);padding:8px 12px;min-width:0;text-align:left;font:inherit;color:inherit}
.mod-administrar button.ad-kpi{cursor:pointer}.mod-administrar button.ad-kpi:hover{border-color:var(--azul)}
.mod-administrar .ad-kpi small{display:block;color:var(--texto3);font-size:11.5px;text-transform:uppercase;letter-spacing:.02em}
.mod-administrar .ad-kpi b{display:block;font-size:17px;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mod-administrar .ad-kpi span{display:block;color:var(--texto2);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mod-administrar .ad-kpi.verde b{color:var(--verde)}.mod-administrar .ad-kpi.verm b{color:var(--verm)}.mod-administrar .ad-kpi.ouro b{color:var(--ouro)}.mod-administrar .ad-kpi.azul b{color:var(--azul)}.mod-administrar .ad-kpi.roxo b{color:var(--roxo)}
.mod-administrar .ad-barra{display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;background:var(--painel);border:1px solid var(--borda);border-radius:var(--raio);padding:8px 10px;margin-bottom:10px}
.mod-administrar .ad-barra .campo{margin:0;min-width:0;display:flex;flex-direction:column;gap:2px}
.mod-administrar .ad-barra .campo span{font-size:11.5px;color:var(--texto3)}
.mod-administrar .seg{flex-wrap:wrap;max-width:100%}
.mod-administrar .ad-barra input,.mod-administrar .ad-barra select{min-width:0;max-width:100%}
.mod-administrar .ad-aviso{display:flex;gap:10px;align-items:flex-start;border:1px solid var(--borda);border-left:4px solid var(--ouro);background:var(--painel);border-radius:var(--raio);padding:8px 12px;margin-bottom:10px;font-size:13px}
.mod-administrar .ad-aviso.verm{border-left-color:var(--verm)}.mod-administrar .ad-aviso.verde{border-left-color:var(--verde)}.mod-administrar .ad-aviso.azul{border-left-color:var(--azul)}
.mod-administrar .ad-aviso>div{min-width:0;flex:1;overflow-wrap:anywhere}
.mod-administrar .ad-cartao{background:var(--painel);border:1px solid var(--borda);border-radius:var(--raio);padding:10px 12px;min-width:0;margin-bottom:10px}
.mod-administrar .ad-cartao h3{margin:0 0 8px;font-size:14px;display:flex;gap:6px;align-items:center}
.mod-administrar .ad-dupla{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px;align-items:start}
.mod-administrar .ad-lado{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:12px;align-items:start}
.mod-administrar .ad-def{display:grid;grid-template-columns:minmax(0,150px) minmax(0,1fr);gap:4px 10px;font-size:13px;margin:0}
.mod-administrar .ad-def dt{color:var(--texto3)}.mod-administrar .ad-def dd{margin:0;overflow-wrap:anywhere}
.mod-administrar .ad-mono{font-family:var(--mono);font-size:12px}
.mod-administrar .ad-num{font-variant-numeric:tabular-nums}
.mod-administrar .ad-matriz-w{overflow:auto;max-width:100%;border:1px solid var(--borda);border-radius:var(--raio);background:var(--painel);max-height:72vh}
.mod-administrar table.ad-matriz{border-collapse:separate;border-spacing:0;font-size:12.5px;min-width:100%}
.mod-administrar table.ad-matriz th,.mod-administrar table.ad-matriz td{padding:4px 6px;border-bottom:1px solid var(--borda);text-align:center;white-space:nowrap}
.mod-administrar table.ad-matriz thead th{position:sticky;top:0;background:var(--painel2);z-index:2;font-weight:600;color:var(--texto2)}
.mod-administrar table.ad-matriz th.ad-mod{text-align:left;position:sticky;left:0;background:var(--painel);z-index:1;font-weight:550;min-width:170px}
.mod-administrar table.ad-matriz thead th.ad-mod{z-index:3;background:var(--painel2)}
.mod-administrar table.ad-matriz tr.ad-pers th.ad-mod::after{content:'personalizado';margin-left:6px;font-size:10.5px;color:var(--roxo);font-weight:600}
.mod-administrar .ad-cel{width:26px;height:24px;border-radius:5px;border:1px solid var(--borda2);background:var(--painel2);color:var(--texto3);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font:inherit;font-size:13px;padding:0}
.mod-administrar .ad-cel[aria-pressed=true]{background:color-mix(in srgb,var(--verde) 22%,var(--painel));border-color:var(--verde);color:var(--verde);font-weight:700}
.mod-administrar .ad-cel.ad-dif{outline:2px solid var(--roxo);outline-offset:1px}
.mod-administrar .ad-cel.ad-neg[aria-pressed=false]{background:color-mix(in srgb,var(--verm) 16%,var(--painel));border-color:var(--verm);color:var(--verm)}
.mod-administrar .ad-cel.ad-conc[aria-pressed=true]{background:color-mix(in srgb,var(--azul) 20%,var(--painel));border-color:var(--azul);color:var(--azul)}
.mod-administrar .ad-cel:disabled{cursor:default;opacity:.8}
.mod-administrar .ad-cel:focus-visible{outline:2px solid var(--azul);outline-offset:1px}
.mod-administrar .ad-legenda{display:flex;gap:12px;flex-wrap:wrap;font-size:12px;color:var(--texto2);margin:6px 0}
.mod-administrar .ad-legenda span{display:inline-flex;gap:4px;align-items:center}
.mod-administrar .ad-semana-w{overflow-x:auto;max-width:100%}
.mod-administrar .ad-semana{min-width:640px;display:grid;grid-template-columns:minmax(120px,1.4fr) repeat(7,minmax(54px,1fr)) minmax(70px,1fr) minmax(70px,1fr);font-size:12.5px;border:1px solid var(--borda);border-radius:var(--raio);overflow:hidden;background:var(--painel)}
.mod-administrar .ad-semana>div{padding:5px 6px;border-bottom:1px solid var(--borda);text-align:right;font-variant-numeric:tabular-nums;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mod-administrar .ad-semana>div.ad-n{text-align:left}
.mod-administrar .ad-semana>div.ad-h{background:var(--painel2);color:var(--texto2);font-weight:600}
.mod-administrar .ad-semana>div.ad-fds{background:color-mix(in srgb,var(--texto3) 8%,var(--painel))}
.mod-administrar .ad-semana>div.ad-feriado{background:color-mix(in srgb,var(--ouro) 12%,var(--painel))}
.mod-administrar .ad-semana button.ad-dia{all:unset;cursor:pointer;display:block;width:100%;text-align:right}
.mod-administrar .ad-barrinha{height:4px;border-radius:3px;background:var(--painel2);margin-top:3px;overflow:hidden}
.mod-administrar .ad-barrinha i{display:block;height:100%;background:var(--azul)}
.mod-administrar .ad-barrinha i.ok{background:var(--verde)}.mod-administrar .ad-barrinha i.baixo{background:var(--ouro)}
.mod-administrar table.ad-diff{width:100%;border-collapse:collapse;font-size:12.5px}
.mod-administrar table.ad-diff th,.mod-administrar table.ad-diff td{padding:5px 6px;border-bottom:1px solid var(--borda);vertical-align:top;text-align:left;overflow-wrap:anywhere}
.mod-administrar table.ad-diff td.ad-antes{background:color-mix(in srgb,var(--verm) 9%,transparent)}
.mod-administrar table.ad-diff td.ad-depois{background:color-mix(in srgb,var(--verde) 10%,transparent)}
.mod-administrar table.ad-diff tr.igual td{color:var(--texto3);background:none}
.mod-administrar table.ad-diff del{color:var(--verm)}.mod-administrar table.ad-diff ins{color:var(--verde);text-decoration:none}
.mod-administrar .ad-logo{width:140px;height:80px;border:1px dashed var(--borda2);border-radius:var(--raio);display:flex;align-items:center;justify-content:center;background:var(--painel2);overflow:hidden}
.mod-administrar .ad-logo img{max-width:100%;max-height:100%;object-fit:contain}
.mod-administrar .ad-lista{list-style:none;margin:0;padding:0}
.mod-administrar .ad-lista li{border-bottom:1px solid var(--borda);padding:8px 0;display:flex;gap:10px;align-items:flex-start;min-width:0}
.mod-administrar .ad-lista li>div{min-width:0;flex:1;overflow-wrap:anywhere}
.mod-administrar .ad-pilha{display:flex;gap:4px;flex-wrap:wrap}
.mod-administrar .td-l.td-alerta>td,.mod-administrar .td-l.td-alerta{background:color-mix(in srgb,var(--verm) 9%,transparent)}
.mod-administrar .ad-ok{color:var(--verde)}.mod-administrar .ad-ruim{color:var(--verm)}
@media (max-width:760px){
  .mod-administrar .ad-dupla,.mod-administrar .ad-lado{grid-template-columns:minmax(0,1fr)}
  .mod-administrar .ad-barra>*{flex:1 1 140px}
  .mod-administrar .ad-cab h1{font-size:18px}
  .mod-administrar .ad-def{grid-template-columns:minmax(0,1fr)}
  .mod-administrar .ad-semana{min-width:480px;font-size:11.5px;grid-template-columns:minmax(90px,1.4fr) repeat(7,minmax(40px,1fr)) minmax(54px,1fr)}
  .mod-administrar .ad-semana>.ad-meta{display:none}
}`;export function preparar(a){if(typeof document<"u"&&!document.getElementById("mod-administrar-css")){const r=document.createElement("style");r.id="mod-administrar-css",r.textContent=D,document.head.append(r)}return a?.classList?.add("mod-administrar"),a}export function painelLateral(a={}){preparar(null);const r=$(a);return r?.corpo?.classList?.add("mod-administrar"),r}export const cabecalho=(a,r="",i="")=>`<div class="ad-cab"><div><h1>${m(a)}</h1>${r?`<p>${r}</p>`:""}</div>${i?`<div class="ad-acoes">${i}</div>`:""}</div>`,kpi=(a,r,i="",o="",e="")=>`<${e?`button type="button" data-kpi="${m(e)}"`:"div"} class="ad-kpi ${o}"><small>${m(a)}</small><b>${m(r)}</b>${i?`<span title="${m(i)}">${m(i)}</span>`:""}</${e?"button":"div"}>`,aviso=(a,r="")=>`<div class="ad-aviso ${r}">${y(r==="verde"?"ok":r==="azul"?"info":"alerta")}<div>${a}</div></div>`,mensagem=a=>String(a?.message||a||"Erro").replace(/^Error:\s*/,""),falhou=a=>z(mensagem(a),"erro");export async function auditar(a,r,i){try{await a.auditar?.(r,i)}catch{}}export const funcaoAusente=a=>/PGRST202|Could not find the function|does not exist|function .* not found|não disponível/i.test(String(a?.message||a?.code||a||"")),tabelaAusente=a=>/does not exist|PGRST205|42P01|Could not find the table|schema cache/i.test(String(a?.message||a?.code||a||"")),hoje=()=>_(),agora=()=>new Date().toISOString(),fusoLocal=()=>-new Date().getTimezoneOffset();export async function listar(a,r,i={}){try{return await a.api.listar(r,i)}catch(o){if(tabelaAusente(o))return[];throw o}}export const socio=a=>a.papel==="socio",gestor=a=>a.pode("configurar","administrar");export function nomeEmpresa(a,r){const i=typeof r=="object"?r:a.empresaPorId?.(r)||(a.empresas||[]).find(e=>e.id===r);if(!i)return r?"(empresa excluída)":"";const o=a.codigoEmpresa?.(i)??i.codigo;return`${o!=null&&o!==""?String(o).padStart(4,"0")+" — ":""}${i.fantasia||i.razao}`}export const nomePessoa=(a,r)=>r?a.nomePessoa?.(r)||(a.equipe||[]).find(i=>i.user_id===r)?.nome||(a.equipe||[]).find(i=>i.user_id===r)?.email||(r===a.usuario?.id?a.usuario?.nome:"")||"Usuário da empresa ou removido":"Sistema",opcoesPessoas=(a,{vazio:r=null,inativos:i=!1}={})=>[...r!=null?[["",r]]:[],...(a.equipe||[]).filter(o=>i||o.ativo!==!1).map(o=>[o.user_id,`${o.nome||o.email}${o.ativo===!1?" (inativo)":""}`])],opcoesEmpresas=(a,r="Todas as empresas")=>[["",r],...(a.empresas||[]).filter(i=>i.status!=="encerrada").map(i=>[i.id,nomeEmpresa(a,i)])],opcoesModulos=(a="Todos os módulos")=>[["",a],...n.MODULOS_ESCRITORIO.map(r=>[r,n.nomeModulo(r)])],empresasCodigo=a=>(a.empresas||[]).map(r=>({...r,codigo:a.codigoEmpresa?.(r)??r.codigo})),lerConfig=a=>n.lerConfig(a.escritorio||{});export async function lerTipos(a){const r=a.escritorio?.id?await listar(a,"ctb_tipos_servico",{eq:{escritorio_id:a.escritorio.id},ordem:"ordem"}):[];return r.length?r:n.TIPOS_SERVICO_PADRAO.map((i,o)=>({...i,ativo:!0,ordem:o+1,_padrao:!0}))}export const opcoesTipos=(a,r="— pelo módulo —")=>[["",r],...a.filter(i=>i.ativo!==!1).map(i=>[i.codigo,i.nome])];export async function lerDepartamentos(a){const r=a.escritorio?.id?await listar(a,"ctb_departamentos",{eq:{escritorio_id:a.escritorio.id},ordem:"ordem"}):[];return r.length?r:n.DEPARTAMENTOS_PADRAO.map(([i,o],e)=>({id:i,nome:o,ordem:e+1,ativo:!0,_padrao:!0}))}export async function atividadesPeriodo(a,r,i,o={}){if(!a.escritorio?.id)return[];const e=fusoLocal(),s=new Date(Date.parse(`${r}T00:00:00Z`)-e*6e4).toISOString(),d=new Date(Date.parse(`${i}T23:59:59Z`)-e*6e4).toISOString();return listar(a,"ctb_atividades",{eq:{escritorio_id:a.escritorio.id,...o.eq||{}},gte:{inicio:s},lte:{inicio:d},ordem:"inicio",limite:1e5})}export async function lerCustos(a){return!gestor(a)||!a.escritorio?.id?[]:listar(a,"ctb_custos_equipe",{eq:{escritorio_id:a.escritorio.id},ordem:"vigencia"}).catch(()=>[])}export function periodoDaCompetencia(a){const r=a.competencia||hoje().slice(0,7),[i,o]=r.split("-").map(Number);return{de:`${r}-01`,ate:`${r}-${String(new Date(Date.UTC(i,o,0)).getUTCDate()).padStart(2,"0")}`}}export{u as compSomar};export function empresaDoEscritorio(a){const r=a.escritorio||{};return{id:r.id,razao:r.nome||"Escritório",fantasia:r.nome,cnpj:r.cnpj||"",ie:" ",im:r.config?.inscricao_municipal||"",uf:r.uf,municipio:r.municipio}}export const fecharDepois=(a,r=!0)=>setTimeout(()=>a?.fechar?.(r),0);export async function dadosDesempenho(a,r,i,{previsto:o=!0}={}){const e=a.escritorio?.id,s=(a.empresas||[]).map(t=>t.id),d=n.mesesDoPeriodo(r,i),p=async(t,l)=>{const v=[];for(let c=0;c<s.length;c+=150)v.push(...await listar(a,t,{...l,in:{...l.in||{},empresa_id:s.slice(c,c+150)}}));return v},[f,b,h,x,w,k]=await Promise.all([listar(a,"ctb_tarefas",{eq:{escritorio_id:e},limite:5e4}),s.length?p("ctb_agenda",{gte:{vencimento:r},lte:{vencimento:i},limite:5e4}):[],listar(a,"hon_cobrancas",{eq:{escritorio_id:e},in:{competencia:d},limite:5e4}),atividadesPeriodo(a,r,i),s.length?p("ctb_empresa_responsaveis",{}):[],lerCustos(a)]),g=lerConfig(a);return n.desempenho({equipe:(a.equipe||[]).filter(t=>t.ativo!==!1||x.some(l=>l.user_id===t.user_id)),empresas:empresasCodigo(a).filter(t=>t.status!=="encerrada"),responsaveis:w,tarefas:f,agenda:b,cobrancas:h,atividades:x,custos:k,de:r,ate:i,hoje:hoje(),tipos:await lerTipos(a),fusoMin:fusoLocal(),custoPadrao:g.custo_hora_padrao,previsto:o,metaDia:g.meta_horas_dia,feriados:[...new Set([...n.mesesDoPeriodo(r,i).map(t=>Number(t.slice(0,4)))])].flatMap(t=>S(t)).concat(a.escritorio?.config?.feriados||[])})}export function periodoRapido(a,r){const i=a.competencia||hoje().slice(0,7),o=d=>{const[p,f]=d.split("-").map(Number);return`${d}-${String(new Date(Date.UTC(p,f,0)).getUTCDate()).padStart(2,"0")}`},[e,s]=i.split("-").map(Number);if(r==="trimestre"){const d=`${e}-${String(Math.floor((s-1)/3)*3+1).padStart(2,"0")}`;return{de:`${d}-01`,ate:o(u(d,2))}}return r==="ano"?{de:`${e}-01-01`,ate:o(i)}:r==="12m"?{de:`${u(i,-11)}-01`,ate:o(i)}:{de:`${i}-01`,ate:o(i)}}export const sessao={ultimoZip:null};export function guardarZip(a,r){sessao.ultimoZip={nome:a,bytes:r,quando:new Date().toISOString()}}
