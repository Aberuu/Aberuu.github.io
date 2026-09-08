import { WebGLShader } from '@/components/ui/web-gl-shader';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-editorial hero-grid-bg relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-24 sm:py-32"
      data-hero-section
    >
      <WebGLShader className="absolute inset-0 h-full w-full block pointer-events-none z-0" />

      <span className="hero-watermark" aria-hidden="true">
        AGAPHE
      </span>

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
              <LiquidButton href="#work" size="xl" className="rounded-xl">
                Let&apos;s Go
              </LiquidButton>
            </div>
          </div>
        </main>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="hero-scroll-text">Scroll</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}