import { Link } from 'react-router-dom';

/** Big marquee "Book a call" button. */
export default function CtaButton({ to, children }: { to: string; children: string }) {
  const group = (hidden: boolean) => (
    <div className="cta-text-item" aria-hidden={hidden || undefined}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ display: 'contents' }}>
          <div className="cta-text">{children}</div>
          <div className="cta-text">•</div>
        </span>
      ))}
    </div>
  );
  return (
    <Link to={to} className="cta-button w-inline-block" aria-label={children}>
      <div className="cta-button-background _01"></div>
      <div className="cta-button-background _02"></div>
      <div className="cta-button-block">
        <div className="cta-text-wrap">
          {group(false)}
          {group(true)}
        </div>
      </div>
    </Link>
  );
}
