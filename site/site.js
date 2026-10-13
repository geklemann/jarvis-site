// Site institucional do Jarvis: menu, animações ao rolar, tour do produto, planos mensal/anual, vídeo, formulários
// (gravam em site_contatos, só a equipe Jarvis lê) e contatos públicos da Central (plataforma_config).
(()=>{
const d=document,$=s=>d.querySelector(s),$$=s=>[...d.querySelectorAll(s)];
d.documentElement.classList.add('js');
// Links antigos do sistema (jaarvis.com.br/#resumo) e retorno do login por e-mail (#access_token=…) vão para o app.
const h=location.hash.slice(1);
if(h&&(/^(access_token|error|type)=|&access_token=/.test(h)||(/^[a-z0-9_]{3,20}$/.test(h)&&!d.getElementById(h)))){location.replace('/app/'+location.search+location.hash);return}
const cfg=window.CONCILIA_CONFIG||{};
// Cabeçalho
const topo=$('.topo');addEventListener('scroll',()=>topo?.classList.toggle('rolou',scrollY>8),{passive:true});
$('.hamb')?.addEventListener('click',e=>{const ab=topo.classList.toggle('aberto');e.currentTarget.setAttribute('aria-expanded',ab)});
// Aparecer ao rolar
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}}),{rootMargin:'0px 0px -8% 0px'}):null;
$$('.rev').forEach(el=>io?io.observe(el):el.classList.add('on'));
// Números que contam
const contar=el=>{const alvo=+el.dataset.conta,suf=el.dataset.suf||'',t0=performance.now(),dur=1400;const f=t=>{const p=Math.min(1,(t-t0)/dur),v=Math.round(alvo*(1-Math.pow(1-p,3)));el.textContent=v.toLocaleString('pt-BR')+suf;if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
const io2=io&&new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){contar(x.target);io2.unobserve(x.target)}}),{threshold:.6});
$$('[data-conta]').forEach(el=>io2?io2.observe(el):null);
// Tour do produto
$$('.tour').forEach(t=>{const abas=[...t.querySelectorAll('.aba')],img=t.querySelector('.vitrine img'),leg=t.querySelector('.vitrine .legenda');
 const ir=i=>{abas.forEach((a,j)=>a.setAttribute('aria-selected',i===j));const a=abas[i];if(img){img.style.opacity=.35;setTimeout(()=>{img.src=a.dataset.img;img.alt=a.dataset.alt||'';img.onload=()=>img.style.opacity=1},120)}if(leg)leg.innerHTML=(a.dataset.tags||'').split('|').filter(Boolean).map(x=>`<span>${x}</span>`).join('')};
 abas.forEach((a,i)=>{a.addEventListener('click',()=>{ir(i);parar()});a.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowRight'){e.preventDefault();abas[(i+1)%abas.length].focus();abas[(i+1)%abas.length].click()}if(e.key==='ArrowUp'||e.key==='ArrowLeft'){e.preventDefault();abas[(i-1+abas.length)%abas.length].focus();abas[(i-1+abas.length)%abas.length].click()}})});
 let k=0,tm=null;const parar=()=>{clearInterval(tm);tm=null};
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches)tm=setInterval(()=>{k=(abas.findIndex(a=>a.getAttribute('aria-selected')==='true')+1)%abas.length;ir(k)},6500);
 t.addEventListener('mouseenter',parar,{once:true})});
if(d.querySelector('.vitrine img'))d.querySelector('.vitrine img').style.transition='opacity .25s';
// Planos mensal / anual
$$('.alterna button').forEach(b=>b.addEventListener('click',()=>{const anual=b.dataset.ciclo==='anual';$$('.alterna button').forEach(x=>x.setAttribute('aria-pressed',x===b));
 $$('[data-mensal]').forEach(el=>{el.textContent=anual?el.dataset.anual:el.dataset.mensal});$$('[data-obs-anual]').forEach(el=>{el.textContent=anual?el.dataset.obsAnual:el.dataset.obsMensal})}));
// Vídeo
const mv=$('.modalv');$$('[data-video]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();if(!mv)return;mv.classList.add('on');const v=mv.querySelector('video');v.currentTime=0;v.play().catch(()=>{});mv.querySelector('button').focus()}));
const fechar=()=>{if(!mv)return;mv.classList.remove('on');mv.querySelector('video').pause()};mv?.querySelector('button').addEventListener('click',fechar);mv?.addEventListener('click',e=>{if(e.target===mv)fechar()});addEventListener('keydown',e=>{if(e.key==='Escape')fechar()});
// Contatos públicos (WhatsApp, e-mail, horário, dados do fornecedor)
if(cfg.supabaseUrl&&cfg.supabaseAnonKey&&$('[data-cfg]')){fetch(`${cfg.supabaseUrl}/rest/v1/plataforma_config?select=chave,valor`,{headers:{apikey:cfg.supabaseAnonKey,Authorization:`Bearer ${cfg.supabaseAnonKey}`}}).then(r=>r.ok?r.json():[]).then(l=>{const c=Object.fromEntries(l.map(x=>[x.chave,x.valor]));
 $$('[data-cfg]').forEach(el=>{const k=el.dataset.cfg,v=c[k];if(!v){if(el.dataset.esconde!==undefined)el.closest(el.dataset.esconde||'*').hidden=true;return}
  if(k==='suporte_whatsapp'){const n=v.replace(/\D/g,'');if(el.tagName==='A')el.href=`https://wa.me/${n}?text=${encodeURIComponent(el.dataset.msg||'Olá! Quero conhecer o Jarvis.')}`;const t=el.querySelector('[data-txt]');if(t)t.textContent=n.replace(/^55(\d{2})(\d{4,5})(\d{4})$/,'($1) $2-$3')}
  else if(k==='suporte_email'){if(el.tagName==='A')el.href='mailto:'+v;const t=el.querySelector('[data-txt]')||el;t.textContent=v}
  else{const t=el.querySelector('[data-txt]')||el;t.textContent=v}})}).catch(()=>{})}
// Formulários → site_contatos
$$('form[data-contato]').forEach(f=>f.addEventListener('submit',async e=>{e.preventDefault();const ret=f.querySelector('.ret'),b=f.querySelector('button[type=submit]');
 if(f.querySelector('.mel input')?.value){ret.className='ret ok';ret.textContent='Mensagem enviada. Obrigado!';return}
 const dados=Object.fromEntries(new FormData(f));delete dados.site;dados.pagina=location.pathname;
 if(!cfg.supabaseUrl){ret.className='ret erro';ret.textContent='Formulário indisponível agora. Fale pelo WhatsApp ou e-mail.';return}
 b.disabled=true;ret.className='ret';ret.textContent='Enviando…';
 try{const r=await fetch(`${cfg.supabaseUrl}/rest/v1/site_contatos`,{method:'POST',headers:{apikey:cfg.supabaseAnonKey,Authorization:`Bearer ${cfg.supabaseAnonKey}`,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(dados)});
  if(!r.ok){const j=await r.json().catch(()=>({}));throw Error(/várias mensagens/.test(j.message||'')?j.message:'Confira os campos e tente de novo.')}
  f.reset();ret.className='ret ok';ret.textContent=f.dataset.ok||'Mensagem enviada! Respondemos em até 1 dia útil.'}
 catch(x){ret.className='ret erro';ret.textContent=x.message}finally{b.disabled=false}}));
// Assunto vindo do link (contato/?assunto=parceria)
const as=new URLSearchParams(location.search).get('assunto');if(as&&$('form[data-contato] select[name=assunto]'))$('form[data-contato] select[name=assunto]').value=as;
// Busca da ajuda pública
const bq=$('#buscaAjuda');if(bq){const itens=$$('.faq details');bq.addEventListener('input',()=>{const t=bq.value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').split(/\s+/).filter(w=>w.length>2);let n=0;
 itens.forEach(it=>{const txt=it.textContent.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');const ok=!t.length||t.every(w=>txt.includes(w));it.hidden=!ok;if(ok)n++;if(t.length&&ok)it.open=true});const z=$('#semResultado');if(z)z.hidden=n>0})}
d.querySelectorAll('[data-ano]').forEach(el=>el.textContent=new Date().getFullYear());
})();
