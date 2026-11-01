import React from 'react';

interface MinimalBrandCardProps {
  type?: 'vybn' | 'frameic' | 'stamps';
  title?: string;
  className?: string;
  onClick?: () => void;
}

export default function MinimalBrandCard({
  type = 'frameic',
  title,
  className = '',
  onClick,
}: MinimalBrandCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative w-full aspect-[9/14] rounded-2xl md:rounded-[1.75rem] overflow-hidden bg-black border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.9)] flex flex-col justify-between p-5 select-none group ${className}`}
    >
      {/* Top Stamps Bar */}
      <div className="flex items-center justify-between text-neutral-400 group-hover:text-white transition-colors duration-300">
        {/* Top-Left Stamp: Barcode or Slate */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-[1.5px]">
            <span className="w-[1.5px] h-3 bg-current" />
            <span className="w-[1px] h-3 bg-current" />
            <span className="w-[3px] h-3 bg-current" />
            <span className="w-[1px] h-3 bg-current" />
            <span className="w-[2px] h-3 bg-current" />
            <span className="w-[1px] h-3 bg-current" />
            <span className="w-[2px] h-3 bg-current" />
          </div>
          <span className="text-[7px] font-mono tracking-tighter opacity-70">SR-2026</span>
        </div>

        {/* Top-Right Stamp: Camera Lens or Aperture Reticle */}
        <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="w-2 h-2 rounded-full border border-dashed border-current flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-current" />
          </div>
        </div>
      </div>

      {/* Center Typographic Brand Graphic */}
      <div className="my-auto text-center flex flex-col items-center justify-center">
        {type === 'vybn' ? (
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/50 to-white/20 uppercase font-sans group-hover:scale-105 transition-transform duration-500">
              {title || 'VYBN'}
            </h3>
            <p className="text-[8px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
              VISUAL ARTS ARCHIVE
            </p>
          </div>
        ) : type === 'frameic' ? (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs md:text-sm font-mono tracking-wider text-neutral-300 group-hover:text-white transition-colors">
              <span className="text-neutral-500">.</span>
              <span className="font-semibold">{title || 'The SR Pictures™'}</span>
            </div>
            <div className="w-8 h-[1px] bg-neutral-800 mx-auto group-hover:w-12 group-hover:bg-neutral-600 transition-all duration-300" />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center text-amber-300 text-sm font-mono font-bold shadow-inner">
              SR
            </div>
            <div className="text-[9px] font-mono tracking-widest text-neutral-400">
              35MM RAW // BENGALURU
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer Info */}
      <div className="flex items-center justify-between text-[8px] font-mono text-neutral-500 border-t border-white/5 pt-2">
        <span>ISO 100</span>
        <span className="uppercase text-amber-300/80">Cine Log</span>
        <span>24 FPS</span>
      </div>

      {/* Inner Lens Vignette */}
      <div className="absolute inset-0 rounded-2xl md:rounded-[1.75rem] pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.85)]" />
    </div>
  );
}

