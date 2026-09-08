import { motion } from 'framer-motion';
import TOOLBOX from '../../data/awards';

const ease = [0.22, 1, 0.36, 1];

function Awards() {
  return (
    <section id="toolbox" className="px-6 md:px-10 py-20 md:py-32 border-t border-ink/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-14">
          <p className="section-label">Toolbox</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
            Sharp tools, sharper intent.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TOOLBOX.map((box, i) => (
            <motion.div
              key={box.cat}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease, delay: i * 0.05 }}
            >
              <h3 className="font-display font-bold text-xl tracking-tight mb-4">
                {box.cat}
              </h3>
              <ul className="space-y-2">
                {box.tools.map(t => (
                  <li key={t} className="text-sm text-ink/50">
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Awards;
