import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

/** Webflow's built-in "ease" curve, so tweens match the reference timing. */
CustomEase.create('wf-ease', '.25,.1,.25,1');

/** Maps Webflow IX2 easing names to GSAP eases. */
export const EASE = {
  ease: 'wf-ease',
  linear: 'none',
  outExpo: 'expo.out',
  outQuint: 'quint.out',
  outQuart: 'quart.out',
  outCubic: 'cubic.out',
  inOutQuint: 'quint.inOut',
  inOutQuart: 'quart.inOut',
  inOutQuad: 'quad.inOut',
  swingTo: 'back.out(1.7)',
} as const;

export { gsap, ScrollTrigger };
