import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Mobile browsers resize the viewport as the address bar shows/hides while
// scrolling. Without this, every pinned section recalculates on each scroll.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };
