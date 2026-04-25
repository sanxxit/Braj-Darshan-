import Link from 'next/link';
import { festivals } from '@/lib/data/events';

const CROWD_COLOR: Record<string, string> = {
  Low: 'text-green-400 bg-green-400/10 border-green-400/25',
  Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/25',
  High: 'text-orange-400 bg-orange-400/10 border-orange-400/25',
  Extreme: 'text-red-400 bg-red-400/10 border-red-400/25',
};

const GRADIENT_BY_INDEX = [
  'from-bhagwa/20 via-bhagwa/5 to-transparent',
  'from-lotus/20 via-lotus/5 to-transparent',
  'from-gold/20 via-gold/5 to-transparent',
];

export default function FestivalHighlight() {
  const featured = festivals[0]; // Janmashtami

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      {/* Divider */}
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <p className="text-xs tracking-[0.25em] uppercase text-gold/60 shrink-0">✦ Braj Utsav ✦</p>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Visual side */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/10">
          {/* Color gradient placeholder */}
          <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_BY_INDEX[0]} bg-braj-dark-2`} />
          {/* Mandala overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-15">
            <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
              {Array.from({ length: 16 }).map((_, i) => (
                <line key={i} x1="150" y1="20" x2="150" y2="60" stroke="#FF671F" strokeWidth="1" transform={`rotate(${i * 22.5} 150 150)`} />
              ))}
              {[120, 90, 60, 30].map((r) => (
                <circle key={r} cx="150" cy="150" r={r} stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 6" />
              ))}
            </svg>
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <p className="text-[10px] tracking-[0.25em] uppercase text-bhagwa/80 mb-1">
              ✦ Next Major Festival ✦
            </p>
            <h3 className="text-3xl font-serif text-gradient-bhagwa leading-tight">
              {featured.name_hindi}
            </h3>
            <p className="text-cream/60 text-sm mt-1">{featured.name}</p>
          </div>
        </div>

        {/* Info side */}
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${CROWD_COLOR[featured.crowd_level]}`}>
                {featured.crowd_level} Crowd
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full border border-gold/20 text-gold/60">
                Book {featured.advance_booking_days} days early
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-cream mb-2">
              {featured.name}
            </h2>
            <p className="text-cream/45 text-sm leading-relaxed">
              {featured.description}
            </p>
          </div>

          {/* Dates */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-braj-dark-3 border border-gold/10">
            <span className="text-xl mt-0.5">🗓</span>
            <div>
              <p className="text-xs text-gold/60 mb-0.5 uppercase tracking-wider">When</p>
              <p className="text-sm text-cream/80">{featured.typical_dates}</p>
            </div>
          </div>

          {/* Key activities */}
          <div>
            <p className="text-xs text-cream/35 uppercase tracking-wider mb-3">Key Activities</p>
            <ul className="flex flex-col gap-2">
              {featured.special_activities.slice(0, 4).map((act) => (
                <li key={act} className="flex items-start gap-2.5 text-sm text-cream/60">
                  <span className="text-bhagwa/60 mt-0.5 shrink-0">✦</span>
                  {act}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/events"
            className="flex items-center gap-2 text-sm text-bhagwa hover:text-bhagwa-light transition-colors group w-fit"
          >
            View all 6 festivals
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
