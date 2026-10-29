import { gsap, EASE } from './gsap';

/**
 * Global hover / focus interactions reproduced from the reference site's
 * Webflow IX2 data (durations, easings and offsets are 1:1).
 * Event delegation keeps components as plain markup and works for
 * mouse, keyboard focus-visible (touch is ignored, as in the original).
 */

type El = HTMLElement;
const all = (el: El, sel: string) => Array.from(el.querySelectorAll<El>(sel));
const desktop = () => window.matchMedia('(min-width: 992px)').matches;
const tw = (t: gsap.TweenTarget, vars: gsap.TweenVars) => gsap.to(t, { overwrite: 'auto', ...vars });

interface Handler {
  selector: string;
  enter: (el: El) => void;
  leave: (el: El) => void;
  desktopOnly?: boolean;
}

const GREY = 'rgb(128,128,128)';
const WHITE = 'rgb(250,250,250)';

const handlers: Handler[] = [
  {
    selector: '.link-button',
    enter: (el) => tw(all(el, '.link-text'), { yPercent: -100, duration: 0.5, ease: EASE.outExpo }),
    leave: (el) => tw(all(el, '.link-text'), { yPercent: 0, duration: 0.5, ease: EASE.outExpo }),
  },
  {
    selector: '.main-button',
    enter: (el) => tw(all(el, '.button-text'), { yPercent: -100, duration: 0.45, ease: EASE.outExpo }),
    leave: (el) => tw(all(el, '.button-text'), { yPercent: 0, duration: 0.45, ease: EASE.outExpo }),
  },
  {
    selector: '.nav-link',
    enter: (el) => tw(all(el, '.nav-text'), { yPercent: -100, duration: 0.45, ease: EASE.outExpo }),
    leave: (el) => tw(all(el, '.nav-text'), { yPercent: 0, duration: 0.45, ease: EASE.outExpo }),
  },
  {
    selector: '.social-link',
    enter: (el) => {
      tw(all(el, '.social-icon'), { yPercent: -100, duration: 0.75, ease: EASE.outExpo });
      tw(el, { scale: 0.95, duration: 0.75, ease: EASE.outExpo });
    },
    leave: (el) => {
      tw(all(el, '.social-icon'), { yPercent: 0, duration: 0.75, ease: EASE.outExpo });
      tw(el, { scale: 1, duration: 0.75, ease: EASE.outExpo });
    },
  },
  {
    selector: '.brand-link',
    enter: (el) => tw(all(el, '.logo'), { yPercent: -100, duration: 0.75, ease: EASE.outExpo }),
    leave: (el) => tw(all(el, '.logo'), { yPercent: 0, duration: 0.75, ease: EASE.outExpo }),
  },
  {
    selector: '.case-study-link',
    enter: (el) => {
      tw(all(el, '.case-logo'), { yPercent: -100, duration: 0.5, ease: EASE.outCubic });
      tw(all(el, '.case-arrow._01'), { xPercent: 100, duration: 0.5, ease: EASE.outCubic });
      tw(all(el, '.case-arrow._02'), { xPercent: 0, duration: 0.5, ease: EASE.outCubic });
    },
    leave: (el) => {
      tw(all(el, '.case-logo'), { yPercent: 0, duration: 0.5, ease: EASE.outCubic });
      tw(all(el, '.case-arrow._01'), { xPercent: 0, duration: 0.5, ease: EASE.outCubic });
      tw(all(el, '.case-arrow._02'), { xPercent: -100, duration: 0.5, ease: EASE.outCubic });
    },
  },
  {
    selector: '.accordion-content-item',
    desktopOnly: true,
    enter: (el) => {
      tw(all(el, '.accordion-title-item'), { x: '1.5rem', duration: 0.8, ease: EASE.inOutQuint });
      tw(all(el, '.plus-block'), { x: '-1.5rem', duration: 0.6, ease: EASE.inOutQuint });
      tw(all(el, '.accordion-answer-text'), { x: '1.5rem', duration: 0.6, ease: EASE.inOutQuint });
    },
    leave: (el) => {
      tw(all(el, '.accordion-title-item'), { x: 0, duration: 0.8, ease: EASE.inOutQuint });
      tw(all(el, '.plus-block'), { x: 0, duration: 0.6, ease: EASE.inOutQuint });
      tw(all(el, '.accordion-answer-text'), { x: 0, duration: 0.6, ease: EASE.inOutQuint });
    },
  },
  {
    selector: '.service-content-item',
    desktopOnly: true,
    enter: (el) => {
      const n = serviceIndex(el);
      const root = el.closest('.section-home-service') ?? document;
      tw(root.querySelectorAll(`.service-bg-image._0${n}`), { opacity: 1, duration: 0.5, ease: EASE.ease });
      tw(all(el, '.service-title'), { yPercent: 0, duration: 1, ease: EASE.outExpo });
      tw(all(el, '.service-description, .service-subitle'), { color: WHITE, duration: 0.5, ease: EASE.ease });
      tw(all(el, '.service-image-item'), { scale: 1, duration: 1, ease: EASE.outExpo });
    },
    leave: (el) => {
      const n = serviceIndex(el);
      const root = el.closest('.section-home-service') ?? document;
      tw(root.querySelectorAll(`.service-bg-image._0${n}`), { opacity: 0, duration: 0.5, ease: EASE.ease });
      tw(all(el, '.service-title'), { yPercent: -200, duration: 1, ease: EASE.outExpo });
      tw(all(el, '.service-description, .service-subitle'), { color: GREY, duration: 0.5, ease: EASE.ease });
      tw(all(el, '.service-image-item'), { scale: 0, duration: 0.5, ease: EASE.outExpo });
    },
  },
  {
    selector: '.award-wrapper:not(.top-awards)',
    enter: (el) => {
      tw(all(el, '.bg-award'), { height: '100%', duration: 0.35, ease: EASE.outQuart });
      tw(all(el, '.award-title, .award-icon'), { color: 'rgb(255,255,255)', duration: 0.35, delay: 0.1, ease: EASE.outQuart });
      tw(all(el, '.award-text'), { color: 'rgb(141,141,141)', duration: 0.35, delay: 0.1, ease: EASE.outQuart });
    },
    leave: (el) => {
      tw(all(el, '.bg-award'), { height: '0%', duration: 0.5, ease: EASE.outQuart });
      tw(all(el, '.award-title'), { color: GREY, duration: 0.35, delay: 0.1, ease: 'power1.out' });
      tw(all(el, '.award-icon'), { color: 'rgb(10,10,10)', duration: 0.35, delay: 0.1, ease: 'power1.out' });
      tw(all(el, '.award-text'), { color: 'rgb(104,104,104)', duration: 0.35, delay: 0.1, ease: 'power1.out' });
    },
  },
  {
    selector: '.blog-image-wrap',
    enter: (el) => tw(all(el, '.cover-image'), { scale: 1.05, duration: 0.5, ease: EASE.ease }),
    leave: (el) => tw(all(el, '.cover-image'), { scale: 1, duration: 0.5, ease: EASE.ease }),
  },
  {
    selector: '.left-arrow',
    enter: (el) => {
      tw(all(el, '.slide-arrow.left-01'), { xPercent: -100, duration: 0.5, ease: EASE.outExpo });
      tw(all(el, '.slide-arrow.left-02'), { xPercent: 0, duration: 0.5, ease: EASE.outExpo });
      tw(all(el, '.slide-text'), { yPercent: -100, duration: 0.45, ease: EASE.outExpo });
    },
    leave: (el) => {
      tw(all(el, '.slide-arrow.left-01'), { xPercent: 0, duration: 0.5, ease: EASE.outExpo });
      tw(all(el, '.slide-arrow.left-02'), { xPercent: 100, duration: 0.5, ease: EASE.outExpo });
      tw(all(el, '.slide-text'), { yPercent: 0, duration: 0.45, ease: EASE.outExpo });
    },
  },
  {
    selector: '.right-arrow',
    enter: (el) => {
      tw(all(el, '.slide-arrow.right-01'), { xPercent: 100, duration: 0.5, ease: EASE.outExpo });
      tw(all(el, '.slide-arrow.right-02'), { xPercent: 0, duration: 0.5, ease: EASE.outExpo });
      tw(all(el, '.slide-text'), { yPercent: -100, duration: 0.45, ease: EASE.outExpo });
    },
    leave: (el) => {
      tw(all(el, '.slide-arrow.right-01'), { xPercent: 0, duration: 0.5, ease: EASE.outExpo });
      tw(all(el, '.slide-arrow.right-02'), { xPercent: -100, duration: 0.5, ease: EASE.outExpo });
      tw(all(el, '.slide-text'), { yPercent: 0, duration: 0.45, ease: EASE.outExpo });
    },
  },
  {
    selector: '.cta-button',
    enter: (el) => {
      tw(all(el, '.cta-button-background._02'), { opacity: 1, duration: 1, ease: EASE.ease });
      tw(el, { scale: 0.95, duration: 0.5, ease: EASE.ease });
    },
    leave: (el) => {
      tw(all(el, '.cta-button-background._02'), { opacity: 0, duration: 1, ease: EASE.ease });
      tw(el, { scale: 1, duration: 0.5, ease: EASE.ease });
    },
  },
  {
    selector: '.back-to-top-link',
    enter: (el) => {
      const arrow = all(el, '.up-arrow');
      gsap
        .timeline({ overwrite: 'auto' })
        .to(arrow, { y: '-2rem', opacity: 0, scale: 0, duration: 0.5, ease: EASE.outExpo })
        .set(arrow, { y: '2rem' })
        .to(arrow, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: EASE.outExpo });
    },
    leave: () => undefined,
  },
];

