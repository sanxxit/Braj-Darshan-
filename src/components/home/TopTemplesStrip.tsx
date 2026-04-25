'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Temple } from '@/lib/types';

const CARD_GRADIENTS = [
  'from-bhagwa/25 to-bhagwa-dark/5',
  'from-gold/20 to-gold-dark/5',
  'from-lotus/20 to-lotus/5',
  'from-peacock/20 to-peacock/5',
  'from-bhagwa/18 to-yamuna/5',
];

export default function TopTemplesStrip({ temples }: { temples: Temple[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  const top5 = temples.slice(0, 5);

  return (
    <section className="py-16 overflow-hidden">
      {/* Header row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-end justify-between mb-8">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-bhagwa/70 mb-2">✦ Sacred Sites ✦</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-cream">Top Temples of Braj</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-cream/50 hover:text-cream hover:border-gold/40 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-cream/50 hover:text-cream hover:border-gold/40 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
          <Link
            href="/temples"
            className="hidden sm:flex ml-2 text-sm text-bhagwa/70 hover:text-bhagwa transition-colors"
          >
            View all 20 →
          </Link>
        </div>
      </div>

      {/* Scrollable strip */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 px-4 sm:px-6 max-w-7xl mx-auto scrollbar-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {top5.map((temple, i) => {
          const nextAarti = temple.timings.aartis[0];
          return (
            <Link
              key={temple.id}
              href={`/temples#${temple.id}`}
              className="group shrink-0 w-60 sm:w-64 rounded-2xl border border-gold/12 bg-braj-dark-2 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-bhagwa/30 hover:shadow-card-hover"
            >
              {/* Image placeholder */}
              <div className={`h-36 bg-gradient-to-br ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} relative flex items-center justify-center`}>
                <span className="text-4xl opacity-30 select-none">🛕</span>
                {/* Rank badge */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-braj-dark/70 backdrop-blur-sm border border-gold/20 text-[10px] text-gold/80">
                  #{temple.rank}
                </div>
                {/* City badge */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-braj-dark/70 backdrop-blur-sm border border-cream/10 text-[10px] text-cream/50">
                  {temple.city}
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <div>
                  <p className="text-xs text-cream/35 mb-1">{temple.deity}</p>
                  <h3 className="text-sm font-medium text-cream leading-snug group-hover:text-bhagwa-light transition-colors">
                    {temple.name}
                  </h3>
                  <p className="text-xs text-gold/60 font-serif mt-0.5">{temple.name_hindi}</p>
                </div>

                {/* Next aarti */}
                <div className="flex items-center gap-2 text-xs text-cream/45 pt-2 border-t border-gold/8">
                  <span className="text-bhagwa/60">🕯</span>
                  <span>{nextAarti.name}</span>
                  <span className="ml-auto text-gold/70 font-medium">{nextAarti.time}</span>
                </div>
              </div>
            </Link>
          );
        })}

        {/* "See all" card */}
        <Link
          href="/temples"
          className="shrink-0 w-48 rounded-2xl border border-dashed border-gold/15 bg-braj-dark-2/50 flex flex-col items-center justify-center gap-3 text-center px-4 py-8 hover:border-bhagwa/30 hover:bg-bhagwa/5 transition-all duration-300 group"
        >
          <span className="text-2xl opacity-40 group-hover:opacity-70 transition-opacity">🛕</span>
          <p className="text-xs text-cream/35 group-hover:text-cream/60 transition-colors leading-snug">
            Explore all<br />
            <span className="text-bhagwa/60 font-medium">20 Temples →</span>
          </p>
        </Link>
      </div>

      {/* Mobile CTA */}
      <div className="sm:hidden text-center mt-4 px-4">
        <Link href="/temples" className="text-sm text-bhagwa hover:text-bhagwa-light transition-colors">
          View all 20 temples →
        </Link>
      </div>
    </section>
  );
}
