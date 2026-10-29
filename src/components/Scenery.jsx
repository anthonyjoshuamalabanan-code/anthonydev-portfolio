import { useEffect, useRef } from 'react';
import { useReducedMotion, useScroll, useSpring } from 'framer-motion';
import ZodiacSky from './ZodiacSky.jsx';

export default function Scenery() {
  const sceneryRef = useRef(null);
  const reduceMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const scenery = sceneryRef.current;
    if (!scenery) return undefined;

    const updateAnimationState = () => {
      scenery.style.setProperty(
        '--scene-play-state',
        document.hidden ? 'paused' : 'running',
      );
    };

    updateAnimationState();
    document.addEventListener('visibilitychange', updateAnimationState);
    return () => document.removeEventListener('visibilitychange', updateAnimationState);
  }, []);

  return (
    <div
      ref={sceneryRef}
      className={`scenery${reduceMotion ? ' scenery-static' : ''}`}
      role="presentation"
      aria-hidden="true"
    >
      <ZodiacSky scrollProgress={progress} reducedMotion={reduceMotion} />
    </div>
  );
}
