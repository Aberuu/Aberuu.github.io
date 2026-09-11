import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const WebGLShader = lazy(() =>
  import('@/components/ui/web-gl-shader').then((m) => ({ default: m.WebGLShader }))
);
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import {
  ASCII_TITLE,
  ASCII_TL,
  ASCII_TR,
  ASCII_LEFT,
  ASCII_RIGHT,
  ASCII_BL,
  ASCII_BR,
  ASCII_BITS,
  buildAsciiWall,
} from '@/components/ui/ascii-art';

const WIPE_MS = 1400;
const WIPE_MS_MOBILE = 1200;
const AUTO_INTERVAL_MS = 8000;
const WIPE_COLORS = ['#39ff14', '#00b4ff'];
const { pow } = Math;

// easeOutExpo — the same ease used to pace the shader frontier.
const wipeEase = (p) => (p >= 1 ? 1 : 1 - pow(2, -10 * p));

const AsciiTokens = ({ lines }) =>
  lines.map((line, i) => (
    <span key={i} className="hero-ascii-line">
      {line.map((token, j) => (
        <span
          key={j}
          className={token.c ? `hero-ascii-t hero-ascii-t--${token.c}` : 'hero-ascii-t'}
        >
          {token.t}
        </span>
      ))}
      {'\n'}
    </span>
  ));

