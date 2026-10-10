import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import useIsMobile from '../../hooks/useIsMobile';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { TECH_STACK } from '../../data/constants';

const COLUMNS = [
  { color: '#E8F020', top: '-10%' },
  { color: '#20F0D4', top: '-30%' },
  { color: '#F020A0', top: '-10%' },
  { color: '#20A0F0', top: '-22%' },
];

const LABEL_STYLE = {
  fontFamily: "'Space Grotesk', sans-serif", color: '#E8F020', fontSize: '0.75rem',
  letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '0.75rem',
};

const ParallaxSection = () => {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  // Parallax columns are a desktop effect. Phones / reduced motion get a compact stack list.
  const animated = !isMobile && !reduced;

  const ref = useRef(null);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    if (!animated) return undefined;
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
  }, [animated, scrollYProgress]);

  const yValues = [
    useTransform(scrollYProgress, [0, 1], ['0%', '-22%']),
    useTransform(scrollYProgress, [0, 1], ['0%', '-38%']),
    useTransform(scrollYProgress, [0, 1], ['0%', '-15%']),
    useTransform(scrollYProgress, [0, 1], ['0%', '-32%']),
  ];

  if (!animated) {
    return (
      <section
        id="stack"
        style={{ background: '#080808', padding: isMobile ? '4.5rem 1.25rem' : '6rem 2.5rem', textAlign: 'center' }}
      >
        <p style={LABEL_STYLE}>[ 03 ] Tech Stack</p>
        <h2 style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: 'clamp(2.6rem, 11vw, 5rem)', color: '#fff', margin: '0 0 2rem', lineHeight: 0.9 }}>
          BUILT WITH <span style={{ color: '#E8F020' }}>PRECISION</span>
        </h2>
        <ul style={{
          listStyle: 'none', margin: '0 auto', padding: 0, maxWidth: '640px',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem',
        }}>
          {TECH_STACK.map((tech) => (
            <li key={tech} style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff',
              border: '1px solid rgba(232,240,32,0.28)', background: 'rgba(232,240,32,0.04)',
              padding: '0.6rem 1rem',
            }}>{tech}</li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <div id="stack" ref={ref} style={{ position: 'relative', height: '150vh', background: '#080808' }}>
      {/* Label overlay */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 10, textAlign: 'center', pointerEvents: 'none',
      }}>
        <p style={LABEL_STYLE}>[ 03 ] Tech Stack</p>
        <h2 style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif", fontSize: 'clamp(3rem, 7vw, 7rem)', color: '#fff', margin: 0, lineHeight: 0.9, textShadow: '0 0 40px #080808, 0 0 20px #080808' }}>
          BUILT WITH<br /><span style={{ color: '#E8F020' }}>PRECISION</span>
        </h2>
      </div>

      {/* Sticky clipping window */}
      <div className="full-svh" style={{ position: 'sticky', top: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '1.5rem', padding: '2rem', height: '100%', alignItems: 'flex-start' }}>
          {COLUMNS.map(({ color, top }, i) => (
            <motion.div key={i} style={{ y: yValues[i], flex: 1, minWidth: 0, position: 'relative', top, willChange: 'transform' }}>
              {[0, 1, 2].map((j) => (
                <div key={j} style={{
                  width: '100%', aspectRatio: '3/4', marginBottom: '1.5rem',
                  background: `linear-gradient(135deg, ${color}22, ${color}06)`,
                  border: `1px solid ${color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Bebas Neue', 'Anton', sans-serif",
                  fontSize: 'clamp(1.2rem, 2.4vw, 2.4rem)', letterSpacing: '0.06em',
                  color: `${color}b3`, textAlign: 'center', padding: '0 0.5rem',
                }}>
                  {TECH_STACK[i * 3 + j]}
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
