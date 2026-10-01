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

// Build 01.9 — the HTML list is the catalogue: stable DOM order, replaceable assets.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const collectionSystem = document.querySelector('.collection-system');
const collectionList = collectionSystem.querySelector('.collection-pieces');
const collectionPieces = [...collectionList.children];
const collectionDirections = collectionPieces.map((piece, order) => ({
  id: piece.dataset.direction,
  sector: piece.dataset.sector,
  variant: piece.dataset.variant,
  order,
  image: piece.querySelector('img').getAttribute('src'),
  thumbnail: piece.dataset.thumbnail,
  name: piece.querySelector('h3').textContent.trim(),
  description: piece.querySelector('.collection-piece-copy p').textContent.trim(),
  provisional: piece.dataset.provisional === 'true',
  piece
}));
const collectionMobile = matchMedia('(max-width: 900px)');
const collectionNavigation = collectionSystem.querySelector('.collection-navigation');
const collectionCurrent = collectionSystem.querySelector('.collection-current');
const collectionPosition = collectionSystem.querySelector('.collection-position');
const collectionAnnouncement = collectionSystem.querySelector('.collection-announcement');
const collectionAmbient = collectionSystem.querySelector('.collection-ambient-toggle');
let currentDirection = 0;
let collectionAnimations = [];
let collectionResumeTimer;
let collectionPaused = false;
let collectionVisible = false;
const directionIndex = index => (index + collectionDirections.length) % collectionDirections.length;

