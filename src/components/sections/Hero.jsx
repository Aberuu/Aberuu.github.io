import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { WebGLShader } from '@/components/ui/web-gl-shader';
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

const WIPE_MS = 700;
const AUTO_INTERVAL_MS = 8000;
const TILE_SIZE = 20;

const EDGE_TRAILS = [
  { color: '#39ff14', blocks: 2 },
  { color: '#00b4ff', blocks: 4 },
  { color: '#ff2d55', blocks: 6 },
];

const buildWipePolygon = (width, height, trails) => {
  const block = TILE_SIZE;
  const depthMin = 6;
  const depthMax = 16;

  const strips = [];
  let remaining = Math.max(1, height);
  let guard = 0;
  while (remaining > 0 && guard < 300) {
    guard += 1;
    const h = remaining > block * 2.4 ? block * (0.6 + Math.random() * 1.8) : remaining;
    strips.push(Math.round(h));
    remaining -= h;
  }

  const totalSteps = Math.max(16, Math.min(48, Math.round(width / 48)));

  const xs = strips.map(() => {
    const units = Math.floor(Math.random() * (depthMax - depthMin)) + depthMin;
    const px = Math.random() < 0.5 ? units * block : -units * block;
    return Math.max(0, Math.min(100, (px / width) * 100));
  });

  const yc = [0];
  strips.forEach((h, i) => yc.push(yc[i] + h));
  const scale = yc[yc.length - 1];
  const yf = (v) => (v / scale) * 100;

  const poly = (full) => {
    const pts = ['0% 100%', '0% 0%'];
    for (let i = 0; i < strips.length; i++) {
      const x = full ? 100 : xs[i];
      pts.push(`${x}% ${yf(yc[i])}%`, `${x}% ${yf(yc[i + 1])}%`);
    }
    return `polygon(${pts.join(', ')})`;
  };

  // Neon trail bands lagging the frontier (visible on the already-revealed side).
  // Each band shows a region x >= a_i per strip, intersected with the parent clip,
  // producing a chromatic strip just left of the moving pixel edge.
  const bands = trails.map((trail) => {
    const bandPct = Math.max(3, ((trail.blocks * block) / width) * 100);
    const bandPoly = (full) => {
      const pts = [];
      for (let i = 0; i < strips.length; i++) {
        const x = full ? 100 : Math.max(0, xs[i] - bandPct);
        pts.push(`${x}% ${yf(yc[i])}%`, `${x}% ${yf(yc[i + 1])}%`);
      }
      pts.push('100% 100%', '100% 0%');
      return `polygon(${pts.join(', ')})`;
    };
    return { color: trail.color, from: bandPoly(false), to: bandPoly(true) };
  });

  return { from: poly(false), to: poly(true), steps: totalSteps, bands };
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
      style={{ background: `linear-gradient(90deg, ${trail.color}00 0%, ${trail.color}45 55%, ${trail.color}F2 100%)` }}
    />
  ));

export default function Hero() {
  const [bgMode, setBgMode] = useState('glow');
  const [transition, setTransition] = useState('idle');
  const [wall, setWall] = useState([]);
  const busyRef = useRef(false);
  const modeRef = useRef('glow');
  const glowRef = useRef(null);
  const asciiRef = useRef(null);
  const edgeRefs = useRef([]);

  const toggleBg = () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setTransition('wipe');

    setTimeout(() => {
      modeRef.current = modeRef.current === 'glow' ? 'ascii' : 'glow';
      setBgMode(modeRef.current);
      setTransition('idle');
      busyRef.current = false;
    }, WIPE_MS);
  };

  useEffect(() => {
    const id = setInterval(toggleBg, AUTO_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

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

  useLayoutEffect(() => {
    if (transition !== 'wipe') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const el = bgMode === 'glow' ? asciiRef.current : glowRef.current;
    if (!el) return undefined;

    const rect = el.getBoundingClientRect();
    const { from, to, steps, bands } = buildWipePolygon(rect.width || window.innerWidth, rect.height || window.innerHeight, EDGE_TRAILS);
    const anim = el.animate(
      [{ clipPath: from }, { clipPath: to }],
      { duration: WIPE_MS, easing: `steps(${steps}, end)`, fill: 'forwards' },
    );
    const edgeAnims = bands.map((band, i) => {
      const edgeEl = edgeRefs.current[i];
      if (!edgeEl) return null;
      return edgeEl.animate(
        [{ clipPath: band.from }, { clipPath: band.to }],
        { duration: WIPE_MS, easing: `steps(${steps}, end)`, fill: 'forwards' },
      );
    });

    return () => {
      anim.cancel();
      edgeAnims.forEach((edgeAnim) => edgeAnim?.cancel());
    };
  }, [transition, bgMode]);

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

  return (
    <section
      id="top"
      className="hero-editorial relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-24 sm:py-32"
      data-hero-section
    >
      <div ref={glowRef} className={glowLayerClass} aria-hidden="true">
        <span className="hero-watermark" aria-hidden="true">
          AGAPHE
        </span>
        <WebGLShader active={!isAscii || transitioningToGlow} className="absolute inset-0 h-full w-full block pointer-events-none" />
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