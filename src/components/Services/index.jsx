import { useEffect, useRef } from 'react';
import { useMotionValue } from 'framer-motion';
import useIsMobile from '../../hooks/useIsMobile';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { SERVICES } from '../../data/services';
import AnimatedChar from './AnimatedChar';
import ServiceCard from './ServiceCard';

const REVEAL_TEXT = 'EVERY TOOL. ONE STANDARD.';

const Services = () => {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  // The 280vh sticky letter-by-letter reveal is desktop-only. On phones (and for
  // reduced-motion visitors) the headline is plain text and the cards follow directly.
  const animated = !isMobile && !reduced;

  const targetRef = useRef(null);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    if (!animated) return undefined;
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
  }, [animated, scrollYProgress]);

  const chars = REVEAL_TEXT.split('');
  const centerIndex = Math.floor(chars.length / 2);

  return (
    <section
      id="services"
      ref={targetRef}
      style={{
        background: '#0e0e0e',
        padding: isMobile ? '4.5rem 0 3rem' : '8rem 0 6rem',
        position: 'relative',
        minHeight: animated ? '280vh' : undefined,
      }}
    >
      {animated ? (
        // overflowX: clip, because letters start up to 720px off to each side and would otherwise widen the page
        <div style={{ position: 'sticky', top: '18vh', zIndex: 2, paddingBottom: '4rem', overflowX: 'clip' }}>
          <div
            role="heading"
            aria-level={2}
            aria-label={REVEAL_TEXT}
            style={{
              fontFamily: "'Bebas Neue', 'Anton', sans-serif",
              fontSize: 'clamp(1.5rem, 5vw, 5.5rem)',
              textAlign: 'center', letterSpacing: '-0.01em', perspective: '600px',
            }}
          >
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
      ) : (
        <h2 style={{
          fontFamily: "'Bebas Neue', 'Anton', sans-serif",
          fontSize: 'clamp(2.4rem, 11vw, 5.5rem)',
          lineHeight: 0.95, textAlign: 'center', letterSpacing: '-0.01em',
          margin: '0 0 3rem', padding: '0 1.25rem', color: '#fff',
        }}>
          <span style={{ color: '#E8F020' }}>EVERY TOOL.</span> ONE STANDARD.
        </h2>
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0 1.25rem' : '0 2.5rem' }}>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#E8F020', fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '2rem' }}>
          [ 02 ] What We Build
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
