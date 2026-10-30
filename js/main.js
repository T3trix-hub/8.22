(function(){
const S=SITE,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const tel=p=>'tel:'+p.replace(/[^+\d]/g,''),num=p=>p.replace(/\D/g,'');
const pages=[['index.html','Главная'],['services.html','Услуги и цены'],['about.html','О студии'],['contacts.html','Контакты']];
const cur=location.pathname.split('/').pop()||'index.html';
$('#site-header').innerHTML=`<div class="wrap bar"><a class="logo" href="index.html"><img src="images/mark.png" alt="" width="36" height="36"><span>8.22 <i>студия</i></span></a><nav id="nav">${pages.map(p=>`<a href="${p[0]}"${p[0]===cur?' class="on"':''}>${p[1]}</a>`).join('')}<a class="btn sm" href="contacts.html">Записаться</a></nav><button id="burger" aria-label="Меню"><i></i><i></i><i></i></button></div>`;
$('#burger').onclick=()=>$('#nav').classList.toggle('open');
$('#site-footer').innerHTML=`<div class="wrap"><div class="foot"><div><b>8.22 студия</b>Брови, ресницы, маникюр и педикюр в Минске.<br>${S.address}</div><div><b>Разделы</b>${pages.map(p=>`<a href="${p[0]}">${p[1]}</a>`).join('<br>')}</div><div><b>Запись</b><a href="${tel(S.phone)}">${S.phone}</a><br><a href="https://instagram.com/${S.instagram}" target="_blank" rel="noopener">Instagram</a></div></div><div class="copy">© 8.22 студия · Сайт сделал <a href="https://t3trix-hub.github.io/t3trix-portfolio/" target="_blank" rel="noopener">Lexey</a></div></div>`;
$$('[data-site]').forEach(e=>e.textContent=S[e.dataset.site]);
$$('[data-tel]').forEach(e=>e.href=tel(S.phone));$$('[data-ig]').forEach(e=>e.href='https://instagram.com/'+S.instagram);$$('[data-map]').forEach(e=>e.href=S.ymaps);
$$('[data-tg]').forEach(e=>e.href='https://t.me/+'+num(S.phone));$$('[data-wa]').forEach(e=>e.href='https://wa.me/'+num(S.phone));$$('[data-vb]').forEach(e=>e.href='https://viber.click/+'+num(S.phone));
const line=i=>`<div class="pl rv"><span>${esc(i[0])}${i[2]&&!/^вместо/.test(i[2])?`<small>${esc(i[2])}</small>`:''}</span><i></i>${i[2]&&/^вместо/.test(i[2])?`<em>${esc(i[2])}</em>`:''}<b>${i[1]} Br</b></div>`;
const lst=$('#price');
if(lst){const chips=$('#chips');chips.innerHTML=`<button class="on" data-g="">Всё</button>`+GROUPS.map(g=>`<button data-g="${g.id}">${esc(g.name)}</button>`).join('');
 const draw=f=>{$$('button',chips).forEach(b=>b.classList.toggle('on',b.dataset.g===f));lst.innerHTML=GROUPS.filter(g=>!f||g.id===f).map(g=>`<section class="grp" id="${g.id}"><h3>${esc(g.name)}</h3>${g.items.map(line).join('')}</section>`).join('');window.reveal&&reveal()};
 chips.onclick=e=>{const b=e.target.closest('button');if(b){draw(b.dataset.g);history.replaceState(null,'',b.dataset.g?'#'+b.dataset.g:location.pathname)}};
 const h=location.hash.slice(1);draw(GROUPS.some(g=>g.id===h)?h:'')}
const from=$('[data-from]');
const lb=document.createElement('div');lb.id='lb';document.body.append(lb);lb.onclick=()=>lb.classList.remove('on');
$$('[data-zoom]').forEach(a=>a.onclick=e=>{e.preventDefault();lb.innerHTML=`<img src="${a.dataset.zoom}" alt="">`;lb.classList.add('on')});
$$('main h1,main h2,.card,.fr,.feat,.cta>*,.chan,.mapw,.pl').forEach(e=>e.classList.add('rv'));
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){const t=x.target;t.classList.add('in');io.unobserve(t);setTimeout(()=>t.style.transitionDelay='',900)}}),{threshold:.08}):null;
window.reveal=()=>{let i=0;$$('.rv:not(.in)').forEach(e=>{if(!io)return e.classList.add('in');if(!e.dataset.o){e.dataset.o=1;e.style.transitionDelay=Math.min(i++,6)*60+'ms';io.observe(e)}})};reveal();
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.target||a.dataset.zoom||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;const u=new URL(a.href,location.href);if(u.origin!==location.origin||u.pathname===location.pathname||!/\.html?$|\/$/.test(u.pathname))return;e.preventDefault();document.body.classList.add('leave');setTimeout(()=>location.href=a.href,200)});
addEventListener('pageshow',e=>{if(e.persisted)document.body.classList.remove('leave')});
})();
