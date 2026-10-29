import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LinkButtonProps {
  to: string;
  children: ReactNode;
  external?: boolean;
  label?: string;
}

/** Text link with the two-line slide-up hover. */
export default function LinkButton({ to, children, external, label }: LinkButtonProps) {
  const inner = (
    <div className="link-wrap">
      <div className="link-text">{children}</div>
      <div className="link-text" aria-hidden="true">
        {children}
      </div>
    </div>
  );
  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className="link-button w-inline-block" aria-label={label}>
        {inner}
      </a>
    );
  }
  if (to.startsWith('tel:') || to.startsWith('mailto:') || to.startsWith('#')) {
    return (
      <a href={to} className="link-button w-inline-block" aria-label={label}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to} className="link-button w-inline-block" aria-label={label}>
      {inner}
    </Link>
  );
}
