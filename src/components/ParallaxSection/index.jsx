import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import useIsMobile from '../../hooks/useIsMobile';
import WolfLogo from '../common/WolfLogo';

const COLUMNS = [
  { color: '#E8F020', top: '-10%' },
  { color: '#20F0D4', top: '-30%' },
  { color: '#F020A0', top: '-10%' },
  { color: '#20A0F0', top: '-22%' },
];

const ParallaxSection = () => {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = el.offsetHeight + viewH;
      const scrolled = viewH - rect.top;
      scrollYProgress.set(Math.max(0, Math.min(1, scrolled / total)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollYProgress]);

  const yValues = [
    useTransform(scrollYProgress, [0, 1], ['0%', '-22%']),
    useTransform(scrollYProgress, [0, 1], ['0%', '-38%']),
    useTransform(scrollYProgress, [0, 1], ['0%', '-15%']),
    useTransform(scrollYProgress, [0, 1], ['0%', '-32%']),
  ];

  const cols = isMobile ? COLUMNS.slice(0, 2) : COLUMNS;

  return (
    <div id="stack" ref={ref} style={{ position: 'relative', height: '180vh', background: '#080808' }}>
      {/* Label overlay */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 10, textAlign: 'center', pointerEvents: 'none',
      }}>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#E8F020', fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          [ 03 ] Tech Stack
        </p>
        <h2 style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: 'clamp(3rem, 7vw, 7rem)', color: '#fff', margin: 0, lineHeight: 0.9 }}>
          BUILT WITH<br /><span style={{ color: '#E8F020' }}>PRECISION</span>
        </h2>
      </div>

      {/* Sticky clipping window */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: isMobile ? '0.75rem' : '1.5rem', padding: isMobile ? '1rem' : '2rem', height: '100%', alignItems: 'flex-start' }}>
          {cols.map(({ color, top }, i) => (
            <motion.div key={i} style={{ y: yValues[i], flex: 1, minWidth: 0, position: 'relative', top }}>
              {[0, 1, 2].map((j) => (
                <div key={j} style={{
                  width: '100%', aspectRatio: '3/4', marginBottom: '1.5rem',
                  background: `linear-gradient(135deg, ${color}22, ${color}06)`,
                  border: `1px solid ${color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <WolfLogo size={36} />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParallaxSection;
