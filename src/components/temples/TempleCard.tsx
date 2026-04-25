'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Camera, CameraOff, Clock, DoorOpen, ExternalLink } from 'lucide-react';
import type { Temple } from '@/lib/types';
import DarshanRushBadge from './DarshanRushBadge';

const CARD_GRADIENTS = [
  'from-bhagwa/25 via-bhagwa/8 to-transparent',
  'from-gold/22 via-gold/7 to-transparent',
  'from-lotus/22 via-lotus/7 to-transparent',
  'from-peacock/22 via-peacock/7 to-transparent',
];

const TAG_COLORS: Record<string, string> = {
  'Must Visit': 'bg-bhagwa/12 text-bhagwa/80 border-bhagwa/20',
  'Heritage':   'bg-gold/12 text-gold/80 border-gold/20',
  'Ancient':    'bg-gold/12 text-gold/80 border-gold/20',
  'Vrindavan':  'bg-lotus/12 text-lotus/80 border-lotus/20',
  'ISKCON':     'bg-peacock/12 text-peacock/80 border-peacock/20',
  'Govardhan':  'bg-green-500/12 text-green-400/80 border-green-500/20',
  'Sacred Pond':'bg-yamuna/12 text-yamuna/80 border-yamuna/20',
  'default':    'bg-cream/8 text-cream/50 border-cream/15',
};

function tagStyle(tag: string) {
  return TAG_COLORS[tag] ?? TAG_COLORS.default;
}

interface TempleCardProps {
  temple: Temple;
  gradientIndex?: number;
}

