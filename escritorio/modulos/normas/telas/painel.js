/*! © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md. */
import{esc as u,ic as m,dataBR as d,preparar as v,kpi as e,link as i,aviso as f,seloRoteiro as p,CONSULTADO_EM as $}from"../base.js";import{NORMAS as C,resumoCatalogo as S}from"../../../motor/normas/catalogo.js";import{ROTEIROS as c,resumoRoteiros as g}from"../../../motor/normas/roteiros.js";import{situacaoDoSelo as b}from"../../../motor/normas/revisao.js";import{acervoPadrao as R}from"../../../motor/normas/acervo.js";import{MOTIVO_DESLIGADO as O}from"../../../motor/normas/assistente.js";export async function render(t,s){v(t);const l=S(C),n=o=>b(o,{acervo:R}),r=g(c,n),a=s.modulo?.id?s:{...s,modulo:{id:"normas"}};return t.innerHTML=`
    <form class="nm-busca" data-form><input type="search" name="q" placeholder="Procure um fato, uma norma ou um item: leasing, PCLD, CPC 47 item 31…" aria-label="Buscar nas normas"><button class="btn pri" type="submit">${m("busca")} Buscar</button></form>
    <div class="nm-kpis">${e("Normas no catálogo",String(l.total),`fonte oficial, consulta de ${d($)}`)}${e("Com texto oficial",String(l.comTexto),"item a item","azul")}${e("Roteiros",String(r.total),`${r.revisados} revisado(s) por contador`,r.revisados?"verde":"ouro")}${e("Na fila de revisão",String(r.aguardam+r.vencidos),"",r.aguardam+r.vencidos?"ouro":"verde")}</div>
    ${f(`${u(O)}. A busca e os roteiros funcionam sem IA.`,"azul")}
    <div class="nm-grade">
      <div class="nm-cartao"><h3>${m("livro")} ${i(a,"roteiros",[],"Roteiros de lançamento")}</h3><ul class="nm-lista">${c.map(o=>`<li>${i(a,"roteiros",[o.id],u(o.titulo))}<br>${p(n(o))}</li>`).join("")}</ul></div>
      <div class="nm-cartao"><h3>${m("doc")} Acervo</h3><ul class="nm-lista">
        <li>${i(a,"normas",[],"Consultar normas (CPC, ICPC, OCPC, NBC)")}</li>
        <li>${i(a,"ifrs",[],"IFRS e a correlação com os CPCs")}</li>
        <li>${i(a,"ifrs-18",[],"IFRS 18 e CPC 51 (resumo próprio)")}</li>
        <li>${i(a,"fila-revisao",[],"Fila de revisão")}</li>
        <li>${i(a,"assistente",[],"Assistente (desligado)")}</li></ul></div>
    </div>`,t.querySelector("[data-form]").addEventListener("submit",o=>{o.preventDefault(),s.ir?.({modulo:"normas",item:"buscar",query:{q:o.target.querySelector("[name=q]").value}})}),{}}
