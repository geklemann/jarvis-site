import{esc as m,ic as p,toast as o,traduzErro as u}from"./nucleo.js";export function telaEntrada(i,t,n,{aoEntrar:c,aoDemo:f}){let a="entrar";const s=()=>{i.innerHTML=`<div class="entrada">
      <div class="arte">
        <div class="marca" style="padding:0"><span class="logo">J</span><div>Jarvis ${m(n.nome)}<small style="color:#fff;opacity:.7">${m(n.sub)}</small></div></div>
        <div>
          <h1>${n.titulo}</h1>
          <p style="margin-top:14px">${m(n.texto)}</p>
          <ul>${n.itens.map(r=>`<li>${p("ok")}<span>${m(r)}</span></li>`).join("")}</ul>
        </div>
        <div class="peq" style="opacity:.7">A mesma conta do Jarvis Empresa. Seus dados ficam protegidos por login e por regras de acesso no banco.</div>
      </div>
      <div class="forma"><div class="caixa">
        <h2 style="font-size:22px">${a==="criar"?"Criar conta":a==="link"?"Entrar com link no e-mail":a==="mfa"?"Verificação em duas etapas":"Entrar"}</h2>
        <p class="mut" style="margin:6px 0 20px">${a==="mfa"?"Digite o código de 6 dígitos do seu aplicativo autenticador.":`Use a conta do Jarvis. ${a==="entrar"?"Ainda não tem?":"Já tem conta?"} <a href="#" data-modo="${a==="entrar"?"criar":"entrar"}">${a==="entrar"?"Crie em 1 minuto":"Entrar"}</a>.`}</p>
        <form class="form" id="fEntrada" onsubmit="return false">
          ${a==="mfa"?'<label class="campo"><span>Código</span><input name="codigo" inputmode="numeric" autocomplete="one-time-code" maxlength="6"></label>':`
          ${a==="criar"?'<label class="campo"><span>Seu nome</span><input name="nome" autocomplete="name"></label>':""}
          <label class="campo"><span>E-mail</span><input name="email" type="email" autocomplete="email"></label>
          ${a!=="link"?`<label class="campo"><span>Senha</span><input name="senha" type="password" autocomplete="${a==="criar"?"new-password":"current-password"}"><small>${a==="criar"?"Pelo menos 8 caracteres.":'<a href="#" data-modo="recuperar">Esqueci a senha</a>'}</small></label>`:""}`}
          <button class="btn pri" style="height:40px;justify-content:center">${a==="criar"?"Criar conta":a==="link"?"Enviar link":a==="mfa"?"Confirmar":"Entrar"}</button>
        </form>
        ${a==="entrar"?'<p class="peq" style="margin-top:12px"><a href="#" data-modo="link">Prefiro receber um link de acesso por e-mail</a></p>':""}
        <div style="margin-top:26px;padding-top:18px;border-top:1px solid var(--borda)">
          <button class="btn" id="bDemo" style="width:100%;justify-content:center;height:40px">${p("raio")} Conhecer na demonstração</button>
          <p class="mpeq mut" style="margin-top:8px;text-align:center">Dados fictícios, gravados só neste navegador. Nada vai para a nuvem.</p>
        </div>
      </div></div></div>`,i.querySelectorAll("[data-modo]").forEach(r=>r.onclick=async e=>{if(e.preventDefault(),r.dataset.modo==="recuperar"){const d=i.querySelector("[name=email]")?.value.trim();if(!d)return o("Digite o e-mail primeiro.","erro");try{await t.auth.recuperar(d),o("Enviamos um link para redefinir a senha.")}catch(h){o(u(h),"erro")}return}a=r.dataset.modo,s()}),i.querySelector("#bDemo").onclick=()=>f();const l=i.querySelector("#fEntrada");l.onsubmit=async()=>{const r=l.querySelector("button");r.disabled=!0;try{const e=Object.fromEntries(new FormData(l));if(a==="mfa")return await t.auth.validarMfa(String(e.codigo).trim()),c();if(!e.email)throw new Error("Informe o e-mail.");if(a==="link"){await t.auth.link(e.email),o("Pronto: abra o link que enviamos para o seu e-mail.");return}if(a==="criar"){if(!e.nome)throw new Error("Informe o seu nome.");if(String(e.senha).length<8)throw new Error("A senha precisa ter pelo menos 8 caracteres.");if(!(await t.auth.criarConta(e.email,e.senha,e.nome))?.session){o("Conta criada. Confirme o e-mail pelo link que enviamos e depois entre."),a="entrar",s();return}return c()}if(await t.auth.entrar(e.email,e.senha),await t.auth.precisaMfa()){a="mfa",s();return}c()}catch(e){o(/Invalid login/i.test(e?.message)?"E-mail ou senha incorretos.":u(e),"erro")}finally{r.disabled=!1}},setTimeout(()=>l.querySelector("input")?.focus(),30)};s()}
