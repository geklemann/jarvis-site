/*! © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md. */
import{esc as t,ic as r,dataBR as c,preparar as b,cabecalho as h,aviso as v,linkNorma as m,aConferir as u,selo as C,termo as s}from"../base.js";import{IFRS18 as P,AVISO_DIREITOS as S}from"../../../motor/normas/ifrs.js";import{hojeIso as f,diasEntre as I,MESES_LONGOS as A}from"../../../comum/nucleo.js";export const dataMarco=e=>/^\d{4}-\d{2}$/.test(e)?`${A[Number(e.slice(5,7))-1]} de ${e.slice(0,4)}`:c(e);export function marcosComSituacao(e,n=f()){let i=!1;return e.map(o=>(o.data.length===7?`${o.data}-28`:o.data)<=n?{...o,situacao:"feito"}:i?{...o,situacao:""}:(i=!0,{...o,situacao:"proximo"}))}export async function render(e,n,i=[]){b(e),n.titulo?.("IFRS 18 e CPC 51");const o=P,d=f(),l=o.marcos.at(-1).data,$=I(d,l),p=a=>/\D/.test(a)?"itens":"item";return e.innerHTML=`${h(`${o.codigo} e CPC 51 — ${o.titulo}`,`Resumo com palavras próprias. Fatos conferidos em ${t(c(o.conferidoEm))} na página oficial da IFRS 18 e no texto oficial do CPC 51; cada assunto aponta o item do CPC 51.`,`<a class="btn" href="${t(o.link)}" target="_blank" rel="noopener">${r("link")} Página oficial da IFRS 18</a> ${m(n,"CPC 51",null,"Texto do CPC 51")}`,"Painel")}
    ${v(t(S),"azul")}
    <div class="nm-duas nm-entra">
      <section class="nm-cartao" aria-labelledby="nm-tempo-t"><h3 id="nm-tempo-t">${r("agenda")} Linha do tempo</h3>
        <ol class="nm-tempo">${marcosComSituacao(o.marcos,d).map(a=>`<li class="${a.situacao}" data-marco="${t(a.data)}"><b>${t(dataMarco(a.data))}</b>${t(a.titulo)} <span class="nm-mut">(${t(a.fonte)})</span></li>`).join("")}</ol></section>
      <section class="nm-cartao" aria-labelledby="nm-cont-t"><h3 id="nm-cont-t">${r("relogio")} Vigência</h3>
        ${$>0?`<div class="nm-contagem" data-contagem><b>${$}</b><span>dia(s) para ${t(c(l))}</span></div>`:`<div class="nm-contagem" data-contagem><b>${r("ok")}</b><span>Em vigor desde ${t(c(l))}</span></div>`}
        <p class="nm-mut">Para o pleno atendimento às normas internacionais (CPC 51, item C1); a vigência no Brasil é a dos reguladores que aprovarem o CPC 51. Com um ano de comparativo, 2026 também é apresentado na estrutura nova (itens C2 e C3).</p></section>
    </div>
    <section class="nm-cartao" aria-labelledby="nm-antes-t"><h3 id="nm-antes-t">${r("migrar")} Antes e depois ${C("resumo próprio")}</h3>
      <div class="nm-rolagem"><table class="nm-tab empilha"><thead><tr><th>Assunto</th><th>Antes (CPC 26 / IAS 1)</th><th>Agora (CPC 51 / IFRS 18)</th><th>No CPC 51</th></tr></thead><tbody>
      ${o.comparativo.map(a=>`<tr><td data-r="Assunto"><b>${t(a.tema)}</b></td><td data-r="Antes">${t(a.antes)}</td><td data-r="Agora">${t(a.depois)}</td><td data-r="No CPC 51">${m(n,"CPC 51",a.itens,`${p(a.itens)} ${a.itens}`)}</td></tr>`).join("")}
      </tbody></table></div></section>
    <div class="nm-cartao"><h3>${r("info")} Fatos conferidos</h3><dl class="nm-def">${o.fatos.map(a=>`<dt>${t(a.rotulo)}</dt><dd>${t(a.valor)} <span class="mut">(${t(a.fonte)})</span>${a.conferir?` ${u()}`:""}</dd>`).join("")}</dl></div>
    <p class="nm-mut">Termos: ${s("categoria-operacional","categoria operacional")} · ${s("categoria-investimento","de investimento")} · ${s("categoria-financiamento","de financiamento")} · ${s("subtotais","subtotais obrigatórios")} · ${s("mpm","MPM")} · ${s("agregacao","agregação")}</p>
    <div class="nm-grade">${o.secoes.map(a=>`<div class="nm-cartao" id="secao-${t(a.id)}" data-secao="${t(a.id)}"${i[0]===a.id?' style="border-color:var(--nm-acc)"':""}>
      <h3>${t(a.titulo)} ${a.conferir?u():C("resumo próprio")}</h3>
      <p>${t(a.texto)}</p>
      ${a.itens?`<ul class="nm-lista">${a.itens.map(g=>`<li>${t(g)}</li>`).join("")}</ul>`:""}
      ${a.referencia?`<p class="mut">No CPC 51: ${m(n,a.referencia.norma,a.referencia.itens,`${a.referencia.norma}, ${p(a.referencia.itens)} ${a.referencia.itens}`)}</p>`:""}
    </div>`).join("")}</div>`,i[0]&&e.querySelector(`[data-secao="${String(i[0]).replace(/[^a-z0-9-]/g,"")}"]`)?.scrollIntoView?.({block:"start"}),{}}
