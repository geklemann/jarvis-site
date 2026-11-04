import{esc as a,ic as t,dataBR as d,preparar as $,cabecalho as p,aviso as m,linkNorma as l,aConferir as c,selo as f}from"../base.js";import{IFRS18 as u,AVISO_DIREITOS as C}from"../../../motor/normas/ifrs.js";export async function render(i,r,n=[]){$(i),r.titulo?.("IFRS 18 — resumo próprio");const e=u;return i.innerHTML=`${p(`${e.codigo} — ${e.titulo}`,`Resumo com palavras próprias. Fatos conferidos em ${a(d(e.conferidoEm))} na página oficial da IFRS 18 e no texto oficial do CPC 51; cada assunto aponta o item do CPC 51.`,`<a class="btn" href="${a(e.link)}" target="_blank" rel="noopener">${t("link")} Página oficial da IFRS 18</a> ${l(r,"CPC 51",null,"Texto do CPC 51")}`)}
    ${m(a(C),"azul")}
    <div class="nm-cartao"><h3>${t("relogio")} Fatos</h3><dl class="nm-def">${e.fatos.map(o=>`<dt>${a(o.rotulo)}</dt><dd>${a(o.valor)} <span class="mut">(${a(o.fonte)})</span>${o.conferir?` ${c()}`:""}</dd>`).join("")}</dl></div>
    <div class="nm-grade">${e.secoes.map(o=>`<div class="nm-cartao" id="secao-${a(o.id)}" data-secao="${a(o.id)}"${n[0]===o.id?' style="border-color:var(--azul)"':""}>
      <h3>${a(o.titulo)} ${o.conferir?c():f("resumo próprio")}</h3>
      <p>${a(o.texto)}</p>
      ${o.itens?`<ul class="nm-lista">${o.itens.map(s=>`<li>${a(s)}</li>`).join("")}</ul>`:""}
      ${o.referencia?`<p class="mut">No CPC 51: ${l(r,o.referencia.norma,o.referencia.itens,`${o.referencia.norma}, ${/\D/.test(o.referencia.itens)?"itens":"item"} ${o.referencia.itens}`)}</p>`:""}
    </div>`).join("")}</div>`,n[0]&&i.querySelector(`[data-secao="${String(n[0]).replace(/[^a-z0-9-]/g,"")}"]`)?.scrollIntoView?.({block:"start"}),{}}
