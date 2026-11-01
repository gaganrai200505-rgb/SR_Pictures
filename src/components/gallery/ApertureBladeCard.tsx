import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ApertureBladeCardProps {
  onClick?: () => void;
  className?: string;
}

export default function ApertureBladeCard({ onClick, className = '' }: ApertureBladeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full aspect-[9/14] rounded-2xl md:rounded-[1.75rem] overflow-hidden bg-neutral-950 border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.8)] group select-none ${className}`}
    >
      {/* Background Metallic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#222222_0%,#0a0a0a_70%,#000000_100%)]" />

      {/* Subtle Texture Grain */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '4px 4px',
        }}
      />

      {/* SVG Camera Lens Iris Diaphragm with 8 Rotating Blades */}
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <motion.div
          animate={{
            rotate: isHovered ? 28 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <svg
            viewBox="0 0 300 300"
            className="w-full h-full max-w-[280px] max-h-[280px] overflow-visible"
          >
            <defs>
              {/* Blade Metallic Gradient */}
              <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#444444" />
                <stop offset="50%" stopColor="#282828" />
                <stop offset="100%" stopColor="#151515" />
              </linearGradient>

              {/* Rainbow Chromatic Dispersion Flare */}
              <linearGradient id="rainbowPrism" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff0055" stopOpacity="0.8" />
                <stop offset="25%" stopColor="#ff9900" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#00ff88" stopOpacity="0.8" />
                <stop offset="75%" stopColor="#00ccff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#aa00ff" stopOpacity="0.8" />
              </linearGradient>

              {/* Lens Barrel Outer Ring */}
              <radialGradient id="lensRing" cx="50%" cy="50%" r="50%">
                <stop offset="70%" stopColor="#1c1c1c" />
                <stop offset="90%" stopColor="#2a2a2a" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </radialGradient>
            </defs>

            {/* Outer Lens Housing Ring */}
            <circle
              cx="150"
              cy="150"
              r="140"
              fill="url(#lensRing)"
              stroke="#333333"
              strokeWidth="2"
            />
            <circle
              cx="150"
              cy="150"
              r="135"
              fill="none"
              stroke="#555555"
              strokeWidth="0.75"
              strokeDasharray="3 3"
            />

            {/* 8 Aperture Iris Blades */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={angle} transform={`rotate(${angle} 150 150)`}>
                <path
                  d="M150 25 C210 30, 260 70, 265 140 C265 185, 230 205, 195 190 C165 178, 145 155, 142 125 Z"
                  fill="url(#bladeGrad)"
                  stroke="#111111"
                  strokeWidth="1.5"
                  className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                />
                {/* Micro blade bevel ridge */}
                <path
                  d="M150 25 C185 45, 215 80, 225 125"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                />
              </g>
            ))}

            {/* Central Aperture Hole */}
            <motion.circle
              cx="150"
              cy="150"
              animate={{
                r: isHovered ? 26 : 18,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              fill="#000000"
              stroke="#222222"
              strokeWidth="2"
            />

            {/* THE SIGNATURE RAINBOW PRISM REFLECTION (From Reference Image) */}
            <g transform="translate(145, 45) rotate(35)">
              <rect
                x="0"
                y="0"
                width="65"
                height="32"
                rx="6"
                fill="url(#rainbowPrism)"
                className="mix-blend-screen opacity-75"
              />
              {/* Diffracted prism scanlines */}
              <line x1="0" y1="6" x2="65" y2="6" stroke="#ffffff" strokeWidth="0.5" opacity="0.6" />
              <line x1="0" y1="12" x2="65" y2="12" stroke="#ffffff" strokeWidth="0.5" opacity="0.6" />
              <line x1="0" y1="18" x2="65" y2="18" stroke="#ffffff" strokeWidth="0.5" opacity="0.6" />
              <line x1="0" y1="24" x2="65" y2="24" stroke="#ffffff" strokeWidth="0.5" opacity="0.6" />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Subtle Inner Circular Bezel Vignette */}
      <div className="absolute inset-0 rounded-2xl md:rounded-[1.75rem] pointer-events-none shadow-[inset_0_0_35px_rgba(0,0,0,0.9)]" />

      {/* Bottom Subtle Label */}
      <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity duration-300">
        <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">
          f / 1.4 APERTURE IRIS
        </span>
      </div>
    </div>
  );
}

