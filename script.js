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
// Build 01.12 — one state owner; the desktop FLIP path remains separate.
const collectionState = {
  activeIndex: 0,
  wheelRotation: 0,
  transitionState: 'idle',
  destination: null,
  run: 0,
  pauseState: { manual: false, interaction: false, pointer: false, focus: false },
  reducedMotion: reducedMotion.matches,
  visibilityState: { component: false, document: !document.hidden },
  animations: [],
  resumeTimer: null,
  frame: null,
  lastFrame: null,
  geometry: null
};
const collectionEngine = collectionSystem.querySelector('.collection-engine');
const directionIndex = index => (index + collectionDirections.length) % collectionDirections.length;
const wheelStep = 360 / (collectionDirections.length - 1);
const wrapAngle = angle => ((angle + 180) % 360 + 360) % 360 - 180;

function measureCollection() {
  if (!collectionMobile.matches) { collectionState.geometry = null; return; }
  const width = collectionList.clientWidth, height = collectionList.clientHeight;
  const pageWidth = Math.min(width * .44, 240), pageHeight = pageWidth * 1.05;
  const activeY = height * (matchMedia('(max-width: 430px)').matches ? .1 : .07);
  collectionState.geometry = {
    width, pageWidth, pageHeight, activeY,
    hingeX: width * .63, hingeY: activeY + pageHeight * .55,
    radius: pageWidth * .16
  };
  collectionList.style.setProperty('--collection-page-width', `${pageWidth}px`);
  collectionList.style.setProperty('--collection-page-height', `${pageHeight}px`);
  collectionList.style.setProperty('--collection-hinge-x', `${width * .63}px`);
  collectionList.style.setProperty('--collection-hinge-y', `${activeY + pageHeight * .55}px`);
  collectionList.style.setProperty('--collection-camera', `${Math.max(560, width * 2.2)}px`);
}
function collectionPose(index, active = collectionState.activeIndex, rotation = collectionState.wheelRotation) {
  const g = collectionState.geometry;
  if (index === active) return { x: 0, y: g.activeY, z: 0, rx: 0, ry: 0, rz: 0, radius: 0, scale: 1, opacity: 1 };
  const slot = directionIndex(index - active) - 1;
  const angle = wrapAngle(slot * wheelStep + rotation - 32);
  const facing = Math.max(0, Math.cos(angle * Math.PI / 180));
  return {
    x: g.hingeX, y: g.hingeY - g.pageHeight / 2, z: -24,
    rx: 18, ry: angle, rz: -16, radius: g.radius, scale: .66,
    // Only the front arc is legible; the other real pages remain on the axle.
    opacity: Math.min(1, facing / .24) * (.76 + .2 * facing)
  };
}
function collectionTransform(pose) {
  return `translate3d(${pose.x}px, ${pose.y}px, ${pose.z}px) rotateZ(${pose.rz}deg) rotateX(${pose.rx}deg) rotateY(${pose.ry}deg) translateZ(${pose.radius}px) scale(${pose.scale})`;
}
function renderCollectionWheel() {
  if (!collectionMobile.matches || !collectionState.geometry) return;
  collectionPieces.forEach((piece, index) => {
    const pose = collectionPose(index);
    piece.style.transform = collectionTransform(pose);
    piece.style.opacity = String(pose.opacity);
  });
}
function stopCollectionFrame() {
  if (collectionState.frame !== null) cancelAnimationFrame(collectionState.frame);
  collectionState.frame = null;
  collectionState.lastFrame = null;
}
function canCollectionMove() {
  const s = collectionState;
  return collectionMobile.matches && !s.reducedMotion && s.visibilityState.component && s.visibilityState.document &&
    s.transitionState === 'idle' && !Object.values(s.pauseState).some(Boolean);
}
function collectionFrame(time) {
  collectionState.frame = null;
  if (!canCollectionMove()) { collectionState.lastFrame = null; return; }
  if (collectionState.lastFrame !== null) {
    collectionState.wheelRotation = wrapAngle(collectionState.wheelRotation + Math.min(time - collectionState.lastFrame, 64) * .0013);
    renderCollectionWheel();
  }
  collectionState.lastFrame = time;
  collectionState.frame = requestAnimationFrame(collectionFrame);
}
function syncCollectionAmbient() {
  collectionAmbient.hidden = !collectionMobile.matches || collectionState.reducedMotion;
  const moving = canCollectionMove();
  collectionSystem.classList.toggle('is-resting', !moving);
  collectionAmbient.setAttribute('aria-pressed', String(collectionState.pauseState.manual));
  collectionAmbient.setAttribute('aria-label', collectionState.pauseState.manual ? 'Retomar movimento do conjunto' : 'Pausar movimento do conjunto');
  collectionAmbient.querySelector('span').textContent = collectionState.pauseState.manual ? '▷' : 'Ⅱ';
  if (!moving) stopCollectionFrame();
  else if (collectionState.frame === null) collectionState.frame = requestAnimationFrame(collectionFrame);
}
function arrangeCollection(announce = false) {
  collectionDirections.forEach((direction, index) => {
    const offset = directionIndex(index - collectionState.activeIndex);
    const slot = collectionMobile.matches ? offset : offset <= 2 ? offset : offset >= collectionDirections.length - 2 ? offset - collectionDirections.length : 'off';
    const active = index === collectionState.activeIndex;
    direction.piece.dataset.slot = String(slot);
    if (collectionMobile.matches && !active) direction.piece.dataset.wheelSlot = String(offset - 1);
    else delete direction.piece.dataset.wheelSlot;
    direction.piece.inert = !active;
    direction.piece.setAttribute('aria-hidden', String(!active));
    if (active) direction.piece.setAttribute('aria-current', 'true');
    else direction.piece.removeAttribute('aria-current');
    direction.piece.querySelector('img').src = active ? direction.image : direction.thumbnail;
    if (!collectionMobile.matches) {
      direction.piece.style.removeProperty('transform');
      direction.piece.style.removeProperty('opacity');
    }
  });
  collectionCurrent.textContent = String(collectionState.activeIndex + 1).padStart(2, '0');
  collectionPosition.setAttribute('aria-label', `Direção ${collectionState.activeIndex + 1} de ${collectionDirections.length}`);
  if (announce) collectionAnnouncement.textContent = `${collectionState.activeIndex + 1} de ${collectionDirections.length}: ${collectionDirections[collectionState.activeIndex].name}`;
  renderCollectionWheel();
}
function settleCollectionMotion(announce = true) {
  // Resize, reduced motion and hidden tabs finish the intended selection atomically.
  const hadDestination = collectionState.destination !== null;
  collectionState.run++;
  collectionState.animations.forEach(animation => animation.cancel());
  collectionState.animations = [];
  if (collectionState.destination !== null) collectionState.activeIndex = collectionState.destination;
  collectionState.destination = null;
  collectionState.transitionState = 'idle';
  collectionSystem.removeAttribute('aria-busy');
  collectionSystem.classList.remove('is-transferring');
  collectionNavigation.querySelectorAll('.circle-link').forEach(button => button.removeAttribute('aria-disabled'));
  collectionPieces.forEach(piece => piece.classList.remove('is-travelling'));
  arrangeCollection(announce && hadDestination);
  syncCollectionAmbient();
  if (hadDestination) resumeCollectionInteraction();
}
function pauseCollectionInteraction() {
  collectionState.pauseState.interaction = true;
  clearTimeout(collectionState.resumeTimer);
  collectionSystem.classList.add('is-interacting');
  syncCollectionAmbient();
}
function resumeCollectionInteraction(delay = 700) {
  clearTimeout(collectionState.resumeTimer);
  collectionState.resumeTimer = setTimeout(() => {
    collectionState.pauseState.interaction = false;
    collectionSystem.classList.remove('is-interacting');
    syncCollectionAmbient();
  }, delay);
}
function animateCollectionPose(piece, poses, duration) {
  const animation = piece.animate(poses.map((pose, index) => ({
    transform: collectionTransform(pose), opacity: pose.opacity,
    offset: index / (poses.length - 1)
  })), { duration, easing: 'cubic-bezier(.22,.72,.22,1)', fill: 'both' });
  collectionState.animations.push(animation);
  return animation;
}
async function navigateCollection3D(destination) {
  const s = collectionState, run = ++s.run, oldActive = s.activeIndex;
  s.destination = destination;
  pauseCollectionInteraction();
  if (s.reducedMotion || typeof collectionList.animate !== 'function') {
    settleCollectionMotion(); return;
  }
  s.transitionState = 'aligning';
  collectionSystem.setAttribute('aria-busy', 'true');
  collectionSystem.classList.add('is-transferring');
  collectionNavigation.querySelectorAll('.circle-link').forEach(button => button.setAttribute('aria-disabled', 'true'));
  const startRotation = s.wheelRotation;
  const targetAngle = collectionPose(destination).ry;
  const alignedRotation = startRotation + wrapAngle(-32 - targetAngle);
  const alignment = collectionPieces.flatMap((piece, index) => {
    if (index === oldActive) return [];
    const start = collectionPose(index), end = collectionPose(index, oldActive, alignedRotation);
    end.ry = start.ry + wrapAngle(end.ry - start.ry);
    return [animateCollectionPose(piece, [start, end], 280)];
  });
  await Promise.allSettled(alignment.map(animation => animation.finished));
  if (s.run !== run) return;
  s.wheelRotation = wrapAngle(alignedRotation);
  renderCollectionWheel();
  alignment.forEach(animation => animation.cancel());
  s.animations = [];
  s.transitionState = 'exchanging';
  let delta = directionIndex(destination - oldActive);
  if (delta > collectionDirections.length / 2) delta -= collectionDirections.length;
  const finalRotation = wrapAngle(s.wheelRotation + delta * wheelStep);
  const movements = collectionPieces.map((piece, index) => {
    const start = collectionPose(index), end = collectionPose(index, destination, finalRotation);
    end.ry = start.ry + wrapAngle(end.ry - start.ry);
    if (index === destination || index === oldActive) {
      piece.classList.add('is-travelling');
      // The actual page advances in Z before crossing the gap; no image swap/proxy.
      const bridge = {
        x: s.geometry.hingeX * (index === destination ? .58 : .48),
        y: (start.y + end.y) / 2 - 8, z: 32,
        rx: 8, ry: index === destination ? -18 : 22, rz: -7,
        radius: s.geometry.radius + 30, scale: .82, opacity: 1
      };
      return animateCollectionPose(piece, [start, bridge, end], 820);
    }
    return animateCollectionPose(piece, [start, end], 820);
  });
  await Promise.allSettled(movements.map(animation => animation.finished));
  if (s.run !== run) return;
  s.wheelRotation = finalRotation;
  settleCollectionMotion();
}
function navigateCollectionDesktop(destination) {
  // Original desktop FLIP geometry, duration and immediate state update.
  const before = collectionPieces.map(piece => ({ rect: piece.getBoundingClientRect(), visible: piece.dataset.slot !== 'off' }));
  const forward = destination === directionIndex(collectionState.activeIndex + 1);
  collectionState.activeIndex = destination;
  arrangeCollection(true);
  if (collectionState.reducedMotion || typeof collectionList.animate !== 'function') return;
  collectionSystem.setAttribute('aria-busy', 'true');
  collectionState.animations = collectionPieces.flatMap((piece, index) => {
    if (piece.dataset.slot === 'off') return [];
    const old = before[index], next = piece.getBoundingClientRect();
    if (!old.visible) return [piece.animate([{ opacity: 0 }, { opacity: getComputedStyle(piece).opacity }], { duration: 660, easing: 'ease-out' })];
    const dx = old.rect.left - next.left, dy = old.rect.top - next.top;
    const scale = old.rect.width / next.width;
    const frames = Array.from({ length: 9 }, (_, step) => {
      const t = step / 8, arc = 4 * t * (1 - t);
      return { transform: `translate(${dx * (1 - t)}px, ${dy * (1 - t) + (forward ? -18 : 18) * arc}px) scale(${scale + (1 - scale) * t})`, offset: t };
    });
    return [piece.animate(frames, { duration: 720, easing: 'cubic-bezier(.22,.72,.22,1)' })];
  });
  const running = collectionState.animations;
  Promise.allSettled(running.map(animation => animation.finished)).then(() => {
    if (collectionState.animations === running) { collectionState.animations = []; collectionSystem.removeAttribute('aria-busy'); }
  });
}
function navigateCollection(index) {
  // Ignore additional mobile inputs until the two real pages have settled.
  if (collectionMobile.matches && collectionState.transitionState !== 'idle') return;
  if (!collectionMobile.matches) settleCollectionMotion(false);
  const destination = directionIndex(index);
  if (destination === collectionState.activeIndex) return;
  if (collectionPieces.some(piece => piece.contains(document.activeElement))) collectionList.focus({ preventScroll: true });
  if (collectionMobile.matches) navigateCollection3D(destination);
  else navigateCollectionDesktop(destination);
}
function syncCollectionLayout() {
  collectionSystem.classList.toggle('is-3d', collectionMobile.matches);
  measureCollection();
  settleCollectionMotion();
}
collectionSystem.classList.add('is-enhanced');
collectionNavigation.hidden = false;
syncCollectionLayout();
collectionSystem.querySelector('.collection-previous').addEventListener('click', () => navigateCollection(collectionState.activeIndex - 1));
collectionSystem.querySelector('.collection-next').addEventListener('click', () => navigateCollection(collectionState.activeIndex + 1));
function collectionKeyboard(event) {
  const destinations = { ArrowRight: collectionState.activeIndex + 1, ArrowLeft: collectionState.activeIndex - 1, Home: 0, End: collectionDirections.length - 1 };
  if (event.key in destinations) { event.preventDefault(); navigateCollection(destinations[event.key]); }
}
collectionList.addEventListener('keydown', collectionKeyboard);
collectionNavigation.addEventListener('keydown', collectionKeyboard);
collectionAmbient.addEventListener('click', () => { collectionState.pauseState.manual = !collectionState.pauseState.manual; syncCollectionAmbient(); });
collectionEngine.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { collectionState.pauseState.pointer = true; syncCollectionAmbient(); } });
collectionEngine.addEventListener('pointerleave', () => { collectionState.pauseState.pointer = false; syncCollectionAmbient(); });
collectionList.addEventListener('focusin', () => { collectionState.pauseState.focus = true; syncCollectionAmbient(); });
collectionList.addEventListener('focusout', event => { if (!collectionList.contains(event.relatedTarget)) { collectionState.pauseState.focus = false; syncCollectionAmbient(); } });
collectionSystem.addEventListener('pointerdown', pauseCollectionInteraction);
// A release outside the component must not leave its interaction pause latched.
window.addEventListener('pointerup', () => { if (collectionState.pauseState.interaction) resumeCollectionInteraction(); }, { passive: true });
window.addEventListener('pointercancel', () => { if (collectionState.pauseState.interaction) resumeCollectionInteraction(); }, { passive: true });
collectionMobile.addEventListener('change', syncCollectionLayout);
reducedMotion.addEventListener('change', () => { collectionState.reducedMotion = reducedMotion.matches; settleCollectionMotion(); });
window.addEventListener('resize', syncCollectionLayout, { passive: true });
document.addEventListener('visibilitychange', () => {
  collectionState.visibilityState.document = !document.hidden;
  if (document.hidden) settleCollectionMotion();
  syncCollectionAmbient();
});
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    collectionState.visibilityState.component = entries[0].isIntersecting;
    syncCollectionAmbient();
  }, { threshold: .15 }).observe(collectionSystem);
} else collectionState.visibilityState.component = true;
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
