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
      </div>
    </section>
  );
}

export default Hero;