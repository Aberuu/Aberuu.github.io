import { motion } from 'framer-motion';
import PROCESS from '../../data/services';

const ease = [0.22, 1, 0.36, 1];

function Services() {
  return (
    <section id="process" className="px-6 md:px-10 py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-14">
          <p className="section-label">Process</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
            How the work gets made.
          </h2>
        </div>

        <div className="border-t border-ink/10">
          {PROCESS.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease, delay: i * 0.05 }}
              className="grid md:grid-cols-12 gap-4 py-8 border-b border-ink/10"
            >
              <div className="md:col-span-1 font-display font-bold text-sm text-violet">
                {p.step}
              </div>
              <div className="md:col-span-3 font-display font-bold text-xl md:text-2xl tracking-tight">
                {p.title}
              </div>
              <div className="md:col-span-8 text-sm md:text-base text-ink/50 leading-relaxed">
                {p.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
