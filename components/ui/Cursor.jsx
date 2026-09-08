import { useEffect, useRef } from 'react';

function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId = null;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor-hover]');
      if (target) cursor.classList.add('custom-cursor--hover');
    };

    const onOut = () => {
      cursor.classList.remove('custom-cursor--hover');
    };

    const onLeave = () => cursor.classList.add('custom-cursor--hidden');
    const onEnter = () => cursor.classList.remove('custom-cursor--hidden');

    const loop = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
      rafId = requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });
    document.addEventListener('mouseenter', onEnter, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor custom-cursor--hidden" aria-hidden="true">
      <div className="custom-cursor-ring" />
      <div className="custom-cursor-dot" />
    </div>
  );
}

export default Cursor;
