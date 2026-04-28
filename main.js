// ─── NAV: scroll + hamburger ────────────────────────────────────
const navbar   = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMobile = document.getElementById('nav-mobile');

function positionMobileMenu() {
  navMobile.style.top = navbar.offsetHeight + 'px';
}
positionMobileMenu();
window.addEventListener('resize', positionMobileMenu);

navToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  if (window.scrollY > 80 && navMobile.classList.contains('open')) {
    navMobile.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});


// ─── GSAP + ScrollTrigger ────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// Defaults compartidos para todas las animaciones de scroll
const st = (trigger, start = 'top 82%') => ({
  trigger, start, once: true
});
const cp = 'transform,opacity';


// ─── HERO: entrada en secuencia ──────────────────────────────────
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: cp } });

heroTl
  .from('.hero-origin',   { opacity: 0, y: -16, duration: 0.5 })
  .from('.hero h1',       { opacity: 0, y: 36,  duration: 0.75 }, '-=0.2')
  .from('.hero-sub',      { opacity: 0, y: 24,  duration: 0.6  }, '-=0.35')
  .from('.hero-actions',  { opacity: 0, y: 20,  duration: 0.5  }, '-=0.3')
  .from('.hero-divider',  { scaleX: 0, transformOrigin: 'left', duration: 0.6, clearProps: 'transform' }, '-=0.2')
  .from('.hero-stat',     { opacity: 0, y: 16,  duration: 0.5, stagger: 0.15 }, '-=0.3');


// ─── COBERTURA ───────────────────────────────────────────────────
gsap.from('.cob-header .section-kicker, .cob-header .section-title, .cob-tagline', {
  scrollTrigger: st('.cobertura', 'top 80%'),
  opacity: 0, y: 22, duration: 0.7, stagger: 0.13, ease: 'power3.out', clearProps: cp
});

gsap.from('.map-wrapper', {
  scrollTrigger: st('.cobertura', 'top 85%'),
  opacity: 0, duration: 0.9, ease: 'power2.out', clearProps: 'opacity'
});

// Líneas del mapa
gsap.utils.toArray('.map-linea').forEach((line, i) => {
  const length = line.getTotalLength ? line.getTotalLength() : 400;
  gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
  gsap.to(line, {
    scrollTrigger: st('.cobertura', 'top 80%'),
    strokeDashoffset: 0,
    duration: 1.1,
    delay: 0.5 + i * 0.09,
    ease: 'power2.out'
  });
});

gsap.from('.map-ciudad circle', {
  scrollTrigger: st('.cobertura', 'top 80%'),
  scale: 0, transformOrigin: 'center',
  duration: 0.3, stagger: 0.06, delay: 0.9,
  ease: 'back.out(2.5)', clearProps: 'transform'
});

gsap.from('.map-ciudad text', {
  scrollTrigger: st('.cobertura', 'top 80%'),
  opacity: 0, duration: 0.3, stagger: 0.06, delay: 1.1,
  ease: 'power2.out', clearProps: 'opacity'
});


// ─── PROCESO HORIZONTAL ──────────────────────────────────────────
gsap.from('.proceso-header .section-kicker, .proceso-header .section-title', {
  scrollTrigger: st('.proceso-section', 'top 78%'),
  opacity: 0, y: 28, duration: 0.7, stagger: 0.14, ease: 'power3.out', clearProps: cp
});

gsap.from('.paso-h', {
  scrollTrigger: st('.proceso-flow'),
  opacity: 0, y: 36, duration: 0.6, stagger: 0.13, ease: 'power3.out', clearProps: cp
});


// ─── GALERÍA ─────────────────────────────────────────────────────
gsap.from('.galeria-header > div, .galeria-ver-mas', {
  scrollTrigger: st('.galeria', 'top 78%'),
  opacity: 0, y: 24, duration: 0.65, stagger: 0.12, ease: 'power3.out', clearProps: cp
});

gsap.from('.gcard:not(.gcard--extra)', {
  scrollTrigger: st('.galeria-grid', 'top 85%'),
  opacity: 0, y: 30, duration: 0.55, stagger: 0.1, ease: 'power3.out', clearProps: cp
});


