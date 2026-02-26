// THEME TOGGLE
const themeBtn = document.getElementById('theme-toggle');
const root = document.documentElement;
const saved = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', saved);
themeBtn.innerHTML = saved === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeBtn.innerHTML = next === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 50
    ? (root.getAttribute('data-theme') === 'light' ? 'rgba(245,245,250,0.98)' : 'rgba(15,15,19,0.98)')
    : '';
});

// TYPED EFFECT
const roles = ['Ing. de Sistemas', 'Desarrollador Web', 'Full Stack Dev', 'Problem Solver'];
let ri = 0, ci = 0, del = false;
const typedEl = document.getElementById('typed');
function typeEffect() {
  const cur = roles[ri];
  typedEl.textContent = del ? cur.slice(0, --ci) : cur.slice(0, ++ci);
  if (!del && ci === cur.length) { del = true; setTimeout(typeEffect, 1800); return; }
  if (del && ci === 0)           { del = false; ri = (ri + 1) % roles.length; }
  setTimeout(typeEffect, del ? 55 : 95);
}
typeEffect();

// SKILL BARS
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.style.width = e.target.dataset.width + '%'; skillObserver.unobserve(e.target); } });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-fill').forEach(el => skillObserver.observe(el));

// COUNTERS
function animateCounter(el) {
  const t = parseInt(el.dataset.target) || 0;
  if (!t) { el.textContent = '?'; return; }
  let c = 0; const step = Math.max(1, Math.ceil(t / 60));
  const timer = setInterval(() => { c = Math.min(c + step, t); el.textContent = c + '+'; if (c >= t) clearInterval(timer); }, 25);
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); cntObs.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number').forEach(el => cntObs.observe(el));

// PROJECT FILTER
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(c => c.classList.toggle('hidden', f !== 'all' && c.dataset.category !== f));
  });
});

// SCROLL TOP
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => scrollTopBtn.classList.toggle('visible', window.scrollY > 400));
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ACTIVE NAV
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) navAnchors.forEach(a => a.classList.toggle('active-nav', a.getAttribute('href') === '#' + e.target.id)); });
}, { threshold: 0.4 });
sections.forEach(s => secObs.observe(s));

// FORM FEEDBACK
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', () => {
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje enviado!';
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje'; btn.disabled = false; }, 5000);
  });
}

// FADE IN
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; } });
}, { threshold: 0.1 });
document.querySelectorAll('.project-card,.cert-card,.stat-card,.skill-group,.soft-card,.edu-item').forEach(el => {
  el.style.opacity = '0'; el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObs.observe(el);
});
