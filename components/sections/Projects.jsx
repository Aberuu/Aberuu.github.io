import { motion } from 'framer-motion';
import WORKS from '../../data/projects';

const ease = [0.22, 1, 0.36, 1];

function Projects() {
  return (
    <section id="work" className="px-6 md:px-10 py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-14">
          <p className="section-label">Selected work</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
            Three mediums, one voice.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {WORKS.map((w, idx) => (
            <motion.a
              key={w.id}
              href={`#${w.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease, delay: idx * 0.05 }}
              className="group block"
            >
              <div className="relative overflow-hidden bg-ink/5 aspect-[4/3] rounded-sm">
                <img
                  src={w.image}
                  alt={w.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl tracking-tight group-hover:text-violet transition-colors duration-200">
                    {w.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/50 leading-relaxed">
                    {w.desc}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-ink/40">{w.type}</div>
                  <div className="text-xs text-ink/30 mt-0.5">{w.year}</div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
