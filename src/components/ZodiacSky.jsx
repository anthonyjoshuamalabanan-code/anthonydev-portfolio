import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useTransform } from 'framer-motion';
import zodiac from '../data/zodiac.js';

function sparklePath(x, y, radius = 2.2) {
  return `M ${x} ${y - radius} L ${x + radius * 0.42} ${y - radius * 0.42} L ${x + radius} ${y} L ${x + radius * 0.42} ${y + radius * 0.42} L ${x} ${y + radius} L ${x - radius * 0.42} ${y + radius * 0.42} L ${x - radius} ${y} L ${x - radius * 0.42} ${y - radius * 0.42} Z`;
}

function constellationLine(sign, [start, end]) {
  const [x1, y1] = sign.stars[start];
  const [x2, y2] = sign.stars[end];
  return `M ${x1} ${y1} L ${x2} ${y2}`;
}

function SignConstellation({ sign, reducedMotion }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: reducedMotion ? 1 : 1.03 }}
      transition={{ duration: reducedMotion ? 0.3 : 0.8, ease: 'easeInOut' }}
      transform="translate(30 22)"
    >
      {sign.lines.map((line, index) => (
        <motion.path
          key={`line-${index}`}
          d={constellationLine(sign, line)}
          fill="none"
          stroke="rgb(var(--accent))"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: reducedMotion ? 1 : 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          exit={{ pathLength: reducedMotion ? 1 : 0, opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.3 : 0.42, delay: reducedMotion ? 0 : index * 0.025 }}
        />
      ))}
      {sign.stars.map(([x, y], index) => (
        <motion.path
          key={`star-${index}`}
          className="zodiac-twinkle"
          d={sparklePath(x, y)}
          fill="rgb(var(--accent))"
          stroke="rgb(var(--accent))"
          strokeWidth="0.35"
          vectorEffect="non-scaling-stroke"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 0.9, scale: 1 }}
          exit={{ opacity: 0, scale: 0.55 }}
          transition={{ duration: reducedMotion ? 0.3 : 0.35, delay: reducedMotion ? 0 : index * 0.045 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
      <motion.path
        d={sign.symbol}
        transform="translate(101 93) scale(0.58)"
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.78 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0.3 : 0.8 }}
      />
      <text
        x="130"
        y="255"
        textAnchor="middle"
        className="zodiac-sign-name"
      >
        {sign.name.toUpperCase().split('').join(' ')}
      </text>
    </motion.g>
  );
}

function EmblemRing({ rotation }) {
  return (
    <motion.g style={{ rotate: rotation, transformOrigin: '130px 122px' }}>
      <circle
        cx="130"
        cy="122"
        r="103"
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth="0.8"
        opacity="0.75"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx="130"
        cy="122"
        r="94"
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth="0.55"
        opacity="0.6"
        vectorEffect="non-scaling-stroke"
      />
      {Array.from({ length: 12 }, (_, index) => (
        <line
          key={index}
          x1="130"
          y1="13"
          x2="130"
          y2={index % 3 === 0 ? 24 : 20}
          transform={`rotate(${index * 30} 130 122)`}
          stroke="rgb(var(--accent))"
          strokeWidth="0.8"
          opacity="0.78"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </motion.g>
  );
}

function ZodiacProgress({ activeIndex }) {
  return (
    <div className="zodiac-progress" aria-hidden="true">
      {zodiac.map((sign, index) => (
        <span
          key={sign.id}
          className={index === activeIndex ? 'zodiac-progress-dot is-active' : 'zodiac-progress-dot'}
        />
      ))}
    </div>
  );
}

export default function ZodiacSky({ scrollProgress, reducedMotion = false }) {
  const initialIndex = Math.min(11, Math.floor(scrollProgress.get() * zodiac.length));
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const activeIndexRef = useRef(initialIndex);
  const localProgressRef = useRef(0);
  const ringRotation = useTransform(scrollProgress, [0, 1], [0, 360]);
  const staticRotation = useTransform(scrollProgress, [0, 1], [0, 0]);

  useMotionValueEvent(scrollProgress, 'change', (latest) => {
    const scaledProgress = Math.min(1, Math.max(0, latest)) * zodiac.length;
    const index = Math.min(11, Math.floor(scaledProgress));
    localProgressRef.current = index === 11 && latest >= 1
      ? 1
      : scaledProgress - index;

    if (index !== activeIndexRef.current) {
      activeIndexRef.current = index;
      setActiveIndex(index);
    }
  });

  const sign = zodiac[activeIndex];
  const rotation = reducedMotion ? staticRotation : ringRotation;

  return (
    <div className="zodiac-layer" aria-hidden="true" role="presentation">
      <ZodiacProgress activeIndex={activeIndex} />
      <svg
        className="zodiac-emblem"
        viewBox="0 0 260 300"
        focusable="false"
        aria-hidden="true"
      >
        <EmblemRing rotation={rotation} />
        <path
          d="M130 53 197 122 130 191 63 122Z M130 63 187 122 130 181 73 122Z"
          fill="none"
          stroke="rgb(var(--accent))"
          strokeWidth="0.75"
          opacity="0.7"
          vectorEffect="non-scaling-stroke"
        />
        <AnimatePresence mode="wait" initial={false}>
          <SignConstellation
            key={sign.id}
            sign={sign}
            reducedMotion={reducedMotion}
          />
        </AnimatePresence>
      </svg>
    </div>
  );
}
