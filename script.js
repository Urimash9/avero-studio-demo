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
// Build 01.12.2 — one catalogue/state owner; desktop keeps its original FLIP path.
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
  geometry: null,
  transfer: null
};
const collectionEngine = collectionSystem.querySelector('.collection-engine');
const directionIndex = index => (index + collectionDirections.length) % collectionDirections.length;
const collectionRadialStep = 360 / collectionDirections.length;
const collectionFrontGap = collectionRadialStep / 2;
const collectionAmbientSpeed = 2.5; // degrees per second; one turn in 144 seconds.
const collectionExtractionAngle = -60;
const collectionTransferDuration = 600;
const collectionTransferCropSupported = typeof CSS.registerProperty === 'function';
if (collectionTransferCropSupported) {
  ['--collection-transfer-crop-x', '--collection-transfer-crop-y'].forEach(name => {
    CSS.registerProperty({ name, syntax: '<number>', inherits: true, initialValue: '1' });
  });
}
// Physical slots keep their geometry; only their decorative contents are exchanged.
const radialBladeContent = collectionDirections.map((_, index) => index);
let collectionRadialStage = null, collectionRadialRotor = null;
const collectionRadialBlades = [];

function closestCollectionRotation(index, from = collectionState.wheelRotation) {
  const target = -index * collectionRadialStep - collectionFrontGap;
  return closestCollectionAngle(target, from);
}
function closestCollectionAngle(target, from = collectionState.wheelRotation) {
  return from + ((target - from + 180) % 360 + 360) % 360 - 180;
}
function createCollectionRadial() {
  if (collectionRadialStage) return;
  collectionRadialStage = document.createElement('div');
  collectionRadialStage.className = 'collection-radial-stage';
  collectionRadialStage.setAttribute('aria-hidden', 'true');
  collectionRadialStage.inert = true;
  const tilt = document.createElement('div');
  tilt.className = 'collection-radial-tilt';
  collectionRadialRotor = document.createElement('div');
  collectionRadialRotor.className = 'collection-radial-rotor';
  collectionDirections.forEach((direction, index) => {
    const blade = document.createElement('div');
    blade.className = 'collection-radial-blade';
    blade.style.setProperty('--blade-angle', `${index * collectionRadialStep}deg`);
    ['front', 'back'].forEach(side => {
      const face = document.createElement('div');
      face.className = `collection-radial-face collection-radial-${side}`;
      face.setAttribute('aria-hidden', 'true');
      const image = document.createElement('img');
      image.src = direction.thumbnail;
      image.alt = '';
      image.draggable = false;
      image.decoding = 'async';
      face.append(image);
      blade.append(face);
    });
    collectionRadialBlades.push(blade);
    collectionRadialRotor.append(blade);
  });
  tilt.append(collectionRadialRotor);
  collectionRadialStage.append(tilt);
  collectionEngine.append(collectionRadialStage);
}