function settleCollectionMotion() {
  collectionAnimations.forEach(animation => animation.cancel());
  collectionAnimations = [];
  collectionSystem.removeAttribute('aria-busy');
}
function syncCollectionAmbient() {
  collectionAmbient.hidden = !collectionMobile.matches || reducedMotion.matches;
  collectionSystem.classList.toggle('is-resting', !collectionVisible || document.hidden || collectionPaused || reducedMotion.matches);
  collectionAmbient.setAttribute('aria-pressed', String(collectionPaused));
  collectionAmbient.setAttribute('aria-label', collectionPaused ? 'Retomar movimento do conjunto' : 'Pausar movimento do conjunto');
  collectionAmbient.querySelector('span').textContent = collectionPaused ? '▷' : 'Ⅱ';
}
function arrangeCollection(announce = false) {
  collectionDirections.forEach((direction, index) => {
    const offset = directionIndex(index - currentDirection);
    const slot = offset <= 2 ? offset : offset >= collectionDirections.length - 2 ? offset - collectionDirections.length : 'off';
    const active = index === currentDirection;
    direction.piece.dataset.slot = String(slot);
    direction.piece.inert = !active;
    direction.piece.setAttribute('aria-hidden', String(!active));
    if (active) direction.piece.setAttribute('aria-current', 'true');
    else direction.piece.removeAttribute('aria-current');
    direction.piece.querySelector('img').src = active ? direction.image : direction.thumbnail;
  });
  collectionCurrent.textContent = String(currentDirection + 1).padStart(2, '0');
  collectionPosition.setAttribute('aria-label', `Direção ${currentDirection + 1} de ${collectionDirections.length}`);
  if (announce) collectionAnnouncement.textContent = `${currentDirection + 1} de ${collectionDirections.length}: ${collectionDirections[currentDirection].name}`;
}
function navigateCollection(index) {
  settleCollectionMotion();
  const destination = directionIndex(index);
  if (destination === currentDirection) return;
  // Buttons keep their focus; a link in the outgoing piece returns focus to the list.
  if (collectionPieces.some(piece => piece.contains(document.activeElement))) collectionList.focus({ preventScroll: true });
  collectionSystem.classList.add('is-interacting');
  clearTimeout(collectionResumeTimer);
  collectionResumeTimer = setTimeout(() => collectionSystem.classList.remove('is-interacting'), 5500);
  const before = collectionPieces.map(piece => ({ rect: piece.getBoundingClientRect(), visible: piece.dataset.slot !== 'off' }));
  const forward = destination === directionIndex(currentDirection + 1);
  currentDirection = destination;
  arrangeCollection(true);
  if (reducedMotion.matches || typeof collectionList.animate !== 'function') return;
  collectionSystem.setAttribute('aria-busy', 'true');
  collectionAnimations = collectionPieces.flatMap((piece, index) => {
    if (piece.dataset.slot === 'off') return [];
    const old = before[index], next = piece.getBoundingClientRect();
    if (!old.visible) return [piece.animate([{ opacity: 0 }, { opacity: getComputedStyle(piece).opacity }], { duration: 660, easing: 'ease-out' })];
    const dx = old.rect.left - next.left, dy = old.rect.top - next.top;
    const scale = old.rect.width / next.width;
    // FLIP moves the actual piece between catalogue and highlight, without clones.
    const frames = Array.from({ length: 9 }, (_, step) => {
      const t = step / 8, arc = 4 * t * (1 - t);
      return { transform: `translate(${dx * (1 - t)}px, ${dy * (1 - t) + (forward ? -18 : 18) * arc}px) scale(${scale + (1 - scale) * t})`, offset: t };
    });
    return [piece.animate(frames, { duration: 720, easing: 'cubic-bezier(.22,.72,.22,1)' })];
  });
  const running = collectionAnimations;
  Promise.allSettled(running.map(animation => animation.finished)).then(() => {
    if (collectionAnimations === running) { collectionAnimations = []; collectionSystem.removeAttribute('aria-busy'); }
  });
}
collectionSystem.classList.add('is-enhanced');
collectionNavigation.hidden = false;
arrangeCollection();
collectionSystem.querySelector('.collection-previous').addEventListener('click', () => navigateCollection(currentDirection - 1));
collectionSystem.querySelector('.collection-next').addEventListener('click', () => navigateCollection(currentDirection + 1));
function collectionKeyboard(event) {
  const destinations = { ArrowRight: currentDirection + 1, ArrowLeft: currentDirection - 1, Home: 0, End: collectionDirections.length - 1 };
  if (event.key in destinations) { event.preventDefault(); navigateCollection(destinations[event.key]); }
}
collectionList.addEventListener('keydown', collectionKeyboard);
collectionNavigation.addEventListener('keydown', collectionKeyboard);
collectionAmbient.addEventListener('click', () => { collectionPaused = !collectionPaused; syncCollectionAmbient(); });
collectionMobile.addEventListener('change', () => { settleCollectionMotion(); syncCollectionAmbient(); });
reducedMotion.addEventListener('change', () => { settleCollectionMotion(); syncCollectionAmbient(); });
window.addEventListener('resize', settleCollectionMotion, { passive: true });
document.addEventListener('visibilitychange', syncCollectionAmbient);
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => { collectionVisible = entries[0].isIntersecting; syncCollectionAmbient(); }, { threshold: .15 }).observe(collectionSystem);
} else collectionVisible = true;
syncCollectionAmbient();

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

// Build 01.7 — three real slides; CSS order rotates the view, never the DOM.
const projectViewport = document.querySelector('.project-viewport');
const projectTrack = document.querySelector('.project-track');
const projectSlides = [...projectTrack.querySelectorAll('.project-slide')];
const projectPages = [...document.querySelectorAll('.project-pagination button')];
const projectControls = document.querySelector('.project-carousel-controls');
const projectAnnouncement = document.querySelector('.project-announcement');
let currentProject = 0;
let projectDestination = 0;
let projectAnimation = null;
const projectIndex = index => (index + projectSlides.length) % projectSlides.length;

