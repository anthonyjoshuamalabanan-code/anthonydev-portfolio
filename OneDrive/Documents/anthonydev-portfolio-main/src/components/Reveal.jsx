import { motion } from 'framer-motion';

// Subtle fade-and-rise when a block first scrolls into view. Honors reduced-motion via MotionConfig.
export default function Reveal({ as = 'div', delay = 0, className = '', children }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </Component>
  );
}
