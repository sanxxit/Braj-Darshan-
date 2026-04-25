import Link from 'next/link';

const EXPLORE = [
  { href: '/temples', label: 'Temples & Aarti Timings' },
  { href: '/events', label: 'Braj Utsav — Festivals' },
  { href: '/planner', label: 'Trip Planner' },
  { href: '/map', label: 'Interactive Map' },
  { href: '/stay', label: 'Hotels & Ashrams' },
];

const MORE = [
  { href: '/travel-safe', label: 'Travel Safe Guide' },
  { href: '/join',        label: 'Join as a Partner' },
  { href: '/login',       label: 'Devotee Sign In' },
  { href: '/admin',       label: 'Admin Dashboard' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold/8 bg-braj-dark-2">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="w-8 h-8 rounded-full border border-bhagwa/30 bg-bhagwa/10 flex items-center justify-center">
              <span className="text-sm">🪈</span>
            </div>
            <span className="text-base font-serif text-gradient-bhagwa">ब्रज दर्शन</span>
          </Link>
          <p className="text-cream/40 text-sm leading-relaxed max-w-[200px]">
            Experience Bhakti with locals, straight from the heart of Braj.
          </p>
          <blockquote className="border-l-2 border-bhagwa/30 pl-3">
            <p className="text-gold/50 text-xs italic font-serif leading-relaxed">
              &ldquo;Wherever devotion exists, there I am always present.&rdquo;
            </p>
            <cite className="text-cream/25 text-[10px] not-italic">— Bhagavad Gita 9.29</cite>
          </blockquote>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-[10px] font-medium tracking-[0.2em] uppercase text-gold/50 mb-4">
            Explore
          </h4>
          <ul className="flex flex-col gap-2.5">
            {EXPLORE.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-cream/45 hover:text-bhagwa transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* More */}
        <div>
          <h4 className="text-[10px] font-medium tracking-[0.2em] uppercase text-gold/50 mb-4">
            More
          </h4>
          <ul className="flex flex-col gap-2.5">
            {MORE.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-cream/45 hover:text-bhagwa transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Live darshan badge */}
          <a
            href="https://www.youtube.com/@BrajDarshanLive"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center gap-2 px-3 py-2 rounded-xl border border-bhagwa/20 bg-bhagwa/5 hover:border-bhagwa/40 transition-all w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs text-cream/60">Live Darshan</span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/8 px-4 sm:px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-cream/20 text-xs">© 2025 Braj Darshan. All rights reserved.</p>
        <p className="text-cream/18 text-xs">Made with भक्ति in Braj 🙏</p>
      </div>
    </footer>
  );
}
