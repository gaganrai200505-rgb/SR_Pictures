import { ctaReverseVideos, ctaVideos } from '../data/media';

/** Giant rotating ring of visual tiles behind the "Let's Produce" call to action. */
export default function CtaWrapper() {
  return (
    <div className="cta-wrapper" aria-hidden="true">
      <div className="cta-component">
        <div className="cta-circle-wrapper">
          {ctaVideos.map((v, i) => (
            <div className={v.cls} key={i}>
              <div className="video w-background-video w-background-video-atom">
                <img
                  src={v.poster}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2rem' }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="cta-reverse-circle">
          <div className="cta-circle-wrapper _02">
            {ctaReverseVideos.map((v, i) => (
              <div className={v.cls} key={i}>
                <div className="video w-background-video w-background-video-atom">
                  <img
                    src={v.poster}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2rem' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
