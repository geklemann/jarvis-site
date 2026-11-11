/*! © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md. */
import{esc as a,ic as n}from"../../../comum/nucleo.js";import{descreverEvento as P,tempoDeCasa as C,TIPO_CONTRATO as H,fimExperiencia as O}from"../../../motor/gente/pessoas.js";import{MOTIVOS_AFASTAMENTO as j}from"../../../motor/folha.js";import{preparar as D,contexto as R,perfil as V,carregando as _,semAcesso as w,avatar as f,vazio as b,selo as m,seloStatus as I,dataBR as g,diaMes as N,brl as T,rotaPerfil as q,rota as u,hoje as k,falhou as B,ehRh as z}from"../base.js";export function linhaComTextos(r=[]){let t=null;const c=[];for(const l of r){const p=String(l.data).slice(0,4);p!==t&&(c.push({ano:p}),t=p),c.push({...l,...P(l,{motivos:j,brl:T})})}return c}export async function render(r,t,c=[]){D(r),r.innerHTML=_("Abrindo o perfil…");const l=await R(t);if(!l.papel)return w(r,t);const p=c[0]||l.empregado_id;if(!p){r.innerHTML=b("Escolha uma pessoa","A sua conta não está ligada a um cadastro desta empresa: abra o perfil de alguém pela lista de pessoas.","pessoa",`<a class="btn pri" href="${a(u(t,"pessoas"))}">${n("equipe")} Ver pessoas</a>`);return}let s;try{s=await V(t,p)}catch(e){B(e),s=null}if(!s?.pessoa){r.innerHTML=b("Perfil não disponível","Esta pessoa não está entre as que você enxerga: o colaborador vê só o próprio perfil e o gestor, a própria equipe.","cadeado",`<a class="btn" href="${a(u(t,"pessoas"))}">${n("voltar")} Voltar</a>`);return}const o=s.pessoa;t.titulo?.(o.nome);const A=k(),$=C(o.admissao,A,o.demissao),h=O(o),v=!!o.proprio,E=linhaComTextos(s.linha||[]),i=(e,d)=>d?`<div><dt>${a(e)}</dt><dd>${d}</dd></div>`:"",S=o.salario!=null?`<span class="gp-oculto" data-salario>${a(T(o.salario))}</span><button type="button" class="gp-revelar" data-revelar>mostrar</button>`:"",y=s.gestor?s.gestor.visivel?`<a href="${a(q(t,s.gestor.id))}">${a(s.gestor.nome)}</a>`:a(s.gestor.nome):"",L=t.params?.length&&l.papel!=="colaborador"?`<a class="btn" href="${a(u(t,"pessoas"))}">${n("voltar")} Pessoas</a>`:"";r.innerHTML=`
    <section class="gp-heroi gp-entra">
      ${f(o.nome,"g")}
      <div>
        <h1>${a(o.nome_social||o.nome)}</h1>
        <p>${a([o.cargo,o.departamento].filter(Boolean).join(" · ")||"Sem cargo")}</p>
        <div class="gp-selos">${v?m("Você"):""}${m(H[o.tipo]||o.tipo||"")}${I(o.status)}${$?m(`${$.texto} de casa`):""}${h&&!o.demissao?m(`Experiência até ${g(h.final)}`,"ouro"):""}</div>
      </div>
      <div class="gp-acoes">${L}<a class="btn" href="${a(t.rota({modulo:"gente",item:"organograma",query:{foco:o.id}}))}">${n("arvore")} No organograma</a></div>
    </section>
    <div class="gp-grade gp-entra" style="margin-top:16px">
      <section class="gp-card gp-c8"><h2>${n("pessoa")} Trabalho</h2>
        <dl class="gp-fatos">
          ${i("Cargo",a(o.cargo||"—"))}${i("Departamento",a(o.departamento||"—"))}${i("Gestor",y||"—")}
          ${i("Admissão",a(g(o.admissao)))}${i("Tempo de casa",a($?.texto||""))}${i("Matrícula",a(o.matricula||""))}
          ${i("Aniversário",a(N(o.aniversario)))}${i("Salário",S)}${i("E-mail",o.email?a(o.email).replace("@","@<wbr>"):"")}${i("Celular",o.celular?a(o.celular):"")}
          ${o.demissao?i("Desligamento",a(g(o.demissao))):""}
        </dl>
        ${!v&&!z(t)?'<p class="gp-mini">Salário, contatos e motivos de afastamento ficam só com o RH e com a própria pessoa.</p>':""}
      </section>
      <section class="gp-card gp-c4"><h2>${n("equipe")} Equipe direta <small>${(s.equipe||[]).length||""}</small></h2>
        ${(s.equipe||[]).length?`<div class="gp-itens">${s.equipe.map(e=>`<a class="gp-item" href="${a(q(t,e.id))}">${f(e.nome,"p")}<span class="gp-tx"><b>${a(e.nome)}</b><span>${a(e.cargo)}</span></span></a>`).join("")}</div>`:`<p class="gp-mini" style="padding-top:0">${a(o.nome.split(" ")[0])} não tem ninguém respondendo diretamente${s.gestor?`; responde a ${a(s.gestor.nome)}.`:"."}</p>`}
      </section>
      <section class="gp-card gp-c12"><h2>${n("relogio")} Linha do tempo <small>${(s.linha||[]).length} ${(s.linha||[]).length===1?"evento":"eventos"}</small></h2>
        <ol class="gp-tempo">${E.map(e=>e.ano?`<li class="gp-ano" aria-hidden="true">${a(e.ano)}</li>`:`<li class="${a(e.tipo)}"><span class="gp-ponto">${n(e.icone)}</span><span class="gp-ev"><time datetime="${a(e.data)}">${a(g(e.data))}</time><b>${a(e.titulo)}</b>${e.detalhe?`<span${e.salario!=null?' class="gp-sal gp-oculto"':""}>${a(e.detalhe)}</span>`:""}</span></li>`).join("")}</ol>
        <p class="gp-mini">Avaliações de desempenho, PDI, 1:1 e feedbacks entram aqui nas próximas etapas do Jarvis Pessoas.</p>
      </section>
    </div>`,r.querySelector("[data-revelar]")?.addEventListener("click",e=>{const d=r.querySelector("[data-salario]").classList.toggle("gp-oculto");r.querySelectorAll(".gp-sal").forEach(M=>M.classList.toggle("gp-oculto",d)),e.currentTarget.textContent=d?"mostrar":"esconder"})}
