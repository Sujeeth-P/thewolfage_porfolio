import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    const over = (e) => { if (e.target.closest('a,button,[data-hover]')) setHovered(true); };
    const out = () => setHovered(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
    };
  }, []);

  if (isTouchDevice) return null;
  return (
    <motion.div
      style={{
        x: springX, y: springY,
        translateX: '-50%', translateY: '-50%',
        position: 'fixed', top: 0, left: 0,
        pointerEvents: 'none', zIndex: 9999,
      }}
      animate={{ scale: hovered ? 2.5 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#DCDCDC', mixBlendMode: 'difference' }} />
    </motion.div>
  );
};

export default CustomCursor;
