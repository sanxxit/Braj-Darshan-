'use client';

import { motion } from 'framer-motion';
import type { CrowdLevel } from '@/lib/types';

const CONFIG: Record<CrowdLevel, { label: string; color: string; bg: string; border: string; bars: number }> = {
  peaceful: { label: 'Peaceful',  color: '#4ade80', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.25)',  bars: 1 },
  moderate: { label: 'Moderate',  color: '#facc15', bg: 'rgba(250,204,21,0.08)',  border: 'rgba(250,204,21,0.25)',  bars: 2 },
  busy:     { label: 'Busy',      color: '#fb923c', bg: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.25)',  bars: 3 },
  extreme:  { label: 'Extreme!',  color: '#f87171', bg: 'rgba(248,113,113,0.10)', border: 'rgba(248,113,113,0.35)', bars: 4 },
};

interface Props {
  level: CrowdLevel;
  note?: string;
  compact?: boolean;
}

export default function DarshanRushBadge({ level, note, compact = false }: Props) {
  const cfg = CONFIG[level];

  if (compact) {
    return (
      <div
        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium"
        style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: cfg.color }}
          animate={{ opacity: level === 'extreme' ? [1, 0.3, 1] : 1 }}
          transition={{ duration: 0.9, repeat: Infinity }}
        />
        {cfg.label}
      </div>
    );
  }

  return (
    <div
      className="flex items-start justify-between gap-3 rounded-xl px-3 py-2.5"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <motion.span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: cfg.color }}
          animate={{ opacity: level === 'extreme' ? [1, 0.3, 1] : [1, 0.6, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        />
        <div className="min-w-0">
          <p className="text-xs font-medium" style={{ color: cfg.color }}>
            Bheed: {cfg.label}
          </p>
          {note && (
            <p className="text-[10px] text-cream/45 leading-snug mt-0.5 truncate">{note}</p>
          )}
        </div>
      </div>

      {/* Signal-bar icon */}
      <div className="flex items-end gap-0.5 shrink-0 h-4">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className="w-1 rounded-sm transition-all"
            style={{
              height: `${bar * 25}%`,
              background: bar <= cfg.bars ? cfg.color : 'rgba(255,255,255,0.1)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
