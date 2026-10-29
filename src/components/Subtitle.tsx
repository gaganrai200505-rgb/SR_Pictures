import type { ReactNode } from 'react';

/** Pill label with the sweeping highlight (animated by pageEffects). */
export default function Subtitle({ children }: { children: ReactNode }) {
  return (
    <div className="subtitle-block">
      <div className="subtitle">{children}</div>
      <div className="subtitle-blur" aria-hidden="true"></div>
    </div>
  );
}
