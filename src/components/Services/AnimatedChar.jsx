import React from 'react';
import { motion, useTransform } from 'framer-motion';

// Each char gets its own component so useTransform is called at component top-level,
// never inside a loop — this satisfies React's Rules of Hooks.
const AnimatedChar = React.memo(({ char, index, centerIndex, scrollYProgress }) => {
  const distanceFromCenter = index - centerIndex;
  const x        = useTransform(scrollYProgress, [0, 0.65], [distanceFromCenter * 60, 0]);
  const rotateX  = useTransform(scrollYProgress, [0, 0.65], [distanceFromCenter * 40, 0]);
  const opacity  = useTransform(scrollYProgress, [0.3, 0.60], [0, 1]);

  return (
    <motion.span style={{ x, rotateX, opacity, display: 'inline-block', color: index < centerIndex ? '#E8F020' : '#fff' }}>
      {char === ' ' ? ' ' : char}
    </motion.span>
  );
});

export default AnimatedChar;
