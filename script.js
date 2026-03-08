/* ============================================================
   JAWAHAR V — PORTFOLIO JAVASCRIPT
   Fully Responsive Version with Hamburger Menu
   ============================================================ */

/* ── SCROLL PROGRESS BAR ── */
const progressBar = document.getElementById('progress-bar');

function updateProgressBar() {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  if (total > 0) {
    progressBar.style.width = ((scrolled / total) * 100) + '%';
  }
}

/* ── NAVBAR SCROLL SHADOW + ACTIVE LINKS ── */
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateNavbar() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  let current = '';
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - navH - 20) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ── HAMBURGER MENU ── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
const mobOverlay  = document.getElementById('mob-overlay');
const mobLinks    = document.querySelectorAll('.mob-link, .mob-cta');

function closeMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  mobOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function openMenu() {
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  mobOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function toggleMenu() {
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
}

/* ── FADE-UP SCROLL ANIMATIONS ── */
const fadeObserver = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

function initFadeAnimations() {
  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
  // Trigger hero immediately
  setTimeout(() => {
    document.querySelectorAll('.hero .fade-up').forEach(el => el.classList.add('visible'));
  }, 80);
}

/* ── SMOOTH SCROLL (offset for fixed nav) ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
      closeMenu(); // also closes mobile menu when a link is clicked
    });
  });
}

/* ── CONTACT FORM ── */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const orig = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#16a34a,#15803d)';
    e.target.reset();
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  }, 1200);
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initFadeAnimations();
  initSmoothScroll();

  /* Scroll events */
  window.addEventListener('scroll', () => {
    updateProgressBar();
    updateNavbar();
  }, { passive: true });

  /* Hamburger */
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  /* Close on overlay click */
  if (mobOverlay) {
    mobOverlay.addEventListener('click', closeMenu);
  }

  /* Close on mobile link click */
  mobLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* Close on resize to desktop */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 840) closeMenu();
  }, { passive: true });

  /* Escape key closes menu */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  /* Form */
  const form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', handleFormSubmit);
});
