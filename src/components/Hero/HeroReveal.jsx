import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsap';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import useIsMobile from '../../hooks/useIsMobile';
import { HERO_REVEAL_STATEMENTS, REVEAL_COLORS } from '../../data/constants';

// Scroll distance per statement, as % of viewport height.
// Was 180% (≈9 screens for 5 lines); now ≈3.5 screens on phones, ≈5.5 on desktop.
const SCROLL_PER_STATEMENT_MOBILE = 70;
const SCROLL_PER_STATEMENT_DESKTOP = 110;

const HeroReveal = () => {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const total = HERO_REVEAL_STATEMENTS.length;
  const pinLength = total * (isMobile ? SCROLL_PER_STATEMENT_MOBILE : SCROLL_PER_STATEMENT_DESKTOP);

  useEffect(() => {
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const fadeIn = 0.28;
      const dwell = 0.44;
      const fadeOut = 0.28;
      // Opacity + a small lift only. No animated blur (expensive on mid-range phones).
      const hidden = { opacity: 0, y: 28 };
      const shown = { opacity: 1, y: 0, duration: fadeIn, ease: 'power2.out' };
      const exit = { opacity: 0, y: -28, duration: fadeOut, ease: 'power2.in' };

      textRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i > 0) tl.fromTo(el, hidden, shown, i);
        if (i < total - 1) tl.to(el, exit, i + fadeIn + dwell);
      });

      // The wrapper is tall; its sticky child stays on screen while we scrub the timeline.
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        animation: tl,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduced, total]);

  return (
    <section
      ref={containerRef}
      aria-label="What we believe"
      className={reduced ? undefined : 'pin-wrap'}
      style={{ '--pin-len': pinLength, background: '#080808', position: 'relative' }}
    >
      <div
        className={reduced ? undefined : 'pin-stick full-svh'}
        style={{
          position: reduced ? 'relative' : undefined,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: reduced ? '5rem 0' : 0,
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

      {/* Statements: stacked in one grid cell (no absolute/transform centering) */}
      <div style={{
        position: 'relative', zIndex: 10, width: '100%',
        display: reduced ? 'flex' : 'grid',
        flexDirection: 'column',
        placeItems: 'center',
        gap: reduced ? '2rem' : 0,
        padding: '0 1.25rem',
        textAlign: 'center',
      }}>
        {HERO_REVEAL_STATEMENTS.map((text, i) => (
          <h2
            key={i}
            ref={(el) => { textRefs.current[i] = el; }}
            style={{
              gridArea: '1 / 1',
              width: '100%',
              maxWidth: '1400px',
              fontFamily: "'Bebas Neue', 'Anton', sans-serif",
              fontSize: 'clamp(3rem, 9vw, 9rem)',
              color: REVEAL_COLORS[i],
              letterSpacing: '0.04em', textTransform: 'uppercase',
              margin: 0, lineHeight: 1.05,
              opacity: reduced || i === 0 ? 1 : 0,
              willChange: reduced ? undefined : 'transform, opacity',
            }}
          >
            {text}
          </h2>
        ))}
      </div>

      {/* Bottom label */}
      {!reduced && (
        <div style={{
          position: 'absolute', bottom: '2.8rem', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.62rem', letterSpacing: '0.4em',
          color: 'rgba(232,240,32,0.5)', textTransform: 'uppercase',
          zIndex: 10, whiteSpace: 'nowrap',
        }}>
          ( THE WOLF AGE )
        </div>
      )}
      </div>
    </section>
  );
};

export default HeroReveal;