// ─── SERVICIOS: cards escalonadas ────────────────────────────────
gsap.from('.servicios .section-kicker, .servicios .section-title, .servicios .section-sub', {
  scrollTrigger: st('.servicios', 'top 78%'),
  opacity: 0, y: 30, duration: 0.7, stagger: 0.15, ease: 'power3.out', clearProps: cp
});

gsap.from('.scard', {
  scrollTrigger: st('.servicios-grid'),
  opacity: 0, y: 50, duration: 0.65, stagger: 0.12, ease: 'power3.out', clearProps: cp
});


// ─── SEGURIDAD ───────────────────────────────────────────────────
gsap.from('.seguridad .section-kicker, .seguridad .section-title, .seguridad .section-sub', {
  scrollTrigger: st('.seguridad', 'top 78%'),
  opacity: 0, y: 30, duration: 0.7, stagger: 0.15, ease: 'power3.out', clearProps: cp
});

gsap.from('.seg-item', {
  scrollTrigger: st('.seg-inner', 'top 80%'),
  opacity: 0, x: -30, duration: 0.55, stagger: 0.15, ease: 'power3.out', clearProps: cp
});

gsap.from('.exp-block', {
  scrollTrigger: st('.exp-block'),
  opacity: 0, scale: 0.92, duration: 0.7, ease: 'power3.out', clearProps: cp
});

// Contador: 0 → 5
const expNumEl = document.querySelector('.exp-num');
if (expNumEl) {
  ScrollTrigger.create({
    trigger: '.exp-block',
    start: 'top 82%',
    once: true,
    onEnter: () => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 5,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          expNumEl.childNodes[0].nodeValue = Math.round(obj.val);
        }
      });
    }
  });
}

gsap.from('.seg-info-card', {
  scrollTrigger: st('.seg-info-cards', 'top 85%'),
  opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power3.out', clearProps: cp
});


// ─── CTA ─────────────────────────────────────────────────────────
gsap.from('.cta-band h2, .cta-band p', {
  scrollTrigger: st('.cta-band', 'top 95%'),
  opacity: 0, y: 30, duration: 0.6, stagger: 0.15, ease: 'power3.out', clearProps: cp
});


// ─── LIGHTBOX ────────────────────────────────────────────────────
(function () {
  const overlay  = document.getElementById('lb-overlay');
  const lbImg    = document.getElementById('lb-img');
  const lbClose  = document.getElementById('lb-close');
  const lbPrev   = document.getElementById('lb-prev');
  const lbNext   = document.getElementById('lb-next');
  const lbCounter = document.getElementById('lb-counter');

  // Todas las imágenes de la galería (incluidas las ocultas)
  const getImages = () => Array.from(document.querySelectorAll('.galeria-grid .gcard img'));

  let current = 0;

  function open(index) {
    const imgs = getImages();
    current = index;
    lbImg.src = imgs[current].src;
    lbImg.alt = imgs[current].alt;
    updateNav(imgs.length);
    overlay.removeAttribute('hidden');
    requestAnimationFrame(() => overlay.classList.add('lb-visible'));
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function close() {
    overlay.classList.remove('lb-visible');
    overlay.addEventListener('transitionend', () => {
      overlay.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }, { once: true });
  }

  function navigate(dir) {
    const imgs = getImages();
    current = (current + dir + imgs.length) % imgs.length;
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = imgs[current].src;
      lbImg.alt = imgs[current].alt;
      lbImg.style.opacity = '1';
      updateNav(imgs.length);
    }, 150);
  }

  function updateNav(total) {
    lbCounter.textContent = `${current + 1} / ${total}`;
    lbPrev.disabled = false;
    lbNext.disabled = false;
  }

  // Clic en cualquier imagen de la galería
  document.getElementById('galeria-grid').addEventListener('click', e => {
    const img = e.target.closest('.gcard img');
    if (!img) return;
    const imgs = getImages();
    open(imgs.indexOf(img));
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', () => navigate(-1));
  lbNext.addEventListener('click', () => navigate(1));

  // Clic fuera de la imagen
  overlay.addEventListener('click', e => {
    if (e.target === overlay) close();
  });

  // Teclado
  document.addEventListener('keydown', e => {
    if (overlay.hasAttribute('hidden')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Transición suave de opacidad en la imagen al cambiar
  lbImg.style.transition = 'opacity 0.15s ease';
})();


