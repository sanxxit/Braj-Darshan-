'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Landmark, MapPin, Globe, LogOut, X, Gauge, ShieldCheck } from 'lucide-react';

const NAV = [
  { href: '/admin',          icon: LayoutDashboard, label: 'Dashboard',         exact: true  },
  { href: '/admin/temples',  icon: Landmark,        label: 'Temples & Timings', exact: false },
  { href: '/admin/bheed',    icon: Gauge,           label: 'Darshan Rush',      exact: false },
  { href: '/admin/partners', icon: ShieldCheck,     label: 'Partners',          exact: false },
  { href: '/admin/geocode',  icon: MapPin,          label: 'Add Location',      exact: false },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

function SidebarContent({ onClose, onSignOut }: { onClose: () => void; onSignOut: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-gold/8 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-lg">🪈</span>
          <div>
            <p className="text-xs font-serif text-gradient-bhagwa leading-none">ब्रज दर्शन</p>
            <p className="text-[9px] text-cream/30 tracking-wider mt-0.5">ADMIN PANEL</p>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg text-cream/30 hover:text-cream hover:bg-cream/5 transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        <p className="text-[9px] uppercase tracking-[0.2em] text-cream/20 px-3 mb-2">Navigation</p>
        {NAV.map(({ href, icon: Icon, label, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link key={href} href={href} onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active
                  ? 'bg-bhagwa/12 border border-bhagwa/20 text-cream'
                  : 'text-cream/50 hover:text-cream/80 hover:bg-cream/5'
              }`}>
              <Icon size={16} className={active ? 'text-bhagwa' : 'text-cream/40'} />
              <span>{label}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-bhagwa" />}
            </Link>
          );
        })}

        <div className="mt-4 pt-4 border-t border-gold/8">
          <p className="text-[9px] uppercase tracking-[0.2em] text-cream/20 px-3 mb-2">External</p>
          <Link href="/" target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-cream/40 hover:text-cream/70 hover:bg-cream/5 transition-all">
            <Globe size={16} className="text-cream/30" />
            View Live Site ↗
          </Link>
        </div>
      </nav>

      {/* User + Sign Out */}
      <div className="px-3 pb-4 pt-3 border-t border-gold/8 shrink-0 flex flex-col gap-1">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-braj-dark-3 border border-gold/8 mb-1">
          <div className="w-7 h-7 rounded-full bg-gold/15 border border-gold/20 flex items-center justify-center text-xs text-gold">A</div>
          <div className="min-w-0">
            <p className="text-xs text-cream/70 truncate">Admin User</p>
            <p className="text-[10px] text-cream/25">Super Admin</p>
          </div>
        </div>
        <button onClick={onSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-cream/40 hover:text-red-400/70 hover:bg-red-400/5 transition-all w-full text-left">
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar({ open, onClose, onSignOut }: Props) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 shrink-0 border-r border-gold/8 bg-braj-dark-2 flex-col">
        <SidebarContent onClose={onClose} onSignOut={onSignOut} />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={onClose} className="fixed inset-0 z-40 bg-braj-dark/70 backdrop-blur-sm lg:hidden" />
            <motion.aside key="drawer" initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 w-56 bg-braj-dark-2 border-r border-gold/8 flex flex-col lg:hidden">
              <SidebarContent onClose={onClose} onSignOut={onSignOut} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
