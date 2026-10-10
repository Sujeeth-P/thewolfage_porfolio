import { useEffect, useRef } from 'react';
import './Hero.css';
import Marquee from '../common/Marquee';
import wolfImg from '../../assets/endwolf.webp';
import { HERO_COPY } from '../../data/constants';

const Hero = ({ openModal }) => {
  const wolfRef = useRef(null);

  // Subtle parallax on the wolf — large screens only, one rAF-throttled
  // write per frame, and never when the visitor prefers reduced motion.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return;
      wolfRef.current?.style.setProperty('--wolf-y', `${(y * 0.16).toFixed(1)}px`);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

    const attach = () => {
      window.removeEventListener('scroll', onScroll);
      if (mq.matches) {
        window.addEventListener('scroll', onScroll, { passive: true });
      } else {
        wolfRef.current?.style.removeProperty('--wolf-y');
      }
    };
    attach();
    mq.addEventListener('change', attach);

    return () => {
      mq.removeEventListener('change', attach);
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__wolf" aria-hidden="true">
        <img
          ref={wolfRef}
          src={wolfImg}
          alt=""
          width="491"
          height="508"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="hero__inner">
        <p className="hero__kicker">{HERO_COPY.kicker}</p>

        <h1 id="hero-title" className="hero__title" aria-label="The Wolf Age">
          <span className="hero__line" aria-hidden="true"><span style={{ '--d': '0.15s' }}>THE</span></span>{' '}
          <span className="hero__line" aria-hidden="true">
            <span className="hero__outline" style={{ '--d': '0.24s' }}>WOLF</span>
          </span>
          <span className="hero__line" aria-hidden="true"><span style={{ '--d': '0.33s' }}>AGE</span></span>
        </h1>

        <p className="hero__sub">{HERO_COPY.sub}</p>

        <div className="hero__cta">
          <button type="button" className="btn btn--primary" data-hover onClick={openModal}>
            {HERO_COPY.primaryCta}
          </button>
          <a className="btn btn--ghost" data-hover href="#work">
            {HERO_COPY.secondaryCta}
          </a>
        </div>
      </div>

      <Marquee />
    </section>
  );
};

export default Hero;
