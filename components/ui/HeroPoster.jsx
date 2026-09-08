const BLOB_SHAPES = {
  'blob-c': {
    fill: 'url(#chromex)',
    stroke: 'rgba(247,247,247,0.28)',
    d: 'M140 120c40-30 92-22 116 14 24 36 16 92-22 118-38 26-104 20-132-18C74 196 84 150 118 134c20-9 16-20 22-14Z',
    glow1: 'M150 140c14-8 34-2 40 12 6 14 2 32-10 40-12 8-30 4-38-8-8-12-6-28 8-34c6-3 6-6 0-10Z',
    glow2: 'M178 168c4-6 14-4 16 2 2 6-2 14-8 14-6 0-10-6-8-12 1-3 2-6 0-4Z',
    acc: '#C0EFFF',
  },
  'blob-p': {
    fill: 'url(#plasmx)',
    stroke: 'rgba(247,247,247,0.26)',
    d: 'M150 110c48-22 98-2 108 42 10 44-18 92-66 104-48 12-104-16-112-62C72 148 102 122 128 116c14-3 20-8 22-6Z',
    glow1: 'M150 128c22-8 42 4 46 22 4 18-10 38-30 42-20 4-40-10-42-28-2-18 10-32 26-36 4-1 4-4 0-0Z',
    glow2: 'M182 158c6-7 18-5 20 3 2 8-4 17-12 17-8 0-12-8-8-15 1-3 2-7 0-5Z',
    acc: '#FFC8F0',
  },
  'blob-g': {
    fill: 'url(#grex)',
    stroke: 'rgba(247,247,247,0.26)',
    d: 'M165 100c52-16 96 26 92 70-4 44-52 74-98 64-46-10-80-56-72-96 8-40 40-62 78-58 14 1 18-3 0-0Z',
    glow1: 'M168 118c24-6 42 8 44 26 2 18-12 34-32 38-20 4-38-8-40-24-2-16 10-30 28-34 4-1 4-4 0-6Z',
    glow2: 'M196 152c6-6 16-3 18 4 2 7-3 15-11 15-8 0-12-7-9-13 1-2 2-6 2-6Z',
    acc: '#DBFF8F',
  },
  'blob-o': {
    fill: 'url(#orangx)',
    stroke: 'rgba(247,247,247,0.26)',
    d: 'M120 150c-10-52 34-102 88-96 54 6 82 60 66 104-16 44-70 62-112 42-42-20-48-70-42-50Z',
    glow1: 'M126 158c-8-32 20-58 52-56 32 2 48 34 40 60-8 26-40 38-64 26-24-12-28-42-28-30Z',
    glow2: 'M150 176c-4-12 8-24 24-22 16 2 24 16 20 28-4 12-20 20-32 14-6-3-10-12-12-20Z',
    acc: '#FFC9A1',
  },
  'blob-b': {
    fill: 'url(#bronzx)',
    stroke: 'rgba(247,247,247,0.26)',
    d: 'M80 170c-4-60 52-104 120-96 68 8 104 62 90 110-14 48-82 60-126 40-44-20-70-54-84-54Z',
    glow1: 'M96 178c-2-38 32-62 72-56 40 6 60 40 52 64-8 24-48 34-74 24-26-10-44-32-50-32Z',
    glow2: 'M120 192c-2-12 10-22 24-20 14 2 22 14 18 24-4 10-18 16-28 10-4-3-10-10-14-14Z',
    acc: '#F0D9B0',
  },
};

function Blob({ type }) {
  const s = BLOB_SHAPES[type] || BLOB_SHAPES['blob-c'];
  return (
    <svg className={`hero-post__blob hero-post__blob--${type}`} viewBox="0 0 300 300" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="chromex" x1="60" y1="40" x2="240" y2="260" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fdfdfd" />
          <stop offset="0.4" stopColor="#9a9a9a" />
          <stop offset="0.62" stopColor="#3c3c3c" />
          <stop offset="0.8" stopColor="#101010" />
          <stop offset="1" stopColor="#c4c4c4" />
        </linearGradient>
        <linearGradient id="plasmx" x1="70" y1="60" x2="230" y2="250" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff6bd6" />
          <stop offset="0.5" stopColor="#b0289b" />
          <stop offset="0.82" stopColor="#4a0f3f" />
          <stop offset="1" stopColor="#ff9ae7" />
        </linearGradient>
        <linearGradient id="grex" x1="90" y1="40" x2="250" y2="260" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e0ff8a" />
          <stop offset="0.5" stopColor="#8fd621" />
          <stop offset="0.84" stopColor="#2f5a08" />
          <stop offset="1" stopColor="#c6ff4d" />
        </linearGradient>
        <linearGradient id="orangx" x1="60" y1="60" x2="230" y2="250" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffb066" />
          <stop offset="0.5" stopColor="#e05206" />
          <stop offset="0.85" stopColor="#7a1c00" />
          <stop offset="1" stopColor="#ff9c3f" />
        </linearGradient>
        <linearGradient id="bronzx" x1="50" y1="60" x2="240" y2="250" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f4dfb6" />
          <stop offset="0.5" stopColor="#b58a4e" />
          <stop offset="0.85" stopColor="#5c3a16" />
          <stop offset="1" stopColor="#e8c78f" />
        </linearGradient>
        <radialGradient id="shine" cx="0.32" cy="0.26" r="0.9">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* deep drop shadow ground */}
      <ellipse cx="150" cy="248" rx="110" ry="16" fill="#000" opacity="0.55" />

      {/* glossy chrome body */}
      <path d={s.d} fill={s.fill} stroke={s.stroke} strokeWidth="1.5" />

      {/* perturbed internal glow / translucency */}
      <path d={s.glow1} fill="url(#shine)" opacity="0.5" />
      <path d={s.glow2} fill={s.acc} opacity="0.7" />

      {/* specular studio highlight */}
      <ellipse cx="128" cy="140" rx="40" ry="22" fill="#fff" opacity="0.9"
        transform="rotate(-24 128 140)" />
      <ellipse cx="132" cy="132" rx="16" ry="9" fill="#fff" opacity="0.95"
        transform="rotate(-30 132 132)" />
    </svg>
  );
}

function HeroPoster({ data, mirrored = false }) {
  return (
    <article
      className={`hero-post${mirrored ? ' hero-post--flip' : ''}`}
      data-hero-poster
      style={{ '--post-accent': data.accent }}
    >
      <header className="hero-post__head">
        <span className="hero-post__idx">{data.index}</span>
        <span className="hero-post__code">EVT / {data.id} — LIC</span>
      </header>

      <figure className="hero-post__photo">
        <img src={data.img} alt="" />
        <span className="hero-post__photo-num">{data.index}</span>
      </figure>

      <div className="hero-post__blob-wrap">
        <Blob type={data.object} />
        <span className="hero-post__tag">{data.meta}</span>
      </div>

      <h2 className="hero-post__title">
        <span>{data.title}</span>
        <span className="hero-post__title-sub">{data.sub}</span>
      </h2>

      <footer className="hero-post__foot">
        <span className="hero-post__artist">{data.artist}</span>
        <span className="hero-post__date">{data.date}</span>
        <span className="hero-post__venue">{data.venue}</span>
      </footer>
    </article>
  );
}

export default HeroPoster;
