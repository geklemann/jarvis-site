/*! © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md. */
import{esc as p}from"../../comum/nucleo.js";import*as g from"../../motor/gente/integracoes.js";import{preparar as d}from"./clima.js";import{lerCsv as n,lerXlsx as s}from"../../../simples/motor/gestao_importar.js";export{g as M};export const COR_SITUACAO=Object.freeze({ligada:"",conectada:"",usada:"azul",erro:"verm",livre:"cinza",desconhecida:"cinza"}),COR_ACAO=Object.freeze({inserir:"",atualizar:"azul",desligar:"ouro",igual:"cinza",ignorar:"cinza",erro:"verm"}),ACOES=Object.freeze({inserir:"Entra",atualizar:"Muda",desligar:"Sai",igual:"Igual",ignorar:"Fica de fora",erro:"Com erro"}),ROTULO_SEGREDO=Object.freeze({app_key:"App key",app_secret:"App secret",token:"Token de acesso",appkey:"App key",usuario:"Usuário",senha:"Senha"}),ROTULO_CONFIG=Object.freeze({tenant:"Tenant (o nome da empresa na plataforma)",endereco:"Endereço do servidor (https://…)",coligada:"Coligada",sentenca:"Código da consulta SQL cadastrada",conta:"Número da conta"});export async function buscarNaApi(o,e){if(o.api?.modo==="demo"||!o.api?.sb?.functions)return o.api.rpc("gente_integracao_buscar",{p_empresa:o.empresa.id,p_fonte:e});const{data:r,error:a}=await o.api.sb.functions.invoke("pessoas-integracoes",{body:{acao:"buscar",empresa_id:o.empresa.id,fonte:e}});if(a){let t=a.message||"A busca não respondeu.";try{const i=await a.context?.json?.();i?.error&&(t=i.error)}catch{}throw new Error(t)}return r}export async function lerArquivos(o=[]){const e=[...o];if(!e.length)throw new Error("Escolha um arquivo.");if(e.every(a=>/\.xml$/i.test(a.name)))return{tipo:"xml",arquivos:await Promise.all(e.map(async a=>({nome:a.name,texto:await a.text()})))};if(e.length>1)throw new Error("A planilha vai uma de cada vez (vários arquivos só para os XML do eSocial).");const r=e[0];if(/\.xlsx$/i.test(r.name))return{tipo:"tabela",arquivos:[{nome:r.name}],tabela:await s(new Uint8Array(await r.arrayBuffer()))};if(/\.xls$/i.test(r.name))throw new Error("O formato .xls antigo não abre aqui: salve como .xlsx ou CSV.");return{tipo:"tabela",arquivos:[{nome:r.name}],tabela:n(await r.text())}}export const tabelaDoTexto=o=>n(o),valorTela=(o,e)=>e==null||e===""?"—":o==="salario"?Number(e).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}):/^\d{4}-\d{2}-\d{2}/.test(String(e))?String(e).slice(0,10).split("-").reverse().join("/"):String(e);export function preparar(o){if(d(o),typeof document<"u"&&document.head&&!document.getElementById("mod-gente-integ-css")){const e=document.createElement("style");e.id="mod-gente-integ-css",e.textContent=m,document.head.append(e)}return o}const l={jarvis:"J",planilha:"CSV",esocial:"eS",dominio:"D",senior:"S",totvs_rm:"RM",protheus:"P",questor:"Q",omie:"O",conta_azul:"CA",sankhya:"SK",netsuite:"NS",bling:"B"};export const sigla=o=>p(l[o]||String(o||"?").slice(0,2).toUpperCase());const m=`
.mod-gente .gi-grupo{margin:0 0 18px}
.mod-gente .gi-grupo>h2{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:650;color:var(--texto2);margin:0 0 10px;letter-spacing:.01em}
.mod-gente .gi-grupo>h2 .ic{width:16px;height:16px;color:var(--gp-a)}
.mod-gente .gi-cartoes{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:12px}
.mod-gente .gi-cartao{position:relative;display:flex;flex-direction:column;gap:10px;padding:16px 18px;border-radius:var(--gp-raio);border:1px solid var(--borda);background:var(--painel);box-shadow:var(--gp-sombra);transition:border-color .2s,transform .18s}
.mod-gente .gi-cartao:hover{border-color:color-mix(in srgb,var(--gp-a) 30%,var(--borda))}
.mod-gente .gi-cartao.erro{border-color:color-mix(in srgb,var(--verm) 45%,var(--borda))}
.mod-gente .gi-topo{display:flex;align-items:center;gap:12px}
.mod-gente .gi-logo{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:var(--gp-af);color:var(--gp-a);font-weight:750;font-size:13px;letter-spacing:.02em}
.mod-gente .gi-cartao.jarvis .gi-logo{background:var(--gp-grad);color:#fff}
.mod-gente .gi-topo .gp-tx{flex:1;display:flex;flex-direction:column;min-width:0;line-height:1.3}
.mod-gente .gi-topo b{font-size:14.5px;font-weight:650}
.mod-gente .gi-topo small{font-size:12px;color:var(--texto3)}
.mod-gente .gi-cartao p{margin:0;font-size:12.5px;color:var(--texto2);line-height:1.5}
.mod-gente .gi-fatos{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:var(--texto3)}
.mod-gente .gi-fatos b{color:var(--texto);font-variant-numeric:tabular-nums}
.mod-gente .gi-erro{font-size:12.5px;color:var(--verm);background:var(--verm-bg);padding:8px 10px;border-radius:10px}
.mod-gente .gi-acoes{display:flex;gap:6px;flex-wrap:wrap;margin-top:auto}
.mod-gente .gi-passos{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 16px;padding:0;list-style:none;counter-reset:p}
.mod-gente .gi-passos li{display:flex;align-items:center;gap:8px;padding:6px 12px 6px 6px;border-radius:999px;background:var(--painel);border:1px solid var(--borda);font-size:12.5px;font-weight:600;color:var(--texto3);counter-increment:p}
.mod-gente .gi-passos li::before{content:counter(p);display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--painel2);font-size:11.5px}
.mod-gente .gi-passos li.atual{color:var(--texto);border-color:color-mix(in srgb,var(--gp-a) 45%,var(--borda))}
.mod-gente .gi-passos li.atual::before,.mod-gente .gi-passos li.feito::before{background:var(--gp-a);color:#fff}
.mod-gente .gi-solta{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:26px 18px;border-radius:var(--gp-raio);border:2px dashed color-mix(in srgb,var(--gp-a) 35%,var(--borda));background:color-mix(in srgb,var(--gp-af) 45%,var(--painel));text-align:center;cursor:pointer;transition:background-color .2s,border-color .2s}
.mod-gente .gi-solta:hover,.mod-gente .gi-solta.sobre{border-color:var(--gp-a);background:var(--gp-af)}
.mod-gente .gi-solta .ic{width:30px;height:30px;color:var(--gp-a)}
.mod-gente .gi-solta b{font-size:14.5px}.mod-gente .gi-solta small{font-size:12.5px;color:var(--texto3)}
.mod-gente .gi-solta input{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.mod-gente .gi-mapa{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px 14px}
.mod-gente .gi-mapa label{display:flex;flex-direction:column;gap:4px;font-size:12.5px;font-weight:600;color:var(--texto2)}
.mod-gente .gi-mapa select{height:38px;border-radius:10px;border:1px solid var(--borda);background:var(--painel);color:var(--texto);font:inherit;font-size:13px;padding:0 8px}
.mod-gente .gi-mapa label.sugerido select{border-color:color-mix(in srgb,var(--gp-a) 45%,var(--borda))}
.mod-gente .gi-itens{display:flex;flex-direction:column}
.mod-gente .gi-item{display:grid;grid-template-columns:52px minmax(0,1.3fr) 104px minmax(0,2fr);gap:12px;align-items:start;padding:11px 16px;border-top:1px solid var(--linha);font-size:13px}
.mod-gente .gi-item:first-child{border-top:0}
.mod-gente .gi-item.gp-th{font-size:11.5px;font-weight:650;color:var(--texto3);text-transform:uppercase;letter-spacing:.05em;background:var(--painel2);padding-top:9px;padding-bottom:9px}
.mod-gente .gi-item .gi-linha{color:var(--texto3);font-variant-numeric:tabular-nums}
.mod-gente .gi-mud{display:flex;flex-direction:column;gap:3px}
.mod-gente .gi-mud span{display:flex;gap:6px;flex-wrap:wrap;align-items:baseline}
.mod-gente .gi-mud i{font-style:normal;color:var(--texto3);font-size:12px}
.mod-gente .gi-mud s{color:var(--texto3)}
.mod-gente .gi-mud .gi-av{color:var(--ouro);font-size:12px}.mod-gente .gi-mud .gi-er{color:var(--verm);font-size:12px}
.mod-gente .gi-div{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.mod-gente .gi-div>div{padding:12px 14px;border-radius:12px;background:var(--painel2)}
.mod-gente .gi-div b{display:block;font-size:22px;font-weight:700;font-variant-numeric:tabular-nums}
.mod-gente .gi-div small{font-size:12px;color:var(--texto3)}
.mod-gente .gi-rodape{position:sticky;bottom:0;display:flex;gap:12px;align-items:center;justify-content:flex-end;flex-wrap:wrap;padding:12px 16px;margin-top:16px;border-radius:var(--gp-raio);background:color-mix(in srgb,var(--painel) 92%,transparent);border:1px solid var(--borda);backdrop-filter:blur(8px);box-shadow:var(--gp-sombra)}
.mod-gente .gi-rodape span{margin-right:auto;font-size:13px;color:var(--texto2)}
@media (max-width:760px){
  .mod-gente .gi-item{grid-template-columns:minmax(0,1fr) auto}.mod-gente .gi-item .gi-linha{display:none}.mod-gente .gi-item .gi-mud{grid-column:1/-1}
  .mod-gente .gi-item.gp-th{display:none}
  .mod-gente .gi-div{grid-template-columns:repeat(2,minmax(0,1fr))}
  .mod-gente .gi-rodape{position:static;backdrop-filter:none}.mod-gente .gi-rodape span{flex-basis:100%}
}
`;
