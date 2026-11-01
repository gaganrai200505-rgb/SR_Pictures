import React, { useRef, useState } from 'react';
import { Play } from 'lucide-react';

export interface GridCardData {
  id: string;
  type: 'video' | 'image';
  src: string;
  poster?: string;
  title: string;
  category?: string;
  specs?: string;
  driveId?: string;
  badge?: {
    type: 'work' | 'paul' | 'hype' | 'smoke-logo' | 'tooltip' | 'none';
    text?: string;
  };
}

interface GridCardProps {
  data: GridCardData;
  onOpenLightbox: (data: GridCardData) => void;
  onClick?: (e: React.MouseEvent) => void;
}

export default function GridCard({ data, onOpenLightbox, onClick }: GridCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onClick={(e) => {
        if (onClick) onClick(e);
        onOpenLightbox(data);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[9/14] rounded-2xl md:rounded-[1.75rem] overflow-hidden bg-neutral-950 border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer shadow-[0_10px_35px_rgba(0,0,0,0.85)] group select-none"
    >
      {/* 1. Underlying Media (Original Drive Video with Local High-Speed Fallback) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        {data.type === 'video' ? (
          <video
            ref={videoRef}
            src={data.src}
            poster={data.poster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        ) : (
          <img
            src={data.src}
            alt={data.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        )}
      </div>

      {/* 2. FISH-EYE / APERTURE LENS VIGNETTE OVERLAY */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: isHovered
            ? 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.2) 85%, rgba(0,0,0,0.65) 100%)'
            : 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0.88) 100%)',
        }}
      />

      {/* Subtle Inner Bezel Shadow */}
      <div className="absolute inset-0 rounded-2xl md:rounded-[1.75rem] pointer-events-none shadow-[inset_0_0_35px_rgba(0,0,0,0.85)] border border-white/5 group-hover:border-white/20 transition-all duration-500" />

      {/* 3. Reticle Viewfinder Corner Brackets */}
      <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-white/40 group-hover:border-white pointer-events-none transition-colors" />
      <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-white/40 group-hover:border-white pointer-events-none transition-colors" />
      <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-white/40 group-hover:border-white pointer-events-none transition-colors" />
      <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-white/40 group-hover:border-white pointer-events-none transition-colors" />

      {/* 4. Overlay Graphic Badges Matching VYBN Reference Screenshot */}
      {data.badge?.type === 'work' && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-black text-[11px] shadow-[0_0_20px_rgba(249,115,22,0.6)] select-none">
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span>Work</span>
        </div>
      )}

      {data.badge?.type === 'paul' && (
        <div className="absolute bottom-6 left-4 z-20">
          <span className="text-2xl md:text-3xl font-black italic tracking-tighter text-amber-400 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] select-none">
            PAUL
          </span>
        </div>
      )}

      {data.badge?.type === 'hype' && (
        <div className="absolute bottom-10 inset-x-0 flex justify-center z-20">
          <span className="px-3 py-1 bg-black/90 border border-yellow-400 text-yellow-300 font-black text-[10px] tracking-wider rounded rotate-[-4deg] shadow-[0_4px_20px_rgba(0,0,0,0.9)] uppercase select-none">
            HYPE 100% REAL
          </span>
        </div>
      )}

      {data.badge?.type === 'smoke-logo' && (
        <div className="absolute bottom-4 inset-x-0 text-center z-20">
          <span className="text-3xl font-black tracking-widest text-white/90 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] uppercase">
            VYBN
          </span>
        </div>
      )}

      {data.badge?.type === 'tooltip' && (
        <div className="absolute bottom-6 right-3 left-3 z-20 flex items-center justify-between gap-2 p-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-white shadow-2xl">
          <span className="text-[10px] font-mono tracking-tight line-clamp-1">
            {data.badge.text || 'Shadows of the City — Street Visuals'}
          </span>
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Play size={10} className="ml-0.5 fill-white" />
          </div>
        </div>
      )}

      {/* Top Media Indicator (REC 4K) */}
      <div className="absolute top-3 right-3 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="px-2 py-0.5 rounded-full bg-black/80 border border-white/20 text-[9px] font-mono text-neutral-300">
          ● REC 4K
        </span>
      </div>

      {/* Bottom Title Bar on Hover */}
      <div className="absolute bottom-0 inset-x-0 p-3 pt-8 bg-gradient-to-t from-black via-black/70 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h4 className="text-xs font-bold text-white tracking-tight line-clamp-1">
          {data.title}
        </h4>
        {data.specs && (
          <p className="text-[8px] font-mono text-neutral-400">
            {data.specs}
          </p>
        )}
      </div>
    </div>
  );
}
