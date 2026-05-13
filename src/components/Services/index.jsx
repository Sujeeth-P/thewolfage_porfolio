import { useEffect, useRef } from 'react';
import { useMotionValue } from 'framer-motion';
import useIsMobile from '../../hooks/useIsMobile';
import { SERVICES } from '../../data/services';
import AnimatedChar from './AnimatedChar';
import ServiceCard from './ServiceCard';

const REVEAL_TEXT = 'EVERY TOOL. ONE STANDARD.';

const Services = () => {
  const isMobile = useIsMobile();
  const targetRef = useRef(null);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const onScroll = () => {
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      scrollYProgress.set(Math.max(0, Math.min(1, -rect.top / total)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollYProgress]);

  const chars = REVEAL_TEXT.split('');
  const centerIndex = Math.floor(chars.length / 2);

  return (
    <section
      id="services"
      ref={targetRef}
      style={{ background: '#0e0e0e', padding: isMobile ? '4rem 0 3rem' : '8rem 0 6rem', position: 'relative', minHeight: '280vh' }}
    >
      {/* Sticky scroll text reveal */}
      <div style={{ position: 'sticky', top: '18vh', zIndex: 2, paddingBottom: '4rem' }}>
        <div style={{
          fontFamily: "'Bebas Neue', 'Anton', sans-serif",
          fontSize: 'clamp(1.5rem, 5vw, 5.5rem)',
          textAlign: 'center', letterSpacing: '-0.01em', perspective: '600px',
        }}>
          {chars.map((char, index) => (
            <AnimatedChar
              key={index}
              char={char}
              index={index}
              centerIndex={centerIndex}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0 1.25rem' : '0 2.5rem' }}>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#E8F020', fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '3rem' }}>
          [ 02 ] What We Build
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
