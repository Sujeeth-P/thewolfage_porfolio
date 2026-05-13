import { useEffect, useRef } from 'react';
import { gsap } from '../../utils/gsap';

import peep1 from '../../assets/peep/peep-standing-1.png';
import peep2 from '../../assets/peep/peep-standing-2.png';
import peep3 from '../../assets/peep/peep-standing-3.png';
import peep4 from '../../assets/peep/peep-standing-4.png';
import peep5 from '../../assets/peep/peep-standing-5.png';
import peep6 from '../../assets/peep/peep-standing-6.png';
import peep7 from '../../assets/peep/peep-standing-7.png';
import peep8 from '../../assets/peep/peep-standing-8.png';
import peep9 from '../../assets/peep/peep-standing-9.png';
import peep10 from '../../assets/peep/peep-standing-10.png';
import peep11 from '../../assets/peep/peep-standing-11.png';
import peep12 from '../../assets/peep/peep-standing-12.png';
import peep13 from '../../assets/peep/peep-standing-13.png';
import peep14 from '../../assets/peep/peep-standing-14.png';
import peep15 from '../../assets/peep/peep-standing-15.png';
import peep16 from '../../assets/peep/peep-standing-16.png';
import peep17 from '../../assets/peep/peep-standing-17.png';
import peep18 from '../../assets/peep/peep-standing-18.png';
import peep19 from '../../assets/peep/peep-standing-19.png';
import peep20 from '../../assets/peep/peep-standing-20.png';
import peep21 from '../../assets/peep/peep-standing-21.png';
import peep22 from '../../assets/peep/peep-standing-22.png';
import peep23 from '../../assets/peep/peep-standing-23.png';
import peep24 from '../../assets/peep/peep-standing-24.png';
import peep25 from '../../assets/peep/peep-standing-25.png';
import peep26 from '../../assets/peep/peep-standing-26.png';
import peep27 from '../../assets/peep/peep-standing-27.png';
import peep28 from '../../assets/peep/peep-standing-28.png';
import peep29 from '../../assets/peep/peep-standing-29.png';
import peep30 from '../../assets/peep/peep-standing-30.png';

const PEEP_SRCS = [
  peep1, peep2, peep3, peep4, peep5, peep6, peep7, peep8, peep9, peep10,
  peep11, peep12, peep13, peep14, peep15, peep16, peep17, peep18, peep19, peep20,
  peep21, peep22, peep23, peep24, peep25, peep26, peep27, peep28, peep29, peep30,
];

const CrowdCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const processedImages = [];
    let loadedCount = 0;

    const invertImage = (img) => {
      const offscreen = document.createElement('canvas');
      const MAX_H = 800;
      const scale = img.naturalHeight > MAX_H ? MAX_H / img.naturalHeight : 1;
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext('2d');
      offCtx.filter = 'invert(1)';
      offCtx.drawImage(img, 0, 0, w, h);
      return offscreen;
    };

    const stage = { width: 0, height: 0 };
    const TOTAL = 30;
    const allPeeps = [];
    const available = [];
    const crowd = [];
    let isVisible = false;
    let observer;

    const createPeep = (id, image) => ({ id, image, x: 0, y: 0, anchorY: 0, depthRatio: 0, scaleX: 1, scaleY: 1, walk: null });

    const resetPeep = (peep) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const depthRatio = Math.random();
      const figW = 200;
      const peepScale = 0.6 + depthRatio * 0.9;
      const renderedH = 500 * peepScale;
      const startY = renderedH + 30 + (1 - depthRatio) * 50;
      let startX, endX;

      if (direction === 1) {
        startX = -figW * peepScale;
        endX = stage.width + figW * peepScale;
        peep.scaleX = peepScale;
      } else {
        startX = stage.width + figW * peepScale;
        endX = -figW * peepScale;
        peep.scaleX = -peepScale;
      }

      peep.scaleY = peepScale;
      peep.depthRatio = depthRatio;
      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;
      return { startX, startY, endX };
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

    const removePeepFromCrowd = (peep) => {
      const i = crowd.indexOf(peep);
      if (i > -1) crowd.splice(i, 1);
      available.push(peep);
    };

    const addPeepToCrowd = () => {
      if (available.length === 0) return null;
      const idx = Math.floor(Math.random() * available.length);
      const peep = available.splice(idx, 1)[0];
      const props = resetPeep(peep);
      const walk = normalWalk(peep, props);
      if (!isVisible) walk.pause();
      walk.eventCallback('onComplete', () => { removePeepFromCrowd(peep); addPeepToCrowd(); });
      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
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
        const drawH = 500;
        const drawW = (imgW / imgH) * drawH;
        ctx.globalAlpha = 0.5 + peep.depthRatio * 0.7;
        ctx.drawImage(peep.image, 0, -drawH, drawW, drawH);
        ctx.restore();
      });
      ctx.restore();
    };

    const resize = () => {
      stage.width = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth;
      stage.height = canvas.clientHeight || canvas.parentElement?.clientHeight || 500;
      canvas.width = stage.width * dpr;
      canvas.height = stage.height * dpr;
      crowd.forEach((p) => { if (p.walk) p.walk.kill(); });
      crowd.length = 0;
      available.length = 0;
      available.push(...allPeeps);
      while (available.length) {
        const peep = addPeepToCrowd();
        if (peep && peep.walk) {
          peep.walk.progress(Math.random());
          if (!isVisible) peep.walk.pause();
        }
      }
    };

    const boot = () => {
      for (let i = 0; i < TOTAL; i++) {
        allPeeps.push(createPeep(i, processedImages[i % processedImages.length]));
      }
      resize();
      observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible) {
          gsap.ticker.add(render);
          crowd.forEach(p => p.walk && p.walk.play());
        } else {
          gsap.ticker.remove(render);
          crowd.forEach(p => p.walk && p.walk.pause());
        }
      });
      observer.observe(canvas);
      window.addEventListener('resize', resize);
    };

    PEEP_SRCS.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        processedImages.push(invertImage(img));
        loadedCount++;
        if (loadedCount === PEEP_SRCS.length) boot();
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === PEEP_SRCS.length) boot();
      };
      img.src = src;
    });

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', resize);
      gsap.ticker.remove(render);
      crowd.forEach((p) => { if (p.walk) p.walk.kill(); });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
};

export default CrowdCanvas;
