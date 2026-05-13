import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import useIsMobile from '../../hooks/useIsMobile';
import endwolfImg from '../../assets/endwolf.png';

const Hero = ({ openModal }) => {
  const isMobile = useIsMobile();
  const targetRef = useRef(null);

  // Manual scroll progress — avoids Framer Motion v12 + Lenis v1.3.x useScroll bug.
  const progress = useMotionValue(0);

  useEffect(() => {
    const onScroll = () => {
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      progress.set(Math.max(0, Math.min(1, -rect.top / total)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [progress]);

  const wolfOpacity   = useTransform(progress, [0, 0.45],                  [1, 0.45]);
  const textOpacity   = useTransform(progress, [0.12, 0.42, 0.62, 0.78],   [0, 1, 1, 0]);
  const textY         = useTransform(progress, [0.12, 0.42],                [60, 0]);
  const taglineOpacity = useTransform(progress, [0.22, 0.46, 0.62, 0.78],  [0, 1, 1, 0]);
  const taglineY      = useTransform(progress, [0.22, 0.46],                [24, 0]);
  const btnsOpacity   = useTransform(progress, [0.32, 0.52, 0.62, 0.78],   [0, 1, 1, 0]);

  return (
    <div
      ref={targetRef}
      style={{ position: 'relative', height: '320vh', width: '100%', background: '#080808' }}
    >
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(232,240,32,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(232,240,32,0.035) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Sticky viewport */}
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Wolf logo — fades as user scrolls */}
        <motion.div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          translateX: '-50%', translateY: '-50%',
          opacity: wolfOpacity, pointerEvents: 'none',
        }}>
          <img src={endwolfImg} alt="" style={{ width: 'min(52vw, 480px)', height: 'auto', display: 'block' }} />
        </motion.div>

        {/* THE WOLF AGE */}
        <motion.div style={{
          opacity: textOpacity, y: textY,
          position: 'relative', zIndex: 2,
          padding: isMobile ? '0 1.5rem' : '0',
          width: '100%',
        }}>
          <h1 style={{
            fontFamily: "'Bebas Neue', 'Anton', sans-serif",
            fontSize: isMobile ? 'clamp(3.2rem, 13vw, 5rem)' : 'clamp(5rem, 12.5vw, 13rem)',
            color: '#E8F020', lineHeight: '88%',
            letterSpacing: '0.02em', textAlign: 'center', margin: 0,
          }}>
            THE
            <span style={{ color: '#fff', WebkitTextStroke: '2px #E8F020' }}>WOLF</span>
            {' '}AGE
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p style={{
          opacity: taglineOpacity, y: taglineY,
          fontFamily: "'Space Grotesk', sans-serif",
          color: '#555', fontSize: '0.92rem', textAlign: 'center',
          letterSpacing: '0.34em', marginTop: isMobile ? '1.5rem' : '2.2rem',
          textTransform: 'uppercase',
          paddingTop: isMobile ? '10%' : '28%',
          paddingBottom: isMobile ? '44%' : '0',
          position: 'relative', zIndex: 2,
        }}>
          Digital Craft · Fearless Execution
        </motion.p>

        {/* CTA buttons */}
        <motion.div style={{
          opacity: btnsOpacity,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center', justifyContent: 'center',
          marginTop: isMobile ? '20%' : '2.6rem', gap: '1rem',
          position: 'relative', zIndex: 2,
          padding: isMobile ? '0 1.15rem' : '0',
          width: isMobile ? '90%' : 'auto',
        }}>
          <a href="#work" data-hover style={{
            padding: '0.9rem 2.5rem', background: '#E8F020', color: '#080808',
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: '0.82rem', letterSpacing: '0.2em', textDecoration: 'none',
            textTransform: 'uppercase', textAlign: 'center',
            width: isMobile ? '100%' : 'auto',
            clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
          }}>View Our Work</a>

          <button onClick={openModal} data-hover style={{
            padding: '0.9rem 2.5rem', border: '1px solid rgba(232,240,32,0.3)',
            color: '#E8F020', fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', background: 'transparent',
            textAlign: 'center', width: isMobile ? '100%' : 'auto',
            clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
            cursor: 'none',
          }}>Start a Project</button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
