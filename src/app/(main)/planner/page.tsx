import type { Metadata } from 'next';
import PlannerTimeline from '@/components/planner/PlannerTimeline';

export const metadata: Metadata = {
  title: 'Trip Planner — 2, 3 & 4-Day Braj Itineraries',
  description: 'Pre-built Mathura & Vrindavan itineraries crafted by local Brajwasis. Day-by-day timelines for your perfect pilgrimage.',
};

export default function PlannerPage() {
  return (
    <div className="min-h-dvh">
      {/* ── Page Hero ─────────────────────────── */}
      <section className="relative pt-14 pb-10 px-4 sm:px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 60%)' }}
        />

        {/* Faint mandala */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-96 h-96 opacity-[0.04] pointer-events-none">
          <svg viewBox="0 0 300 300" fill="none" className="w-full h-full">
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={i} x1="150" y1="15" x2="150" y2="50" stroke="#D4AF37" strokeWidth="1" transform={`rotate(${i * 22.5} 150 150)`} />
            ))}
            {[120, 90, 60].map((r) => (
              <circle key={r} cx="150" cy="150" r={r} stroke="#FF671F" strokeWidth="0.5" strokeDasharray="4 8" />
            ))}
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-3">✦ Yatra Planner ✦</p>
          <h1 className="text-4xl sm:text-5xl font-serif text-cream mb-3">
            Plan Your <span className="text-gradient-gold">Braj Yatra</span>
          </h1>
          <p className="text-cream/45 text-sm leading-relaxed max-w-md mx-auto">
            Carefully crafted day-by-day itineraries by people who have walked every lane of Braj.
            Tap any stop to read the description and local tips.
          </p>
        </div>
      </section>

      {/* ── Planner ───────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <PlannerTimeline />
      </section>

      {/* ── Custom Yatra CTA ──────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <div className="rounded-2xl border border-gold/12 bg-braj-dark-2 p-7 text-center">
          <span className="text-3xl block mb-3">🗺</span>
          <h3 className="text-lg font-serif text-cream mb-2">Need a Custom Itinerary?</h3>
          <p className="text-cream/40 text-sm leading-relaxed mb-5 max-w-sm mx-auto">
            Have specific temples in mind or need more days? Our local Brajwasi guides can craft a personalised yatra just for you.
          </p>
          <a
            href="/join"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold hover:bg-gold-light text-braj-dark font-semibold text-sm transition-all hover:shadow-gold"
          >
            Connect with a Local Guide →
          </a>
        </div>
      </section>
    </div>
  );
}
