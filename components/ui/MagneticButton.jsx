import { useRef, useCallback } from 'react';

function MagneticButton({ children, href, variant = 'outline', className = '' }) {
  const btnRef = useRef(null);

  const onMove = useCallback((e) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transition = 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)';
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = btnRef.current;
    if (el) {
      el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      el.style.transform = '';
    }
  }, []);

  const cls = [
    'btn-magnetic',
    variant === 'fill' ? 'btn-magnetic--fill' : '',
    variant === 'hero-primary' ? 'btn-magnetic--hero-primary' : '',
    variant === 'hero-ghost' ? 'btn-magnetic--hero-ghost' : '',
    className,
  ].filter(Boolean).join(' ');

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        className={cls}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      type="button"
      className={cls}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span>{children}</span>
    </button>
  );
}

export default MagneticButton;
