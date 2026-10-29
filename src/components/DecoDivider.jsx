import { motion } from 'framer-motion';

export default function DecoDivider() {
  return (
    <motion.div
      aria-hidden="true"
      className="deco-divider"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
    >
      <motion.span
        className="absolute left-0 right-0 top-1/2 h-px origin-center bg-accent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
      <span className="deco-diamond relative z-10" />
    </motion.div>
  );
}
