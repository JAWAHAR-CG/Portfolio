/* ============================================================
   JAWAHAR V — PORTFOLIO JAVASCRIPT
   script.js
   ============================================================ */

/* ── SCROLL PROGRESS BAR ── */
function updateProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  const total = document.body.scrollHeight - window.innerHeight;
  if (total > 0) bar.style.width = ((window.scrollY / total) * 100) + '%';
}

/* ── NAVBAR SCROLL SHADOW + ACTIVE LINKS ── */
function updateNavbar() {
  const navbar   = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!navbar) return;

  navbar.classList.toggle('scrolled', window.scrollY > 20);

  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

/* ── FADE-UP ANIMATIONS ── */
const fadeObserver = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

function initFadeAnimations() {
  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
  // Hero visible immediately — no delay
  document.querySelectorAll('.hero .fade-up').forEach(el => el.classList.add('visible'));
}

/* ── HAMBURGER MENU ── */
function initHamburger() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobOverlay = document.getElementById('mob-overlay');
  const mobLinks   = document.querySelectorAll('.mob-link, .mob-cta');
  if (!hamburger || !mobileMenu) return null;

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (mobOverlay) mobOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    if (mobOverlay) mobOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  hamburger.addEventListener('click', () =>
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu()
  );
  if (mobOverlay) mobOverlay.addEventListener('click', closeMenu);
  mobLinks.forEach(l => l.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 840) closeMenu(); }, { passive: true });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  return closeMenu;
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll(closeMenu) {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
        if (closeMenu) closeMenu();
      }
    });
  });
}

/* ── CONTACT FORM (EmailJS) ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Initialise EmailJS public key
  if (typeof emailjs !== 'undefined') {
    emailjs.init('nnVecxE2BxSVp-sRT');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn  = document.getElementById('submit-btn');
    const orig = btn.textContent;

    // Collect values
    const nameInput    = form.querySelector('input[name="from_name"], input[type="text"]:nth-of-type(1)');
    const emailInput   = form.querySelector('input[name="from_email"], input[type="email"]');
    const subjectInput = form.querySelector('input[name="subject"], input[type="text"]:nth-of-type(2)');
    const msgInput     = form.querySelector('textarea');

    const templateParams = {
      from_name:  nameInput  ? nameInput.value.trim()    : '',
      from_email: emailInput ? emailInput.value.trim()   : '',
      subject:    subjectInput ? subjectInput.value.trim() : '(no subject)',
      message:    msgInput   ? msgInput.value.trim()     : '',
      to_email:   'jawaharv2001@gmail.com'
    };

    // Validate
    if (!templateParams.from_name || !templateParams.from_email || !templateParams.message) {
      alert('Please fill in your name, email, and message.');
      return;
    }

    btn.textContent = 'Sending…';
    btn.disabled = true;

    if (typeof emailjs === 'undefined') {
      console.error('EmailJS SDK not loaded.');
      btn.textContent = '✗ Failed — Try Again';
      btn.style.background = 'linear-gradient(135deg,#dc2626,#b91c1c)';
      btn.disabled = false;
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3000);
      return;
    }

    emailjs.send('service_kgeyoju', 'template_p9uidgr', templateParams)
      .then(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg,#16a34a,#15803d)';
        form.reset();
        setTimeout(() => {
          btn.textContent = orig;
          btn.disabled = false;
          btn.style.background = '';
        }, 3000);
      })
      .catch(err => {
        console.error('EmailJS send error:', err);
        btn.textContent = '✗ Failed — Try Again';
        btn.style.background = 'linear-gradient(135deg,#dc2626,#b91c1c)';
        btn.disabled = false;
        setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3000);
      });
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initFadeAnimations();
  const closeMenu = initHamburger();
  initSmoothScroll(closeMenu);

  window.addEventListener('scroll', () => {
    updateProgressBar();
    updateNavbar();
  }, { passive: true });

  initContactForm();
});
