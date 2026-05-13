import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsap';
import { HERO_REVEAL_STATEMENTS, REVEAL_COLORS } from '../../data/constants';

const HeroReveal = () => {
  const containerRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const total = HERO_REVEAL_STATEMENTS.length;
      const tl = gsap.timeline();
      const fadeIn  = 0.28;
      const dwell   = 0.44;
      const fadeOut = 0.28;

      textRefs.current.forEach((el, i) => {
        if (!el) return;
        const seg = i;

        if (i === 0) {
          tl.to(el,
            { opacity: 0, filter: 'blur(12px)', duration: fadeOut, ease: 'power2.in' },
            seg + fadeIn + dwell
          );
        } else if (i === total - 1) {
          tl.fromTo(el,
            { opacity: 0, filter: 'blur(12px)' },
            { opacity: 1, filter: 'blur(0px)', duration: fadeIn, ease: 'power2.out' },
            seg
          );
        } else {
          tl.fromTo(el,
            { opacity: 0, filter: 'blur(12px)' },
            { opacity: 1, filter: 'blur(0px)', duration: fadeIn, ease: 'power2.out' },
            seg
          );
          tl.to(el,
            { opacity: 0, filter: 'blur(12px)', duration: fadeOut, ease: 'power2.in' },
            seg + fadeIn + dwell
          );
        }
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${total * 180}%`,
        pin: true,
        scrub: 2,
        animation: tl,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        height: '100vh', background: '#080808',
        position: 'relative', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(232,240,32,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,240,32,0.03) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw', height: '60vw',
        background: 'radial-gradient(ellipse, rgba(232,240,32,0.06) 0%, transparent 68%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Statements */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', textAlign: 'center' }}>
        {HERO_REVEAL_STATEMENTS.map((text, i) => (
          <h2
            key={i}
            ref={el => { textRefs.current[i] = el; }}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              fontFamily: "'Bebas Neue', 'Anton', sans-serif",
              fontSize: 'clamp(3.5rem, 9vw, 9rem)',
              color: REVEAL_COLORS[i],
              letterSpacing: '0.04em', textTransform: 'uppercase',
              margin: 0, lineHeight: 1.05,
              opacity: i === 0 ? 1 : 0,
              filter: i === 0 ? 'blur(0px)' : 'blur(14px)',
            }}
          >
            {text}
          </h2>
        ))}
      </div>

      {/* Bottom label */}
      <div style={{
        position: 'absolute', bottom: '2.8rem', left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '0.62rem', letterSpacing: '0.4em',
        color: 'rgba(232,240,32,0.3)', textTransform: 'uppercase',
        zIndex: 10, whiteSpace: 'nowrap',
      }}>
        ( THE WOLF AGE )
      </div>
    </section>
  );
};

export default HeroReveal;
