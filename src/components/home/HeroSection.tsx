'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const BEZIER = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STAGGER = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } },
  item: { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: BEZIER } } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center text-center overflow-hidden px-4">

      {/* ── Background atmosphere ─────────────────────── */}
      {/* Radial bhagwa glow — centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(255,103,31,0.09) 0%, transparent 65%)' }}
      />
      {/* Dim outer gold ring glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 60%)' }}
      />

      {/* Rotating outer mandala */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute pointer-events-none"
        style={{ width: 700, height: 700 }}
      >
        <svg viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={i} x1="350" y1="30" x2="350" y2="80" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.12" transform={`rotate(${i * 15} 350 350)`} />
          ))}
          <circle cx="350" cy="350" r="330" stroke="#FF671F" strokeWidth="0.6" strokeOpacity="0.1" strokeDasharray="6 12" />
          <circle cx="350" cy="350" r="300" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.08" strokeDasharray="3 9" />
        </svg>
      </motion.div>

      {/* Counter-rotating inner ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
        className="absolute pointer-events-none"
        style={{ width: 440, height: 440 }}
      >
        <svg viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse key={i} cx="220" cy="220" rx="7" ry="18" fill="#FF671F" fillOpacity="0.12" transform={`rotate(${i * 30} 220 220) translate(0 -185)`} />
          ))}
          <circle cx="220" cy="220" r="200" stroke="#FF671F" strokeWidth="0.5" strokeOpacity="0.1" />
        </svg>
      </motion.div>

      {/* Floating particles */}
      {[
        { top: '18%', left: '12%', delay: 0 },
        { top: '30%', right: '10%', delay: 1.2 },
        { top: '70%', left: '18%', delay: 0.6 },
        { top: '75%', right: '14%', delay: 1.8 },
        { top: '50%', left: '5%', delay: 0.9 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/30 pointer-events-none"
          style={pos as React.CSSProperties}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: pos.delay as number, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Main content ──────────────────────────────── */}
      <motion.div
        variants={STAGGER.container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center max-w-3xl"
      >
        {/* Eyebrow */}
        <motion.div variants={STAGGER.item} className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-bhagwa/40" />
          <span className="text-xs tracking-[0.3em] uppercase text-bhagwa/80">
            जय श्री राधे — Braj Darshan
          </span>
          <span className="h-px w-8 bg-bhagwa/40" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={STAGGER.item}
          className="text-5xl sm:text-6xl lg:text-7xl font-serif leading-[1.08] tracking-tight mb-6"
        >
          <span className="text-gradient-bhagwa">Experience</span>
          <br />
          <span className="text-cream">Bhakti with</span>
          <br />
          <span className="text-gradient-gold">Locals.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={STAGGER.item}
          className="text-cream/55 text-lg sm:text-xl leading-relaxed max-w-xl mb-10"
        >
          Plan your Mathura tour with the people who know Braj best.
          Temple timings, festivals, itineraries — straight from the heart.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={STAGGER.item} className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/planner"
            className="px-7 py-3.5 rounded-full bg-bhagwa hover:bg-bhagwa-light text-white font-medium text-sm transition-all duration-200 shadow-bhagwa hover:shadow-bhagwa-lg hover:-translate-y-0.5"
          >
            Plan My Yatra →
          </Link>
          <Link
            href="/temples"
            className="px-7 py-3.5 rounded-full border border-gold/30 hover:border-gold/60 text-cream/70 hover:text-cream text-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            Explore Temples
          </Link>
        </motion.div>

        {/* Trust stats */}
        <motion.div
          variants={STAGGER.item}
          className="mt-14 grid grid-cols-3 gap-6 sm:gap-10"
        >
          {[
            { value: '20+', label: 'Sacred Temples' },
            { value: '6', label: 'Major Festivals' },
            { value: '3', label: 'Ready Itineraries' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-serif text-gradient-bhagwa">{value}</span>
              <span className="text-xs text-cream/35 text-center">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-cream/30">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold/30 to-transparent" />
      </motion.div>
    </section>
  );
}
