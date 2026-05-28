/* ═══════════════════════════════════════
   Ahmed Rami AlGhamdi — Portfolio JS
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll ── */
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── Scroll Reveal ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // stagger children if .stagger-group
        if (e.target.classList.contains('stagger-group')) {
          [...e.target.children].forEach((child, i) => {
            setTimeout(() => child.classList.add('visible'), i * 90);
          });
        } else {
          e.target.classList.add('visible');
        }
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.querySelectorAll('.stagger-group').forEach(el => {
    observer.observe(el);
    [...el.children].forEach(child => child.classList.add('reveal'));
  });

  /* ── Typed text ── */
  const phrases = [
    'Python & C Developer',
    'ML Engineer in Training',
    'Student @ Gifted Tech HS',
    'Builder & Problem Solver',
  ];
  let pi = 0, ci = 0, del = false;
  const el = document.getElementById('typed');
  if (el) {
    function tick() {
      const p = phrases[pi];
      el.textContent = del ? p.slice(0, --ci) : p.slice(0, ++ci);
      if (!del && ci === p.length) { del = true; setTimeout(tick, 1800); return; }
      if (del && ci === 0)        { del = false; pi = (pi + 1) % phrases.length; }
      setTimeout(tick, del ? 38 : 68);
    }
    setTimeout(tick, 800);
  }

  /* ── Contact form ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn-main');
      btn.innerHTML = '✓ &nbsp;Sent!';
      btn.style.background = 'var(--green)';
      btn.style.color = '#000';
      setTimeout(() => {
        btn.innerHTML = '&#8594; Send Message';
        btn.style.background = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    });
  }

  /* ── Smooth active nav ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
    navAs.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${cur}` ? 'var(--glow)' : '';
    });
  });

});