export default function Hero() {
  const [bgMode, setBgMode] = useState('glow');
  const [transition, setTransition] = useState('idle');
  const [wall, setWall] = useState([]);
  const [heroInView, setHeroInView] = useState(true);
  const busyRef = useRef(false);
  const heroRef = useRef(null);
  const modeRef = useRef('glow');
  const glowRef = useRef(null);
  const asciiRef = useRef(null);
  const wipeProgress = useRef({ current: 0 });

  const toggleBg = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    setTransition('wipe');
  }, []);

  const finishWipe = useCallback(() => {
    modeRef.current = modeRef.current === 'glow' ? 'ascii' : 'glow';
    setBgMode(modeRef.current);
    setTransition('idle');
    busyRef.current = false;
  }, []);

  useEffect(() => {
    const id = setInterval(toggleBg, AUTO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [toggleBg]);

  useEffect(() => {
    const updateTiles = () => {
      const cols = Math.ceil(window.innerWidth / 7) + 6;
      const rows = Math.ceil(window.innerHeight / 12) + 3;
      setWall(buildAsciiWall(cols, rows));
    };
    updateTiles();
    window.addEventListener('resize', updateTiles);
    return () => window.removeEventListener('resize', updateTiles);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (transition !== 'wipe') return undefined;

    const el = bgMode === 'glow' ? asciiRef.current : glowRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishWipe();
      return undefined;
    }

    const duration = window.innerWidth < 640 ? WIPE_MS_MOBILE : WIPE_MS;
    wipeProgress.current = 0;
    el.style.clipPath = 'inset(0 100% 0 0)';

    let raf = 0;
    const start = performance.now();
    const update = (ts) => {
      const raw = Math.min(1, (ts - start) / duration);
      const p = wipeEase(raw);
      wipeProgress.current = p;
      el.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
      if (raw < 1) {
        raf = requestAnimationFrame(update);
      } else {
        finishWipe();
      }
    };
    raf = requestAnimationFrame(update);

    const safety = setTimeout(() => {
      if (busyRef.current) finishWipe();
    }, duration + 250);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      if (el) el.style.clipPath = '';
    };
  }, [transition, bgMode, finishWipe]);

  const isAscii = bgMode === 'ascii';
  const isTransitioning = transition !== 'idle';

  const layerClass = (mode) => {
    const mod = mode === 'glow' ? 'hero-bg--glow' : 'hero-bg--ascii';
    if (transition === 'wipe') {
      const incoming = bgMode === 'glow' ? 'ascii' : 'glow';
      if (mode === incoming) return `hero-bg ${mod} wipe-in`;
      return `hero-bg ${mod}`;
    }
    if (bgMode === mode) return `hero-bg ${mod}`;
    return `hero-bg ${mod} dim-out`;
  };

  const glowLayerClass = layerClass('glow');
  const asciiLayerClass = layerClass('ascii');
  // Shader draws (a) the idle living-wave in glow mode, and (b) the wipe
  // frontier during transitions. It lives OUTSIDE the bg layers so it is never
  // clipped — no GPU tearing on mobile, no clip-path polygon anywhere.
  const shaderActive = isTransitioning || (heroInView && !isAscii);
  const shaderWave = !isTransitioning && !isAscii;
  const wipeDuration = (typeof window !== 'undefined' && window.innerWidth < 640) ? WIPE_MS_MOBILE : WIPE_MS;

  return (
    <section
      id="top"
      ref={heroRef}
      className="hero-editorial relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-24 sm:py-32"
      data-hero-section
    >
      <div ref={glowRef} className={glowLayerClass} aria-hidden="true">
        <span className="hero-watermark" aria-hidden="true">
          AGAPHE
        </span>
      </div>

      <div ref={asciiRef} className={asciiLayerClass} aria-hidden="true">
        <div className="hero-ascii">
          <div className="hero-ascii-wall">
            {wall.map((line, i) => (
              <span key={i}>{line}{'\n'}</span>
            ))}
          </div>
          <span className="hero-ascii-title">
            {ASCII_TITLE.map((line, i) => (
              <span key={i}>{line}{'\n'}</span>
            ))}
            <span className="hero-ascii-cursor">▍</span>
          </span>
          <span className="hero-ascii-panel hero-ascii-panel--tl"><AsciiTokens lines={ASCII_TL} /></span>
          <span className="hero-ascii-panel hero-ascii-panel--tr"><AsciiTokens lines={ASCII_TR} /></span>
          <span className="hero-ascii-panel hero-ascii-panel--left"><AsciiTokens lines={ASCII_LEFT} /></span>
          <span className="hero-ascii-panel hero-ascii-panel--right"><AsciiTokens lines={ASCII_RIGHT} /></span>
          <span className="hero-ascii-panel hero-ascii-panel--bl"><AsciiTokens lines={ASCII_BL} /></span>
          <span className="hero-ascii-panel hero-ascii-panel--br"><AsciiTokens lines={ASCII_BR} /></span>
          <span className="hero-ascii-bits">
            {ASCII_BITS.map((bits, i) => (
              <span key={i}>{bits}{'\n'}</span>
            ))}
          </span>
        </div>
      </div>

      <Suspense fallback={null}>
        <WebGLShader
          active={shaderActive}
          waveActive={shaderWave}
          wipeActive={isTransitioning}
          progress={wipeProgress}
          duration={wipeDuration}
          colors={WIPE_COLORS}
          className="absolute inset-0 z-[6] h-full w-full block pointer-events-none"
        />
      </Suspense>

      <div className="hero-card-outer relative z-10 w-full mx-auto max-w-3xl">
        <main className="hero-card-inner">
          <header className="hero-card-top">
            <span className="hero-index">
              <i className="hero-index-caret" aria-hidden="true">▸</i>
              Portfolio
              <i className="hero-index-cursor" aria-hidden="true" />
            </span>
            <span className="hero-card-note">EST. 2021 — Multidisciplinary Creative</span>
          </header>

          <div className="hero-copy">
            <p className="hero-eyebrow">
              <span aria-hidden="true">──</span>
              Creative Director
              <span aria-hidden="true">──</span>
            </p>
            <h1 className="hero-title">Portfolio</h1>
            <h2 className="hero-name">AGAPHE ABEL</h2>
            <p className="hero-desc">
              Unleashing creativity through bold visuals, seamless interfaces, and limitless possibilities.
            </p>
          </div>

          <div className="hero-meta">
            <div className="hero-badge">
              <p>Available for New Projects</p>
            </div>

            <div className="hero-button">
              <LiquidButton href="#contact" size="xl" className="rounded-xl" theme="navy">
                Contact
              </LiquidButton>
            </div>
          </div>
        </main>
      </div>

      <button
        type="button"
        className="hero-bg-toggle"
        onClick={toggleBg}
        disabled={isTransitioning}
        aria-label="Toggle hero background"
      >
        <span className="hero-bg-toggle-text">
          BG: {isAscii ? 'ASCII' : 'SHADER'}
        </span>
        <i className="hero-bg-toggle-cursor" aria-hidden="true" />
      </button>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="hero-scroll-text">Scroll</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}