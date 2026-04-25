'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const GITA_QUOTES = [
  { text: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.', ref: 'Bhagavad Gita 2.47' },
  { text: 'The soul is never born nor dies at any time. It has not come into being, does not come into being, and will not come into being.', ref: 'Bhagavad Gita 2.20' },
  { text: 'Whenever and wherever there is a decline in righteousness, I shall manifest myself.', ref: 'Bhagavad Gita 4.7' },
];

interface KrishnaLoaderProps {
  onComplete?: () => void;
  fullScreen?: boolean;
}

export default function KrishnaLoader({ onComplete, fullScreen = true }: KrishnaLoaderProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * GITA_QUOTES.length));
  }, []);

  useEffect(() => {
    const duration = 2600;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => onComplete?.(), 400);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  const quote = GITA_QUOTES[quoteIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center bg-braj-dark z-50 ${fullScreen ? 'fixed inset-0' : 'relative w-full h-full'}`}
    >
      {/* Mandala background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,103,31,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Outer rotating mandala ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute"
        style={{ width: 320, height: 320 }}
      >
        <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={i}
              x1="160"
              y1="10"
              x2="160"
              y2="50"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeOpacity="0.25"
              transform={`rotate(${i * 22.5} 160 160)`}
            />
          ))}
          <circle cx="160" cy="160" r="148" stroke="#FF671F" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4 8" />
          <circle cx="160" cy="160" r="128" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="2 6" />
        </svg>
      </motion.div>

      {/* Counter-rotating inner ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute"
        style={{ width: 220, height: 220 }}
      >
        <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="110"
              cy="110"
              rx="6"
              ry="14"
              fill="#FF671F"
              fillOpacity="0.18"
              transform={`rotate(${i * 45} 110 110) translate(0 -78)`}
            />
          ))}
          <circle cx="110" cy="110" r="100" stroke="#FF671F" strokeWidth="0.4" strokeOpacity="0.2" />
        </svg>
      </motion.div>

      {/* Krishna SVG silhouette */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10"
        style={{ width: 120, height: 160 }}
      >
        <KrishnaSVG />
      </motion.div>

      {/* Brand name */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="relative z-10 mt-6 text-center"
      >
        <h1 className="text-2xl font-serif tracking-widest text-gradient-bhagwa">
          ब्रज दर्शन
        </h1>
        <p className="text-xs tracking-[0.35em] uppercase text-cream/40 mt-1">
          Braj Darshan
        </p>
      </motion.div>

      {/* Gita quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="relative z-10 mt-8 max-w-xs text-center px-6"
      >
        <p className="text-cream/55 text-sm leading-relaxed italic font-serif">
          &ldquo;{quote.text}&rdquo;
        </p>
        <p className="text-gold/60 text-xs mt-2 tracking-wider">{quote.ref}</p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 mt-10 w-48"
      >
        <div className="h-px bg-braj-dark-3 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #FF671F, #D4AF37)',
              width: `${progress}%`,
            }}
            transition={{ duration: 0.03 }}
          />
        </div>
        <p className="text-center text-cream/25 text-xs mt-2 tracking-widest">
          {progress < 100 ? 'Loading Braj…' : 'Jay Shri Krishna ✦'}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* Inline SVG flute-playing Krishna silhouette */
function KrishnaSVG() {
  return (
    <motion.svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
      animate={{ filter: ['drop-shadow(0 0 8px #FF671F99)', 'drop-shadow(0 0 22px #D4AF37CC)', 'drop-shadow(0 0 8px #FF671F99)'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Peacock feather crown */}
      <motion.g
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '60px 20px' }}
      >
        <path d="M55 22 Q58 8 60 5 Q62 8 65 22" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.8" fill="none" />
        <ellipse cx="60" cy="5" rx="4" ry="3" fill="#1B6CA8" fillOpacity="0.9" />
        <ellipse cx="60" cy="5" rx="2" ry="1.5" fill="#D4AF37" fillOpacity="0.7" />
        <path d="M50 22 Q51 12 54 10 Q56 14 55 22" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
        <path d="M70 22 Q69 12 66 10 Q64 14 65 22" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
      </motion.g>

      {/* Head */}
      <ellipse cx="60" cy="34" rx="14" ry="16" fill="#FF671F" fillOpacity="0.85" />
      {/* Face highlight */}
      <ellipse cx="57" cy="31" rx="5" ry="6" fill="#FF8C52" fillOpacity="0.4" />
      {/* Tilak */}
      <rect x="58.5" y="26" width="3" height="6" rx="1.5" fill="#D4AF37" fillOpacity="0.9" />

      {/* Neck */}
      <rect x="56" y="48" width="8" height="8" rx="2" fill="#FF671F" fillOpacity="0.75" />

      {/* Body / Pitambar (yellow dhoti) */}
      <path d="M42 56 Q40 90 42 118 L78 118 Q80 90 78 56 Q69 52 60 52 Q51 52 42 56Z" fill="#D4AF37" fillOpacity="0.7" />
      {/* Body shading */}
      <path d="M60 52 L60 118" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" />

      {/* Left arm — raised, holding flute */}
      <motion.g
        animate={{ rotate: [0, -4, 4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '44px 62px' }}
      >
        <path d="M44 62 Q30 58 18 54" stroke="#FF671F" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.8" />
        {/* Flute */}
        <path d="M18 54 Q40 46 62 44" stroke="#A8860C" strokeWidth="2" strokeLinecap="round" />
        {/* Flute holes */}
        {[24, 32, 40, 48, 56].map((x, i) => (
          <circle key={i} cx={x} cy={50 - (x - 18) * 0.1} r="1.2" fill="#D4AF37" fillOpacity="0.9" />
        ))}
      </motion.g>

      {/* Right arm */}
      <path d="M76 62 Q88 66 94 72" stroke="#FF671F" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.8" />

      {/* Legs / contrapposto stance */}
      <path d="M48 116 Q46 134 48 150" stroke="#FF671F" strokeWidth="8" strokeLinecap="round" strokeOpacity="0.75" />
      <path d="M72 116 Q76 134 74 150" stroke="#FF671F" strokeWidth="8" strokeLinecap="round" strokeOpacity="0.75" />

      {/* Feet */}
      <ellipse cx="47" cy="152" rx="6" ry="3" fill="#FF671F" fillOpacity="0.6" />
      <ellipse cx="74" cy="152" rx="6" ry="3" fill="#FF671F" fillOpacity="0.6" />

      {/* Lotus / standing platform */}
      <motion.g
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '60px 157px' }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse
            key={i}
            cx={60 + 16 * Math.cos((angle * Math.PI) / 180)}
            cy={157 + 4 * Math.sin((angle * Math.PI) / 180)}
            rx="5"
            ry="3"
            fill="#C85A8A"
            fillOpacity="0.35"
            transform={`rotate(${angle} ${60 + 16 * Math.cos((angle * Math.PI) / 180)} ${157 + 4 * Math.sin((angle * Math.PI) / 180)})`}
          />
        ))}
        <ellipse cx="60" cy="157" rx="16" ry="4" fill="#C85A8A" fillOpacity="0.25" />
      </motion.g>

      {/* Gold necklace / vaijayantimala */}
      <path d="M48 52 Q60 58 72 52" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
      {[50, 55, 60, 65, 70].map((x, i) => (
        <circle key={i} cx={x} cy={53 + Math.abs(x - 60) * 0.08} r="1.4" fill="#D4AF37" fillOpacity="0.8" />
      ))}
    </motion.svg>
  );
}

/* Convenience wrapper with AnimatePresence for page-level use */
export function KrishnaLoaderOverlay({ show, onComplete }: { show: boolean; onComplete?: () => void }) {
  return (
    <AnimatePresence>
      {show && <KrishnaLoader onComplete={onComplete} fullScreen />}
    </AnimatePresence>
  );
}
