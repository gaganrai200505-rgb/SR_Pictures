import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface StickerInstance {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  variantIndex: number;
}

interface StickerOverlayProps {
  stickers: StickerInstance[];
  onRemoveSticker: (id: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const STICKER_VARIANTS = [
  {
    id: 'sr-gold',
    render: () => (
      <div className="relative px-3.5 py-2 rounded-xl bg-gradient-to-br from-neutral-900 via-black to-neutral-900 border-2 border-amber-300/80 text-amber-200 shadow-2xl flex items-center gap-2 select-none">
        <div className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-300 flex items-center justify-center text-[10px] font-bold text-amber-300">
          ★
        </div>
        <div>
          <div className="text-[10px] font-black tracking-widest text-white uppercase">THE SR PICTURES</div>
          <div className="text-[8px] tracking-wider text-amber-300/80 font-mono">BENGALURU • EST. 2018</div>
        </div>
      </div>
    ),
  },
  {
    id: 'rec-badge',
    render: () => (
      <div className="px-3 py-1.5 rounded-lg bg-black/95 border border-red-500/80 text-white shadow-2xl flex items-center gap-2 select-none backdrop-blur-md">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
        <span className="text-[11px] font-mono font-bold tracking-wider text-red-100">REC</span>
        <span className="text-[9px] font-mono text-neutral-400">24.00 FPS • RAW</span>
      </div>
    ),
  },
  {
    id: 'directors-cut',
    render: () => (
      <div className="relative px-3 py-1.5 rounded-md bg-neutral-900 border-y-2 border-x border-white text-white shadow-2xl select-none">
        <div className="flex items-center gap-1.5">
          <span className="bg-white text-black text-[9px] font-black px-1.5 py-0.5 tracking-tighter uppercase">SCENE 01</span>
          <span className="text-[10px] font-bold tracking-wider">DIRECTOR&apos;S CUT</span>
        </div>
        <div className="text-[7px] text-neutral-400 tracking-widest mt-0.5 font-mono text-center">TAKE 04 // 35MM</div>
      </div>
    ),
  },
  {
    id: 'vybn-vibe',
    render: () => (
      <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-violet-600/90 via-fuchsia-600/90 to-cyan-500/90 border border-white/60 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] select-none flex items-center gap-1.5">
        <span className="text-[10px]">⚡</span>
        <span className="text-[10px] font-black tracking-widest uppercase">VYBN VISUALS</span>
      </div>
    ),
  },
  {
    id: 'golden-hour',
    render: () => (
      <div className="px-3 py-1.5 rounded-xl bg-amber-500/95 border-2 border-white text-black shadow-2xl select-none flex items-center gap-1.5 font-black">
        <span className="text-xs">✨</span>
        <span className="text-[10px] tracking-wider uppercase font-bold">GOLDEN HOUR</span>
      </div>
    ),
  },
  {
    id: 'aperture-f14',
    render: () => (
      <div className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-white/40 text-neutral-200 shadow-2xl select-none flex items-center gap-2">
        <div className="w-4 h-4 rounded-full border border-dashed border-white/70 flex items-center justify-center text-[7px] font-mono">
          ◎
        </div>
        <div className="font-mono text-[9px]">
          <span className="text-white font-bold">f / 1.4</span>
          <span className="text-neutral-500 ml-1">DEPTH OF FIELD</span>
        </div>
      </div>
    ),
  },
  {
    id: 'pure-love',
    render: () => (
      <div className="px-3 py-1.5 rounded-2xl bg-white border border-black text-black shadow-2xl select-none flex items-center gap-1.5 font-black">
        <span className="text-red-500 text-xs">♥</span>
        <span className="text-[10px] tracking-wide">TRUE EMOTION</span>
      </div>
    ),
  },
  {
    id: 'film-stock',
    render: () => (
      <div className="px-3 py-1.5 rounded-md bg-amber-950/90 border border-amber-500/80 text-amber-200 shadow-2xl select-none flex items-center gap-1.5 font-mono">
        <span className="text-[9px] bg-amber-500 text-black px-1 font-bold">35mm</span>
        <span className="text-[8px] tracking-widest">KODAK 400</span>
      </div>
    ),
  },
  {
    id: 'bengaluru-stamp',
    render: () => (
      <div className="px-3 py-1.5 rounded-xl bg-neutral-900/95 border border-emerald-400/80 text-emerald-300 shadow-2xl select-none flex items-center gap-1.5 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span className="text-[9px] font-bold tracking-wider">📍 BENGALURU, IN</span>
      </div>
    ),
  },
  {
    id: 'masterpiece',
    render: () => (
      <div className="px-3 py-1 rounded-md bg-zinc-900 border border-white/30 text-white shadow-2xl select-none text-center">
        <div className="text-[9px] font-extrabold tracking-widest text-amber-300">★★★★★</div>
        <div className="text-[8px] font-mono tracking-tighter text-neutral-400">CINEMATIC GRADE</div>
      </div>
    ),
  },
];

export default function StickerOverlay({
  stickers,
  onRemoveSticker,
  containerRef,
}: StickerOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence>
        {stickers.map((stk) => {
          const variant = STICKER_VARIANTS[stk.variantIndex % STICKER_VARIANTS.length];
          return (
            <motion.div
              key={stk.id}
              initial={{ scale: 0, rotate: stk.rotation - 18, opacity: 0 }}
              animate={{ scale: stk.scale, rotate: stk.rotation, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 450, damping: 24 }}
              drag
              dragConstraints={containerRef}
              dragElastic={0.2}
              style={{
                left: `${stk.x}px`,
                top: `${stk.y}px`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-grab active:cursor-grabbing group filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]"
              whileHover={{ scale: stk.scale * 1.08 }}
              whileTap={{ scale: stk.scale * 0.95 }}
            >
              {/* Sticker Content */}
              {variant.render()}

              {/* Quick Remove Button on Hover */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveSticker(stk.id);
                }}
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black/90 text-white border border-white/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600 hover:border-red-400 cursor-pointer shadow-lg"
                title="Remove sticker"
                aria-label="Remove sticker"
              >
                <X size={10} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

