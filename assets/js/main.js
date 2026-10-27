const root = document.documentElement;
const themeButton = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem('theme', theme);
  themeButton.innerHTML = theme === 'dark'
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  themeButton.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
}

setTheme(savedTheme);
themeButton.addEventListener('click', () => {
  setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

const navbar = document.getElementById('navbar');
const scrollTopButton = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 24);
  scrollTopButton.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

scrollTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const roles = ['Ing. de Sistemas', 'Desarrollador Web', 'Full Stack Dev', 'Problem Solver'];
const typedElement = document.getElementById('typed');
let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
  const role = roles[roleIndex];
  characterIndex += deleting ? -1 : 1;
  typedElement.textContent = role.slice(0, characterIndex);
  if (!deleting && characterIndex === role.length) {
    deleting = true;
    setTimeout(typeRole, 1800);
    return;
  }
  if (deleting && characterIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeRole, deleting ? 55 : 95);
}

typeRole();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.filter-btn').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.project-card').forEach((card) => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-links a').forEach((link) => {
        link.classList.toggle('active-nav', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach((section) => sectionObserver.observe(section));
