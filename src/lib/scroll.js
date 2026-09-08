import { Lenis } from './lenis';
import { ScrollTrigger } from './gsap';

export function setupSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
  });

  ScrollTrigger.addEventListener('refresh', () => lenis.resize());

  let rafId;
  const raf = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  const onAnchorClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href?.startsWith('#') || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, {
      offset: -72,
      duration: 2.2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
  };

  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach((anchor) => anchor.addEventListener('click', onAnchorClick));

  const onResize = () => ScrollTrigger.refresh();
  window.addEventListener('resize', onResize);

  return {
    lenis,
    destroy() {
      cancelAnimationFrame(rafId);
      anchors.forEach((anchor) => anchor.removeEventListener('click', onAnchorClick));
      window.removeEventListener('resize', onResize);
      lenis.destroy();
      ScrollTrigger.scrollerProxy(document.documentElement, {});
    },
  };
}
