import { useRef, useEffect } from 'react';
import { PHOTOS } from '../../data/content';

const FRICTION = 0.92;
const MIN_VELOCITY = 0.3;
const RUBBER_BAND = 0.35;       // elastic resistance at edges
const SNAP_DURATION = 450;       // ms for snap-back animation
const VELOCITY_SAMPLES = 4;     // frames to average for velocity

function Photography() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const rafRef = useRef(0);
  const samplesRef = useRef([]);
  const state = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    scrollX: 0,
    lastX: 0,
    lastTime: 0,
    dirLocked: null,
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return undefined;

    const maxScroll = () => -(track.scrollWidth - wrap.offsetWidth);

    /* ── Transform with GPU hint ── */
    const applyTransform = (x) => {
      posRef.current = x;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    /* ── Rubber-band clamping ── */
    const rubberClamp = (x) => {
      const max = maxScroll();
      if (x > 0) return x * RUBBER_BAND;
      if (x < max) return max + (x - max) * RUBBER_BAND;
      return x;
    };

    /* ── Hard clamp (for final settle) ── */
    const hardClamp = (x) => Math.max(maxScroll(), Math.min(0, x));

    /* ── Smooth snap-back animation ── */
    const snapBack = (from, to) => {
      const start = performance.now();
      const ease = (t) => 1 - Math.pow(1 - t, 3); // ease-out cubic

      const tick = (now) => {
        const t = Math.min(1, (now - start) / SNAP_DURATION);
        const val = from + (to - from) * ease(t);
        applyTransform(val);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          applyTransform(to);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    /* ── Cancel running inertia ── */
    const cancelInertia = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    /* ── Pointer down ── */
    const onDown = (e) => {
      cancelInertia();
      state.current.isDown = true;
      state.current.dirLocked = null;
      state.current.startX = e.pageX ?? e.touches?.[0]?.pageX;
      state.current.startY = e.pageY ?? e.touches?.[0]?.pageY;
      state.current.scrollX = posRef.current;
      state.current.lastX = state.current.startX;
      state.current.lastTime = performance.now();
      samplesRef.current = [];
      track.style.transition = 'none';
      wrap.classList.add('is-dragging');
    };

    /* ── Pointer move ── */
    const onMove = (e) => {
      if (!state.current.isDown) return;

      const x = e.pageX ?? e.touches?.[0]?.pageX;
      const y = e.pageY ?? e.touches?.[0]?.pageY;

      // Lock direction on first significant move
      if (!state.current.dirLocked) {
        const absDx = Math.abs(x - state.current.startX);
        const absDy = Math.abs(y - state.current.startY);
        if (absDx < 8 && absDy < 8) return;
        state.current.dirLocked = absDx > absDy ? 'horizontal' : 'vertical';
      }

      if (state.current.dirLocked === 'vertical') {
        state.current.isDown = false;
        wrap.classList.remove('is-dragging');
        return;
      }

      e.preventDefault();

      const now = performance.now();
      const dx = x - state.current.startX;
      const rawX = state.current.scrollX + dx;

      // Apply rubber-band at edges during drag
      applyTransform(rubberClamp(rawX));

      // Collect velocity samples
      const dt = now - state.current.lastTime;
      if (dt > 0) {
        samplesRef.current.push((x - state.current.lastX) / dt);
        if (samplesRef.current.length > VELOCITY_SAMPLES) {
          samplesRef.current.shift();
        }
      }
      state.current.lastX = x;
      state.current.lastTime = now;
    };

    /* ── Pointer up ── */
    const onUp = () => {
      if (!state.current.isDown) return;
      state.current.isDown = false;
      wrap.classList.remove('is-dragging');

      // Average recent velocity samples for smooth momentum
      const samples = samplesRef.current;
      const avgVel = samples.length
        ? samples.reduce((a, b) => a + b, 0) / samples.length
        : 0;

      let current = posRef.current;
      let vel = avgVel * 16; // convert per-ms to per-frame (~16ms)

      // If out of bounds → snap back immediately
      const max = maxScroll();
      if (current > 0 || current < max) {
        snapBack(current, hardClamp(current));
        return;
      }

      // Inertia with smooth deceleration
      const inertia = () => {
        if (Math.abs(vel) < MIN_VELOCITY) {
          // Final settle: snap to clamped position
          const clamped = hardClamp(current);
          if (Math.abs(current - clamped) > 1) {
            snapBack(current, clamped);
          }
          return;
        }

        vel *= FRICTION;
        current += vel;

        // Rubber-band if overscrolled during inertia
        const clamped = hardClamp(current);
        if (current !== clamped) {
          vel *= 0.6; // extra damping at edges
          current = rubberClamp(current);
        }

        applyTransform(current);
        rafRef.current = requestAnimationFrame(inertia);
      };

      rafRef.current = requestAnimationFrame(inertia);
    };

    // Use pointerdown for unified mouse+touch on supported browsers
    const hasPointerEvents = window.PointerEvent;

    if (hasPointerEvents) {
      wrap.addEventListener('pointerdown', onDown);
      wrap.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
    } else {
      wrap.addEventListener('mousedown', onDown);
      wrap.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
      wrap.addEventListener('touchstart', onDown, { passive: true });
      wrap.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onUp);
      window.addEventListener('touchcancel', onUp);
    }

    return () => {
      cancelInertia();
      if (hasPointerEvents) {
        wrap.removeEventListener('pointerdown', onDown);
        wrap.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
      } else {
        wrap.removeEventListener('mousedown', onDown);
        wrap.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
        wrap.removeEventListener('touchstart', onDown);
        wrap.removeEventListener('touchmove', onMove);
        window.removeEventListener('touchend', onUp);
        window.removeEventListener('touchcancel', onUp);
      }
    };
  }, []);

  return (
    <section id="photo" className="section-pad section-chapter section-chapter--cream overflow-hidden">
      <div className="chapter-heading">
        <div className="chapter-kicker reveal-item">
          <span>03</span>
          <span>Photography</span>
        </div>
        <h2 className="display-section reveal-item">
          Field notes<br />in light.
        </h2>
        <p className="chapter-note reveal-item">Drag the strip. Each frame is treated like a tiny scene, not a placeholder.</p>
      </div>

      <div ref={wrapRef} className="photo-gallery-wrap">
        <div ref={trackRef} className="photo-track">
          {PHOTOS.map((photo, index) => (
            <figure key={photo.id} id={photo.id} className="photo-slide">
              <span className="photo-number">{String(index + 1).padStart(2, '0')}</span>
              <img src={photo.src} alt={`Photography from ${photo.location}`} loading="lazy" decoding="async" draggable={false} />
              <figcaption className="photo-meta">
                <dl>
                  <dt>Camera</dt>
                  <dd>{photo.camera}</dd>
                  <dt>Location</dt>
                  <dd>{photo.location}</dd>
                  <dt>Year</dt>
                  <dd>{photo.year}</dd>
                </dl>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Photography;
