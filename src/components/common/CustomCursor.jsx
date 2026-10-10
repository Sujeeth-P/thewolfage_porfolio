import { useEffect, useRef } from 'react';

/**
 * Custom dot cursor for mouse users only. Plain rAF + transform (no animation
 * library), and it never attaches a listener on touch devices (see .cursor in index.css).
 */
const CustomCursor = () => {
  const ref = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const el = ref.current;
    if (!mq.matches || !el) return undefined;

    let x = -100;
    let y = -100;
    let cx = -100;
    let cy = -100;
    let scale = 1;
    let targetScale = 1;
    let frame = 0;

    const tick = () => {
      cx += (x - cx) * 0.28;
      cy += (y - cy) * 0.28;
      scale += (targetScale - scale) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      const settled = Math.abs(x - cx) < 0.1 && Math.abs(y - cy) < 0.1 && Math.abs(targetScale - scale) < 0.01;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => { if (!frame) frame = requestAnimationFrame(tick); };

    const move = (e) => { x = e.clientX; y = e.clientY; wake(); };
    const over = (e) => {
      if (e.target.closest?.('a,button,[data-hover]')) { targetScale = 2.5; wake(); }
    };
    const out = () => { targetScale = 1; wake(); };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    window.addEventListener('mouseout', out, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true"><i /></div>;
};

export default CustomCursor;
