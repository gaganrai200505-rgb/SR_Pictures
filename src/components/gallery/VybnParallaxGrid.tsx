import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  X,
} from 'lucide-react';
import ApertureBladeCard from './ApertureBladeCard';
import GridCard, { type GridCardData } from './GridCard';
import { ALL_DRIVE_VIDEOS } from './driveVideos';
import { gallerySounds } from './soundEffects';

const DRIVE_FOLDER_URL =
  'https://drive.google.com/drive/folders/1hYNyWCCkXjLcJmaMT8-mHCOU9c68-jaI';

export default function VybnParallaxGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxData, setLightboxData] = useState<GridCardData | null>(null);

  // Parallax on Scroll Hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Alternating Column Parallax Vertical Offsets on Scroll
  const yCol0 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const yCol1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const yCol3 = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const yCol4 = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const yCol5 = useTransform(scrollYProgress, [0, 1], [110, -110]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxData) return;
      if (e.key === 'Escape') setLightboxData(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxData]);

  // ── Column 0: 4 Drive Videos ──
  const col0Items = [
    ALL_DRIVE_VIDEOS[0], // Baby Loukya Reel
    ALL_DRIVE_VIDEOS[1], // METGALA LOOK 1
    ALL_DRIVE_VIDEOS[2], // MS wedTRAILER
    ALL_DRIVE_VIDEOS[3], // lv_0_20260303202132
  ];

  // ── Column 1: 4 Drive Videos + Aperture Diaphragm ──
  const col1TopVideo = ALL_DRIVE_VIDEOS[4]; // P+R Invitation reel
  const col1Items = [
    ALL_DRIVE_VIDEOS[5], // Reel 1
    ALL_DRIVE_VIDEOS[6], // lv_0_20260303202729
    ALL_DRIVE_VIDEOS[7], // lv_0_20260515192616
  ];

  // ── Column 2: 4 Drive Videos ──
  const col2Items = [
    ALL_DRIVE_VIDEOS[8],  // STITCH
    ALL_DRIVE_VIDEOS[9],  // METGALA LOOK 3
    ALL_DRIVE_VIDEOS[10], // SWW
    ALL_DRIVE_VIDEOS[11], // lv_0_20260303203539
  ];

  // ── Column 3: 5 Drive Videos (Replaced Brand Cards with Videos) ──
  const col3Items = [
    ALL_DRIVE_VIDEOS[12],
    ALL_DRIVE_VIDEOS[13],
    ALL_DRIVE_VIDEOS[14],
    ALL_DRIVE_VIDEOS[6],
    ALL_DRIVE_VIDEOS[7],
  ];

  // ── Column 4: 5 Drive Videos ──
  const col4Items = [
    ALL_DRIVE_VIDEOS[15], // Mahindra 7xo
    ALL_DRIVE_VIDEOS[16], // NB reel
    ALL_DRIVE_VIDEOS[17], // Wed teaser
    ALL_DRIVE_VIDEOS[18], // lv_0_20260618151327
    ALL_DRIVE_VIDEOS[19], // lv_0_20260618151432
  ];

  // ── Column 5: 4 Drive Videos + Aperture Diaphragm ──
  const col5TopVideo = ALL_DRIVE_VIDEOS[20]; // Reel 3
  const col5Items = [
    ALL_DRIVE_VIDEOS[21], // Reel 4 (tooltip badge)
    ALL_DRIVE_VIDEOS[22], // lv_0_20260618151528
    ALL_DRIVE_VIDEOS[23], // lv_0_20260813155734
  ];

  return (
    <div className="w-full relative select-none py-2 overflow-hidden">
      {/* ── 6-COLUMN PARALLAX SCROLL GRID (All 24 Google Drive Videos) ── */}
      <div
        ref={containerRef}
        className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 p-2 md:p-3 bg-black rounded-3xl overflow-hidden min-h-[850px]"
      >
        {/* ── COLUMN 0 (Moves UP on scroll) ── */}
        <motion.div style={{ y: yCol0 }} className="flex flex-col gap-3 md:gap-4">
          {col0Items.map((item) => (
            <GridCard
              key={item.id}
              data={item}
              onOpenLightbox={(selected) => {
                gallerySounds.playShutterClick();
                setLightboxData(selected);
              }}
            />
          ))}
        </motion.div>

        {/* ── COLUMN 1 (Moves DOWN on scroll) ── */}
        <motion.div style={{ y: yCol1 }} className="flex flex-col gap-3 md:gap-4">
          <GridCard
            data={col1TopVideo}
            onOpenLightbox={(item) => {
              gallerySounds.playShutterClick();
              setLightboxData(item);
            }}
          />
          {/* Authentic Camera Aperture Diaphragm with Rainbow Prism Flare */}
          <ApertureBladeCard
            onClick={() => {
              gallerySounds.playShutterClick();
            }}
          />
          {col1Items.map((item) => (
            <GridCard
              key={item.id}
              data={item}
              onOpenLightbox={(selected) => {
                gallerySounds.playShutterClick();
                setLightboxData(selected);
              }}
            />
          ))}
        </motion.div>

        {/* ── COLUMN 2 (Moves UP on scroll) ── */}
        <motion.div style={{ y: yCol2 }} className="flex flex-col gap-3 md:gap-4">
          {col2Items.map((item) => (
            <GridCard
              key={item.id}
              data={item}
              onOpenLightbox={(selected) => {
                gallerySounds.playShutterClick();
                setLightboxData(selected);
              }}
            />
          ))}
        </motion.div>

        {/* ── COLUMN 3 (Moves DOWN on scroll) ── */}
        <motion.div style={{ y: yCol3 }} className="flex flex-col gap-3 md:gap-4">
          {col3Items.map((item, idx) => (
            <GridCard
              key={`${item.id}-c3-${idx}`}
              data={item}
              onOpenLightbox={(selected) => {
                gallerySounds.playShutterClick();
                setLightboxData(selected);
              }}
            />
          ))}
        </motion.div>

        {/* ── COLUMN 4 (Moves UP on scroll) ── */}
        <motion.div style={{ y: yCol4 }} className="flex flex-col gap-3 md:gap-4">
          {col4Items.map((item) => (
            <GridCard
              key={item.id}
              data={item}
              onOpenLightbox={(selected) => {
                gallerySounds.playShutterClick();
                setLightboxData(selected);
              }}
            />
          ))}
        </motion.div>

        {/* ── COLUMN 5 (Moves DOWN on scroll) ── */}
        <motion.div style={{ y: yCol5 }} className="flex flex-col gap-3 md:gap-4">
          <GridCard
            data={col5TopVideo}
            onOpenLightbox={(item) => {
              gallerySounds.playShutterClick();
              setLightboxData(item);
            }}
          />
          {/* Second Camera Aperture Iris Card */}
          <ApertureBladeCard
            onClick={() => {
              gallerySounds.playShutterClick();
            }}
          />
          {col5Items.map((item) => (
            <GridCard
              key={item.id}
              data={item}
              onOpenLightbox={(selected) => {
                gallerySounds.playShutterClick();
                setLightboxData(selected);
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* ── FULLSCREEN CINEMATIC LIGHTBOX MODAL (Plays Full Google Drive Master Video) ── */}
      <AnimatePresence>
        {lightboxData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxData(null)}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8"
          >
            {/* Lightbox Header */}
            <div
              className="flex items-center justify-between z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 font-mono text-xs uppercase tracking-wider">
                  {lightboxData.category || 'Reels'}
                </span>
                <span className="text-white font-mono text-xs">
                  Google Drive 4K Master Video
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setLightboxData(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center cursor-pointer border border-white/20"
                aria-label="Close lightbox"
              >
                <X size={18} />
              </button>
            </div>

            {/* Center Video Viewport (Embeds Original Google Drive Player with Full HD & Controls) */}
            <div
              className="relative flex-1 flex items-center justify-center my-auto w-full max-h-[78vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {lightboxData.driveId ? (
                <iframe
                  src={`https://drive.google.com/file/d/${lightboxData.driveId}/preview`}
                  allow="autoplay; fullscreen"
                  title={lightboxData.title}
                  className="w-full max-w-4xl aspect-video rounded-2xl border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.95)] bg-black"
                />
              ) : (
                <video
                  src={lightboxData.src}
                  autoPlay
                  controls
                  loop
                  playsInline
                  className="max-h-[75vh] max-w-[88vw] rounded-2xl border border-white/15 shadow-[0_0_80px_rgba(0,0,0,0.9)] object-contain"
                />
              )}
            </div>

            {/* Bottom Info Bar with Direct Google Drive Master Video Link */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10 pt-4 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  {lightboxData.title}
                </h2>
                <p className="text-xs text-neutral-400 font-mono">
                  {lightboxData.specs || 'Original 4K Master Video from Google Drive'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={
                    lightboxData.driveId
                      ? `https://drive.google.com/file/d/${lightboxData.driveId}/view`
                      : DRIVE_FOLDER_URL
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg font-mono"
                >
                  <span>Open in Google Drive</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
