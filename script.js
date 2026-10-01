const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  mobileNav.hidden = isOpen;
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
});
matchMedia('(max-width: 700px)').addEventListener('change', closeMenu);
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); }
});
document.addEventListener('click', event => {
  if (!mobileNav.hidden && !event.target.closest('.site-header')) closeMenu();
});

const chips = [...document.querySelectorAll('.chips button')];
chips.forEach(button => button.addEventListener('click', () => {
  button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
}));
function selectService(service) {
  chips.forEach(button => button.setAttribute('aria-pressed', String(button.textContent.trim() === service)));
  if (!chips.some(button => button.textContent.trim() === service)) {
    document.querySelector('#mensagem').value = `Tenho interesse em ${service}.`;
  }
}
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => selectService(link.dataset.service)));
document.querySelectorAll('[data-project]').forEach(link => link.addEventListener('click', () => {
  selectService('Coleção Avero');
  document.querySelector('#mensagem').value = `Gostaria de conhecer a direção ${link.dataset.project} e adaptar esse conceito para o meu negócio.`;
}));

const rail = document.querySelector('.collection-rail');
const cards = [...rail.querySelectorAll('.collection-card')];
const pages = [...document.querySelectorAll('.collection-pagination button')];
const collectionAnnouncement = document.querySelector('.collection-announcement');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let currentCard = 0;
let programmaticCollectionScroll = false;
let collectionScrollTimer;
let collectionResizeFrame;
cards.forEach((card, i) => {
  card.setAttribute('role', 'group');
  card.setAttribute('aria-roledescription', 'slide');
  card.setAttribute('aria-label', `${i + 1} de ${cards.length}: ${card.querySelector('h3').textContent.trim()}`);
});
pages.forEach(button => button.setAttribute('aria-controls', 'collection-rail'));
function goToCard(index, announce = true, instant = false) {
  currentCard = (index + cards.length) % cards.length;
  programmaticCollectionScroll = true;
  clearTimeout(collectionScrollTimer);
  cards.forEach((card, i) => card.classList.toggle('active', i === currentCard));
  pages.forEach((button, i) => {
    button.classList.toggle('active', i === currentCard);
    if (i === currentCard) button.setAttribute('aria-current', 'true');
    else button.removeAttribute('aria-current');
  });
  if (announce) collectionAnnouncement.textContent = cards[currentCard].getAttribute('aria-label');
  requestAnimationFrame(() => {
    rail.scrollTo({ left: cards[currentCard].offsetLeft - cards[0].offsetLeft, behavior: instant || reducedMotion.matches ? 'instant' : 'smooth' });
    // Release the flag even when the selected card was already at the correct offset.
    collectionScrollTimer = setTimeout(() => { programmaticCollectionScroll = false; }, 700);
  });
}
function settleCollectionScroll() {
  if (programmaticCollectionScroll) { programmaticCollectionScroll = false; return; }
  const maxScroll = rail.scrollWidth - rail.clientWidth;
  let nearest = 0;
  if (maxScroll > 0 && rail.scrollLeft >= maxScroll - 2) nearest = cards.length - 1;
  else cards.forEach((card, index) => {
    const distance = Math.abs(card.offsetLeft - cards[0].offsetLeft - rail.scrollLeft);
    const currentDistance = Math.abs(cards[nearest].offsetLeft - cards[0].offsetLeft - rail.scrollLeft);
    if (distance < currentDistance) nearest = index;
  });
  if (nearest !== currentCard) goToCard(nearest, true, true);
}
rail.addEventListener('scroll', () => {
  clearTimeout(collectionScrollTimer);
  collectionScrollTimer = setTimeout(settleCollectionScroll, 180);
}, { passive: true });
// Native swipes / wheel scrolling take priority over a previous button navigation.
['pointerdown', 'touchstart', 'wheel'].forEach(type => rail.addEventListener(type, () => {
  programmaticCollectionScroll = false;
}, { passive: true }));
window.addEventListener('resize', () => {
  cancelAnimationFrame(collectionResizeFrame);
  collectionResizeFrame = requestAnimationFrame(() => goToCard(currentCard, false, true));
});
document.querySelector('.rail-prev').addEventListener('click', () => goToCard(currentCard - 1));
document.querySelector('.rail-next').addEventListener('click', () => goToCard(currentCard + 1));
pages.forEach((button, i) => button.addEventListener('click', () => goToCard(i)));
rail.addEventListener('keydown', event => {
  const destinations = { ArrowRight: currentCard + 1, ArrowLeft: currentCard - 1, Home: 0, End: cards.length - 1 };
  if (event.key in destinations) { event.preventDefault(); goToCard(destinations[event.key]); }
});

