import { gsap, ScrollTrigger } from './gsap';

/**
 * Central motion preference store.
 * - Starts paused when the OS requests reduced motion.
 * - Any decorative loop (cube rotation, marquee, flips, videos) registers here
 *   so a single control can pause everything (WCAG 2.2.2 Pause, Stop, Hide).
 */
const mq = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
let paused = !!mq?.matches;
const listeners = new Set<() => void>();

export const reducedMotion = () => !!mq?.matches;
export const isMotionPaused = () => paused;

export function setMotionPaused(value: boolean) {
  paused = value;
  document.documentElement.classList.toggle('motion-paused', value);
  listeners.forEach((l) => l());
}

export function subscribeMotion(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

if (typeof document !== 'undefined') {
  document.documentElement.classList.toggle('motion-paused', paused);
  mq?.addEventListener('change', (e) => setMotionPaused(e.matches));
}

/** Plays `tl` only while `trigger` is in the viewport and motion is not paused. */
export function loopInView(trigger: Element, tl: gsap.core.Animation, start = 'top bottom') {
  tl.pause();
  let visible = false;
  const sync = () => {
    if (visible && !paused) tl.play();
    else tl.pause();
  };
  const st = ScrollTrigger.create({
    trigger,
    start,
    end: 'bottom top',
    onToggle: (self) => {
      visible = self.isActive;
      sync();
    },
  });
  const off = subscribeMotion(sync);
  return () => {
    st.kill();
    off();
    tl.kill();
  };
}
