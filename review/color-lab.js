'use strict';

// The approved Home is the shared layout; review themes remain isolated here.
const frame = document.querySelector('#lab-preview');
const buttons = [...document.querySelectorAll('[data-theme]')];
const widthControl = document.querySelector('#lab-width');
const areaControl = document.querySelector('#lab-area');
const status = document.querySelector('#lab-status');
const names = {a: 'Prata Nebular', b: 'Prata + Champagne Cósmico', c: 'Ciano Gelo'};
const query = new URLSearchParams(location.search);
let theme = Object.hasOwn(names, query.get('theme')) ? query.get('theme') : 'a';
let ready = false;

// Build 01.14: only B refines the warm right turn; A/C retain the V2 path.
const methodLabPaths = {
  "desktop": {
    "base": "M4 0 C20 0 34 4 34 24.35 C34 64.7 60 84 118 90 C176 96 540 90 565 134.35 C590 178.7 590 199.95 565 244.35 C540 288.75 462 309.310345 330 315 C214 320 40 314 40 354.35 C40 374 18 374 4 374",
    "b": "M4 0 C20 0 34 4 34 24.35 C34 64.7 60 84 118 90 C236 102.206897 540 109.35 565 134.35 C590 159.35 590 199.95 565 244.35 C540 288.75 462 309.310345 330 315 C214 320 40 314 40 354.35 C40 374 18 374 4 374"
  },
  "mobile": {
    "base": "M4 2 C36 2 75 4 75 26.66 C75 66 97 88 148 96 C199 104 343 91.68 362 136.18 C381 180.68 362 201.21 362 245.71 C362 296.71 398 330 290 330 C182 330 75 330 75 355.24 C75 389 30 371 4 371",
    "b": "M4 2 C36 2 75 4 75 26.66 C75 66 97 88 148 96 C215 106.509804 339 112.68 362 136.18 C385 159.68 362 201.21 362 245.71 C362 296.71 398 330 290 330 C182 330 75 330 75 355.24 C75 389 30 371 4 371"
  },
  "phone": {
    "base": "M4 2 C36 2 75 4 75 26 C75 66 97 88 148 96 C199 104 343 91 362 135.5 C381 180 362 200.5 362 245 C362 296 398 330 290 330 C182 330 75 330 75 354.5 C75 389 30 371 4 371",
    "b": "M4 2 C36 2 75 4 75 26 C75 66 97 88 148 96 C215 106.509804 339 112 362 135.5 C385 159 362 200.5 362 245 C362 296 398 330 290 330 C182 330 75 330 75 354.5 C75 389 30 371 4 371"
  }
};
const methodLabStops = [[0,0],[.16,.58],[.66,.58],[.84,.4],[.93,.2],[1,0]];
function updateMethodLab() {
  const doc = frame.contentDocument;
  Object.entries(methodLabPaths).forEach(([name, paths]) => {
    const svg = doc.querySelector(`.method-path--${name}`);
    svg.querySelector('path').setAttribute('d', theme === 'b' ? paths.b : paths.base);
    const gradient = svg.querySelector('linearGradient');
    gradient.replaceChildren();
    const stops = theme === 'b' ? methodLabStops : [[0,0],[.16,.58],[.88,.58],[1,.35]];
    stops.forEach(([offset, opacity]) => {
      const stop = doc.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop.setAttribute('offset', offset);
      stop.setAttribute('stop-opacity', opacity);
      stop.setAttribute('stop-color', 'var(--line)');
      gradient.append(stop);
    });
  });
}
const homeReview = query.get('view') === 'home'; // viewport QA, no theme CSS injected



if ([...widthControl.options].some(option => option.value === query.get('width'))) widthControl.value = query.get('width');
if ([...areaControl.options].some(option => option.value === query.get('area'))) areaControl.value = query.get('area');

function updateURL() {
  const url = new URL(location.href);
  url.searchParams.set('theme', theme);
  url.searchParams.set('width', widthControl.value);
  url.searchParams.set('area', areaControl.value);
  history.replaceState(null, '', url);
}

function updateTheme() {
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.theme === theme)));
  frame.title = `Home AVERO — ${names[theme]}`;
  if (ready && !homeReview) {
    frame.contentDocument.documentElement.dataset.theme = theme;
    updateMethodLab();
    status.textContent = `${theme.toUpperCase()} — ${names[theme]} · referência cromática · B é a paleta oficial; C é histórico`;
  }
  if (homeReview) {
    buttons.forEach(button => {button.disabled = true; button.setAttribute('aria-pressed', 'false');});
    frame.title = 'Home AVERO — CSS oficial';
    if (ready) status.textContent = 'Home oficial · enquadramento de revisão, sem overrides de tema';
  }
  updateURL();
}

function updateWidth() {
  frame.style.width = widthControl.value === 'auto' ? '100%' : `${widthControl.value}px`;
  updateURL();
}

function goToArea() {
  if (!ready) return;
  const doc = frame.contentDocument;
  const target = areaControl.value === 'footer' ? doc.querySelector('.footer') : doc.getElementById(areaControl.value);
  if (areaControl.value === 'top') frame.contentWindow.scrollTo({top: 0, behavior: 'instant'});
  else target?.scrollIntoView({block: 'start', behavior: 'instant'});
  updateURL();
}

buttons.forEach(button => button.addEventListener('click', () => {theme = button.dataset.theme; updateTheme();}));
widthControl.addEventListener('change', updateWidth);
areaControl.addEventListener('change', goToArea);
new ResizeObserver(([entry]) => {
  document.documentElement.style.setProperty('--lab-toolbar-height', `${entry.target.getBoundingClientRect().height}px`);
}).observe(document.querySelector('.lab-toolbar'));

updateTheme();
updateWidth();

async function loadHome() {
  const root = new URL('../', location.href);
  const response = await fetch(new URL('index.html', root));
  if (!response.ok) throw new Error(`Home indisponível: HTTP ${response.status}`);
  const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
  const base = doc.createElement('base');
  base.href = root.href;
  doc.head.prepend(base);
  if (!homeReview) {
    doc.documentElement.classList.remove('avero-palette-b');
    doc.documentElement.dataset.colorLab = 'v2';
    doc.documentElement.dataset.theme = theme;
  }
  const css = doc.createElement('link');
  css.rel = 'stylesheet';
  css.href = new URL('review/color-lab.css', root).href;
  if (!homeReview) doc.head.append(css);
  const diagnostics = doc.createElement('script');
  diagnostics.textContent = `
    window.colorLabErrors=[];
    window.addEventListener('error',event=>{if(event.message)window.colorLabErrors.push(event.message)});
    window.addEventListener('unhandledrejection',event=>window.colorLabErrors.push(String(event.reason)));
    // A base URL resolves assets, but native fragment links would leave srcdoc.
    // Keep their scroll/focus in this review; original link listeners still run.
    document.addEventListener('click',event=>{
      const link=event.target.closest('a[href^="#"]');
      if(!link || event.defaultPrevented || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)return;
      const target=document.getElementById(link.getAttribute('href').slice(1));
      if(!target)return;
      event.preventDefault();
      target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
      if(link.classList.contains('skip-link'))target.focus({preventScroll:true});
    });
  `;
  doc.head.prepend(diagnostics);
  frame.addEventListener('load', async () => {
    ready = true;
    updateTheme();
    await frame.contentDocument.fonts.ready;
    goToArea();
  }, {once: true});
  frame.srcdoc = `<!doctype html>\n${doc.documentElement.outerHTML}`;
}

loadHome().catch(error => {
  status.textContent = `Não foi possível abrir a comparação. ${error.message}`;
  console.error(error);
});
