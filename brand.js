/* ============================================
   DR. NIHAL AFFAN - BRAND PAGE SCRIPTS
   ============================================ */

/* ── Nav scroll effect ─────────────────────── */
const brandNav = document.querySelector('.brand-nav');
if (brandNav) {
  window.addEventListener('scroll', () => {
    brandNav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ── Active nav highlight ──────────────────── */
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.brand-nav .nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) link.classList.add('nav-active');
  });
})();

/* ── Hero entrance animations ──────────────── */
function animateHero() {
  const els = [
    { sel: '.hero-tagline', delay: 300 },
    { sel: '.hero-title', delay: 500 },
    { sel: '.hero-cursive', delay: 700 },
    { sel: '.hero-desc', delay: 900 },
    { sel: '.hero-cta-group', delay: 1100 },
    { sel: '.hero-scroll-hint', delay: 1400 }
  ];
  els.forEach(({ sel, delay }) => {
    const el = document.querySelector(sel);
    if (el) {
      setTimeout(() => {
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    }
  });
}
animateHero();

/* ── Scroll reveal (reuse shared pattern) ──── */
const brandRevealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      brandRevealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => brandRevealObs.observe(el));

/* ── Animated counters ─────────────────────── */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 2000;
  const steps = 60;
  const inc = target / steps;
  let current = 0, step = 0;
  const timer = setInterval(() => {
    step++;
    current += inc;
    if (step >= steps) { clearInterval(timer); current = target; }
    el.textContent = prefix + (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
  }, duration / steps);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = '1';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

/* ── Scroll-to-top ─────────────────────────── */
const scrollBtn = document.getElementById('scrollTopBtn');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 350);
  }, { passive: true });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Swiper Gallery init ───────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Swiper !== 'undefined') {
    const gallerySwiper = new Swiper('.swiper-gallery', {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 30,
      speed: 800,
      grabCursor: true,
      loop: true,
      effect: 'slide',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      on: {
        slideChange: function () {
          const counter = document.querySelector('.gallery-counter');
          if (counter) {
            const curr = document.querySelector('.gallery-counter .current');
            if (curr) curr.textContent = String(this.realIndex + 1).padStart(2, '0');
          }
        }
      }
    });
  }
});

/* ── Parallax float on mouse (hero only) ──── */
(function () {
  const hero = document.querySelector('.hero-brand');
  if (!hero) return;
  const particles = hero.querySelector('.hero-particles');
  if (!particles) return;
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    particles.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
  });
})();

/* ── Section parallax on scroll ────────────── */
(function () {
  const sections = document.querySelectorAll('.about-brand, .skincare-section, .gallery-section');
  if (!sections.length) return;
  
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        sections.forEach(sec => {
          const rect = sec.getBoundingClientRect();
          const visible = rect.top < window.innerHeight && rect.bottom > 0;
          if (visible) {
            const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            const glow = sec.querySelector('.about-glow, .contact-glow');
            if (glow) {
              glow.style.transform = `translateY(${(progress - 0.5) * 40}px)`;
            }
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();
