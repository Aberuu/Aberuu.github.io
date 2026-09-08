import { gsap, ScrollTrigger } from './lib/gsap';

export function animateLoader(onComplete) {
  const loader = document.querySelector('.loader');
  const word = document.querySelector('.loader-word');
  const fill = document.querySelector('.loader-fill');

  if (!loader) {
    onComplete?.();
    return null;
  }

  document.body.style.overflow = 'hidden';

  const tl = gsap.timeline({
    onComplete: () => {
      loader.classList.add('is-done');
      document.body.style.overflow = '';
      document.body.classList.add('is-ready');
      onComplete?.();
    },
  });

  tl.fromTo(word, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
    .fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 1.0, ease: 'power2.inOut' }, '-=0.2')
    .to(word, { y: -25, opacity: 0, duration: 0.4, ease: 'power3.in' }, '+=0.1')
    .to(loader, { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, '-=0.1');

  return tl;
}

export function initAllAnimations(root = document) {
  const cleanups = [];

  const ctx = gsap.context(() => {
    animateHero();
    animateReveals();
    animateProcessStack();
    animateWorkCards(cleanups);
    animateFooterSweep();
    animateHeader();
    animateEngineeringGrid();
  }, root);

  return () => {
    cleanups.forEach((fn) => fn());
    ctx.revert();
  };
}

function animateHero() {
  const ease = 'power3.out';
  const expo = 'expo.out';

  const tl = gsap.timeline({ delay: 0.1 });

  // 1) Card zooms & fades in from below
  tl.fromTo('.hero-card-outer',
    { opacity: 0, scale: 0.95, y: 60 },
    { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: expo },
  );

  // 2) Top bar drops down
  tl.fromTo('.hero-card-top',
    { opacity: 0, y: -14 },
    { opacity: 1, y: 0, duration: 0.7, ease },
    '-=0.75',
  );

  // 3) Eyebrow slides in from the left
  tl.fromTo('.hero-eyebrow',
    { opacity: 0, x: -18 },
    { opacity: 1, x: 0, duration: 0.6, ease },
    '-=0.5',
  );

  // 4) Big display title wipes up with clip reveal
  tl.fromTo('.hero-title',
    { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' },
    { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.95, ease: 'power4.out' },
    '-=0.4',
  );

  // 5) Name settles in with letter-spacing easing
  tl.fromTo('.hero-name',
    { opacity: 0, letterSpacing: '0.35em' },
    { opacity: 1, letterSpacing: '-0.02em', duration: 0.8, ease },
    '-=0.45',
  );

  // 6) Description fades up
  tl.fromTo('.hero-desc',
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.7, ease },
    '-=0.55',
  );

  // 7) Badge + button rise together
  tl.fromTo('.hero-meta',
    { opacity: 0, y: 22 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' },
    '-=0.45',
  );

  // 8) Scroll hint fades in last
  tl.fromTo('.hero-scroll-hint',
    { opacity: 0 },
    { opacity: 1, duration: 0.9, ease },
    '+=0.1',
  );

  // Scroll scrub parallax effect
  const hero = document.querySelector('.hero-editorial');
  if (hero) {
    const card = hero.querySelector('.hero-card-outer');
    if (card) {
      gsap.fromTo(card,
        { y: 0 },
        {
          y: -200,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }

    const watermark = hero.querySelector('.hero-watermark');
    if (watermark) {
      gsap.fromTo(
        watermark,
        { y: 0 },
        {
          y: -90,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }
  }
}

function animateReveals() {
  const items = gsap.utils.toArray('.reveal-item');
  if (!items.length) return;

  gsap.fromTo(
    items,
    { y: 40, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.04,
      scrollTrigger: {
        trigger: items[0],
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
    }
  );
}

function animateProcessStack() {
  const panels = gsap.utils.toArray('[data-process-panel]');
  const section = document.querySelector('.process-stack');
  if (!panels.length || window.innerWidth < 900) return;

  // Pin panels with stacking effect
  panels.forEach((panel, i) => {
    if (i === panels.length - 1) return;

    ScrollTrigger.create({
      trigger: panel,
      start: 'top top',
      end: '+=50%',
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });
  });

  // Progress rail animation
  const fill = section?.querySelector('.process-progress__fill');
  const dots = section?.querySelectorAll('.process-progress__dot');

  if (fill && section) {
    gsap.to(fill, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.process-panels',
        start: 'top 130%',
        end: 'bottom 100%',
        scrub: 0.2,
      },
    });
  }

  if (dots?.length) {
    panels.forEach((panel, i) => {
      if (!dots[i]) return;
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => dots[i]?.classList.add('is-active'),
        onLeaveBack: () => dots[i]?.classList.remove('is-active'),
      });
    });
  }
}

function animateWorkCards(cleanups) {
  gsap.utils.toArray('[data-work-card]').forEach((card) => {
    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        x: x * 8,
        y: y * 6,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const onLeave = () => {
      gsap.to(card, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' });
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    cleanups.push(() => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    });
  });
}

function animateFooterSweep() {
  gsap.to('.footer-sweep', {
    scaleX: 1,
    duration: 1.5,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.site-footer',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
}

function animateHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const hero = document.querySelector('.hero-editorial');

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      header.classList.toggle('is-scrolled', self.scroll() > 50);
    },
  });

  if (hero) {
    header.classList.add('is-hero');

    ScrollTrigger.create({
      trigger: hero,
      start: 'bottom 72px',
      end: 'bottom top',
      onEnter: () => header.classList.remove('is-hero'),
      onLeaveBack: () => header.classList.add('is-hero'),
    });
  }

  const footer = document.querySelector('.site-footer');
  if (footer) {
    ScrollTrigger.create({
      trigger: footer,
      start: 'top 72px',
      onEnter: () => header.classList.add('is-dark'),
      onLeaveBack: () => header.classList.remove('is-dark'),
    });
  }
}

function animateEngineeringGrid() {
  const grid = document.querySelector('.engineering-grid-bg');
  if (!grid) return;

  gsap.to(grid, {
    backgroundPosition: '48px 48px',
    ease: 'none',
    scrollTrigger: {
      trigger: '#engineering',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
