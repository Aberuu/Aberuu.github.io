import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease, delay: index * 0.08 }}
      className="group grid grid-cols-12 gap-4 items-start py-8 md:py-10 border-b border-ink/15 hover:bg-ink/[0.02] transition-colors duration-300"
    >
      <div className="col-span-2 font-display font-bold text-xl md:text-2xl text-violet">{service.step}</div>
      <div className="col-span-10 md:col-span-4 font-display font-bold text-2xl md:text-3xl tracking-tight text-ink">{service.title}</div>
      <div className="col-span-12 md:col-span-6 text-sm md:text-base text-ink/65 leading-relaxed font-body">{service.desc}</div>
    </motion.div>
  );
}

export default ServiceCard;
