import { motion } from 'framer-motion';
import STATS from '../../data/stats';

const ease = [0.22, 1, 0.36, 1];

function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-t border-paper/15">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: i * 0.08 }}
          data-testid={`stat-${s.label.toLowerCase().replace(/\s/g, "-")}`}
          className={`py-8 md:py-10 ${i < 3 ? "md:border-r border-paper/15" : ""} ${i < 2 ? "border-r md:border-r border-paper/15" : ""} ${i % 2 === 0 ? "pr-4" : "pl-4 md:pl-6"} ${i < 2 ? "border-b md:border-b-0 border-paper/15" : ""}`}
        >
          <div className="font-display font-black text-5xl md:text-6xl tracking-tighter text-paper">{s.value}</div>
          <div className="mt-2 text-xs uppercase tracking-widest text-paper/50">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default Stats;
