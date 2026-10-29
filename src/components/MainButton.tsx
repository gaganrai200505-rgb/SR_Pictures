import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface MainButtonProps {
  to: string;
  children: ReactNode;
  className?: string;
}

/** Glowing pill button used across every page. */
export default function MainButton({ to, children, className = '' }: MainButtonProps) {
  return (
    <Link to={to} className={`main-button w-inline-block ${className}`.trim()}>
      <div className="button-border"></div>
      <div className="border-wrap">
        <div className="glow-border"></div>
      </div>
      <div className="button-background-01"></div>
      <div className="button-background-02"></div>
      <div className="button-text-wrap">
        <p className="button-text">{children}</p>
        <p className="button-text" aria-hidden="true">
          {children}
        </p>
      </div>
    </Link>
  );
}
