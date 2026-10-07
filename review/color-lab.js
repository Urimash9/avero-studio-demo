'use strict';

// One copy of the current Home, unchanged on disk. Only the lab adds its CSS.
const frame = document.querySelector('#lab-preview');
const buttons = [...document.querySelectorAll('[data-theme]')];
const widthControl = document.querySelector('#lab-width');
const areaControl = document.querySelector('#lab-area');
const status = document.querySelector('#lab-status');
const names = {a: 'Prata Nebular', b: 'Prata + Champagne Cósmico', c: 'Ciano Gelo'};
const query = new URLSearchParams(location.search);
let theme = Object.hasOwn(names, query.get('theme')) ? query.get('theme') : 'a';
let ready = false;

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
  if (ready) {
    frame.contentDocument.documentElement.dataset.theme = theme;
    status.textContent = `${theme.toUpperCase()} — ${names[theme]} · comparação cromática, sem aplicação na Home oficial`;
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
  doc.documentElement.dataset.colorLab = 'v2';
  doc.documentElement.dataset.theme = theme;
  const css = doc.createElement('link');
  css.rel = 'stylesheet';
  css.href = new URL('review/color-lab.css', root).href;
  doc.head.append(css);
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
