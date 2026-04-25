import type { Metadata } from 'next';
import Link from 'next/link';
import { temples } from '@/lib/data/temples';
import { hotels } from '@/lib/data/hotels';

export const metadata: Metadata = { title: 'Dashboard' };

const STATS = [
  { label: 'Page Views',         value: '47,820', change: '+8.3%',  up: true,  icon: '👁' },
  { label: 'Unique Visitors',    value: '12,450', change: '+12.5%', up: true,  icon: '👤' },
  { label: 'Temple Searches',    value: '8,934',  change: '+15.2%', up: true,  icon: '🛕' },
  { label: 'Partner Sign-ups',   value: '23',     change: '+4 new', up: true,  icon: '🤝' },
];

const QUICK_ACTIONS = [
  { href: '/admin/temples', icon: '🛕', label: 'Manage Temples',    description: 'Update timings & details' },
  { href: '/admin/geocode', icon: '📍', label: 'Add New Location',  description: 'Auto-geocode an address' },
  { href: '/',              icon: '🌐', label: 'View Live Site',     description: 'Open public site' },
];

const MOCK_REGISTRATIONS = [
  { name: 'Raju Sharma',   category: 'Taxi',       city: 'Mathura',   time: '2h ago' },
  { name: 'Meera Devi',    category: 'Hotel',      city: 'Vrindavan', time: '5h ago' },
  { name: 'Gopal Prasad',  category: 'Guide',      city: 'Govardhan', time: '1d ago' },
  { name: 'Sunita Mishra', category: 'FoodVendor', city: 'Mathura',   time: '2d ago' },
  { name: 'Hari Om',       category: 'Guide',      city: 'Vrindavan', time: '3d ago' },
];

const CAT_BADGE: Record<string, string> = {
  Taxi:       'bg-bhagwa/10 text-bhagwa/80 border-bhagwa/20',
  Hotel:      'bg-gold/10 text-gold/80 border-gold/20',
  Guide:      'bg-lotus/10 text-lotus/80 border-lotus/20',
  FoodVendor: 'bg-peacock/10 text-peacock/80 border-peacock/20',
};

export default function AdminDashboard() {
  return (
    <div className="p-5 sm:p-8 max-w-5xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div>
        <p className="text-xs text-cream/30 uppercase tracking-widest mb-1">Good morning 🙏</p>
        <h1 className="text-2xl font-serif text-cream">Dashboard</h1>
        <p className="text-cream/40 text-sm mt-1">
          {temples.length} temples · {hotels.length} hotels · Last updated just now
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATS.map(({ label, value, change, up, icon }) => (
          <div key={label} className="rounded-2xl border border-gold/10 bg-braj-dark-2 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xl">{icon}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                up ? 'text-green-400 bg-green-400/8 border-green-400/20' : 'text-red-400 bg-red-400/8 border-red-400/20'
              }`}>
                {change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-serif text-cream">{value}</p>
              <p className="text-xs text-cream/35 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions + registrations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick actions */}
        <div>
          <h2 className="text-sm font-medium text-cream/60 mb-3 uppercase tracking-wider text-xs">Quick Actions</h2>
          <div className="flex flex-col gap-2">
            {QUICK_ACTIONS.map(({ href, icon, label, description }) => (
              <Link key={href} href={href}
                className="group flex items-center gap-4 p-4 rounded-xl border border-gold/10 bg-braj-dark-2 hover:border-bhagwa/25 hover:bg-bhagwa/4 transition-all">
                <div className="w-10 h-10 rounded-xl bg-braj-dark-3 border border-gold/10 flex items-center justify-center text-xl shrink-0">
                  {icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-cream group-hover:text-bhagwa-light transition-colors">{label}</p>
                  <p className="text-xs text-cream/35 truncate">{description}</p>
                </div>
                <span className="ml-auto text-cream/20 group-hover:text-bhagwa/60 transition-colors">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent registrations */}
        <div>
          <h2 className="text-sm font-medium text-cream/60 mb-3 uppercase tracking-wider text-xs">Recent Partner Requests</h2>
          <div className="rounded-xl border border-gold/10 bg-braj-dark-2 overflow-hidden">
            {MOCK_REGISTRATIONS.map((reg, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < MOCK_REGISTRATIONS.length - 1 ? 'border-b border-gold/6' : ''}`}>
                <div className="w-7 h-7 rounded-full bg-braj-dark-3 border border-gold/15 flex items-center justify-center text-xs text-cream/40 shrink-0">
                  {reg.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-cream/80 truncate">{reg.name}</p>
                  <p className="text-xs text-cream/30">{reg.city}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${CAT_BADGE[reg.category] ?? 'bg-cream/8 text-cream/50 border-cream/15'}`}>
                    {reg.category}
                  </span>
                  <span className="text-[10px] text-cream/25">{reg.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Entity count summary */}
      <div className="rounded-2xl border border-gold/10 bg-braj-dark-2 p-5">
        <h2 className="text-sm font-medium text-cream mb-4 flex items-center gap-2">
          <span>📊</span> Content Summary
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Temples', count: temples.length, icon: '🛕', href: '/admin/temples' },
            { label: 'Hotels',  count: hotels.length,  icon: '🏨', href: '/admin/geocode' },
            { label: 'Events',  count: 6,              icon: '🌸', href: '/events' },
            { label: 'Routes',  count: 2,              icon: '🗺',  href: '/planner' },
          ].map(({ label, count, icon, href }) => (
            <Link key={label} href={href}
              className="flex flex-col items-center gap-1 p-3 rounded-xl border border-gold/8 hover:border-gold/20 hover:bg-gold/4 transition-all text-center group">
              <span className="text-2xl">{icon}</span>
              <span className="text-xl font-serif text-cream group-hover:text-gold transition-colors">{count}</span>
              <span className="text-xs text-cream/35">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
