import { useState, useEffect } from 'react';
import MainButton from './MainButton';

export interface GalleryPhoto {
  id: string;
  category: 'Wedding' | 'Pre-Wedding' | 'Maternity' | 'Ceremony';
  image: string;
  aspect?: 'tall' | 'wide' | 'square';
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: 'p-1', category: 'Wedding', image: '/assets/1Y9A5246.jpg', aspect: 'wide' },
  { id: 'p-2', category: 'Pre-Wedding', image: '/assets/RSD_8118.jpg', aspect: 'tall' },
  { id: 'p-3', category: 'Maternity', image: '/assets/RSD_8625.jpg', aspect: 'tall' },
  { id: 'p-4', category: 'Wedding', image: '/assets/RSD_2730.jpg', aspect: 'square' },
  { id: 'p-5', category: 'Ceremony', image: '/assets/RSD_2217.jpg', aspect: 'tall' },
  { id: 'p-6', category: 'Wedding', image: '/assets/RSD_2215.jpg', aspect: 'square' },
  { id: 'p-7', category: 'Ceremony', image: '/assets/IMG_1102.jpg', aspect: 'tall' },
  { id: 'p-8', category: 'Ceremony', image: '/assets/RSD_1969.jpg', aspect: 'square' },
  { id: 'p-9', category: 'Wedding', image: '/assets/RSD8879.jpg', aspect: 'tall' },
  { id: 'p-10', category: 'Ceremony', image: '/assets/RSD_4500.jpg', aspect: 'square' },
  { id: 'p-11', category: 'Pre-Wedding', image: '/assets/SRP_7885.jpg', aspect: 'tall' },
  { id: 'p-12', category: 'Pre-Wedding', image: '/assets/SRP_0350.jpg', aspect: 'wide' },
  { id: 'p-13', category: 'Wedding', image: '/assets/SRP_9062.jpg', aspect: 'square' },
  { id: 'p-14', category: 'Ceremony', image: '/assets/RSD_3655.jpg', aspect: 'tall' },
  { id: 'p-15', category: 'Wedding', image: '/assets/RSD9507-37.jpg', aspect: 'wide' },
  { id: 'p-16', category: 'Ceremony', image: '/assets/RSD_4633.jpg', aspect: 'square' },
];

const CATEGORIES = ['All', 'Wedding', 'Pre-Wedding', 'Maternity', 'Ceremony'] as const;

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = activeCategory === 'All'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredPhotos.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : null));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, filteredPhotos.length]);

  return (
    <div className="gallery-section-wrapper">
      {/* Animated Infinite Photo Reel (Continuous Scrolling Marquee) */}
      <div className="gallery-marquee-wrap" aria-hidden="true">
        <div className="gallery-marquee-track">
          {[...GALLERY_PHOTOS, ...GALLERY_PHOTOS].map((p, idx) => (
            <div key={`reel-${idx}`} className="gallery-marquee-card">
              <img
                src={p.image}
                alt="SR Pictures Gallery Reel"
                loading="lazy"
                decoding="async"
                className="gallery-marquee-img"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="spacer-medium"></div>

      {/* Category Filter Tabs */}
      <div className="gallery-filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`gallery-filter-btn ${activeCategory === cat ? 'is-active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Animated Photo Grid — Clean photos without any text overlay */}
      <div className="gallery-grid" key={activeCategory}>
        {filteredPhotos.map((item, idx) => (
          <div
            key={item.id}
            className={`gallery-card ${item.aspect || 'square'}`}
            style={{ animationDelay: `${Math.min(idx * 0.04, 0.4)}s` }}
            onClick={() => setLightboxIndex(idx)}
            role="button"
            tabIndex={0}
            aria-label="View photo in fullscreen"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setLightboxIndex(idx);
              }
            }}
          >
            <div className="gallery-card-inner">
              <img
                src={item.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="gallery-image"
              />
              {/* Minimal hover indicator — NO TEXT ON TOP */}
              <div className="gallery-hover-indicator">
                <div className="gallery-expand-pill">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-4H7v-2h4V7h2v4h4v2h-4v4z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="gallery-bottom-cta">
        <p className="text-size-medium text-color-secondary">
          Capturing lifetime memories with natural aesthetics and cinematic craft.
        </p>
        <div className="spacer-small"></div>
        <MainButton to="/contact">Book Your Date</MainButton>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          className="gallery-lightbox-overlay"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close photo preview"
          >
            ✕
          </button>

          {/* Previous Arrow */}
          <button
            type="button"
            className="gallery-lightbox-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : null));
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>

          {/* Current Photo */}
          <div
            className="gallery-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredPhotos[lightboxIndex].image}
              alt=""
              className="gallery-lightbox-img"
            />
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            className="gallery-lightbox-nav next"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredPhotos.length : null));
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
