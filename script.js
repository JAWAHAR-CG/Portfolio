/* ============================================================
   JAWAHAR V — PORTFOLIO JAVASCRIPT
   script.js
   ============================================================ */

/* ── SCROLL PROGRESS BAR ── */
const progressBar = document.getElementById('progress-bar');

function updateProgressBar() {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  const percentage = (scrolled / total) * 100;
  progressBar.style.width = percentage + '%';
}

/* ── NAVBAR SCROLL SHADOW + ACTIVE LINKS ── */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateNavbar() {
  // Toggle shadow on scroll
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Highlight active nav link based on scroll position
  let currentSection = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === '#' + currentSection
    );
  });
}

/* ── SCROLL ANIMATIONS (FADE UP) ── */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
);

function initFadeAnimations() {
  const fadeElements = document.querySelectorAll('.fade-up');
  fadeElements.forEach(el => fadeObserver.observe(el));

  // Trigger hero section immediately without waiting for scroll
  setTimeout(() => {
    document.querySelectorAll('.hero .fade-up').forEach(el => {
      el.classList.add('visible');
    });
  }, 80);
}

/* ── CONTACT FORM ── */
function handleFormSubmit(event) {
  event.preventDefault();

  const submitBtn = document.getElementById('submit-btn');
  const originalText = submitBtn.textContent;

  // Loading state
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Simulate sending (replace with real API call if needed)
  setTimeout(() => {
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.background = '#16a34a';
    event.target.reset();

    // Reset button after 3 seconds
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.background = '';
    }, 3000);
  }, 1200);
}

/* ── SMOOTH SCROLL FOR NAV LINKS ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── HAMBURGER MENU TOGGLE ── */
function initHamburger() {
  const hamburger = document.getElementById('nav-hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a nav link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initFadeAnimations();
  initSmoothScroll();
  initHamburger();

  // Attach scroll listeners
  window.addEventListener('scroll', () => {
    updateProgressBar();
    updateNavbar();
  }, { passive: true });

  // Attach form submit
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
});