function measureCollection() {
  if (!collectionMobile.matches) { collectionState.geometry = null; return; }
  const width = collectionList.clientWidth, height = collectionList.clientHeight;
  const pageWidth = Math.min(width * .44, 240), pageHeight = pageWidth * 1.05;
  const activeY = height * (matchMedia('(max-width: 430px)').matches ? .1 : .07);
  const stageWidth = Math.min(width * .5, 260), radius = stageWidth * .37;
  collectionState.geometry = {
    width, pageWidth, pageHeight, activeY, stageWidth, radius,
    bladeWidth: radius * .44, bladeHeight: radius * 1.28,
    camera: Math.min(1200, Math.max(800, width * 2.6))
  };
  collectionList.style.setProperty('--collection-page-width', `${pageWidth}px`);
  collectionList.style.setProperty('--collection-page-height', `${pageHeight}px`);
  collectionList.style.setProperty('--collection-active-y', `${activeY}px`);
  const g = collectionState.geometry;
  const properties = {
    '--radial-stage-width': stageWidth, '--radial-stage-left': width - stageWidth,
    '--radial-stage-top': activeY, '--radial-stage-height': pageHeight,
    '--radial-radius': radius, '--radial-blade-width': g.bladeWidth,
    '--radial-blade-height': g.bladeHeight, '--radial-camera': g.camera
  };
  Object.entries(properties).forEach(([name, value]) => collectionRadialStage.style.setProperty(name, `${value}px`));
}
function renderCollectionRadial() {
  if (!collectionMobile.matches || !collectionRadialRotor) return;
  collectionRadialRotor.style.transform = `rotateY(${collectionState.wheelRotation}deg)`;
  collectionRadialBlades.forEach((blade, index) => {
    blade.classList.toggle('is-active', radialBladeContent[index] === collectionState.activeIndex);
  });
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
function stopCollectionFrame() {
  if (collectionState.frame !== null) cancelAnimationFrame(collectionState.frame);
  collectionState.frame = null;
  collectionState.lastFrame = null;
}
function canCollectionMove() {
  const s = collectionState;
  return collectionMobile.matches && collectionRadialRotor && !s.reducedMotion &&
    s.visibilityState.component && s.visibilityState.document && s.transitionState === 'idle' &&
    !Object.values(s.pauseState).some(Boolean);
}
function collectionFrame(time) {
  const s = collectionState;
  s.frame = null;
  if (!canCollectionMove()) { s.lastFrame = null; return; }
  if (s.lastFrame !== null) {
    s.wheelRotation -= Math.min(time - s.lastFrame, 64) * collectionAmbientSpeed / 1000;
    // This is the only ambient DOM write: the same rotor angle used by navigation.
    collectionRadialRotor.style.transform = `rotateY(${s.wheelRotation}deg)`;
  }
  s.lastFrame = time;
  s.frame = requestAnimationFrame(collectionFrame);
}
function arrangeCollection(announce = false) {
  collectionDirections.forEach((direction, index) => {
    const offset = directionIndex(index - collectionState.activeIndex);
    const active = index === collectionState.activeIndex;
    const slot = collectionMobile.matches ? active ? 0 : 'off' : offset <= 2 ? offset : offset >= collectionDirections.length - 2 ? offset - collectionDirections.length : 'off';
    direction.piece.dataset.slot = String(slot);
    delete direction.piece.dataset.wheelSlot;
    direction.piece.inert = !active;
    direction.piece.setAttribute('aria-hidden', String(!active));
    if (active) direction.piece.setAttribute('aria-current', 'true');
    else direction.piece.removeAttribute('aria-current');
    direction.piece.querySelector('img').src = active ? direction.image : direction.thumbnail;
    direction.piece.style.removeProperty('transform');
    direction.piece.style.removeProperty('opacity');
  });
  collectionCurrent.textContent = String(collectionState.activeIndex + 1).padStart(2, '0');
  collectionPosition.setAttribute('aria-label', `Direção ${collectionState.activeIndex + 1} de ${collectionDirections.length}`);
  if (announce) collectionAnnouncement.textContent = `${collectionState.activeIndex + 1} de ${collectionDirections.length}: ${collectionDirections[collectionState.activeIndex].name}`;
  renderCollectionRadial();
}
function settleCollectionMotion(announce = true) {
  if (collectionState.transfer) { settleTransfer(announce); return; }
  // Resize, reduced motion and hidden tabs finish the intended selection atomically.
  const hadDestination = collectionState.destination !== null;
  collectionState.run++;
  collectionState.animations.forEach(animation => animation.cancel());
  collectionState.animations = [];
  if (hadDestination) {
    collectionState.activeIndex = collectionState.destination;
    collectionState.wheelRotation = closestCollectionRotation(collectionState.destination);
  }
  collectionState.destination = null;
  collectionState.transitionState = 'idle';
  collectionSystem.removeAttribute('aria-busy');
  collectionSystem.classList.remove('is-transferring');
  collectionSystem.classList.remove('is-rotating');
  collectionNavigation.querySelectorAll('.circle-link').forEach(button => button.removeAttribute('aria-disabled'));
  collectionPieces.forEach(piece => piece.classList.remove('is-travelling'));
  arrangeCollection(announce && hadDestination);
  if (hadDestination) {
    pauseCollectionInteraction();
    resumeCollectionInteraction();
  } else syncCollectionAmbient();
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
async function navigateCollectionRadial(destination) {
  const s = collectionState, run = ++s.run, oldActive = s.activeIndex;
  const sourceSlot = radialBladeContent.indexOf(destination);
  const oldActiveSlot = radialBladeContent.indexOf(oldActive);
  const startRotation = s.wheelRotation;
  const gateRotation = closestCollectionAngle(collectionExtractionAngle - sourceSlot * collectionRadialStep, startRotation);
  pauseCollectionInteraction();
  const transfer = s.transfer = { oldActive, sourceSlot, oldActiveSlot, gateRotation, copyTimer: null, layer: null };
  s.destination = destination;
  s.transitionState = 'aligning';
  collectionSystem.setAttribute('aria-busy', 'true');
  collectionSystem.classList.add('is-rotating');
  collectionNavigation.querySelectorAll('.circle-link').forEach(button => button.setAttribute('aria-disabled', 'true'));
  if (s.reducedMotion || !s.visibilityState.document || !s.visibilityState.component || typeof collectionRadialRotor.animate !== 'function') {
    settleTransfer(); return;
  }
  try {
    const distance = Math.abs(gateRotation - startRotation);
    const duration = Math.round(distance < 30 ? distance * 220 / 30 : 220 + (distance - 30) * 200 / 150);
    if (duration > 0) {
      const alignment = collectionRadialRotor.animate([
        { transform: `rotateY(${startRotation}deg)` },
        { transform: `rotateY(${gateRotation}deg)` }
      ], { duration, easing: 'cubic-bezier(.22,.8,.18,1)', fill: 'both' });
      s.animations = [alignment];
      await Promise.allSettled([alignment.finished]);
      if (s.run !== run) return;
    }
    s.wheelRotation = gateRotation;
    collectionRadialRotor.style.transform = `rotateY(${gateRotation}deg)`;
    s.animations.forEach(animation => animation.cancel());
    s.animations = [];
    beginCollectionTransfer(transfer, destination, run);
    await Promise.allSettled(s.animations.map(animation => animation.finished));
  } finally {
    if (s.run === run && s.transfer === transfer) settleTransfer();
  }
}

function measureTransferSurface(element, projected = false) {
  const rect = element.getBoundingClientRect(), style = getComputedStyle(element);
  const width = projected ? parseFloat(style.width) : rect.width;
  const height = projected ? parseFloat(style.height) : rect.height;
  let points = [[rect.left, rect.top], [rect.right, rect.top], [rect.right, rect.bottom], [rect.left, rect.bottom]];
  if (projected) {
    // Zero-size probes read the real projected corners, including camera and tilt.
    // They are removed before either proxy exists; no per-frame measurements.
    const probes = [[0, 0], [width, 0], [width, height], [0, height]].map(([x, y]) => {
      const probe = document.createElement('span');
      probe.style.cssText = `position:absolute;display:block;width:0;height:0;margin:0;padding:0;border:0;visibility:hidden;transform:none;left:${x - parseFloat(style.borderLeftWidth)}px;top:${y - parseFloat(style.borderTopWidth)}px`;
      return probe;
    });
    element.append(...probes);
    points = probes.map(probe => { const r = probe.getBoundingClientRect(); return [r.x, r.y]; });
    probes.forEach(probe => probe.remove());
  }
  const radii = ['TopLeft', 'TopRight', 'BottomRight', 'BottomLeft'].map(corner => parseFloat(style[`border${corner}Radius`]));
  return { points, width, height, radii, borderColor: style.borderColor };
}
function transferMatrix(points, width, height) {
  // A planar homography keeps the first/last proxy corners on the measured face.
  const [p0, p1, p2, p3] = points;
  const dx1 = p1[0] - p2[0], dx2 = p3[0] - p2[0], dx3 = p0[0] - p1[0] + p2[0] - p3[0];
  const dy1 = p1[1] - p2[1], dy2 = p3[1] - p2[1], dy3 = p0[1] - p1[1] + p2[1] - p3[1];
  const denominator = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / denominator;
  const h = (dx1 * dy3 - dx3 * dy1) / denominator;
  const a = p1[0] - p0[0] + g * p1[0], b = p3[0] - p0[0] + h * p3[0];
  const d = p1[1] - p0[1] + g * p1[1], e = p3[1] - p0[1] + h * p3[1];
  return `matrix3d(${[a / width, d / width, 0, g / width, b / height, e / height, 0, h / height, 0, 0, 1, 0, p0[0], p0[1], 0, 1].join(',')})`;
}
function collectionTransferFrames(from, to, width, height, imageRatio, incoming) {
  const center = surface => surface.points.reduce((sum, p) => [sum[0] + p[0] / 4, sum[1] + p[1] / 4], [0, 0]);
  const a = center(from), b = center(to), lerp = (x, y, t) => x + (y - x) * t;
  const arc = incoming ? -Math.min(18, height * .12) : height * .3;
  return Array.from({ length: 9 }, (_, index) => {
    const t = index / 8, shape = incoming ? t * t : 1 - (1 - t) ** 3;
    const depth = incoming ? 1 : 1 - .35 * 4 * t * (1 - t);
    const cx = lerp(a[0], b[0], t), cy = lerp(a[1], b[1], t) + 4 * t * (1 - t) * arc;
    const points = from.points.map((p, i) => [cx + lerp(p[0] - a[0], to.points[i][0] - b[0], shape) * depth, cy + lerp(p[1] - a[1], to.points[i][1] - b[1], shape) * depth]);
    const w = lerp(from.width, to.width, shape), h = lerp(from.height, to.height, shape);
    const cover = Math.max((w - 2) / imageRatio, h - 2) / Math.max((width - 2) / imageRatio, height - 2);
    const radii = from.radii.map((r, i) => lerp(r, to.radii[i], shape));
    return {
      offset: t, transform: transferMatrix(points, width, height),
      '--collection-transfer-crop-x': String(cover * width / w),
      '--collection-transfer-crop-y': String(cover * height / h),
      borderRadius: `${radii.map(r => r * width / w + 'px').join(' ')} / ${radii.map(r => r * height / h + 'px').join(' ')}`,
      borderColor: t === 0 ? from.borderColor : to.borderColor,
      filter: incoming ? t === 1 ? 'none' : `brightness(${lerp(.86, 1, shape)})` : t === 0 ? 'none' : `brightness(${lerp(1, .86, shape)})`
    };
  });
}
function beginCollectionTransfer(transfer, destination, run) {
  const s = collectionState, sourceBlade = collectionRadialBlades[transfer.sourceSlot];
  const oldPiece = collectionDirections[transfer.oldActive].piece;
  const highlight = measureTransferSurface(oldPiece.querySelector('.collection-piece-visual'));
  const face = measureTransferSurface(sourceBlade.querySelector('.collection-radial-front'), true);
  const layer = transfer.layer = document.createElement('div');
  layer.className = 'collection-transfer-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.inert = true;
  const proxies = [true, false].map(incoming => {
    const direction = collectionDirections[incoming ? destination : transfer.oldActive];
    const proxy = document.createElement('div');
    proxy.className = `collection-transfer-proxy ${incoming ? 'is-incoming' : 'is-outgoing'}`;
    proxy.dataset.direction = direction.id;
    proxy.style.width = `${highlight.width}px`;
    proxy.style.height = `${highlight.height}px`;
    const image = direction.piece.querySelector('img');
    const frames = collectionTransferFrames(incoming ? face : highlight, incoming ? highlight : face, highlight.width, highlight.height, image.naturalWidth / image.naturalHeight, incoming);
    const visual = document.createElement('img');
    visual.src = direction.image;
    visual.alt = '';
    visual.draggable = false;
    visual.setAttribute('aria-hidden', 'true');
    proxy.append(visual);
    layer.append(proxy);
    return { proxy, visual, frames };
  });
  document.body.append(layer);
  sourceBlade.classList.add('is-transfer-hidden');
  [oldPiece, collectionDirections[destination].piece].forEach(piece => piece.classList.add('is-transfer-highlight'));
  s.transitionState = 'transferring';
  collectionSystem.classList.remove('is-rotating');
  collectionSystem.classList.add('is-transferring');
  const timing = { duration: collectionTransferDuration, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'both' };
  s.animations = proxies.flatMap(({ proxy, visual, frames }) => {
    const animations = [proxy.animate(frames, timing)];
    // Older engines can animate the image crop inside the same two visual proxies.
    if (!collectionTransferCropSupported) animations.push(visual.animate(frames.map(frame => ({ offset: frame.offset, transform: `scale(${frame['--collection-transfer-crop-x']},${frame['--collection-transfer-crop-y']})` })), timing));
    return animations;
  });
  // Copy/state stay synchronized, early in the crossing, without waiting for arrival.
  transfer.copyTimer = setTimeout(() => {
    if (s.run !== run || s.transfer !== transfer) return;
    s.activeIndex = destination;
    arrangeCollection(true);
  }, 140);
}
function settleTransfer(announce = true) {
  const s = collectionState, transfer = s.transfer;
  if (!transfer) return;
  s.run++;
  clearTimeout(transfer.copyTimer);
  s.animations.forEach(animation => animation.cancel());
  s.animations = [];
  s.wheelRotation = transfer.gateRotation;
  const changed = s.activeIndex !== s.destination;
  if (changed) s.activeIndex = s.destination;
  [radialBladeContent[transfer.sourceSlot], radialBladeContent[transfer.oldActiveSlot]] = [transfer.oldActive, s.activeIndex];
  [transfer.sourceSlot, transfer.oldActiveSlot].forEach(slot => {
    const direction = collectionDirections[radialBladeContent[slot]];
    collectionRadialBlades[slot].querySelectorAll('img').forEach(image => { image.src = direction.thumbnail; });
    collectionRadialBlades[slot].classList.remove('is-transfer-hidden');
  });
  [transfer.oldActive, s.activeIndex].forEach(index => collectionDirections[index].piece.classList.remove('is-transfer-highlight'));
  transfer.layer?.remove();
  s.transfer = null;
  s.destination = null;
  s.transitionState = 'idle';
  collectionSystem.removeAttribute('aria-busy');
  collectionSystem.classList.remove('is-transferring', 'is-rotating');
  collectionNavigation.querySelectorAll('.circle-link').forEach(button => button.removeAttribute('aria-disabled'));
  arrangeCollection(announce && changed);
  pauseCollectionInteraction();
  resumeCollectionInteraction(450);
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
  // Ignore additional compact inputs until the single rotor has settled.
  if (collectionMobile.matches && collectionState.transitionState !== 'idle') return;
  if (!collectionMobile.matches) settleCollectionMotion(false);
  const destination = directionIndex(index);
  if (destination === collectionState.activeIndex) return;
  if (collectionPieces.some(piece => piece.contains(document.activeElement))) collectionList.focus({ preventScroll: true });
  if (collectionMobile.matches) navigateCollectionRadial(destination);
  else navigateCollectionDesktop(destination);
}
function syncCollectionLayout() {
  const enteringCompact = collectionMobile.matches && !collectionSystem.classList.contains('is-radial');
  collectionSystem.classList.toggle('is-radial', collectionMobile.matches);
  if (enteringCompact && !collectionRadialStage) collectionState.wheelRotation = closestCollectionRotation(collectionState.activeIndex);
  if (collectionMobile.matches) createCollectionRadial();
  if (collectionRadialStage) collectionRadialStage.hidden = !collectionMobile.matches;
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
// A fixed transfer must not drift away from its originals while the page scrolls.
window.addEventListener('scroll', () => { if (collectionState.transfer) settleTransfer(); }, { passive: true });
document.addEventListener('visibilitychange', () => {
  collectionState.visibilityState.document = !document.hidden;
  if (document.hidden) settleCollectionMotion();
  syncCollectionAmbient();
});
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    collectionState.visibilityState.component = entries[0].isIntersecting;
    if (!collectionState.visibilityState.component && collectionState.transitionState !== 'idle') settleCollectionMotion(false);
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
