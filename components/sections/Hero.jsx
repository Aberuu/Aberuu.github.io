<<<<<<< HEAD
import { useMemo } from 'react';
import MagneticButton from '../ui/MagneticButton';
import HeroPoster from '../ui/HeroPoster';
import { POSTERS } from '../../data/posters';

function Hero() {
  const doubled = useMemo(() => [...POSTERS, ...POSTERS], []);

  return (
    <section id="top" className="hero-posterwall">
      <div className="hero-posterwall__track" data-hero-track>
        {doubled.map((poster, i) => (
          <div className="hero-posterwall__cell" key={`${poster.id}-${i}`}>
            <HeroPoster data={poster} mirrored={i % 4 === 0} />
          </div>
        ))}
      </div>

      <span className="hero-posterwall__frame hero-posterwall__frame--t" aria-hidden="true" />
      <span className="hero-posterwall__frame hero-posterwall__frame--bl" aria-hidden="true" />
      <span className="hero-posterwall__frame hero-posterwall__frame--br" aria-hidden="true" />

      <div className="hero-posterwall__shade" aria-hidden="true" />

      <div className="hero-posterwall__overlay">
        <div className="hero-posterwall__brand">
          <span className="hero-posterwall__kicker">Creative Agency · Experimental Sound</span>
          <h1 className="hero-posterwall__title">
            AGAPHE<span className="hero-posterwall__title-dot">.</span>
          </h1>
          <p className="hero-posterwall__subtitle">
            Video, image, interface — shaped into cinematic rhythm for a festival
            culture that refuses the grid.
          </p>
        </div>

        <div className="hero-posterwall__cta">
          <MagneticButton href="#work" variant="hero-primary">
            Explore Work
          </MagneticButton>
          <MagneticButton href="#identity" variant="hero-ghost">
            Meet Me
          </MagneticButton>
        </div>
      </div>

      <div className="hero-posterwall__meta">
        <span>46°52′N · 07°47′E</span>
        <span>EST. 2016 — LIVE SYSTEM</span>
        <span className="hero-posterwall__scroll">SCROLL ↓</span>
=======
import { WebGLShader } from '@/components/ui/web-gl-shader';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-editorial relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-4 py-24 sm:py-32"
      data-hero-section
    >
      <WebGLShader className="absolute inset-0 w-full h-full block pointer-events-none z-0" />

      <div className="hero-card-outer relative z-10 border border-[#27272a] p-2 w-full mx-auto max-w-3xl backdrop-blur-[2px] bg-black/30">
        <main className="relative border border-[#27272a] py-10 px-4 sm:px-8 overflow-hidden bg-black/40">
          <h1 className="hero-title mb-3 text-white text-center text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)]">
            Design is Everything
          </h1>
          <p className="hero-desc text-white/60 px-4 sm:px-6 text-center text-xs md:text-sm lg:text-lg max-w-xl mx-auto">
            Unleashing creativity through bold visuals, seamless interfaces, and limitless possibilities.
          </p>
          <div className="hero-badge my-8 flex items-center justify-center gap-1.5">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <p className="text-xs text-green-500 font-medium tracking-wide">Available for New Projects</p>
          </div>

          <div className="hero-button flex justify-center">
            <LiquidButton href="#work" className="text-white border rounded-full" size="xl">
              Let's Go
            </LiquidButton>
          </div>
        </main>
>>>>>>> 7b6512d (Release 7 (Hero Revamp))
      </div>
    </section>
  );
}

<<<<<<< HEAD
export default Hero;
=======

>>>>>>> 7b6512d (Release 7 (Hero Revamp))
