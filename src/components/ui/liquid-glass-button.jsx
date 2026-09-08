import { useState, useRef } from 'react';

export function LiquidButton({
  children,
  className = '',
  size = 'md',
  href,
  onClick,
  ...props
}) {
  const buttonRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
    xl: 'px-10 py-4 text-base md:text-lg font-semibold tracking-wide',
  };

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  };

  const handleMouseEnter = () => {
    setMousePos((prev) => ({ ...prev, isHovered: true }));
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  const baseStyles = `
    group relative inline-flex items-center justify-center overflow-hidden
    font-medium transition-all duration-300 ease-out
    backdrop-blur-xl bg-white/[0.07] hover:bg-white/[0.14]
    border border-white/20 hover:border-white/40
    shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
    hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]
    active:scale-[0.98] cursor-pointer select-none
  `.replace(/\s+/g, ' ').trim();

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  const content = (
    <>
      {/* Specular glass reflection on top */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-[45%] rounded-t-full bg-gradient-to-b from-white/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"
        aria-hidden="true"
      />

      {/* Interactive fluid glow follows cursor */}
      {mousePos.isHovered && (
        <span
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.22), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Button label */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        className={`${baseStyles} ${selectedSize} ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`${baseStyles} ${selectedSize} ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {content}
    </button>
  );
}