export default function TempleCard({ temple, gradientIndex = 0 }: TempleCardProps) {
  const [open, setOpen] = useState(false);

  const firstAarti = temple.timings.aartis[0];

  return (
    <article className="group rounded-2xl border border-gold/12 bg-braj-dark-2 overflow-hidden transition-all duration-300 hover:border-bhagwa/22 hover:shadow-card-hover">

      {/* ── Top image area ─────────────────────── */}
      <div className={`relative h-40 bg-gradient-to-br ${CARD_GRADIENTS[gradientIndex % CARD_GRADIENTS.length]} flex items-center justify-center overflow-hidden`}>
        {/* Mandala overlay */}
        <svg viewBox="0 0 200 160" className="absolute inset-0 w-full h-full opacity-[0.07]" fill="none">
          {[60, 45, 30, 15].map((r) => (
            <circle key={r} cx="100" cy="80" r={r} stroke="#D4AF37" strokeWidth="0.6" strokeDasharray="4 6" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1="100" y1="25" x2="100" y2="48" stroke="#FF671F" strokeWidth="0.8" transform={`rotate(${i * 45} 100 80)`} />
          ))}
        </svg>

        {/* Temple icon */}
        <span className="text-5xl opacity-20 select-none">🛕</span>

        {/* Rank */}
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-braj-dark/75 backdrop-blur-sm border border-gold/20 text-[10px] text-gold/80">
          #{temple.rank}
        </div>
        {/* City */}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-braj-dark/75 backdrop-blur-sm border border-cream/10 text-[10px] text-cream/50">
          {temple.city}
        </div>
        {/* Hindi name bottom overlay */}
        <div className="absolute bottom-0 inset-x-0 px-4 py-2 bg-gradient-to-t from-braj-dark-2/80 to-transparent">
          <p className="font-serif text-sm text-cream/70">{temple.name_hindi}</p>
        </div>
      </div>

      {/* ── Card body ──────────────────────────── */}
      <div className="p-4 flex flex-col gap-3">
        {/* Name + deity */}
        <div>
          <h3 className="text-sm font-medium text-cream leading-snug group-hover:text-bhagwa-light transition-colors">
            {temple.name}
          </h3>
          <p className="text-xs text-cream/40 mt-0.5">{temple.deity}</p>
        </div>

        {/* Quick timing row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5 text-xs text-cream/45">
            <DoorOpen size={12} className="text-bhagwa/60 shrink-0" />
            <span>{temple.timings.opening_time}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-cream/45">
            <Clock size={12} className="text-gold/60 shrink-0" />
            <span>{firstAarti.time}</span>
          </div>
        </div>

        {/* Crowd status */}
        {temple.crowd_status && (
          <DarshanRushBadge level={temple.crowd_status.level} note={temple.crowd_status.note} />
        )}

        {/* Tags row */}
        <div className="flex flex-wrap gap-1.5">
          {temple.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full border ${tagStyle(tag)}`}>
              {tag}
            </span>
          ))}
          {temple.photography_allowed
            ? <span title="Photography allowed"><Camera size={12} className="text-cream/25 mt-0.5" /></span>
            : <span title="No photography"><CameraOff size={12} className="text-cream/20 mt-0.5" /></span>
          }
        </div>

        {/* Entry fee row */}
        <div className="flex items-center justify-between text-xs border-t border-gold/8 pt-3">
          <span className={`px-2 py-0.5 rounded-full border ${temple.entry_fee === 'Free' ? 'text-green-400/80 border-green-400/20 bg-green-400/8' : 'text-gold/70 border-gold/20 bg-gold/8'}`}>
            {temple.entry_fee}
          </span>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1 text-bhagwa/70 hover:text-bhagwa transition-colors"
            aria-expanded={open}
          >
            Timings
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={13} />
            </motion.div>
          </button>
        </div>
      </div>

      {/* ── Expanded timings ───────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="timings"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 border-t border-gold/10 bg-braj-dark-3">
              {/* Darshan hours */}
              <div className="pt-4 mb-4 grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-xl bg-bhagwa/5 border border-bhagwa/12">
                  <p className="text-[9px] uppercase tracking-wider text-bhagwa/60 mb-1">Morning</p>
                  <p className="text-xs text-cream/70">{temple.timings.opening_time}</p>
                  <p className="text-[10px] text-cream/35">— {temple.timings.closing_time}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-gold/5 border border-gold/12">
                  <p className="text-[9px] uppercase tracking-wider text-gold/60 mb-1">Evening</p>
                  <p className="text-xs text-cream/70">{temple.timings.evening_open}</p>
                  <p className="text-[10px] text-cream/35">— {temple.timings.evening_close}</p>
                </div>
              </div>

              {/* Aarti schedule */}
              <p className="text-[9px] uppercase tracking-[0.2em] text-cream/30 mb-2.5">Aarti Schedule</p>
              <div className="flex flex-col gap-1.5">
                {temple.timings.aartis.map((aarti) => (
                  <div key={aarti.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-bhagwa/50 shrink-0" />
                      <span className="text-cream/65">{aarti.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gold/70 font-medium tabular-nums">{aarti.time}</span>
                      <span className="text-cream/25">{aarti.duration_min}m</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dress code + special note */}
              {(temple.dress_code || temple.timings.special_note) && (
                <div className="mt-3 pt-3 border-t border-gold/8 flex flex-col gap-1.5">
                  <p className="text-[10px] text-cream/40">
                    👗 {temple.dress_code}
                  </p>
                  {temple.timings.special_note && (
                    <p className="text-[10px] text-gold/50 leading-relaxed">
                      ℹ {temple.timings.special_note}
                    </p>
                  )}
                </div>
              )}

              {/* Trust links */}
              {temple.trust_links && Object.values(temple.trust_links).some(Boolean) && (
                <div className="mt-3 pt-3 border-t border-gold/8">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-cream/30 mb-2">Official Links — No Middlemen</p>
                  <div className="flex flex-col gap-1.5">
                    {temple.trust_links.official_website && (
                      <a href={temple.trust_links.official_website} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[10px] text-bhagwa/70 hover:text-bhagwa transition-colors">
                        <ExternalLink size={10} /> Official Website
                      </a>
                    )}
                    {temple.trust_links.live_darshan_link && (
                      <a href={temple.trust_links.live_darshan_link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[10px] text-red-400/70 hover:text-red-400 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live Darshan
                      </a>
                    )}
                    {temple.trust_links.puja_booking_link && (
                      <a href={temple.trust_links.puja_booking_link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[10px] text-gold/70 hover:text-gold transition-colors">
                        <ExternalLink size={10} /> Book Puja / Seva
                      </a>
                    )}
                    {temple.trust_links.donation_link && (
                      <a href={temple.trust_links.donation_link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[10px] text-green-400/70 hover:text-green-400 transition-colors">
                        <ExternalLink size={10} /> Donate to Temple Trust
                      </a>
                    )}
                  </div>
                  <p className="text-[9px] text-cream/20 mt-2 italic">We never take a commission from these links.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
