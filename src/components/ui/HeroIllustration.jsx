const S = '#0B0B0B';

function HeroIllustration() {
  return (
    <div className="hero-illus" aria-hidden="true">
      <svg className="hero-illus__svg" viewBox="0 0 900 520" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ground curve */}
        <path
          d="M40 430 Q450 380 860 430"
          stroke={S}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Creative Cat — body */}
        <g className="hero-illus__cat" data-hero-depth="0.08">
          {/* Tail */}
          <path
            d="M620 360c50 20 90 10 110-30s10-70-20-90"
            stroke={S}
            strokeWidth="3"
            fill="#FF8400"
            strokeLinecap="round"
          />
          {/* Body */}
          <ellipse cx="480" cy="360" rx="130" ry="95" fill="#F4E8DB" stroke={S} strokeWidth="3" />
          {/* Legs */}
          <path d="M390 420v45" stroke={S} strokeWidth="3" strokeLinecap="round" />
          <path d="M430 430v38" stroke={S} strokeWidth="3" strokeLinecap="round" />
          <path d="M530 430v38" stroke={S} strokeWidth="3" strokeLinecap="round" />
          <path d="M570 420v45" stroke={S} strokeWidth="3" strokeLinecap="round" />
          {/* Paws */}
          <ellipse cx="390" cy="468" rx="18" ry="10" fill="#5266FF" stroke={S} strokeWidth="2" />
          <ellipse cx="430" cy="472" rx="16" ry="9" fill="#5266FF" stroke={S} strokeWidth="2" />
          <ellipse cx="530" cy="472" rx="16" ry="9" fill="#5266FF" stroke={S} strokeWidth="2" />
          <ellipse cx="570" cy="468" rx="18" ry="10" fill="#5266FF" stroke={S} strokeWidth="2" />
          {/* Head */}
          <circle cx="480" cy="250" r="78" fill="#F4E8DB" stroke={S} strokeWidth="3" />
          {/* Ears */}
          <path d="M420 200 L400 150 L445 185 Z" fill="#FF8400" stroke={S} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M540 200 L560 150 L515 185 Z" fill="#FF8400" stroke={S} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M425 195 L412 165 L438 188 Z" fill="#F4E8DB" />
          <path d="M535 195 L548 165 L522 188 Z" fill="#F4E8DB" />
          {/* Headphones */}
          <path d="M405 255 Q405 200 480 195 Q555 200 555 255" stroke={S} strokeWidth="3" fill="none" />
          <rect x="388" y="248" width="28" height="42" rx="10" fill="#39FF14" stroke={S} strokeWidth="2.5" />
          <rect x="544" y="248" width="28" height="42" rx="10" fill="#39FF14" stroke={S} strokeWidth="2.5" />
          {/* Face — calm smile */}
          <path d="M455 285 Q480 300 505 285" stroke={S} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="455" cy="268" rx="6" ry="8" fill={S} />
          <ellipse cx="505" cy="268" rx="6" ry="8" fill={S} />
          {/* Sunglasses */}
          <rect x="430" y="255" width="48" height="28" rx="6" fill="#5266FF" stroke={S} strokeWidth="2.5" />
          <rect x="482" y="255" width="48" height="28" rx="6" fill="#5266FF" stroke={S} strokeWidth="2.5" />
          <path d="M478 269h4" stroke={S} strokeWidth="2.5" />
          <path d="M430 265h-12" stroke={S} strokeWidth="2" />
          <path d="M530 265h12" stroke={S} strokeWidth="2" />
          {/* Camera strap */}
          <path d="M440 330 Q480 350 520 330" stroke={S} strokeWidth="2.5" fill="none" />
          <rect x="448" y="328" width="64" height="44" rx="8" fill="#B4F530" stroke={S} strokeWidth="2.5" />
          <circle cx="480" cy="350" r="14" fill="#5266FF" stroke={S} strokeWidth="2" />
          <circle cx="480" cy="350" r="8" fill="#F4E8DB" stroke={S} strokeWidth="1.5" />
          <rect x="500" y="334" width="8" height="6" rx="1" fill="#FF8400" stroke={S} strokeWidth="1" />
        </g>

        {/* Floating objects */}
        <g className="hero-float-obj" data-hero-float>
          <rect x="120" y="120" width="140" height="56" rx="8" fill="#F4E8DB" stroke={S} strokeWidth="2.5" />
          <rect x="132" y="132" width="24" height="32" rx="2" fill="#39FF14" stroke={S} strokeWidth="1.5" />
          <rect x="162" y="132" width="24" height="32" rx="2" fill="#5266FF" stroke={S} strokeWidth="1.5" />
          <rect x="192" y="132" width="24" height="32" rx="2" fill="#FF8400" stroke={S} strokeWidth="1.5" />
          <rect x="222" y="132" width="24" height="32" rx="2" fill="#B4F530" stroke={S} strokeWidth="1.5" />
          <circle cx="148" cy="148" r="4" fill={S} />
          <text x="132" y="118" fontFamily="JetBrains Mono, monospace" fontSize="9" fill={S}>TIMELINE</text>
        </g>

        <g className="hero-float-obj" data-hero-float>
          <rect x="700" y="90" width="110" height="80" rx="4" fill="none" stroke={S} strokeWidth="3" />
          <path d="M700 90 L755 60 L810 90" stroke={S} strokeWidth="2.5" fill="none" />
          <circle cx="755" cy="130" r="18" fill="#5266FF" stroke={S} strokeWidth="2" />
        </g>

        <g className="hero-float-obj" data-hero-float>
          <rect x="640" y="300" width="150" height="90" rx="10" fill="#130B4A" stroke={S} strokeWidth="2.5" />
          <rect x="652" y="312" width="126" height="8" rx="2" fill="#39FF14" />
          <rect x="652" y="328" width="90" height="6" rx="2" fill="#5266FF" />
          <rect x="652" y="342" width="110" height="6" rx="2" fill="#F4E8DB" />
          <text x="652" y="368" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#39FF14">const edit = true;</text>
        </g>

        <g className="hero-float-obj" data-hero-float>
          <rect x="80" y="300" width="100" height="70" rx="4" fill="#B4F530" stroke={S} strokeWidth="2.5" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={88 + i * 22} y="308" width="18" height="54" rx="2" fill="#F4E8DB" stroke={S} strokeWidth="1.5" />
          ))}
        </g>

        <g className="hero-float-obj" data-hero-float>
          <path d="M200 420 L200 450 L230 450 L230 440 L215 440 L215 420 Z" fill="#F4E8DB" stroke={S} strokeWidth="2" />
          <path d="M200 420 L215 405 L230 420" fill="#39FF14" stroke={S} strokeWidth="2" />
        </g>

        <g className="hero-float-obj" data-hero-float>
          <rect x="760" y="400" width="48" height="56" rx="6" fill="#5266FF" stroke={S} strokeWidth="2.5" />
          <path d="M772 412h24M772 422h24M772 432h16" stroke={S} strokeWidth="2" strokeLinecap="round" />
        </g>

        <g className="hero-float-obj hero-float-obj--tag" data-hero-float>
          <rect x="300" y="80" width="72" height="28" rx="14" fill="#39FF14" stroke={S} strokeWidth="2" />
          <text x="336" y="99" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="700" fill={S}>EDIT</text>
        </g>

        <g className="hero-float-obj hero-float-obj--tag" data-hero-float>
          <rect x="560" y="200" width="80" height="28" rx="14" fill="#FF8400" stroke={S} strokeWidth="2" />
          <text x="600" y="219" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="700" fill={S}>CODE</text>
        </g>

        <g className="hero-float-obj hero-float-obj--tag" data-hero-float>
          <rect x="160" y="220" width="88" height="28" rx="14" fill="#5266FF" stroke={S} strokeWidth="2" />
          <text x="204" y="239" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="700" fill="#F4E8DB">SHOOT</text>
        </g>
      </svg>
    </div>
  );
}

export default HeroIllustration;
