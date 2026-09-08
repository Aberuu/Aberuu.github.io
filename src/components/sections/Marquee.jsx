import { motion } from 'framer-motion';

const WORDS = ["Stories", "Systems", "Frames", "Stories", "Systems", "Frames", "Stories", "Systems", "Frames"];

function Marquee() {
  return (
    <div data-testid="marquee-section" className="relative border-y border-ink/10 py-8 md:py-10 overflow-hidden bg-paper">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex whitespace-nowrap marquee"
        aria-hidden="true"
      >
        {[...WORDS, ...WORDS].map((w, i) => (
          <span
            key={i}
            className={`font-display font-black text-6xl md:text-8xl tracking-tighter mx-6 md:mx-10 ${
              i % 3 === 1 ? "italic font-medium text-ink/40" : "text-ink"
            }`}
          >
            {w}
            <span className="text-violet mx-4 md:mx-6">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default Marquee;