const form = document.querySelector('.contact-card');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const services = chips.filter(button => button.getAttribute('aria-pressed') === 'true').map(button => button.textContent.trim());
  const message = [
    'Olá, AVERO! Quero conversar sobre meu projeto.',
    `Nome: ${String(data.get('nome')).trim()}`,
    `Negócio / Marca: ${String(data.get('marca')).trim()}`,
    services.length ? `Interesse: ${services.join(', ')}` : '',
    `Meu projeto: ${String(data.get('mensagem')).trim()}`
  ].filter(Boolean).join('\n');
  const url = `https://wa.me/5534997374006?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  const status = form.querySelector('.form-status');
  status.replaceChildren();
  status.append('Continue no WhatsApp e envie a mensagem para iniciar a conversa. ');
  const fallback = document.createElement('a');
  fallback.href = url; fallback.target = '_blank'; fallback.rel = 'noopener noreferrer';
  fallback.textContent = 'Abrir conversa';
  status.append(fallback);
});

const projectDirections = [
  { name: 'STÚDIO NICOTA', label: 'Stúdio Nicota', category: 'Arquitetura & Interiores', image: 'project-nicota.png', tag: 'Conceito Avero' },
  { name: 'VÉRTICE CLÍNICA', label: 'Vértice Clínica', category: 'Saúde & Bem-estar', image: 'project-clinic.png', tag: 'Conceito Avero' },
  { name: 'SABOR REAL', label: 'Sabor Real', category: 'Gastronomia', image: 'project-sabor.png', tag: 'Demo personalizada' }
];
const projectPages = [...document.querySelectorAll('.project-pagination button')];
const featuredProject = document.querySelector('.featured');
const secondaryProjects = [...document.querySelectorAll('#project-list .project-card')];
let currentProject = 0;
function updateProjectCard(card, project, featured = false) {
  const image = card.querySelector(featured ? '.featured-art' : '.project-image');
  image.src = `assets/${project.image}`;
  image.alt = `${project.label}: projeto em computador e celular`;
  const copy = card.querySelector(featured ? '.project-meta' : '.project-small-copy');
  copy.querySelector('h3').textContent = project.name;
  copy.querySelector('p').textContent = project.category;
  copy.querySelector('.project-tags span').textContent = project.tag;
  const action = card.querySelector('[data-project]');
  action.dataset.project = project.label;
  action.setAttribute('aria-label', featured ? `Explorar projeto ${project.label}` : `Conversar sobre a direção ${project.label}`);
}
function showProject(index) {
  currentProject = (index + projectDirections.length) % projectDirections.length;
  const project = projectDirections[currentProject];
  updateProjectCard(featuredProject, project, true);
  // The two secondary cards always contain the other two existing directions.
  projectDirections.filter((_, i) => i !== currentProject).forEach((other, i) => updateProjectCard(secondaryProjects[i], other));
  projectPages.forEach((button, i) => {
    button.classList.toggle('active', i === currentProject);
    if (i === currentProject) button.setAttribute('aria-current', 'true');
    else button.removeAttribute('aria-current');
  });
  document.querySelector('.project-announcement').textContent = `Projeto ${currentProject + 1} de ${projectDirections.length}: ${project.name}`;
}
projectPages.forEach(button => button.setAttribute('aria-controls', 'featured-project project-list'));
document.querySelector('.project-carousel-controls').addEventListener('keydown', event => {
  const destinations = { ArrowRight: currentProject + 1, ArrowLeft: currentProject - 1, Home: 0, End: projectDirections.length - 1 };
  if (event.key in destinations) { event.preventDefault(); showProject(destinations[event.key]); }
});
document.querySelector('.project-prev').addEventListener('click', () => showProject(currentProject - 1));
document.querySelector('.project-next').addEventListener('click', () => showProject(currentProject + 1));
projectPages.forEach((button, index) => button.addEventListener('click', () => showProject(index)));

// Build 01.6 — four slots, stable DOM order, no autoplay or animation library.
const serviceOrbit = document.querySelector('.services-orbit');
const orbitServices = [...serviceOrbit.querySelectorAll('.service-card')];
const orbitNavigation = serviceOrbit.querySelector('.service-orbit-navigation');
const orbitNext = serviceOrbit.querySelector('.service-orbit-next');
const orbitCurrent = serviceOrbit.querySelector('.service-orbit-current strong');
const orbitDesktop = matchMedia('(min-width: 1101px)');
let highlightedService = 0;
let orbitAnimations = [];
function settleServiceOrbit() {
  orbitAnimations.forEach(animation => animation.cancel());
  orbitAnimations = [];
}
function syncServiceOrbit() {
  settleServiceOrbit();
  serviceOrbit.classList.toggle('is-orbital', orbitDesktop.matches);
  orbitNavigation.hidden = !orbitDesktop.matches;
}
function advanceServiceOrbit() {
  if (!orbitDesktop.matches || orbitAnimations.length) return;
  const before = orbitServices.map(card => card.getBoundingClientRect());
  const previousSlots = orbitServices.map(card => Number(card.dataset.orbitSlot));
  highlightedService = (highlightedService + 1) % orbitServices.length;
  orbitServices.forEach((card, index) => {
    card.dataset.orbitSlot = String((index - highlightedService + orbitServices.length) % orbitServices.length);
  });
  const label = orbitServices[highlightedService].querySelector('h3').textContent;
  orbitCurrent.textContent = label;
  orbitNext.setAttribute('aria-label', `Destacar próxima solução. Em destaque: ${label}`);
  if (reducedMotion.matches || typeof orbitNext.animate !== 'function') return;
  const after = orbitServices.map(card => card.getBoundingClientRect());
  // Each leg bends outwards, keeping movement around the core, never through it.
  const bows = [[-85, 0], [0, -155], [100, 0], [0, 145]];
  orbitAnimations = orbitServices.map((card, index) => {
    const old = before[index], next = after[index];
    const dx = old.left - next.left, dy = old.top - next.top;
    const [bowX, bowY] = bows[previousSlots[index]];
    const sx = old.width / next.width, sy = old.height / next.height;
    const frames = Array.from({ length: 9 }, (_, step) => {
      const t = step / 8, arc = 4 * t * (1 - t);
      return { transform: `translate(${dx * (1 - t) + bowX * arc}px, ${dy * (1 - t) + bowY * arc}px) scale(${sx + (1 - sx) * t}, ${sy + (1 - sy) * t})`, offset: t };
    });
    return card.animate(frames, { duration: 760, easing: 'cubic-bezier(.22,1,.36,1)' });
  });
  Promise.allSettled(orbitAnimations.map(animation => animation.finished)).then(() => { orbitAnimations = []; });
}
orbitNext.addEventListener('click', advanceServiceOrbit);
orbitDesktop.addEventListener('change', syncServiceOrbit);
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) settleServiceOrbit(); });
window.addEventListener('resize', settleServiceOrbit, { passive: true });
syncServiceOrbit();
