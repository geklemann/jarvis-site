/*! © 2026 GK Soluções Empresariais LTDA (CNPJ 60.180.675/0001-91) · Todos os direitos reservados. Veja LICENSE e AUTORIA.md. */
import{esc as i,ic as l}from"../../../comum/nucleo.js";import{contexto as h,carregando as y,semAcesso as q,cabecalho as R,avatar as S,vazio as v,plural as A,rotaPerfil as C,falhou as j,ehDemo as H,hoje as u}from"../base.js";import{verComoHtml as L,ligarVerComo as k}from"../ver_como.js";import{preparar as E,restrito as $,I as c}from"../clima.js";const I={alto:"verm",medio:"ouro",baixo:""},N={alto:"#dc2626",medio:"#f59e0b",baixo:"var(--gp-a)"};export function riscos(e=[],o=u()){return e.map(r=>({pessoa:r,...c.riscoSaida(r,o)})).sort((r,t)=>t.pontos-r.pontos||String(r.pessoa.nome).localeCompare(String(t.pessoa.nome),"pt-BR"))}export async function render(e,o){E(e),e.innerHTML=y("Calculando o risco de saída…");const r=await h(o);if(!["rh","gestor"].includes(r.papel))return r.papel?$(e,o,"do RH e dos gestores"):q(e,o);let t;try{t=await o.api.rpc("gente_risco_saida",{p_empresa:o.empresa.id})}catch(s){j(s),e.innerHTML=v("Não foi possível calcular o risco de saída",i(s?.message||s),"alerta");return}if(!t)return $(e,o,"do RH e dos gestores");const b=u(),m=riscos(t.pessoas,b),d=s=>m.filter(a=>a.nivel===s).length;let n=o.query?.nivel||"";e.innerHTML=`
    ${R("Risco de saída",`${t.papel==="gestor"?"A sua equipe":"A empresa"} · ${A(m.length,"pessoa","pessoas")}. Um apoio para a conversa, não um veredito: cada ponto tem o motivo.`,L(o))}
    <div class="gp-grade gp-kpis-2 gp-entra">
      <div class="gp-kpi destaque gp-c4"><small>${l("alerta")} Risco alto</small><b>${d("alto")}</b><span>50 pontos ou mais</span></div>
      <div class="gp-kpi gp-c4"><small>${l("relogio")} Risco médio</small><b>${d("medio")}</b><span>de 25 a 49 pontos</span></div>
      <div class="gp-kpi gp-c4"><small>${l("ok")} Risco baixo</small><b>${d("baixo")}</b><span>menos de 25 pontos</span></div>
    </div>
    <div class="gp-grade gp-entra" style="margin-top:16px">
      <div class="gp-c8">
        <div class="ga-filtro" role="group" aria-label="Filtrar pelo nível"><button type="button" data-nivel="" aria-pressed="${!n}">Todos</button>${["alto","medio","baixo"].map(s=>`<button type="button" data-nivel="${s}" aria-pressed="${n===s}">${i(c.NIVEL_RISCO[s])} · ${d(s)}</button>`).join("")}</div>
        <div class="gp-tabela gc-risco" data-lista></div>
      </div>
      <aside class="gp-c4" style="display:flex;flex-direction:column;gap:16px">
        <section class="gp-card"><h2>${l("info")} Como a conta é feita <small>soma 100</small></h2>
          <div class="gp-barras">${Object.values(c.FATORES).map(s=>`<div class="gp-barra"><span>${i(s.rotulo)}</span><b>${s.peso}</b><i style="--v:${s.peso*4}%"></i></div>`).join("")}</div>
          <p class="gp-mini" style="padding:12px 0 0;line-height:1.55">Cada fator pesa inteiro, pela metade ou nada, pelo fato que está no sistema. Clima: a favorabilidade da equipe ${t.pesquisa?`em "${i(t.pesquisa.titulo)}"`:"na última pesquisa de clima"}, só se o recorte abre (5 respostas ou mais). Promoção: 24 meses pesa metade, 36 inteiro. PDI: parado há 30 ou 60 dias, ou ações atrasadas. 1:1: mais de 14 ou de 30 dias. Faltas e atestados: 2 ou 3 em 90 dias. Salário: abaixo do mínimo da faixa do cargo.</p></section>
        <section class="gp-card gc-anon">${l("cadeado")}<span class="gp-tx"><b>Quem vê</b><span>Só o RH (a empresa) e o gestor (a própria equipe). Ninguém vê o próprio risco, e o colaborador não vê esta tela. O salário aparece só como "abaixo da faixa", e o clima só pelo recorte que o anonimato deixa abrir.</span></span></section>
      </aside>
    </div>
    ${H(o)?'<p class="gp-mini">Demonstração: pessoas e fatos fictícios.</p>':""}`,k(e,o);const f=e.querySelector("[data-lista]"),g=()=>{e.querySelectorAll("[data-nivel]").forEach(a=>a.setAttribute("aria-pressed",String(a.dataset.nivel===n)));const s=m.filter(a=>!n||a.nivel===n);f.innerHTML=s.length?s.map(a=>`<details class="gc-pessoa" data-pessoa="${i(a.pessoa.id)}"><summary>
        <span class="gp-quem">${S(a.pessoa.nome,"p")}<span><b>${i(a.pessoa.nome)}</b><small>${i([a.pessoa.cargo,a.pessoa.departamento].filter(Boolean).join(" · "))}</small></span></span>
        <span class="gp-cel gc-medidor-risco" style="--cor:${N[a.nivel]}"><i style="--v:${a.pontos}%"></i><b>${a.pontos}</b></span>
        <span class="gp-selo ${I[a.nivel]}" data-nivel-selo="${a.nivel}">${i(c.NIVEL_RISCO[a.nivel])}<span class="gc-so-celular"> · ${a.pontos}</span></span>${l("seta","gp-seta")}</summary>
      <div class="gc-fatores">${a.fatores.map(p=>`<div class="gc-fator ${p.pontos===p.peso&&p.pontos?"cheio":p.pontos?"pesa":""}"><header><b>${i(p.rotulo)}</b><span>${p.pontos} de ${p.peso}</span></header><small>${i(p.evidencia)}</small></div>`).join("")}
        <a class="btn peq" href="${i(C(o,a.pessoa.id))}" style="align-self:center;justify-self:start">${l("pessoa")} Abrir o perfil 360</a></div></details>`).join(""):v("Ninguém neste nível","Mude o filtro para ver as outras pessoas.","ok")};e.querySelectorAll("[data-nivel]").forEach(s=>s.addEventListener("click",()=>{n=s.dataset.nivel,g()})),g()}
