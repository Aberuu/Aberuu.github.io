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
const TILE_SIZE = 20;
const WIPE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const EDGE_TRAILS = [
  { color: '#39ff14', blocks: 2 },
  { color: '#00b4ff', blocks: 4 },
];

// Ragged "pixel" frontier sweeping left→right, plus neon chase bands.
// Every feature steps in whole 20px blocks (TILE_SIZE), so the pixelated
// look stays crisp, while a momentum-biased random walk keeps the sweep smooth.
const buildWipePolygon = (width, height, trails) => {
  const block = TILE_SIZE; // 20px — hard pixel size
  const stripH = block; // one 20px block per horizontal row
  const stripCount = Math.max(4, Math.ceil(height / stripH));
  const depthUnits = width < 640 ? 4 : 5; // ± whole blocks of raggedness
  const rowCount = stripCount + 1;

  let v = 0;
  let dir = Math.random() < 0.5 ? -1 : 1;
  const ledges = [];
  for (let i = 0; i < rowCount; i++) {
    if (Math.random() < 0.16) dir *= -1; // occasionally reverse → smooth runs
    v += dir;
    v = Math.max(-depthUnits, Math.min(depthUnits, v));
    ledges.push(v);
  }
  const minL = Math.min(...ledges);
  const xs = ledges.map((l) => l - minL); // integer 20px-block units, ≥ 0

  const y = (i) => (i / stripCount) * 100;
  const px = (units) => ((units * block) / Math.max(1, width)) * 100;

  const poly = (full) => {
    const pts = ['0% 100%', '0% 0%'];
    for (let i = 0; i < stripCount; i++) {
      const x = full ? 100 : px(xs[i]);
      pts.push(`${x}% ${y(i)}%`, `${x}% ${y(i + 1)}%`);
    }
    return `polygon(${pts.join(', ')})`;
  };

  // Neon trails lagging the frontier (visible on the already-revealed side).
  const bands = trails.map((trail) => {
    const basePct = Math.max(2.5, ((trail.blocks * block * 0.5) / Math.max(1, width)) * 100);
    const bandPoly = (k) => {
      const units = Math.round(((basePct * k) / 100) * (width / block));
      const pts = [];
      for (let i = 0; i < stripCount; i++) {
        const x = Math.max(0, px(xs[i] - units));
        pts.push(`${x}% ${y(i)}%`, `${x}% ${y(i + 1)}%`);
      }
      pts.push('100% 100%', '100% 0%');
      return `polygon(${pts.join(', ')})`;
    };
    const breath = [1.3, 1.9, 2.3, 1.4, 0];
    return {
      color: trail.color,
      keyframes: breath.map((k) => ({ clipPath: bandPoly(k) })),
    };
  });

  return { from: poly(false), to: poly(true), bands };
};

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

const EdgeTrails = ({ refs }) =>
  EDGE_TRAILS.map((trail, i) => (
    <div
      key={trail.color}
      ref={(el) => { refs.current[i] = el; }}
      className="hero-bg-edge"
      aria-hidden="true"
      style={{
        background: `linear-gradient(90deg, ${trail.color}00 0%, ${trail.color}45 55%, ${trail.color}F2 100%)`,
        animationDelay: `${i * 0.05}s`,
      }}
    />
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
  const edgeRefs = useRef([]);

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

    const rect = el.getBoundingClientRect();
    const { from, to, bands } = buildWipePolygon(rect.width || window.innerWidth, rect.height || window.innerHeight, EDGE_TRAILS);
    const isMobile = (rect.width || window.innerWidth) < 640;
    const duration = isMobile ? WIPE_MS_MOBILE : WIPE_MS;
    const anim = el.animate(
      [{ clipPath: from }, { clipPath: to }],
      { duration, easing: WIPE_EASE, fill: 'forwards' },
    );
    const edgeAnims = bands.map((band, i) => {
      const edgeEl = edgeRefs.current[i];
      if (!edgeEl) return null;
      const n = band.keyframes.length;
      return edgeEl.animate(
        band.keyframes.map((frame, k) => ({
          offset: n > 1 ? k / (n - 1) : 0,
          clipPath: frame.clipPath,
          opacity: k === 0 || k === n - 1 ? 0 : 1,
        })),
        { duration, easing: 'linear', fill: 'forwards' },
      );
    });

    anim.onfinish = finishWipe;
    const safety = setTimeout(() => {
      if (busyRef.current) finishWipe();
    }, duration + 250);

    return () => {
      clearTimeout(safety);
      anim.cancel();
      edgeAnims.forEach((edgeAnim) => edgeAnim?.cancel());
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
  const transitioningToGlow = transition === 'wipe' && bgMode === 'ascii';
  // Mobile: canvas WebGL di dalam layer ber-clip-path selama wipe memicu tearing
  // GPU — freeze shader selama transisi, lanjut otomatis saat idle.
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const shaderActive = (!isAscii || transitioningToGlow) && heroInView && !(isMobile && isTransitioning);

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
        <Suspense fallback={null}>
          <WebGLShader active={shaderActive} className="absolute inset-0 h-full w-full block pointer-events-none" />
        </Suspense>
        {isTransitioning && bgMode === 'ascii' && (
          <EdgeTrails refs={edgeRefs} />
        )}
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
        {isTransitioning && bgMode === 'glow' && (
          <EdgeTrails refs={edgeRefs} />
        )}
      </div>

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