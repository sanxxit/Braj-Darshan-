'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, X } from 'lucide-react';

const TRACKS = [
  { name: 'Radha Naam Kirtan', artist: 'Vrindavan Bhajan' },
  { name: 'Hare Krishna Mahamantra', artist: 'ISKCON Choir' },
  { name: 'Govardhan Aarti', artist: 'Braj Bhumi' },
];

export default function FloatingAudioPlayer() {
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const track = TRACKS[trackIndex];

  const togglePlay = () => {
    setPlaying((v) => !v);
  };

  const nextTrack = () => {
    setTrackIndex((i) => (i + 1) % TRACKS.length);
    setPlaying(false);
  };

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="player-panel"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-64 rounded-2xl bg-braj-dark-2 border border-gold/15 shadow-gold p-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-bhagwa animate-pulse" />
                <span className="text-xs text-cream/50 tracking-wider uppercase">Kirtan Stream</span>
              </div>
              <button
                onClick={() => setExpanded(false)}
                className="p-1 text-cream/30 hover:text-cream/60 transition-colors"
                aria-label="Close player"
              >
                <X size={14} />
              </button>
            </div>

            {/* Track info */}
            <div className="mb-4">
              <p className="text-sm font-medium text-cream truncate">{track.name}</p>
              <p className="text-xs text-cream/40 mt-0.5">{track.artist}</p>
            </div>

            {/* Waveform visualization (decorative) */}
            <div className="flex items-end gap-0.5 h-8 mb-4">
              {Array.from({ length: 28 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-full bg-bhagwa/40"
                  animate={
                    playing
                      ? { height: ['30%', `${30 + Math.random() * 70}%`, '30%'] }
                      : { height: '20%' }
                  }
                  transition={{
                    duration: 0.6 + Math.random() * 0.4,
                    repeat: Infinity,
                    delay: i * 0.04,
                    ease: 'easeInOut',
                  }}
                  style={{ minHeight: 3 }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={nextTrack}
                className="p-2 text-cream/40 hover:text-cream/70 transition-colors text-xs"
                aria-label="Next track"
              >
                Next ›
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-bhagwa hover:bg-bhagwa-light flex items-center justify-center transition-all shadow-bhagwa"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? <Pause size={16} fill="white" className="text-white" /> : <Play size={16} fill="white" className="text-white ml-0.5" />}
              </button>

              <Volume2 size={16} className="text-cream/30" />
            </div>

            <p className="text-center text-cream/20 text-[10px] mt-3">
              Connect to stream for live audio
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setExpanded((v) => !v)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-bhagwa-lg transition-all duration-300 ${
          expanded ? 'bg-braj-dark-3 border border-gold/20' : 'bg-bhagwa hover:bg-bhagwa-light'
        }`}
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle kirtan player"
      >
        <Music
          size={18}
          className={`transition-colors ${expanded ? 'text-gold' : 'text-white'}`}
        />
        {!expanded && playing && (
          <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border border-braj-dark" />
        )}
      </motion.button>
    </div>
  );
}
