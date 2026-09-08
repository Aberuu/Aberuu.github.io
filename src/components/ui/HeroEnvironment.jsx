const STROKE = '#0B0B0B';

function HeroEnvironment() {
  return (
    <div className="hero-env" aria-hidden="true">
      <svg className="hero-env__svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <ellipse className="hero-env__blob" data-hero-depth="0.15" cx="180" cy="720" rx="220" ry="160" fill="#5266FF" stroke={STROKE} strokeWidth="2.5" />
        <ellipse className="hero-env__blob" data-hero-depth="0.2" cx="1280" cy="680" rx="280" ry="190" fill="#B4F530" stroke={STROKE} strokeWidth="2.5" />
        <path
          className="hero-env__blob"
          data-hero-depth="0.12"
          d="M920 120c80-40 200-20 240 60s-20 180-100 200-200-40-220-120 60-100 80-140Z"
          fill="#F4E8DB"
          stroke={STROKE}
          strokeWidth="2.5"
        />
        <path
          className="hero-env__leaf"
          data-hero-depth="0.25"
          d="M1100 340c40-60 100-80 130-40s10 100-50 120-110-10-80-80Z"
          fill="#5266FF"
          stroke={STROKE}
          strokeWidth="2"
        />
        <path
          className="hero-env__leaf"
          data-hero-depth="0.18"
          d="M260 280c-30-50-90-60-120-20s0 90 60 100 100-30 60-80Z"
          fill="#39FF14"
          stroke={STROKE}
          strokeWidth="2"
        />
        <circle className="hero-env__particle" data-hero-depth="0.3" cx="420" cy="180" r="6" fill="#FF8400" stroke={STROKE} strokeWidth="1.5" />
        <circle className="hero-env__particle" data-hero-depth="0.22" cx="1050" cy="220" r="4" fill="#39FF14" stroke={STROKE} strokeWidth="1.5" />
        <circle className="hero-env__particle" data-hero-depth="0.28" cx="780" cy="140" r="5" fill="#F4E8DB" stroke={STROKE} strokeWidth="1.5" />
      </svg>

      <svg className="hero-env__star hero-env__star--1" data-hero-depth="0.35" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L6 21l2.3-7-6-4.6h7.6L12 2Z" fill="#39FF14" stroke={STROKE} strokeWidth="1.2" />
      </svg>
      <svg className="hero-env__star hero-env__star--2" data-hero-depth="0.4" viewBox="0 0 20 20" fill="none">
        <path d="M10 1l1.8 5.6H17l-4.7 3.4 1.8 5.5L10 14.8 5.9 15.5l1.8-5.5L3 6.6h5.2L10 1Z" fill="#5266FF" stroke={STROKE} strokeWidth="1" />
      </svg>
      <svg className="hero-env__star hero-env__star--3" data-hero-depth="0.32" viewBox="0 0 16 16" fill="none">
        <path d="M8 1l1.4 4.3H14l-3.6 2.6 1.4 4.1L8 10.8 4.2 12l1.4-4.1L2 5.3h4.6L8 1Z" fill="#FF8400" stroke={STROKE} strokeWidth="1" />
      </svg>
      <svg className="hero-env__star hero-env__star--4" data-hero-depth="0.38" viewBox="0 0 18 18" fill="none">
        <path d="M9 1l1.6 4.9H16l-4 2.9 1.5 4.6L9 11.2 4.5 13.4l1.5-4.6-4-2.9h5.4L9 1Z" fill="#F4E8DB" stroke={STROKE} strokeWidth="1" />
      </svg>
    </div>
  );
}

export default HeroEnvironment;
