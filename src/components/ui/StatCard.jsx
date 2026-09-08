import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

function StatCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease, delay: index * 0.08 }}
      className={`py-8 md:py-10 ${index < 3 ? "md:border-r border-paper/15" : ""} ${index < 2 ? "border-r md:border-r border-paper/15" : ""} ${index % 2 === 0 ? "pr-4" : "pl-4 md:pl-6"} ${index < 2 ? "border-b md:border-b-0 border-paper/15" : ""}`}
    >
      <div className="font-display font-black text-5xl md:text-6xl tracking-tighter text-paper">{stat.value}</div>
      <div className="mt-2 text-xs uppercase tracking-widest text-paper/50">{stat.label}</div>
    </motion.div>
  );
}

export default StatCard;
