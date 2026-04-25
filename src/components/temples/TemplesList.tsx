'use client';

import { useState, useMemo } from 'react';
import { Search, LayoutGrid, List } from 'lucide-react';
import { motion } from 'framer-motion';
import TempleCard from './TempleCard';
import type { Temple } from '@/lib/types';

const CITIES = ['All', 'Mathura', 'Vrindavan', 'Govardhan'] as const;
type City = typeof CITIES[number];

export default function TemplesList({ temples }: { temples: Temple[] }) {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState<City>('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return temples.filter((t) => {
      if (!t.is_active) return false;
      if (city !== 'All' && t.city !== city) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.deity.toLowerCase().includes(q) ||
        t.name_hindi.includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [query, city, temples]);

  return (
    <>
      {/* ── Search & Filter bar ───────────────── */}
      <div className="sticky top-16 z-20 bg-braj-dark/95 backdrop-blur-xl border-b border-gold/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/30" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search temples, deities…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-braj-dark-3 border border-gold/12 text-cream text-sm placeholder:text-cream/25 focus:outline-none focus:border-bhagwa/40 focus:ring-1 focus:ring-bhagwa/15 transition-all"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 sm:pb-0" style={{ scrollbarWidth: 'none' }}>
            {CITIES.map((c) => (
              <button key={c} onClick={() => setCity(c)}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                  c === city ? 'bg-bhagwa text-white shadow-bhagwa' : 'border border-gold/15 text-cream/50 hover:border-gold/30 hover:text-cream/75'
                }`}>
                {c}
              </button>
            ))}
          </div>
          <div className="hidden sm:flex gap-1 border border-gold/12 rounded-xl p-1">
            <button onClick={() => setView('grid')}
              className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-bhagwa/15 text-bhagwa' : 'text-cream/30 hover:text-cream/55'}`}
              aria-label="Grid view"><LayoutGrid size={15} /></button>
            <button onClick={() => setView('list')}
              className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-bhagwa/15 text-bhagwa' : 'text-cream/30 hover:text-cream/55'}`}
              aria-label="List view"><List size={15} /></button>
          </div>
        </div>
      </div>

      {/* ── Results ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-xs text-cream/30 mb-6">
          {filtered.length === 0 ? 'No temples found.' : `Showing ${filtered.length} temple${filtered.length !== 1 ? 's' : ''}`}
          {city !== 'All' && <span className="text-bhagwa/60"> in {city}</span>}
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4 opacity-30">🛕</span>
            <p className="text-cream/40 text-sm">No temples match your search.</p>
            <button onClick={() => { setQuery(''); setCity('All'); }}
              className="mt-4 text-xs text-bhagwa/70 hover:text-bhagwa transition-colors">
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            key={`${city}-${query}-${view}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
            className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5' : 'flex flex-col gap-4'}
          >
            {filtered.map((temple, i) => (
              <TempleCard key={temple.id} temple={temple} gradientIndex={i} />
            ))}
          </motion.div>
        )}
      </section>

      {/* ── Brajwasi Tip ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="rounded-2xl border border-bhagwa/12 bg-bhagwa/4 px-6 py-5 flex gap-4 items-start">
          <span className="text-xl shrink-0">🙏</span>
          <div>
            <p className="text-sm font-medium text-cream mb-1">Timing Tip from Brajwasis</p>
            <p className="text-sm text-cream/45 leading-relaxed">
              The best time for darshan is the <strong className="text-cream/65">Mangala Aarti at dawn (4–5 AM)</strong> —
              smaller crowds, cool air, and the most spiritually charged atmosphere of the day.
              Arrive 30 minutes early. Always carry a dupatta or shawl.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
