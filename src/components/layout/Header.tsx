'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/temples', label: 'Temples' },
  { href: '/events', label: 'Braj Utsav' },
  { href: '/planner', label: 'Planner' },
  { href: '/map', label: 'Map' },
  { href: '/stay', label: 'Stay' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled || open
            ? 'bg-braj-dark/95 backdrop-blur-xl border-b border-gold/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-full border border-bhagwa/40 flex items-center justify-center bg-bhagwa/10 group-hover:bg-bhagwa/20 transition-colors duration-300">
              <span className="text-sm leading-none select-none">🪈</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-serif text-gradient-bhagwa tracking-wide">
                ब्रज दर्शन
              </span>
              <span className="text-[9px] text-cream/30 tracking-[0.25em] uppercase mt-0.5">
                Braj Darshan
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 text-sm text-cream/60 hover:text-cream rounded-xl hover:bg-cream/5 transition-all duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-cream/50 hover:text-cream/80 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/planner"
              className="px-4 py-2 text-sm font-medium text-white rounded-full bg-bhagwa hover:bg-bhagwa-light transition-all duration-200 shadow-bhagwa hover:shadow-bhagwa-lg"
            >
              Plan My Yatra →
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl text-cream/70 hover:text-cream hover:bg-cream/5 transition-colors"
            aria-label="Toggle navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-16 z-30 bg-braj-dark/98 backdrop-blur-2xl border-b border-gold/10 md:hidden"
          >
            <div className="px-4 pt-3 pb-5 flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-cream/75 hover:text-cream hover:bg-bhagwa/8 rounded-xl text-sm transition-all"
                >
                  {label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-gold/10 flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-center text-sm text-cream/60 hover:text-cream rounded-xl border border-gold/20 hover:border-gold/40 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/planner"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-center text-sm font-medium text-white bg-bhagwa hover:bg-bhagwa-light rounded-xl transition-all"
                >
                  Plan My Yatra →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
