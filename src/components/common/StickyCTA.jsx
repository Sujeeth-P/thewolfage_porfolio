import { useEffect, useState } from 'react';

/**
 * Phone-only "Start a Project" bar. Appears once the visitor scrolls past the
 * hero, hides again when the Contact section is on screen or the form is open.
 */
const StickyCTA = ({ onClick, hidden = false }) => {
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setPastHero(window.scrollY > window.innerHeight * 0.85);
      const contact = document.getElementById('contact');
      setAtContact(!!contact && contact.getBoundingClientRect().top < window.innerHeight * 0.8);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const visible = pastHero && !atContact && !hidden;

  return (
    <div className={`sticky-cta${visible ? ' is-visible' : ''}`} aria-hidden={!visible} inert={!visible}>
      <button type="button" className="btn btn--primary" onClick={onClick}>
        Start a Project
      </button>
    </div>
  );
};

export default StickyCTA;
