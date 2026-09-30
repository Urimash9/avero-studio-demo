const refino = document.createElement('link');
refino.rel = 'stylesheet';
refino.href = 'refino.css';
document.head.appendChild(refino);

const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const whatsappNumber = '5534997374006';
const whatsappBase = `https://wa.me/${whatsappNumber}`;

menuBtn?.addEventListener('click',()=>{
  const open=mobileNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',String(open));
});
mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  mobileNav.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded','false');
}));

const eye = document.getElementById('heroEye');
const iris = document.getElementById('irisGroup');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if(eye && iris && !reduce){
  let frame;
  eye.addEventListener('pointermove',e=>{
    cancelAnimationFrame(frame);
    frame=requestAnimationFrame(()=>{
      const r=eye.getBoundingClientRect();
      const x=((e.clientX-r.left)/r.width-.5)*17;
      const y=((e.clientY-r.top)/r.height-.5)*12;
      iris.setAttribute('transform',`translate(${x} ${y})`);
    });
  });
  eye.addEventListener('pointerleave',()=>iris.setAttribute('transform','translate(0 0)'));
}

const serviceCards=[...document.querySelectorAll('.service-card')];
serviceCards.forEach((card,index)=>{
  if(index===0) card.classList.add('active');
  card.querySelector('button')?.addEventListener('click',()=>{
    if(innerWidth>760) return;
    serviceCards.forEach(other=>{if(other!==card) other.classList.remove('active')});
    card.classList.toggle('active');
  });
});

const collectionIntro=document.querySelector('.collection-intro');
if(collectionIntro && !collectionIntro.querySelector('.collection-note')){
  const note=document.createElement('p');
  note.className='collection-note';
  note.textContent='Referências de estrutura e direção visual. Todo projeto é personalizado para cada marca.';
  collectionIntro.appendChild(note);
}

const projectLabels=document.querySelectorAll('.project-card.small .project-meta span');
if(projectLabels[0]) projectLabels[0].textContent='CONCEITO AVERO';

const chips=[...document.querySelectorAll('.chips button')];
chips.forEach(btn=>btn.addEventListener('click',()=>btn.classList.toggle('active')));

const contactForm=document.querySelector('.contact-card');
contactForm?.removeAttribute('onsubmit');
contactForm?.addEventListener('submit',event=>{
  event.preventDefault();
  const data=new FormData(contactForm);
  const selected=chips.filter(btn=>btn.classList.contains('active')).map(btn=>btn.textContent.trim());
  const nome=(data.get('nome')||'').toString().trim();
  const marca=(data.get('marca')||'').toString().trim();
  const mensagem=(data.get('mensagem')||'').toString().trim();
  const linhas=[
    'Olá! Vim pelo site da AVERO e quero conversar sobre um projeto.',
    nome?`Nome: ${nome}`:'',
    marca?`Negócio/Marca: ${marca}`:'',
    selected.length?`Interesse: ${selected.join(', ')}`:'',
    mensagem?`Contexto: ${mensagem}`:''
  ].filter(Boolean);
  window.open(`${whatsappBase}?text=${encodeURIComponent(linhas.join('\n'))}`,'_blank','noopener,noreferrer');
});

const directWhatsapp=document.querySelector('.whatsapp');
if(directWhatsapp){
  directWhatsapp.href=`${whatsappBase}?text=${encodeURIComponent('Olá! Vim pelo site da AVERO e quero falar sobre um projeto.')}`;
  directWhatsapp.target='_blank';
  directWhatsapp.rel='noopener noreferrer';
}

document.querySelectorAll('a[href^="mailto:contato@avero.studio"]').forEach(link=>{
  link.href=`${whatsappBase}?text=${encodeURIComponent('Olá! Vim pelo site da AVERO e quero falar sobre um projeto.')}`;
  link.target='_blank';
  link.rel='noopener noreferrer';
  if(link.closest('.footer')) link.textContent='WhatsApp direto';
});

const instagram=[...document.querySelectorAll('.footer a')].find(a=>a.textContent.trim()==='Instagram');
if(instagram){
  instagram.removeAttribute('href');
  instagram.setAttribute('aria-disabled','true');
  instagram.title='Link em configuração';
  instagram.style.opacity='.6';
  instagram.style.cursor='default';
}

const comingSoonLinks=[...document.querySelectorAll('.collection-intro .btn,.section-heading-row>.btn')];
const toast=document.createElement('div');
toast.className='toast';
toast.setAttribute('role','status');
document.body.appendChild(toast);
let toastTimer;
function showToast(text){
  toast.textContent=text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove('show'),2200);
}
comingSoonLinks.forEach(link=>link.addEventListener('click',event=>{
  if(link.getAttribute('href')==='#'){
    event.preventDefault();
    showToast(link.closest('.collection-intro')?'A página completa da Coleção entra na próxima etapa.':'A página completa de Projetos entra na próxima etapa.');
  }
}));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  }
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting) entry.target.classList.add('in-view');
}),{threshold:.22});
document.querySelectorAll('.section-shell').forEach(section=>sectionObserver.observe(section));

function updateHeader(){header?.classList.toggle('scrolled',scrollY>24)}
updateHeader();
window.addEventListener('scroll',updateHeader,{passive:true});
