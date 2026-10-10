import { useEffect, useState } from 'react';

/** Scroll to an element that mounts a moment later (used for early anchor clicks). */
const scrollToWhenPresent = (id) => {
  let frames = 0;
  const tick = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ block: 'start' });
    } else if (frames++ < 180) {
      requestAnimationFrame(tick);
    }
  };
  requestAnimationFrame(tick);
};

/**
 * Flips to true once the browser is idle, or as soon as the visitor interacts,
 * or when they click an in-page anchor whose section has not mounted yet.
 * Lets the hero paint first and defers everything below the fold.
 */
export default function useIdleReady(timeout = 900) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return undefined;

    const go = () => setReady(true);
    const events = ['pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll'];
    events.forEach((name) => window.addEventListener(name, go, { once: true, passive: true }));

    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href').slice(1);
      if (!id || document.getElementById(id)) return;
      event.preventDefault();
      go();
      scrollToWhenPresent(id);
    };
    document.addEventListener('click', onClick);

    const idleId = 'requestIdleCallback' in window
      ? window.requestIdleCallback(go, { timeout })
      : window.setTimeout(go, 400);

    return () => {
      events.forEach((name) => window.removeEventListener(name, go));
      document.removeEventListener('click', onClick);
      if ('requestIdleCallback' in window) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, [ready, timeout]);

  return ready;
}
