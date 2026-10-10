import { MARQUEE_ITEMS } from '../../data/constants';

// CSS-only ticker (see .marquee in index.css): no JS animation loop, and it
// stops entirely under prefers-reduced-motion. Purely decorative, so hidden from assistive tech.
const Marquee = () => (
  <div className="marquee" aria-hidden="true">
    <div className="marquee-track">
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span key={i}>{item}</span>
      ))}
    </div>
  </div>
);

export default Marquee;
