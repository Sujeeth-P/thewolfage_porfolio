import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsap';

// Pre-inverted, downscaled WebP figures (generated once, ~0.6 MB total).
// Replaces 30 PNGs (4.5 MB) that were decoded and inverted on a canvas at runtime.
const PEEP_URLS = Object.entries(
  import.meta.glob('../../assets/peep-inv/*.webp', { eager: true, query: '?url', import: 'default' }),
)
  .sort(([a], [b]) => parseInt(a.match(/(\d+)\.webp$/)[1], 10) - parseInt(b.match(/(\d+)\.webp$/)[1], 10))
  .map(([, url]) => url);

const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

const CrowdCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Lighter crowd on phones: fewer figures, smaller, lower pixel density.
    const TOTAL = mobile ? 20 : 30;
    const BASE_H = mobile ? 280 : 500;
    const FIG_W = BASE_H * 0.4;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    const step = Math.max(1, Math.floor(PEEP_URLS.length / TOTAL));
    const urls = PEEP_URLS.filter((_, i) => i % step === 0).slice(0, TOTAL);

    const stage = { width: 0, height: 0 };
    const allPeeps = [];
    const available = [];
    const crowd = [];
    let isVisible = false;
    let cancelled = false;
    let booted = false;
    let visObserver;
    let resizeObserver;
    let lastSize = '';

    const createPeep = (id, image) => ({ id, image, x: 0, y: 0, anchorY: 0, depthRatio: 0, scaleX: 1, scaleY: 1, walk: null });

    const resetPeep = (peep) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const depthRatio = Math.random();
      const peepScale = 0.6 + depthRatio * 0.9;
      const renderedH = BASE_H * peepScale;
      // Phones: stand the crowd on the bottom edge (the canvas is shorter than the figures' desktop offset).
      const startY = mobile ? stage.height - 12 - (1 - depthRatio) * 40 : renderedH + 30 + (1 - depthRatio) * 50;
      let startX;
      let endX;

      if (direction === 1) {
        startX = -FIG_W * peepScale;
        endX = stage.width + FIG_W * peepScale;
        peep.scaleX = peepScale;
      } else {
        startX = stage.width + FIG_W * peepScale;
        endX = -FIG_W * peepScale;
        peep.scaleX = -peepScale;
      }

      peep.scaleY = peepScale;
      peep.depthRatio = depthRatio;
      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;
      return { startY, endX };
    };

    const normalWalk = (peep, props) => {
      const { startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;
      const tl = gsap.timeline();
      const speed = 0.4 + (1 - peep.depthRatio) * 0.8;
      tl.timeScale(speed);
      tl.to(peep, { duration: xDuration, x: endX, ease: 'none' }, 0);
      tl.to(peep, { duration: yDuration, repeat: xDuration / yDuration, yoyo: true, y: startY - 8 }, 0);
      return tl;
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      crowd.forEach((peep) => {
        ctx.save();
        ctx.translate(peep.x, peep.y);
        ctx.scale(peep.scaleX, peep.scaleY);
        const imgW = peep.image.width || 120;
        const imgH = peep.image.height || 300;
        const drawW = (imgW / imgH) * BASE_H;
        ctx.globalAlpha = 0.5 + peep.depthRatio * 0.7;
        ctx.drawImage(peep.image, 0, -BASE_H, drawW, BASE_H);
        ctx.restore();
      });
      ctx.restore();
    };

    const addPeepToCrowd = () => {
      if (available.length === 0) return null;
      const idx = Math.floor(Math.random() * available.length);
      const peep = available.splice(idx, 1)[0];
      const props = resetPeep(peep);
      const walk = normalWalk(peep, props);
      if (!isVisible || reduced) walk.pause();
      walk.eventCallback('onComplete', () => {
        const i = crowd.indexOf(peep);
        if (i > -1) crowd.splice(i, 1);
        available.push(peep);
        addPeepToCrowd();
      });
      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    };

    const layout = () => {
      stage.width = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth;
      stage.height = canvas.clientHeight || canvas.parentElement?.clientHeight || 500;
      canvas.width = Math.round(stage.width * dpr);
      canvas.height = Math.round(stage.height * dpr);
      crowd.forEach((p) => { if (p.walk) p.walk.kill(); });
      crowd.length = 0;
      available.length = 0;
      available.push(...allPeeps);
      while (available.length) {
        const peep = addPeepToCrowd();
        if (peep?.walk) peep.walk.progress(Math.random());
      }
      render(); // one frame immediately; this is the whole picture for reduced motion
    };

    const boot = (images) => {
      for (let i = 0; i < TOTAL; i += 1) allPeeps.push(createPeep(i, images[i % images.length]));
      layout();

      // Only re-layout when the canvas size really changes (not on mobile URL-bar jitter).
      resizeObserver = new ResizeObserver(() => {
        const size = `${canvas.clientWidth}x${canvas.clientHeight}`;
        if (size === lastSize) return;
        lastSize = size;
        layout();
      });
      lastSize = `${canvas.clientWidth}x${canvas.clientHeight}`;
      resizeObserver.observe(canvas);

      if (reduced) return;
      visObserver = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible) {
          gsap.ticker.add(render);
          crowd.forEach((p) => p.walk && p.walk.play());
        } else {
          gsap.ticker.remove(render);
          crowd.forEach((p) => p.walk && p.walk.pause());
        }
      });
      visObserver.observe(canvas);
    };

    // Don't fetch or decode anything until the section is about to scroll into view.
    const nearObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting || booted) return;
      booted = true;
      nearObserver.disconnect();
      Promise.all(urls.map(loadImage)).then((images) => {
        const ok = images.filter(Boolean);
        if (!cancelled && ok.length) boot(ok);
      });
    }, { rootMargin: '900px 0px' });
    nearObserver.observe(canvas);

    return () => {
      cancelled = true;
      nearObserver.disconnect();
      visObserver?.disconnect();
      resizeObserver?.disconnect();
      gsap.ticker.remove(render);
      crowd.forEach((p) => { if (p.walk) p.walk.kill(); });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
};

export default CrowdCanvas;
