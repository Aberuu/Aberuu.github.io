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

  tl.fromTo(word, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
    .fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, '-=0.2')
    .to(word, { y: -30, opacity: 0, duration: 0.5, ease: 'power3.in' }, '+=0.15')
    .to(loader, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.1');

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

<<<<<<< HEAD
  // ── Poster wall entrance: cells slide in as one continuous sheet ──
  gsap.fromTo('.hero-posterwall__cell',
    { opacity: 0, x: 60 },
    { opacity: 1, x: 0, duration: 1.4, ease: expo, stagger: 0.06, delay: 0.1 },
  );

  // ── Overlay copy entrance ──
  const tl = gsap.timeline({ delay: 0.35 });

  tl.fromTo('.hero-posterwall__kicker',
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.8, ease },
  );

  tl.fromTo('.hero-posterwall__title',
    { opacity: 0, y: 90, clipPath: 'inset(0 0 100% 0)' },
    { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.15, ease: expo },
    '-=0.5',
  );

  tl.fromTo('.hero-posterwall__subtitle',
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.9, ease },
    '-=0.6',
  );

  tl.fromTo('.hero-posterwall__cta',
    { opacity: 0, y: 20, scale: 0.94 },
    { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
    '-=0.45',
  );

  tl.fromTo('.hero-posterwall__meta',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease },
    '-=0.4',
  );

  const hero = document.querySelector('.hero-posterwall');
  const track = document.querySelector('[data-hero-track]');
  if (hero && track) {
    // Horizontal poster-wall marquee scrubbed by vertical scroll. The track
    // holds the poster set twice, so a full set-width of travel loops seamlessly.
    gsap.to(track, {
      x: () => -Math.max(0, track.scrollWidth / 2 - hero.clientWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });

    // Shade eases back as you scroll, revealing the raw poster wall
    gsap.to('.hero-posterwall__shade', {
      opacity: 0.35,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });

    gsap.to('.hero-posterwall__overlay', {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });

    gsap.to(hero, {
      minHeight: '78vh',
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });
=======
  const tl = gsap.timeline({ delay: 0.2 });

  // 1) Outer double-border card zoom & fade in
  tl.fromTo('.hero-card-outer',
    { opacity: 0, scale: 0.94, y: 20 },
    { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: expo },
  );

  // 2) Hero title reveals smoothly
  tl.fromTo('.hero-title',
    { opacity: 0, y: 35 },
    { opacity: 1, y: 0, duration: 0.9, ease },
    '-=0.7',
  );

  // 3) Subtitle fades up
  tl.fromTo('.hero-desc',
    { opacity: 0, y: 20 },
    { opacity: 0.7, y: 0, duration: 0.8, ease },
    '-=0.6',
  );

  // 4) Status badge pops in
  tl.fromTo('.hero-badge',
    { opacity: 0, scale: 0.85, y: 15 },
    { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.8)' },
    '-=0.5',
  );

  // 5) Liquid button pops in
  tl.fromTo('.hero-button',
    { opacity: 0, y: 20, scale: 0.92 },
    { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.5)' },
    '-=0.4',
  );

  // Scroll scrub parallax effect
  const hero = document.querySelector('.hero-editorial');
  if (hero) {
    const card = hero.querySelector('.hero-card-outer');
    if (card) {
      gsap.to(card, {
        scale: 0.92,
        y: -50,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }
>>>>>>> 7b6512d (Release 7 (Hero Revamp))
  }
}

function animateReveals() {
  gsap.utils.toArray('.reveal-item').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 50, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
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

<<<<<<< HEAD
  const hero = document.querySelector('.hero-posterwall');
=======
  const hero = document.querySelector('.hero-editorial');
>>>>>>> 7b6512d (Release 7 (Hero Revamp))

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
