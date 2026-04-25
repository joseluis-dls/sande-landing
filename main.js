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


// ─── HERO: entrada en secuencia ──────────────────────────────────
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTl
  .from('.hero-origin',   { opacity: 0, y: -16, duration: 0.5 })
  .from('.hero h1',       { opacity: 0, y: 36,  duration: 0.75 }, '-=0.2')
  .from('.hero-sub',      { opacity: 0, y: 24,  duration: 0.6  }, '-=0.35')
  .from('.hero-actions',  { opacity: 0, y: 20,  duration: 0.5  }, '-=0.3')
  .from('.hero-divider',  { scaleX: 0, transformOrigin: 'left', duration: 0.6 }, '-=0.2')
  .from('.hero-stat',     { opacity: 0, y: 16,  duration: 0.5, stagger: 0.15 }, '-=0.3');


// ─── COBERTURA ───────────────────────────────────────────────────
gsap.from('.cob-header .section-kicker, .cob-header .section-title, .cob-tagline', {
  scrollTrigger: { trigger: '.cobertura', start: 'top 80%' },
  opacity: 0, y: 22, duration: 0.7, stagger: 0.13, ease: 'power3.out'
});

// Mapa: fade al entrar
gsap.from('.map-wrapper', {
  scrollTrigger: { trigger: '.cobertura', start: 'top 85%' },
  opacity: 0, duration: 0.9, ease: 'power2.out'
});

// Líneas del mapa
gsap.utils.toArray('.map-linea').forEach((line, i) => {
  const length = line.getTotalLength ? line.getTotalLength() : 400;
  gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
  gsap.to(line, {
    scrollTrigger: { trigger: '.cobertura', start: 'top 80%' },
    strokeDashoffset: 0,
    duration: 1.1,
    delay: 0.5 + i * 0.09,
    ease: 'power2.out'
  });
});

// Puntos de ciudad
gsap.from('.map-ciudad circle', {
  scrollTrigger: { trigger: '.cobertura', start: 'top 80%' },
  scale: 0, transformOrigin: 'center',
  duration: 0.3, stagger: 0.06, delay: 0.9,
  ease: 'back.out(2.5)'
});

gsap.from('.map-ciudad text', {
  scrollTrigger: { trigger: '.cobertura', start: 'top 80%' },
  opacity: 0, duration: 0.3, stagger: 0.06, delay: 1.1,
  ease: 'power2.out'
});

// ─── PROCESO HORIZONTAL ──────────────────────────────────────────
gsap.from('.proceso-header .section-kicker, .proceso-header .section-title', {
  scrollTrigger: { trigger: '.proceso-section', start: 'top 78%' },
  opacity: 0, y: 28, duration: 0.7, stagger: 0.14, ease: 'power3.out'
});

gsap.from('.paso-h', {
  scrollTrigger: { trigger: '.proceso-flow', start: 'top 82%' },
  opacity: 0, y: 36, duration: 0.6, stagger: 0.13, ease: 'power3.out'
});


// ─── GALERÍA ─────────────────────────────────────────────────────
gsap.from('.galeria-header > div, .galeria-ver-mas', {
  scrollTrigger: { trigger: '.galeria', start: 'top 78%' },
  opacity: 0, y: 24, duration: 0.65, stagger: 0.12, ease: 'power3.out'
});

gsap.from('.gcard:not(.gcard--extra)', {
  scrollTrigger: { trigger: '.galeria-grid', start: 'top 85%' },
  opacity: 0, y: 30, duration: 0.55, stagger: 0.1, ease: 'power3.out'
});


// ─── SERVICIOS: cards escalonadas ────────────────────────────────
gsap.from('.servicios .section-kicker, .servicios .section-title, .servicios .section-sub', {
  scrollTrigger: { trigger: '.servicios', start: 'top 78%' },
  opacity: 0, y: 30, duration: 0.7, stagger: 0.15, ease: 'power3.out'
});

gsap.from('.scard', {
  scrollTrigger: { trigger: '.servicios-grid', start: 'top 82%' },
  opacity: 0, y: 50, duration: 0.65, stagger: 0.12, ease: 'power3.out'
});


// ─── SEGURIDAD ───────────────────────────────────────────────────
gsap.from('.seguridad .section-kicker, .seguridad .section-title, .seguridad .section-sub', {
  scrollTrigger: { trigger: '.seguridad', start: 'top 78%' },
  opacity: 0, y: 30, duration: 0.7, stagger: 0.15, ease: 'power3.out'
});

gsap.from('.seg-item', {
  scrollTrigger: { trigger: '.seg-inner', start: 'top 80%' },
  opacity: 0, x: -30, duration: 0.55, stagger: 0.15, ease: 'power3.out'
});

gsap.from('.exp-block', {
  scrollTrigger: { trigger: '.exp-block', start: 'top 82%' },
  opacity: 0, scale: 0.92, duration: 0.7, ease: 'power3.out'
});

// Contador: 0 → 5
const expNumEl = document.querySelector('.exp-num');
if (expNumEl) {
  const plusSpan = expNumEl.querySelector('span');
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
  scrollTrigger: { trigger: '.seg-info-cards', start: 'top 85%' },
  opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power3.out'
});


// ─── CTA ─────────────────────────────────────────────────────────
gsap.from('.cta-band h2, .cta-band p', {
  scrollTrigger: { trigger: '.cta-band', start: 'top 95%', once: true },
  opacity: 0, y: 30, duration: 0.6, stagger: 0.15, ease: 'power3.out'
});


// ─── GALERÍA: ver todas / ocultar ────────────────────────────────
const galeriaToggle = document.getElementById('galeria-toggle');
const galeriaGrid   = document.getElementById('galeria-grid');

if (galeriaToggle && galeriaGrid) {
  galeriaToggle.addEventListener('click', () => {
    const expanded = galeriaGrid.classList.toggle('expanded');
    galeriaToggle.setAttribute('aria-expanded', String(expanded));
    galeriaToggle.childNodes[0].nodeValue = expanded ? 'Ver menos ' : 'Ver todas las fotos ';

    if (expanded) {
      // Anima las tarjetas recién visibles
      gsap.from('.gcard--extra', {
        opacity: 0, y: 24, duration: 0.45, stagger: 0.07, ease: 'power3.out'
      });
    }
  });
}
