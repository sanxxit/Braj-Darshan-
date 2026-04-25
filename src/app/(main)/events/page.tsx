import type { Metadata } from 'next';
import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import { festivals as staticFestivals } from '@/lib/data/events';
import type { FestivalEvent } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Braj Utsav — Festivals & Events',
  description: 'Celebrate Holi, Janmashtami, Govardhan Puja and more in the land of Krishna. Find the best times to visit Mathura and Vrindavan.',
};

const CROWD_BADGE: Record<string, string> = {
  Low:     'bg-green-400/10  border-green-400/25  text-green-400',
  Medium:  'bg-yellow-400/10 border-yellow-400/25 text-yellow-400',
  High:    'bg-orange-400/10 border-orange-400/25 text-orange-400',
  Extreme: 'bg-red-400/10    border-red-400/25    text-red-400',
};

const CARD_GRADIENT = [
  'from-bhagwa/20 to-bhagwa/3',
  'from-lotus/20  to-lotus/3',
  'from-gold/18   to-gold/3',
  'from-peacock/18 to-peacock/3',
  'from-bhagwa/15 to-yamuna/5',
  'from-gold/15   to-lotus/5',
];

function FestivalCard({ festival, index }: { festival: FestivalEvent; index: number }) {
  return (
    <article className="group rounded-2xl border border-gold/12 bg-braj-dark-2 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-bhagwa/25 hover:shadow-card-hover">
      {/* Image area */}
      <div className={`h-44 bg-gradient-to-br ${CARD_GRADIENT[index % CARD_GRADIENT.length]} relative flex items-center justify-center`}>
        {/* Mandala deco */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-8" fill="none">
          {[70, 50, 30].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} stroke="#D4AF37" strokeWidth="0.6" strokeDasharray="4 6" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1="100" y1="30" x2="100" y2="55" stroke="#FF671F" strokeWidth="0.8" strokeOpacity="0.6" transform={`rotate(${i * 45} 100 100)`} />
          ))}
        </svg>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${CROWD_BADGE[festival.crowd_level]}`}>
            {festival.crowd_level} Crowd
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-xs px-2.5 py-1 rounded-full border border-gold/20 bg-braj-dark/60 text-gold/70">
            {festival.category}
          </span>
        </div>

        {/* Hindi name overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-2xl font-serif text-cream/80 text-gradient-gold leading-tight">
            {festival.name_hindi}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-base font-medium text-cream mb-1 group-hover:text-bhagwa-light transition-colors">
            {festival.name}
          </h3>
          <p className="text-xs text-cream/40 leading-relaxed line-clamp-3">
            {festival.description}
          </p>
        </div>

        {/* When */}
        <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl bg-braj-dark-3 border border-gold/8">
          <span className="text-gold/60">📅</span>
          <span className="text-cream/55">{festival.typical_dates}</span>
        </div>

        {/* Activities preview */}
        <ul className="flex flex-col gap-1.5">
          {festival.special_activities.slice(0, 3).map((act) => (
            <li key={act} className="flex items-start gap-2 text-xs text-cream/50">
              <span className="text-bhagwa/50 shrink-0 mt-0.5">✦</span>
              <span className="line-clamp-1">{act}</span>
            </li>
          ))}
        </ul>

        {/* Advance booking */}
        {festival.advance_booking_days > 0 && (
          <p className="text-xs text-gold/50 border-t border-gold/8 pt-3">
            Book accommodation <span className="text-gold font-medium">{festival.advance_booking_days}+ days</span> in advance
          </p>
        )}
      </div>
    </article>
  );
}

async function fetchFestivals(): Promise<FestivalEvent[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.from('festival_events').select('*');
    if (error || !data?.length) return staticFestivals;
    return data as FestivalEvent[];
  } catch {
    return staticFestivals;
  }
}

export default async function EventsPage() {
  const festivals = await fetchFestivals();
  const major = festivals.filter((f) => f.category === 'Major');
  const others = festivals.filter((f) => f.category !== 'Major');

  return (
    <div className="min-h-dvh">
      {/* ── Page Hero ─────────────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 text-center overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,103,31,0.08) 0%, transparent 65%)' }}
        />
        {/* Rotating ring */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.06] pointer-events-none">
          <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={i} x1="250" y1="20" x2="250" y2="70" stroke="#D4AF37" strokeWidth="1" transform={`rotate(${i * 18} 250 250)`} />
            ))}
            <circle cx="250" cy="250" r="220" stroke="#FF671F" strokeWidth="0.8" strokeDasharray="6 10" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-bhagwa/70 mb-4">
            ✦ Braj Utsav ✦
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif text-cream mb-4">
            <span className="text-gradient-bhagwa">Every day</span> is a<br />
            celebration in Braj.
          </h1>
          <p className="text-cream/50 leading-relaxed">
            From the 40-day Holi to the midnight birth of Krishna —<br />
            plan your visit around the most divine celebrations on earth.
          </p>
        </div>
      </section>

      {/* ── Major Festivals ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          <span className="text-xs tracking-[0.2em] uppercase text-gold/50 shrink-0">Major Festivals</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {major.map((festival, i) => (
            <FestivalCard key={festival.id} festival={festival} index={i} />
          ))}
        </div>

        {/* Planning tip banner */}
        <div className="mt-10 rounded-2xl border border-bhagwa/15 bg-bhagwa/5 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="text-3xl shrink-0">🙏</span>
          <div>
            <p className="text-sm font-medium text-cream mb-1">Brajwasi Tip</p>
            <p className="text-sm text-cream/50 leading-relaxed">
              For Janmashtami & Holi, book accommodation <strong className="text-cream/70">60–90 days in advance</strong>.
              The entire city fills up. Consider staying in Vrindavan for quieter alternatives to Mathura.
            </p>
          </div>
        </div>
      </section>

      {/* ── Live Darshan CTA ───────────────────────── */}
      <section id="live" className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-2xl border border-gold/12 bg-braj-dark-2 p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs tracking-widest uppercase text-red-400">Live</span>
            </div>
            <h3 className="text-xl font-serif text-cream mb-2">Watch Live Darshan & Aarti</h3>
            <p className="text-cream/45 text-sm leading-relaxed max-w-sm">
              Can&apos;t visit right now? Watch official live darshan feeds from Mathura and Vrindavan temples, streamed daily.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://www.youtube.com/@BankebiharjiTemple"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm transition-all"
            >
              📺 Banke Bihari
            </a>
            <a
              href="https://www.youtube.com/@ISKCONVrindavan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border border-bhagwa/30 text-bhagwa hover:bg-bhagwa/10 text-sm transition-all"
            >
              📺 ISKCON Vrindavan
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
