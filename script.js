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
let currentCard = 0;
function goToCard(index) {
  currentCard = (index + cards.length) % cards.length;
  cards.forEach((card, i) => card.classList.toggle('active', i === currentCard));
  requestAnimationFrame(() => rail.scrollTo({ left: cards[currentCard].offsetLeft - cards[0].offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }));
  pages.forEach((button, i) => {
    button.classList.toggle('active', i === currentCard);
    if (i === currentCard) button.setAttribute('aria-current', 'true');
    else button.removeAttribute('aria-current');
  });
}
document.querySelector('.rail-prev').addEventListener('click', () => goToCard(currentCard - 1));
document.querySelector('.rail-next').addEventListener('click', () => goToCard(currentCard + 1));
pages.forEach((button, i) => button.addEventListener('click', () => goToCard(i)));
rail.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault(); goToCard(currentCard + (event.key === 'ArrowRight' ? 1 : -1));
  }
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
  { name: 'STÚDIO NICOTA', category: 'Arquitetura & Interiores', image: 'project-nicota.png', tag: 'Conceito Avero' },
  { name: 'VÉRTICE CLÍNICA', category: 'Saúde & Bem-estar', image: 'project-clinic.png', tag: 'Conceito Avero' },
  { name: 'SABOR REAL', category: 'Gastronomia', image: 'project-sabor.png', tag: 'Demo personalizada' }
];
const projectPages = [...document.querySelectorAll('.project-pagination button')];
let currentProject = 0;
function showProject(index) {
  currentProject = (index + projectDirections.length) % projectDirections.length;
  const project = projectDirections[currentProject];
  const featured = document.querySelector('.featured');
  featured.querySelector('.featured-art').src = `assets/${project.image}`;
  featured.querySelector('.featured-art').alt = `${project.name}: projeto em computador e celular`;
  featured.querySelector('.project-meta h3').textContent = project.name;
  featured.querySelector('.project-meta p').textContent = project.category;
  featured.querySelector('.project-tags span').textContent = project.tag;
  featured.querySelector('[data-project]').dataset.project = project.name;
  projectPages.forEach((button, i) => {
    button.classList.toggle('active', i === currentProject);
    if (i === currentProject) button.setAttribute('aria-current', 'true');
    else button.removeAttribute('aria-current');
  });
  document.querySelector('.project-announcement').textContent = `Projeto ${currentProject + 1} de ${projectDirections.length}: ${project.name}`;
}
document.querySelector('.project-prev').addEventListener('click', () => showProject(currentProject - 1));
document.querySelector('.project-next').addEventListener('click', () => showProject(currentProject + 1));
projectPages.forEach((button, index) => button.addEventListener('click', () => showProject(index)));
