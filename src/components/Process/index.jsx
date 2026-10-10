import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsap';
import useIsMobile from '../../hooks/useIsMobile';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { PROCESS_STEPS } from '../../data/constants';

const Process = () => {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  // Pinned, scrubbed version is desktop-only. Phones and reduced-motion visitors
  // get the four steps as a normal vertical list (was ~6 screens of pinned scroll).
  const animated = !isMobile && !reduced;

  const containerRef = useRef(null);
  const stageRefs = useRef([]);
  const labelRefs = useRef([]);
  const tickerRefs = useRef([]);
  const progressFillRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    if (!animated) return undefined;

    const ctx = gsap.context(() => {
      const total = PROCESS_STEPS.length;
      const dim = '#5c5c5c';

      stageRefs.current.forEach((el, i) => {
        if (!el || i === 0) return;
        gsap.set(el, { opacity: 0, y: 32 });
      });
      if (labelRefs.current[0]) gsap.set(labelRefs.current[0], { x: 10 });
      labelRefs.current.forEach((el, i) => {
        if (!el || i === 0) return;
        gsap.set(el, { color: dim, x: 0 });
      });
      tickerRefs.current.forEach((el, i) => {
        if (!el || i === 0) return;
        gsap.set(el, { scaleY: 0, opacity: 0 });
      });

      const tl = gsap.timeline();
      const fadeIn  = 0.24;
      const dwell   = 0.52;
      const fadeOut = 0.24;

      // Opacity + lift only (animated blur removed)
      stageRefs.current.forEach((el, i) => {
        if (!el) return;
        const seg = i;
        if (i === 0) {
          tl.to(el, { opacity: 0, y: -32, duration: fadeOut, ease: 'power2.in' }, seg + fadeIn + dwell);
        } else if (i === total - 1) {
          tl.fromTo(el, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: fadeIn, ease: 'power2.out' }, seg);
        } else {
          tl.fromTo(el, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: fadeIn, ease: 'power2.out' }, seg);
          tl.to(el, { opacity: 0, y: -32, duration: fadeOut, ease: 'power2.in' }, seg + fadeIn + dwell);
        }
      });

      labelRefs.current.forEach((el, i) => {
        if (!el) return;
        const seg = i;
        const dur = 0.18;
        if (i === 0) {
          tl.to(el, { color: 'rgba(232,240,32,0.3)', x: 0, duration: dur, ease: 'power2.inOut' }, seg + 0.76);
        } else {
          tl.fromTo(el, { color: dim, x: 0 }, { color: '#E8F020', x: 10, duration: dur, ease: 'power2.out' }, seg + 0.08);
          if (i < total - 1) {
            tl.to(el, { color: 'rgba(232,240,32,0.3)', x: 0, duration: dur, ease: 'power2.inOut' }, seg + 0.76);
          }
        }
      });

      tickerRefs.current.forEach((el, i) => {
        if (!el) return;
        const seg = i;
        const dur = 0.18;
        if (i === 0) {
          tl.to(el, { opacity: 0.22, duration: dur, ease: 'power2.inOut' }, seg + 0.76);
        } else {
          tl.fromTo(el, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: dur, ease: 'power2.out' }, seg + 0.08);
          if (i < total - 1) {
            tl.to(el, { opacity: 0.22, duration: dur, ease: 'power2.inOut' }, seg + 0.76);
          }
        }
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6, animation: tl,
        onUpdate(self) {
          if (progressFillRef.current) {
            progressFillRef.current.style.width = `${self.progress * 100}%`;
          }
          if (counterRef.current) {
            const idx = Math.min(Math.floor(self.progress * total), total - 1);
            counterRef.current.textContent = `${String(idx + 1).padStart(2, '0')} — ${String(total).padStart(2, '0')}`;
          }
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [animated]);

  /* ---------------- Phones / reduced motion: plain vertical list ---------------- */
  if (!animated) {
    return (
      <section
        id="process"
        style={{ background: '#080808', padding: isMobile ? '4.5rem 1.25rem' : '6rem 2.5rem', position: 'relative' }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#E8F020', fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', margin: '0 0 1.2rem' }}>
            [ 04 ] Process
          </p>
          <h2 style={{
            fontFamily: "'Bebas Neue', 'Anton', sans-serif",
            fontSize: 'clamp(2.6rem, 11vw, 4.5rem)',
            color: '#fff', lineHeight: 0.9, margin: '0 0 2.25rem', letterSpacing: '-0.01em',
          }}>
            FROM BRIEF<br /><span style={{ color: '#E8F020' }}>TO SHIPPED</span>
          </h2>

          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '1rem' }}>
            {PROCESS_STEPS.map((item) => (
              <li
                key={item.step}
                style={{
                  position: 'relative', overflow: 'hidden',
                  border: '1px solid rgba(232,240,32,0.14)',
                  background: 'rgba(255,255,255,0.02)',
                  padding: '1.5rem 1.25rem 1.4rem',
                }}
              >
                <span aria-hidden="true" style={{
                  position: 'absolute', top: '0.4rem', right: '0.9rem',
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: '5rem', lineHeight: 1,
                  color: 'rgba(232,240,32,0.07)', userSelect: 'none',
                }}>{item.step}</span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span aria-hidden="true" style={{ fontSize: '1.5rem', color: '#E8F020', lineHeight: 1 }}>{item.icon}</span>
                  <h3 style={{
                    fontFamily: "'Bebas Neue', 'Anton', sans-serif",
                    fontSize: '2rem', color: '#fff', margin: 0, letterSpacing: '0.02em', lineHeight: 1,
                  }}>
                    <span style={{ color: '#E8F020' }}>{item.step}</span> {item.title}
                  </h3>
                </div>

                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif", color: '#9a9a9a',
                  lineHeight: 1.7, fontSize: '0.95rem', margin: '0 0 1rem', position: 'relative',
                }}>{item.text}</p>

                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', position: 'relative' }}>
                  {item.tags.map((tag) => (
                    <span key={tag} style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.62rem', letterSpacing: '0.2em',
                      color: 'rgba(232,240,32,0.8)',
                      border: '1px solid rgba(232,240,32,0.25)',
                      padding: '0.28rem 0.65rem', textTransform: 'uppercase',
                    }}>{tag}</span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  /* ---------------- Desktop: pinned, scrubbed stages ---------------- */
  return (
    <section
      id="process"
      ref={containerRef}
      className="pin-wrap"
      style={{ '--pin-len': PROCESS_STEPS.length * 100, background: '#080808' }}
    >
      <div
        className="pin-stick full-svh"
        style={{ overflow: 'hidden', display: 'flex', alignItems: 'center' }}
      >
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(232,240,32,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(232,240,32,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '66%',
        transform: 'translate(-50%, -50%)',
        width: '55vw', height: '55vw',
        background: 'radial-gradient(ellipse, rgba(232,240,32,0.045) 0%, transparent 68%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(232,240,32,0.07)', zIndex: 10 }}>
        <div ref={progressFillRef} style={{ height: '100%', width: '0%', background: '#E8F020' }} />
      </div>

      {/* Stage counter */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', right: '2.5rem',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '0.65rem', letterSpacing: '0.32em',
        color: 'rgba(232,240,32,0.5)', zIndex: 10,
      }}>
        <span ref={counterRef}>01 — 04</span>
      </div>

      {/* Two-column grid */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '0 2.5rem',
        width: '100%', display: 'grid',
        gridTemplateColumns: 'minmax(240px, 1fr) 1.65fr',
        gap: 'clamp(3rem, 6vw, 7rem)',
        alignItems: 'center',
        position: 'relative', zIndex: 2,
      }}>
        {/* Left: Label + Title + Nav */}
        <div>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#E8F020', fontSize: '0.68rem', letterSpacing: '0.35em', textTransform: 'uppercase', margin: '0 0 1.2rem' }}>
            [ 04 ] Process
          </p>
          <h2 style={{
            fontFamily: "'Bebas Neue', 'Anton', sans-serif",
            fontSize: 'clamp(2.8rem, 4.5vw, 5.5rem)',
            color: '#fff', lineHeight: 0.88,
            margin: '0 0 clamp(2.5rem, 4vh, 4rem)',
            letterSpacing: '-0.01em',
          }}>
            FROM BRIEF<br />
            <span style={{ color: '#E8F020' }}>TO SHIPPED</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {PROCESS_STEPS.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem',
                padding: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.035)',
                overflow: 'hidden',
              }}>
                <div
                  ref={el => { tickerRefs.current[i] = el; }}
                  style={{ width: '2px', height: '2rem', background: '#E8F020', flexShrink: 0, transformOrigin: 'top center' }}
                />
                <p
                  ref={el => { labelRefs.current[i] = el; }}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(0.68rem, 1.05vw, 0.8rem)',
                    letterSpacing: '0.16em', margin: 0, textTransform: 'uppercase',
                    color: i === 0 ? '#E8F020' : '#5c5c5c',
                  }}
                >
                  {item.step} — {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Stage content panels */}
        <div style={{ position: 'relative', height: 'clamp(300px, 42vh, 460px)' }}>
          {PROCESS_STEPS.map((item, i) => (
            <div
              key={i}
              ref={el => { stageRefs.current[i] = el; }}
              style={{
                position: 'absolute', inset: 0,
                padding: 'clamp(1.8rem, 3vw, 3rem)',
                border: '1px solid rgba(232,240,32,0.07)',
                background: 'rgba(8,8,8,0.8)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                opacity: i === 0 ? 1 : 0,
                willChange: 'transform, opacity',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '2rem', color: '#E8F020', lineHeight: 1 }}>{item.icon}</span>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(4.5rem, 9vw, 9rem)',
                  color: 'rgba(232,240,32,0.05)', lineHeight: 1, userSelect: 'none',
                }}>{item.step}</span>
              </div>

              <h3 style={{
                fontFamily: "'Bebas Neue', 'Anton', sans-serif",
                fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                color: '#fff', margin: '0.6rem 0', letterSpacing: '0.02em', lineHeight: 1,
              }}>{item.title}</h3>

              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#8a8a8a', lineHeight: 1.78,
                fontSize: 'clamp(0.82rem, 1.25vw, 0.97rem)',
                margin: '0 0 1.5rem', flexGrow: 1,
              }}>{item.text}</p>

              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                {item.tags.map((tag, j) => (
                  <span key={j} style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.58rem', letterSpacing: '0.22em',
                    color: 'rgba(232,240,32,0.7)',
                    border: '1px solid rgba(232,240,32,0.18)',
                    padding: '0.26rem 0.62rem', textTransform: 'uppercase',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default Process;
