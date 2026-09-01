import { useState, useRef, useEffect } from 'react';
import { VIDEO_WORK } from '../../data/content';

const PLAY_DURATION = 20000; // 20 seconds

function VideoCardItem({ item, index, startPlaying }) {
  const [autoPlayDone, setAutoPlayDone] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const isHovering = useRef(false);
  const hasStarted = useRef(false);

  // Auto-play when section becomes visible
  useEffect(() => {
    if (!startPlaying || hasStarted.current) return;
    hasStarted.current = true;
    const vid = videoRef.current;
    if (!vid) return;

    vid.play().catch(() => {});

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (videoRef.current) {
        // Auto-play phase done — pause only if not currently hovering
        if (!isHovering.current) {
          videoRef.current.pause();
        }
        setAutoPlayDone(true);
      }
    }, PLAY_DURATION);

    return () => clearTimeout(timerRef.current);
  }, [startPlaying]);

  const handleMouseEnter = () => {
    isHovering.current = true;
    setIsHover(true);
    // Only control playback after auto-play phase is done
    if (autoPlayDone && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    setIsHover(false);
    // Only pause on leave after auto-play phase is done
    if (autoPlayDone && videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <article className="video-card studio-card reveal-item" data-magnetic-hover>
      <span className="studio-card__index">{String(index + 1).padStart(2, '0')}</span>
      <div
        className={`video-card-media ${autoPlayDone && !isHover ? 'is-blurred' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video ref={videoRef} src={item.video} poster={item.image} muted loop playsInline />
        <span className="video-card-play-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" style={{ width: 'clamp(28px, 4vw, 48px)', height: 'clamp(28px, 4vw, 48px)' }}>
            <path d="M6 3v18l16-9z" />
          </svg>
        </span>
        <span className="video-card-play-hint">Hover to play</span>
        <div className="video-card-preview">
          <p>{item.preview}</p>
        </div>
      </div>
      <div className="video-card-info">
        <div>
          <h3>{item.title}</h3>
          <p className="label-caps">{item.category}</p>
        </div>
        <span className="label-caps">{item.year}</span>
      </div>
    </article>
  );
}

function VideoEditing() {
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="video"
      className="section-pad section-chapter section-chapter--navy"
    >
      <div className="section-orbit section-orbit--right" aria-hidden="true" />
      <div className="chapter-heading">
        <div className="chapter-kicker reveal-item">
          <span>02</span>
          <span>Video Editing</span>
        </div>
        <h2 className="display-section reveal-item">
          Cuts with<br />character.
        </h2>
      </div>

      <div className="video-grid studio-grid">
        {VIDEO_WORK.map((item, index) => (
          <VideoCardItem
            key={item.id}
            item={item}
            index={index}
            startPlaying={sectionVisible}
          />
        ))}
      </div>
    </section>
  );
}

export default VideoEditing;
