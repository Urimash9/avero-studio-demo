const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
menuBtn?.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});
mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileNav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));

const eye = document.getElementById('heroEye');
const iris = document.getElementById('irisGroup');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if(eye && iris && !reduce){
  eye.addEventListener('pointermove',e=>{
    const r=eye.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width-.5)*18;
    const y=((e.clientY-r.top)/r.height-.5)*14;
    iris.setAttribute('transform',`translate(${x} ${y})`);
  });
  eye.addEventListener('pointerleave',()=>iris.setAttribute('transform','translate(0 0)'));
}

document.querySelectorAll('.chips button').forEach(btn=>btn.addEventListener('click',()=>btn.classList.toggle('active')));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

window.addEventListener('scroll',()=>{header?.classList.toggle('scrolled',scrollY>24)},{passive:true});
