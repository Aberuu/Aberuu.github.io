import { gsap, ScrollTrigger } from '../lib/gsap';

export function animateHero() {
  const tl = gsap.timeline({ delay: 0.5 });

  tl.to('.hero-line-inner', {
    y: 0,
    opacity: 1,
    duration: 1.2,
    ease: 'power3.out',
    stagger: 0.12
  });

  tl.fromTo('.hero-scroll',
    { opacity: 0 },
    { opacity: 1, duration: 0.8, ease: 'power2.out' },
    '-=0.4'
  );

  gsap.to('.hero-scroll-line', {
    scaleX: 0,
    duration: 2,
    ease: 'power1.inOut',
    repeat: -1,
    transformOrigin: 'left'
  });
}

export function animateFeaturedCards() {
  const cards = gsap.utils.toArray('.featured-card');

  cards.forEach((card) => {
    const img = card.querySelector('img');
    const overlay = card.querySelector('.featured-card-overlay');
    const desc = card.querySelector('.featured-card-desc');

    card.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.05, duration: 0.8, ease: 'power2.out' });
      gsap.to(overlay, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      gsap.to(desc, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.1 });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, duration: 0.8, ease: 'power2.out' });
      gsap.to(overlay, { opacity: 0, duration: 0.4, ease: 'power2.out' });
      gsap.to(desc, { y: 20, opacity: 0, duration: 0.3, ease: 'power2.out' });
    });
  });
}

export function animateReveal(selector = '.reveal') {
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.fromTo(el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

export function animateProcess() {
  const steps = gsap.utils.toArray('.process-step');

  ScrollTrigger.create({
    trigger: '.process-timeline',
    start: 'top 60%',
    end: 'bottom 40%',
    onUpdate: (self) => {
      const progress = self.progress;
      gsap.set('.process-line-fill', { scaleY: progress, transformOrigin: 'top' });

      steps.forEach((step, i) => {
        const threshold = (i + 1) / steps.length;
        step.classList.toggle('is-active', progress >= threshold * 0.85);
      });
    }
  });
}

export function animateHorizontalTestimonials() {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;

  const totalWidth = track.scrollWidth;
  const viewportWidth = window.innerWidth;
  const maxScroll = -(totalWidth - viewportWidth + 64);

  gsap.to(track, {
    x: maxScroll,
    ease: 'none',
    scrollTrigger: {
      trigger: '.testimonials-section',
      start: 'top 0%',
      end: () => `+=${totalWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true
    }
  });
}

export function animateSplitLines() {
  gsap.utils.toArray('.split-line').forEach((el) => {
    const children = el.children;

    gsap.fromTo(children,
      { y: '100%', opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

export function animateParallaxImages() {
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.15;

    gsap.fromTo(el,
      { y: 0 },
      {
        y: () => -(el.offsetHeight * speed),
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      }
    );
  });
}

export function animateStaggerReveal() {
  gsap.utils.toArray('.stagger-group').forEach((group) => {
    const children = group.children;

    gsap.fromTo(children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: group,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

export function animateContactCTA() {
  const cta = document.querySelector('.contact-cta');
  if (!cta) return;

  cta.addEventListener('mouseenter', () => {
    gsap.to(cta, {
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out'
    });
  });

  cta.addEventListener('mouseleave', () => {
    gsap.to(cta, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
}

export function initAllAnimations() {
  animateHero();
  animateFeaturedCards();
  animateReveal();
  animateProcess();
  animateHorizontalTestimonials();
  animateSplitLines();
  animateParallaxImages();
  animateStaggerReveal();
  animateContactCTA();
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
