import{esc as t,ic as d,brl as g,dataBR as b}from"../../comum/nucleo.js";import{NORMAS as y,acharNorma as z,CONSULTADO_EM as k}from"../../motor/normas/catalogo.js";import{contaDoPlano as C,contaReferencial as j,totaisDaPartida as E,totaisDoExemplo as S}from"../../motor/normas/roteiros.js";import{NOMES_SITUACAO as h,comandoAprovar as D}from"../../motor/normas/revisao.js";export{t as esc,d as ic,g as brl,b as dataBR,k as CONSULTADO_EM};const R=`
.mod-normas{--nm-max:1100px}
.mod-normas .nm-cab{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px}
.mod-normas .nm-cab h1{font-size:20px;margin:0;overflow-wrap:anywhere}
.mod-normas .nm-cab p{margin:3px 0 0;color:var(--texto2);font-size:13px;max-width:900px}
.mod-normas .nm-acoes{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.mod-normas .nm-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-bottom:12px}
.mod-normas .nm-kpi{background:var(--painel);border:1px solid var(--borda);border-radius:var(--raio);padding:8px 12px;min-width:0}
.mod-normas .nm-kpi small{display:block;color:var(--texto3);font-size:11.5px;text-transform:uppercase;letter-spacing:.02em}
.mod-normas .nm-kpi b{display:block;font-size:17px;font-variant-numeric:tabular-nums}
.mod-normas .nm-kpi span{display:block;color:var(--texto2);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mod-normas .nm-kpi.verde b{color:var(--verde)}.mod-normas .nm-kpi.ouro b{color:var(--ouro)}.mod-normas .nm-kpi.verm b{color:var(--verm)}.mod-normas .nm-kpi.azul b{color:var(--azul)}
.mod-normas .nm-aviso{display:flex;gap:10px;align-items:flex-start;border:1px solid var(--borda);border-left:4px solid var(--ouro);background:var(--painel);border-radius:var(--raio);padding:8px 12px;margin-bottom:10px;font-size:13px}
.mod-normas .nm-aviso.verm{border-left-color:var(--verm)}.mod-normas .nm-aviso.verde{border-left-color:var(--verde)}.mod-normas .nm-aviso.azul{border-left-color:var(--azul)}
.mod-normas .nm-aviso>div{min-width:0;flex:1;overflow-wrap:anywhere}
.mod-normas .nm-cartao{background:var(--painel);border:1px solid var(--borda);border-radius:var(--raio);padding:10px 12px;min-width:0;margin-bottom:10px}
.mod-normas .nm-cartao h3{margin:0 0 8px;font-size:14px;display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.mod-normas .nm-cartao h3 a{color:inherit}
.mod-normas .nm-cartao p{margin:4px 0;font-size:13px;overflow-wrap:anywhere}
.mod-normas .nm-grade{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px}
.mod-normas .nm-def{display:grid;grid-template-columns:minmax(0,170px) minmax(0,1fr);gap:4px 10px;font-size:13px;margin:0}
.mod-normas .nm-def dt{color:var(--texto3)}.mod-normas .nm-def dd{margin:0;overflow-wrap:anywhere}
.mod-normas .nm-tab{width:100%;border-collapse:collapse;font-size:13px}
.mod-normas .nm-tab th{text-align:left;font-weight:600;color:var(--texto3);font-size:12px;border-bottom:1px solid var(--borda);padding:6px 8px}
.mod-normas .nm-tab td{border-bottom:1px solid var(--linha);padding:6px 8px;vertical-align:top;overflow-wrap:anywhere}
.mod-normas .nm-tab td.num,.mod-normas .nm-tab th.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.mod-normas .nm-tab tr.total td{font-weight:700;border-bottom:0}
.mod-normas .nm-rolagem{overflow-x:auto;max-width:100%}
.mod-normas .nm-cod{font-family:var(--mono);font-size:11.5px;background:var(--painel2);border:1px solid var(--borda);border-radius:4px;padding:0 5px;overflow-wrap:anywhere}
.mod-normas .nm-comando{display:flex;gap:6px;align-items:stretch;flex-wrap:wrap;margin:6px 0}
.mod-normas .nm-comando code{flex:1 1 240px;min-width:0;font-family:var(--mono);font-size:12px;background:var(--painel2);border:1px solid var(--borda);border-radius:var(--raio);padding:6px 8px;overflow-wrap:anywhere}
.mod-normas .nm-item{border-top:1px dashed var(--borda);padding:8px 0;font-size:13px;min-width:0}
.mod-normas .nm-item:target,.mod-normas .nm-item.alvo{background:var(--azul-bg);border-radius:var(--raio);padding:8px}
.mod-normas .nm-item .n{font-weight:700;margin-right:6px}
.mod-normas .nm-item .s{color:var(--texto3);font-size:12px}
.mod-normas .nm-item p{margin:4px 0;white-space:pre-line;overflow-wrap:anywhere}
.mod-normas .nm-item.anterior{opacity:.65}
.mod-normas .nm-res{border-top:1px solid var(--linha);padding:10px 0;min-width:0}
.mod-normas .nm-res a.t{font-weight:600;font-size:14px}
.mod-normas .nm-res p{margin:4px 0;font-size:13px;color:var(--texto2);overflow-wrap:anywhere}
.mod-normas mark{background:var(--ouro-bg);color:inherit;border-radius:3px;padding:0 1px}
.mod-normas .nm-busca{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px}
.mod-normas .nm-busca input[type=search]{flex:1 1 260px;min-width:0;height:38px;font-size:15px}
.mod-normas .nm-filtros{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px}
.mod-normas .nm-filtros select,.mod-normas .nm-filtros input{min-width:0;max-width:100%}
.mod-normas .nm-fund li{margin:6px 0}
.mod-normas details.nm-det>summary{cursor:pointer;font-size:13px;color:var(--azul)}
.mod-normas .nm-texto-oficial{border-left:3px solid var(--borda2);padding:4px 10px;margin:6px 0;font-size:12.5px;color:var(--texto2);white-space:pre-line}
.mod-normas .nm-lista{margin:0;padding-left:20px;font-size:13px}.mod-normas .nm-lista li{margin:3px 0}
@media (max-width:760px){
  .mod-normas .nm-cab h1{font-size:18px}
  .mod-normas .nm-def{grid-template-columns:minmax(0,1fr)}
  .mod-normas .nm-def dt{margin-top:4px}
  .mod-normas .nm-grade{grid-template-columns:minmax(0,1fr)}
  .mod-normas .nm-tab.empilha thead{display:none}
  .mod-normas .nm-tab.empilha tr{display:block;border-bottom:1px solid var(--borda);padding:6px 0}
  .mod-normas .nm-tab.empilha td{display:block;border:0;padding:2px 4px}
  .mod-normas .nm-tab.empilha td[data-r]::before{content:attr(data-r) ': ';color:var(--texto3);font-size:12px}
}`;export function preparar(a){if(typeof document<"u"&&!document.getElementById("mod-normas-css")){const o=document.createElement("style");o.id="mod-normas-css",o.textContent=R,document.head.append(o)}return a?.classList?.add("mod-normas"),a}export const cabecalho=(a,o="",n="")=>`<div class="nm-cab"><div><h1>${t(a)}</h1>${o?`<p>${o}</p>`:""}</div>${n?`<div class="nm-acoes">${n}</div>`:""}</div>`,kpi=(a,o,n="",s="")=>`<div class="nm-kpi ${s}"><small>${t(a)}</small><b>${t(o)}</b>${n?`<span>${t(n)}</span>`:""}</div>`,aviso=(a,o="")=>`<div class="nm-aviso ${o}">${d(o==="verde"?"ok":o==="azul"?"info":"alerta")}<div>${a}</div></div>`,selo=(a,o="",n="")=>`<span class="selo ${o}">${n?d(n):""}${t(a)}</span>`,aConferir=(a="a conferir")=>selo(a,"ouro","alerta");const x=a=>g(a).replace(/^R\$\s?/,"");export const link=(a,o,n=[],s="",e="")=>`<a ${e?`class="${e}" `:""}href="${t(a.rota({modulo:a.modulo?.id||"normas",item:o,params:n}))}">${s}</a>`;export function seloRoteiro(a){return a.valido?selo(`${h.revisado} · ${a.revisao.nome}, CRC ${a.revisao.crc}, ${b(a.revisao.data)}`,"verde","escudo"):a.situacao==="vencido"?selo(h.vencido,"verm","alerta"):selo(h.aguarda,"ouro","relogio")}export const seloSituacao=a=>a.situacao==="vigente"?selo("Vigente","verde"):selo(a.nota?`${{revogada:"Revogada",transformada:"Transformada","nao-editado":"Não editado"}[a.situacao]||a.situacao}`:a.situacao,a.situacao==="revogada"?"verm":"");export function linkNorma(a,o,n=null,s=null){const e=z(o,y),p=t(s??(n?`${o}, item ${n}`:o));if(!e)return p;const l=n?String(n).split(/\s*(?:,|;| e | a )\s*/)[0]:null;return link(a,"normas",l?[e.slug,l]:[e.slug],p)}export function htmlRoteiro(a,o,n,{citacoes:s=new Map,motor:e=null}={}){const p=o.contas||{},l=r=>t(p[r]?.nome||r),f=(o.lancamentos||[]).map(r=>`<tr><td data-r="Evento">${t(r.evento)}</td><td data-r="Débito">${r.debito.map(l).join("<br>")}</td><td data-r="Crédito">${r.credito.map(l).join("<br>")}</td><td data-r="Histórico">${t(r.historico)}</td><td data-r="Base de cálculo">${t(r.base)}</td></tr>`).join(""),v=([r,i])=>{const c=i.escritorio?C(i.escritorio):null,m=i.referencial?j(i.referencial):null;return`<tr><td data-r="Conta"><b>${t(i.nome)}</b><br><span class="mut">${t(i.natureza||"")}</span></td>
      <td data-r="Plano do Escritório">${c?`<span class="nm-cod">${t(c.classificacao)}</span> ${t(c.nome)}`:`${selo("criar no plano","azul")} <span class="mut">${t(i.sugestao||"")}</span>`}</td>
      <td data-r="Plano referencial">${m?`<span class="nm-cod">${t(m.codigo)}</span> ${t(m.descricao)} ${aConferir("referencial a conferir")}`:'<span class="mut">a definir com a tabela oficial do PVA</span>'}</td></tr>`},$=(o.exemplo?.partidas||[]).map(r=>{const i=E(r),c=(o.lancamentos||[]).find(m=>m.id===r.lancamento);return`<tr><td colspan="4" class="mut" style="padding-top:10px"><b>${t(b(r.data))}</b> · ${t(c?.evento||r.lancamento)} — ${t(r.historico)}</td></tr>
      ${r.linhas.map(m=>`<tr><td></td><td>${l(m.conta)}</td><td class="num">${m.tipo==="D"?x(m.valor):""}</td><td class="num">${m.tipo==="C"?x(m.valor):""}</td></tr>`).join("")}
      <tr class="total"><td></td><td>${i.fecha?`${d("ok")} fecha`:`${d("alerta")} não fecha`}</td><td class="num">${x(i.debitos)}</td><td class="num">${x(i.creditos)}</td></tr>`}).join(""),u=S(o),w=(o.fundamento||[]).map(r=>{const i=s.get(`${r.norma}|${r.item}`),c=r.conferir?aConferir("a conferir no texto oficial"):i?.existe===!1?selo("item não achado no texto importado","verm","alerta"):selo("conferido no texto oficial","verde","ok");return`<li><b>${linkNorma(a,r.norma,r.item,`${r.norma}, item ${r.item}`)}</b> ${c}<br>${t(r.texto)}
      ${i?.textos?.length?`<details class="nm-det"><summary>Ver o texto oficial do item</summary>${i.textos.map(m=>`<div class="nm-texto-oficial"><b>${t(m.numero)}.</b> ${t(m.texto)}</div>`).join("")}</details>`:""}</li>`}).join("");return`
    <div class="nm-cartao"><h3>${seloRoteiro(n)}</h3>
      ${n.valido?"":aviso(`<b>Sugestão a conferir.</b> Este roteiro ainda não foi revisado por contador${n.situacao==="vencido"?" (o selo anterior caiu: "+t(n.motivos.join(" "))+")":""}. Use como ponto de partida e confira o fundamento antes de lançar.`)}
      <p><b>Quando usar:</b> ${t(o.quando)}</p>
      <p class="mut">Palavras-chave: ${(o.palavras||[]).map(t).join(" · ")}</p></div>
    <div class="nm-cartao"><h3>${d("livro")} Lançamentos</h3><div class="nm-rolagem"><table class="nm-tab empilha"><thead><tr><th>Evento</th><th>Débito</th><th>Crédito</th><th>Histórico</th><th>Base de cálculo</th></tr></thead><tbody>${f}</tbody></table></div></div>
    <div class="nm-cartao"><h3>${d("doc")} Contas sugeridas</h3><div class="nm-rolagem"><table class="nm-tab empilha"><thead><tr><th>Conta</th><th>Plano do Escritório (modelo)</th><th>Plano referencial da ECD</th></tr></thead><tbody>${Object.entries(p).map(v).join("")}</tbody></table></div></div>
    <div class="nm-cartao"><h3>${d("calc")} Exemplo numérico ${u.fecha?selo("débitos = créditos","verde","ok"):selo("não fecha","verm","alerta")}</h3>
      <p>${t(o.exemplo?.enunciado||"")}</p>
      ${e?`<p>${e}</p>`:""}
      <div class="nm-rolagem"><table class="nm-tab"><thead><tr><th></th><th>Conta</th><th class="num">Débito</th><th class="num">Crédito</th></tr></thead><tbody>${$}
      <tr class="total"><td></td><td>Total do exemplo</td><td class="num">${x(u.debitos)}</td><td class="num">${x(u.creditos)}</td></tr></tbody></table></div></div>
    <div class="nm-cartao"><h3>${d("escudo")} Fundamento</h3><ul class="nm-lista nm-fund">${w}</ul></div>
    <div class="nm-cartao"><h3>${d("relogio")} Vigência</h3><p>${t(o.vigencia?.texto||"")} ${o.vigencia?.conferir?aConferir():""}</p></div>
    ${(o.avisos||[]).length?`<div class="nm-cartao"><h3>${d("alerta")} Avisos</h3><ul class="nm-lista">${o.avisos.map(r=>`<li>${t(r)}</li>`).join("")}</ul></div>`:""}
    <p class="mut" style="font-size:12px">Resumo SHA-256 do conteúdo: <span class="nm-cod">${t(n.resumo.slice(0,16))}…</span>${n.valido?"":` · para aprovar (só o dono): <span class="nm-cod">${t(D(o.id))}</span>`}</p>`}export async function conferirCitacoes(a,o,n){const s=new Map;for(const e of a.fundamento||[]){if(!o.tem(e.norma))continue;const p=n(e.item),l=[];for(const f of p){const v=await o.item(e.norma,f);v&&l.push(v)}s.set(`${e.norma}|${e.item}`,{existe:l.length===p.length,textos:l})}return s}