function orderProjects(first) {
  projectSlides.forEach((slide, index) => { slide.style.order = projectIndex(index - first); });
}
function settleProject(announce = true) {
  // Cancel before replacing the order: the track returns to its resting position.
  if (projectAnimation) { projectAnimation.cancel(); projectAnimation = null; }
  currentProject = projectDestination;
  orderProjects(currentProject);
  projectSlides.forEach((slide, index) => {
    const active = index === currentProject;
    slide.classList.toggle('is-active', active);
    slide.inert = !active;
    slide.setAttribute('aria-hidden', String(!active));
  });
  projectPages.forEach((button, index) => {
    button.classList.toggle('active', index === currentProject);
    if (index === currentProject) button.setAttribute('aria-current', 'true');
    else button.removeAttribute('aria-current');
  });
  projectViewport.removeAttribute('aria-busy');
  if (announce) projectAnnouncement.textContent = `Projeto ${currentProject + 1} de ${projectSlides.length}: ${projectSlides[currentProject].querySelector('h3').textContent}`;
}
function showProject(index) {
  // A second input during a transition first settles its destination.
  if (projectAnimation) settleProject(false);
  const destination = projectIndex(index);
  if (destination === currentProject) return;
  projectDestination = destination;
  if (projectViewport.contains(document.activeElement)) projectViewport.focus({ preventScroll: true });
  if (reducedMotion.matches || !projectTrack.animate) { settleProject(); return; }
  const next = destination === projectIndex(currentProject + 1);
  const step = projectSlides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(projectTrack).columnGap);
  // Going back starts with the previous slide off-screen to the left.
  if (!next) orderProjects(destination);
  projectViewport.setAttribute('aria-busy', 'true');
  projectAnimation = projectTrack.animate(
    [{ transform: `translateX(${next ? 0 : -step}px)` }, { transform: `translateX(${next ? -step : 0}px)` }],
    { duration: 620, easing: 'cubic-bezier(.22,.68,.22,1)', fill: 'forwards' }
  );
  projectAnimation.onfinish = () => settleProject();
}
projectViewport.classList.add('is-enhanced');
projectControls.hidden = false;
settleProject(false);
document.querySelector('.project-prev').addEventListener('click', () => showProject(projectDestination - 1));
document.querySelector('.project-next').addEventListener('click', () => showProject(projectDestination + 1));
projectPages.forEach((button, index) => button.addEventListener('click', () => showProject(index)));
function projectKeyboard(event) {
  const destinations = { ArrowRight: projectDestination + 1, ArrowLeft: projectDestination - 1, Home: 0, End: projectSlides.length - 1 };
  if (event.key in destinations) { event.preventDefault(); showProject(destinations[event.key]); }
}
projectControls.addEventListener('keydown', projectKeyboard);
projectViewport.addEventListener('keydown', projectKeyboard);
// Native vertical scrolling remains available; a deliberate horizontal swipe advances.
let projectSwipe = null;
projectViewport.addEventListener('pointerdown', event => {
  if (event.pointerType === 'mouse' || event.target.closest('a, button')) return;
  projectSwipe = { x: event.clientX, y: event.clientY, id: event.pointerId };
});
projectViewport.addEventListener('pointerup', event => {
  if (!projectSwipe || event.pointerId !== projectSwipe.id) return;
  const dx = event.clientX - projectSwipe.x;
  const dy = event.clientY - projectSwipe.y;
  projectSwipe = null;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) showProject(projectDestination + (dx < 0 ? 1 : -1));
});
projectViewport.addEventListener('pointercancel', () => { projectSwipe = null; });
window.addEventListener('resize', () => { if (projectAnimation) settleProject(); });
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches && projectAnimation) settleProject(); });

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
  const bows = [[-40, 0], [0, -155], [38, 0], [0, 105]];
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
  const activeAnimations = orbitAnimations;
  Promise.allSettled(activeAnimations.map(animation => animation.finished)).then(() => {
    if (orbitAnimations === activeAnimations) orbitAnimations = [];
  });
}
orbitNext.addEventListener('click', advanceServiceOrbit);
orbitDesktop.addEventListener('change', syncServiceOrbit);
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) settleServiceOrbit(); });
window.addEventListener('resize', settleServiceOrbit, { passive: true });
syncServiceOrbit();
