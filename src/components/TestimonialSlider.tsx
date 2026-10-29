import { useCallback, useEffect, useRef, useState } from 'react';
import { slideLeft01, slideLeft02, slideRight01, slideRight02, starPath } from '../data/icons';
import { testimonialIds, testimonials } from '../data/content';
import { isMotionPaused, subscribeMotion } from '../lib/motion';

const DELAY = 4000; // autoplay delay (data-delay)
const DURATION = 500; // slide transition (data-duration)

function Arrow({ d, cls }: { d: string; cls: string }) {
  return (
    <div className={`slide-arrow ${cls} w-embed`} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d={d}></path>
      </svg>
    </div>
  );
}

/**
 * Testimonial carousel (Webflow slider clone): infinite slide animation,
 * 4s autoplay that pauses on hover/focus, arrows, keyboard and swipe support.
 */
export default function TestimonialSlider({
  page = 'home',
  withDivider = true,
}: {
  page?: 'home' | 'pricing';
  withDivider?: boolean;
}) {
  const n = testimonials.length;
  const ids = testimonialIds[page];
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState(0);
  const [hold, setHold] = useState(false);
  const [paused, setPaused] = useState(isMotionPaused());
  const drag = useRef<{ x: number; id: number } | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((cur) => {
        setPrev(cur);
        return (cur + dir + n) % n;
      });
    },
    [n],
  );

  useEffect(() => subscribeMotion(() => setPaused(isMotionPaused())), []);

  useEffect(() => {
    if (hold || paused) return;
    const t = window.setTimeout(() => go(1), DELAY);
    return () => window.clearTimeout(t);
  }, [index, hold, paused, go]);

  const position = (i: number) => {
    let pos = (i - index + n) % n;
    if (pos > n / 2) pos -= n;
    return pos;
  };
  const prevPosition = (i: number) => {
    let pos = (i - prev + n) % n;
    if (pos > n / 2) pos -= n;
    return pos;
  };

  const onKey = (dir: 1 | -1) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      go(dir);
    }
  };

  return (
    <div className="testimonial-component">
      <div
        className="testimonial-slider w-slider"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={() => setHold(false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') go(-1);
          if (e.key === 'ArrowRight') go(1);
        }}
      >
        <div
          className="mask w-slider-mask"
          style={{ touchAction: 'pan-y' }}
          onPointerDown={(e) => {
            if (e.pointerType === 'mouse') return;
            drag.current = { x: e.clientX, id: e.pointerId };
          }}
          onPointerUp={(e) => {
            const d = drag.current;
            drag.current = null;
            if (!d) return;
            const dx = e.clientX - d.x;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }}
          aria-live={hold || paused ? 'polite' : 'off'}
        >
          {testimonials.map((t, i) => {
            const pos = position(i);
            const jump = Math.abs(pos - prevPosition(i)) > 1;
            const [imgId, blockId, contentId] = ids[i];
            return (
              <div
                key={t.name}
                className="testimonial-slide w-slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}`}
                aria-hidden={i !== index}
                style={{
                  transform: `translateX(${(pos - i) * 100}%)`,
                  transition: jump ? 'none' : `transform ${DURATION}ms cubic-bezier(.25,.1,.25,1)`,
                  visibility: Math.abs(pos) > 1 ? 'hidden' : 'visible',
                }}
              >
                <div className="testimonial-content-wrap">
                  <div className="w-layout-grid testimonial-grid">
                    <div id={imgId} className="testimonial-image-wrap">
                      <img className="cover-image" src={t.image} alt={`Portrait of ${t.name}`} loading="lazy" />
                    </div>
                    <div id={blockId} className="testimonial-content-block">
                      <div className="w-layout-grid testimonial-content-grid">
                        <div className="testimonial-content">
                          <div className="rating-wrap">
                            <div className="text-size-regular text-color-secondary">{t.rating}</div>
                            <div className="text-size-regular text-color-secondary" aria-hidden="true">
                              -
                            </div>
                            <div className="star-rating-block" role="img" aria-label={`Rated ${t.rating}`}>
                              {[0, 1, 2, 3, 4].map((s) => (
                                <div className="review-star w-embed" key={s} aria-hidden="true">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d={starPath}></path>
                                  </svg>
                                </div>
                              ))}
                            </div>
                          </div>
                          {withDivider && <div className="dividing-line"></div>}
                          <p className="text-size-large">{`"${t.quote}"`}</p>
                        </div>
                        <div id={contentId} className="testimonial-content">
                          <img className="cliente-logo" src={t.logo} alt="" loading="lazy" />
                          <div className="testimonial-info">
                            <div className="text-size-medium">{t.name}</div>
                            <div className="text-size-regular text-color-secondary">{t.role}</div>
                          </div>
                        </div>
                      </div>
                      <img className="quote-icon" src="/assets/695ffd835d32c9c7b020916d_quote-right-icon-1.svg" alt="" loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="left-arrow w-slider-arrow-left" role="button" tabIndex={0} aria-label="Previous testimonial" onClick={() => go(-1)} onKeyDown={onKey(-1)}>
          <div className="slide-block">
            <div className="slide-arrow-wrap">
              <Arrow d={slideLeft01} cls="left-01" />
              <Arrow d={slideLeft02} cls="left-02" />
            </div>
            <div className="slide-text-wrap" aria-hidden="true">
              <div className="slide-text">Previous</div>
              <div className="slide-text">Previous</div>
            </div>
          </div>
        </div>
        <div className="right-arrow w-slider-arrow-right" role="button" tabIndex={0} aria-label="Next testimonial" onClick={() => go(1)} onKeyDown={onKey(1)}>
          <div className="slide-block">
            <div className="slide-text-wrap" aria-hidden="true">
              <div className="slide-text">Next</div>
              <div className="slide-text">Next</div>
            </div>
            <div className="slide-arrow-wrap">
              <Arrow d={slideRight01} cls="right-01" />
              <Arrow d={slideRight02} cls="right-02" />
            </div>
          </div>
        </div>
        <div className="slide-nav w-slider-nav"></div>
      </div>
    </div>
  );
}
