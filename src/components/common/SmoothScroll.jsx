import { useEffect } from 'react';
import { ScrollTrigger } from '../../utils/gsap';

/**
 * Lenis smooth scrolling for mouse/trackpad devices only.
 * - Touch devices keep native momentum scrolling (best feel, zero extra JS downloaded or run).
 * - Skipped entirely when the visitor prefers reduced motion.
 * - Lenis is loaded on demand, and its animation frame is cancelled on cleanup.
 */
const SmoothScroll = () => {
  useEffect(() => {
    // Fonts load after first paint and can change text heights.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || reduced) return undefined;

    let cancelled = false;
    let lenis;
    let frame = 0;

    Promise.all([import('lenis'), import('lenis/dist/lenis.css')]).then(([mod]) => {
      if (cancelled) return;
      const Lenis = mod.default;
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
