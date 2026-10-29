import { socialIcons } from '../data/icons';

function Icon({ d }: { d: string }) {
  return (
    <div className="social-icon w-embed" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d={d}></path>
      </svg>
    </div>
  );
}

export default function SocialLinks({ items = socialIcons }: { items?: ReadonlyArray<{ label: string; href: string; d: string }> }) {
  return (
    <div className="social-media-wrapper">
      {items.map((s) => (
        <a key={s.label} aria-label={s.label.replace(' Link', '')} href={s.href} target="_blank" rel="noopener noreferrer" className="social-link w-inline-block">
          <div className="social-icon-wrap">
            <Icon d={s.d} />
            <Icon d={s.d} />
          </div>
        </a>
      ))}
    </div>
  );
}
