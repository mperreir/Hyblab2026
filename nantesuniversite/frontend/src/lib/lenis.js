import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let instance = null;

export function getLenis() {
  return instance;
}

export function initLenis(onScroll) {
  // lerp: inertia factor — 0 = infinite smoothing, 1 = no smoothing (instant)
  instance = new Lenis({ lerp: 0.1 });

  instance.on('scroll', (e) => {
    ScrollTrigger.update();
    onScroll?.(e);
  });

  gsap.ticker.add((time) => instance.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return instance;
}

export function lenisScrollTo(target, options = {}) {
  instance?.scrollTo(target, options);
}

export function destroyLenis() {
  if (instance) {
    instance.destroy();
    instance = null;
  }
}
