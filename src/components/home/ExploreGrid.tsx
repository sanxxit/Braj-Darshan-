import Link from 'next/link';

const TILES = [
  {
    href: '/temples',
    icon: '🛕',
    title: 'Temples & Timings',
    description: 'Top 20 temples with precise Aarti, Darshan & opening times.',
    accent: 'bhagwa',
  },
  {
    href: '/events',
    icon: '🌸',
    title: 'Braj Utsav',
    description: 'Janmashtami, Holi, Govardhan Puja — the best times to visit.',
    accent: 'lotus',
  },
  {
    href: '/planner',
    icon: '🗺',
    title: 'Trip Planner',
    description: '2, 3 & 4-day itineraries crafted by local Brajwasis.',
    accent: 'gold',
  },
  {
    href: '/map',
    icon: '📍',
    title: 'Interactive Map',
    description: 'Find temples, hotels and food stalls with exact GPS pins.',
    accent: 'peacock',
  },
  {
    href: '/stay',
    icon: '🏨',
    title: 'Stay in Braj',
    description: 'Budget rooms to heritage haveli — verified by locals.',
    accent: 'gold',
  },
  {
    href: '#live',
    icon: '📺',
    title: 'Live Darshan',
    description: 'Watch live aarti feeds from Mathura & Vrindavan temples.',
    accent: 'bhagwa',
  },
];

const ACCENT_STYLES: Record<string, string> = {
  bhagwa: 'group-hover:border-bhagwa/40 group-hover:shadow-bhagwa',
  gold: 'group-hover:border-gold/40 group-hover:shadow-gold',
  lotus: 'group-hover:border-lotus/40',
  peacock: 'group-hover:border-peacock/40',
};

const ICON_BG: Record<string, string> = {
  bhagwa: 'bg-bhagwa/10 group-hover:bg-bhagwa/18',
  gold: 'bg-gold/10 group-hover:bg-gold/18',
  lotus: 'bg-lotus/10 group-hover:bg-lotus/18',
  peacock: 'bg-peacock/10 group-hover:bg-peacock/18',
};

export default function ExploreGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      {/* Section header */}
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.25em] uppercase text-bhagwa/70 mb-3">
          ✦ Your Spiritual Companion ✦
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif text-cream">
          Everything Braj, in One Place
        </h2>
        <p className="text-cream/45 mt-3 max-w-md mx-auto text-sm leading-relaxed">
          From temple timings to hotel bookings — guided by the people of Braj.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TILES.map(({ href, icon, title, description, accent }) => (
          <Link
            key={href}
            href={href}
            className={`group card-glass rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 ${ACCENT_STYLES[accent]}`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${ICON_BG[accent]}`}
            >
              {icon}
            </div>
            <div>
              <h3 className="text-base font-medium text-cream mb-1.5">{title}</h3>
              <p className="text-sm text-cream/45 leading-relaxed">{description}</p>
            </div>
            <span className="text-xs text-bhagwa/60 group-hover:text-bhagwa transition-colors mt-auto">
              Explore →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