function serviceIndex(el: El) {
  const items = Array.from(el.parentElement?.querySelectorAll('.service-content-item') ?? []);
  return items.indexOf(el) + 1;
}

export function initHoverEffects() {
  const find = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return [] as Array<[Handler, El]>;
    const out: Array<[Handler, El]> = [];
    for (const h of handlers) {
      if (h.desktopOnly && !desktop()) continue;
      const el = target.closest<El>(h.selector);
      if (el) out.push([h, el]);
    }
    return out;
  };

  const over = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return;
    for (const [h, el] of find(e.target)) {
      if (e.relatedTarget instanceof Node && el.contains(e.relatedTarget)) continue;
      h.enter(el);
    }
  };
  const out = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return;
    for (const [h, el] of find(e.target)) {
      if (e.relatedTarget instanceof Node && el.contains(e.relatedTarget)) continue;
      h.leave(el);
    }
  };
  const focusIn = (e: FocusEvent) => {
    if (!(e.target instanceof Element) || !e.target.matches(':focus-visible')) return;
    for (const [h, el] of find(e.target)) h.enter(el);
  };
  const focusOut = (e: FocusEvent) => {
    for (const [h, el] of find(e.target)) {
      if (e.relatedTarget instanceof Node && el.contains(e.relatedTarget)) continue;
      h.leave(el);
    }
  };

  document.addEventListener('pointerover', over);
  document.addEventListener('pointerout', out);
  document.addEventListener('focusin', focusIn);
  document.addEventListener('focusout', focusOut);
  return () => {
    document.removeEventListener('pointerover', over);
    document.removeEventListener('pointerout', out);
    document.removeEventListener('focusin', focusIn);
    document.removeEventListener('focusout', focusOut);
  };
}
