'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { itineraries } from '@/lib/data/itineraries';
import type { ItineraryStop } from '@/lib/types';

/* ── Stop type styling ─────────────────────────────────────── */
const STOP_CONFIG: Record<string, { icon: string; dot: string; badge: string; line: string }> = {
  Temple:   { icon: '🛕', dot: 'bg-bhagwa border-bhagwa/40',   badge: 'bg-bhagwa/10 text-bhagwa/80 border-bhagwa/20',   line: 'bg-bhagwa/15' },
  Food:     { icon: '🍛', dot: 'bg-gold border-gold/40',       badge: 'bg-gold/10 text-gold/80 border-gold/20',          line: 'bg-gold/15' },
  Activity: { icon: '🚶', dot: 'bg-lotus border-lotus/40',     badge: 'bg-lotus/10 text-lotus/80 border-lotus/20',       line: 'bg-lotus/15' },
  Hotel:    { icon: '🏨', dot: 'bg-peacock border-peacock/40', badge: 'bg-peacock/10 text-peacock/80 border-peacock/20', line: 'bg-peacock/15' },
  Travel:   { icon: '🚗', dot: 'bg-cream/30 border-cream/20',  badge: 'bg-cream/5 text-cream/50 border-cream/15',        line: 'bg-cream/10' },
};

function getConfig(type: string) {
  return STOP_CONFIG[type] ?? STOP_CONFIG.Travel;
}

/* ── Individual stop card ────────────────────────────────── */
function StopCard({ stop, index, isLast }: { stop: ItineraryStop; index: number; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = getConfig(stop.type);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: 'easeOut' }}
      className="relative flex gap-5"
    >
      {/* Left: time + dot + line */}
      <div className="flex flex-col items-center shrink-0" style={{ width: 72 }}>
        <span className="text-xs text-cream/40 tabular-nums font-medium leading-none mb-2">
          {stop.time}
        </span>
        <div className={`w-3 h-3 rounded-full border-2 shrink-0 z-10 ${cfg.dot}`} />
        {!isLast && (
          <div className={`w-px flex-1 mt-1 min-h-8 ${cfg.line}`} />
        )}
      </div>

      {/* Right: card */}
      <div className={`flex-1 pb-6 ${isLast ? '' : ''}`}>
        <div
          className="rounded-xl border border-gold/10 bg-braj-dark-2 overflow-hidden transition-colors hover:border-bhagwa/18 cursor-pointer"
          onClick={() => setExpanded((v) => !v)}
        >
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                <span className="text-base shrink-0">{cfg.icon}</span>
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-cream leading-snug">{stop.title}</h4>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${cfg.badge}`}>
                      {stop.type}
                    </span>
                    <span className="text-[10px] text-cream/30">{stop.duration_min} min</span>
                  </div>
                </div>
              </div>
              <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 mt-0.5">
                <ChevronDown size={14} className="text-cream/30" />
              </motion.div>
            </div>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 pt-0 border-t border-gold/8 flex flex-col gap-2.5">
                  <p className="text-sm text-cream/55 leading-relaxed mt-3">
                    {stop.description}
                  </p>
                  {stop.tips && (
                    <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-gold/5 border border-gold/12">
                      <span className="text-sm shrink-0">💡</span>
                      <p className="text-xs text-gold/70 leading-relaxed">{stop.tips}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main timeline component ─────────────────────────────── */
export default function PlannerTimeline() {
  const [itineraryIdx, setItineraryIdx] = useState(0);
  const [dayIdx, setDayIdx] = useState(0);

  const itinerary = itineraries[itineraryIdx];
  const day = itinerary.schedule[dayIdx];

  const handleItineraryChange = (idx: number) => {
    setItineraryIdx(idx);
    setDayIdx(0);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* ── Itinerary selector ───────────────── */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-end justify-between">
        <div>
          <p className="text-xs text-cream/35 uppercase tracking-wider mb-3">Choose your Yatra</p>
          <div className="flex gap-2">
            {itineraries.map((it, i) => (
              <button
                key={it.id}
                onClick={() => handleItineraryChange(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  i === itineraryIdx
                    ? 'bg-bhagwa text-white shadow-bhagwa'
                    : 'border border-gold/20 text-cream/55 hover:border-gold/40 hover:text-cream/80'
                }`}
              >
                {it.days} Days
              </button>
            ))}
          </div>
        </div>

        {/* Itinerary info */}
        <div className="text-right hidden sm:block">
          <p className="text-xs text-bhagwa/70 font-medium">{itinerary.title}</p>
          <p className="text-xs text-cream/35 mt-0.5">{itinerary.tagline}</p>
        </div>
      </div>

      {/* ── Itinerary detail card ────────────── */}
      <div className="rounded-2xl border border-gold/12 bg-braj-dark-2 p-5 flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-1">
          <h2 className="text-lg font-serif text-cream mb-1">{itinerary.title}</h2>
          <p className="text-sm text-cream/45 leading-relaxed">{itinerary.description}</p>
        </div>
        <div className="shrink-0">
          <p className="text-xs text-cream/30 mb-2">Best for</p>
          <div className="flex flex-wrap gap-1.5">
            {itinerary.best_for.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-gold/15 text-cream/50 bg-gold/5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Day tabs ─────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {itinerary.schedule.map((d, i) => (
          <button
            key={d.day}
            onClick={() => setDayIdx(i)}
            className={`shrink-0 px-5 py-2.5 rounded-xl text-sm transition-all ${
              i === dayIdx
                ? 'bg-braj-dark-3 border border-bhagwa/30 text-cream'
                : 'border border-gold/10 text-cream/45 hover:text-cream/70 hover:border-gold/25'
            }`}
          >
            <span className={`font-medium ${i === dayIdx ? 'text-bhagwa' : ''}`}>Day {d.day}</span>
          </button>
        ))}
      </div>

      {/* ── Day header ───────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${itineraryIdx}-${dayIdx}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6 p-5 rounded-2xl border border-bhagwa/12 bg-bhagwa/5 relative overflow-hidden">
            {/* deco */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-5 select-none">🛕</div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-bhagwa/60 mb-1">
              Day {day.day} of {itinerary.days}
            </p>
            <h3 className="text-lg font-serif text-cream">{day.theme}</h3>
            <p className="text-xs text-cream/35 mt-1">
              {day.stops.length} stops · ~{day.stops.reduce((a, s) => a + s.duration_min, 0)} minutes
            </p>
          </div>

          {/* ── Timeline stops ─────────────────── */}
          <div className="flex flex-col">
            {day.stops.map((stop, i) => (
              <StopCard
                key={`${stop.time}-${i}`}
                stop={stop}
                index={i}
                isLast={i === day.stops.length - 1}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Download / share hint ────────────── */}
      <div className="text-center pt-2 pb-4">
        <p className="text-xs text-cream/25 italic font-serif">
          &ldquo;Arise, awake, and stop not until the goal is reached.&rdquo;
        </p>
        <p className="text-cream/15 text-[10px] mt-1">— Swami Vivekananda</p>
      </div>
    </div>
  );
}
