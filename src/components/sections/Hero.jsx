import { WebGLShader } from '@/components/ui/web-gl-shader';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-editorial relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-24 sm:py-32"
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
      </div>
    </section>
  );
}
