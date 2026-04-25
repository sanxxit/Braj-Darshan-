import Link from 'next/link';

const PARTNER_TYPES = [
  { icon: '🏨', label: 'Hotel / Ashram' },
  { icon: '🚕', label: 'Taxi / Auto' },
  { icon: '🧭', label: 'Local Guide' },
  { icon: '🛍', label: 'Food Vendor' },
];

export default function JoinCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="relative rounded-3xl border border-gold/12 bg-braj-dark-2 overflow-hidden">
        {/* BG glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(212,175,55,0.06) 0%, transparent 65%)' }}
        />
        {/* Mandala deco — top right */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            {[80, 60, 40, 20].map((r) => (
              <circle key={r} cx="200" cy="0" r={r} stroke="#D4AF37" strokeWidth="1" />
            ))}
          </svg>
        </div>

        <div className="relative z-10 px-6 sm:px-10 py-12 flex flex-col lg:flex-row items-start lg:items-center gap-8">
          {/* Left text */}
          <div className="flex-1">
            <p className="text-xs tracking-[0.25em] uppercase text-gold/60 mb-3">✦ Brajwasi Community ✦</p>
            <h2 className="text-2xl sm:text-3xl font-serif text-cream mb-3">
              Are you a local in Braj?
            </h2>
            <p className="text-cream/45 text-sm leading-relaxed max-w-sm">
              Join thousands of Brajwasis guiding pilgrims every day.
              List your service and connect with devotees visiting your sacred home.
            </p>

            {/* Partner type pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {PARTNER_TYPES.map(({ icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-gold/15 text-cream/55 bg-gold/5"
                >
                  <span>{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right CTA */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Link
              href="/join"
              className="px-7 py-3.5 rounded-full bg-gold hover:bg-gold-light text-braj-dark font-semibold text-sm transition-all duration-200 hover:shadow-gold text-center hover:-translate-y-0.5"
            >
              Join the Platform →
            </Link>
            <Link
              href="/join"
              className="px-7 py-3.5 rounded-full border border-gold/25 hover:border-gold/50 text-cream/60 hover:text-cream text-sm transition-all duration-200 text-center hover:-translate-y-0.5"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
