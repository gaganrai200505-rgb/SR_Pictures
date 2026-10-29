import { partners } from '../data/media';

export default function PartnerGrid() {
  return (
    <div className="w-layout-grid partner-grid" role="list" aria-label="Our valued partners">
      {partners.map((p) => (
        <div className="partner-card" role="listitem" key={p.cls}>
          <div className="card-container">
            <div className={p.cls}>
              <div className="card-side">
                <div className="front-logo">
                  <img className="partner-logo" src={p.front} alt="Partner logo" loading="lazy" />
                </div>
              </div>
              <div className="card-side is-back">
                <div className="back-logo">
                  <img className="partner-logo back" src={p.back} alt="" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
