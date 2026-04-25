'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

const ADMIN_PASSWORD = 'braj2025';
const SESSION_KEY = 'braj-admin-auth';

function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onAuth();
    } else {
      setError('Incorrect password. Try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 bg-braj-dark relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)' }}
      />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full">
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={i} x1="150" y1="15" x2="150" y2="50" stroke="#D4AF37" strokeWidth="1" transform={`rotate(${i * 22.5} 150 150)`} />
          ))}
          <circle cx="150" cy="150" r="130" stroke="#FF671F" strokeWidth="0.6" strokeDasharray="6 10" />
        </svg>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full border border-gold/25 bg-gold/8 flex items-center justify-center mx-auto mb-4">
            <Lock size={22} className="text-gold" />
          </div>
          <h1 className="text-xl font-serif text-cream">Admin Access</h1>
          <p className="text-cream/35 text-sm mt-1">Braj Darshan Control Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-gold/12 bg-braj-dark-2 p-6 flex flex-col gap-4">
          <input
            type="password"
            value={pwd}
            onChange={(e) => { setPwd(e.target.value); setError(''); }}
            placeholder="Enter admin password"
            autoFocus
            className="w-full px-4 py-3 rounded-xl bg-braj-dark-3 border border-gold/12 text-cream text-sm placeholder:text-cream/25 focus:outline-none focus:border-gold/40 transition-all"
          />
          {error && <p className="text-red-400/80 text-xs">{error}</p>}
          <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gold hover:bg-gold-light text-braj-dark font-semibold text-sm transition-all disabled:opacity-60 shadow-gold">
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 rounded-full border-2 border-braj-dark/30 border-t-braj-dark" />
            ) : <><span>Enter Dashboard</span><ArrowRight size={15} /></>}
          </motion.button>
          <p className="text-center text-cream/20 text-[10px]">Demo password: braj2025</p>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === '1');
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-dvh bg-braj-dark flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 rounded-full border-2 border-gold/20 border-t-gold" />
      </div>
    );
  }

  if (!authed) return <AuthGate onAuth={() => setAuthed(true)} />;

  return (
    <div className="flex h-dvh bg-braj-dark overflow-hidden">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSignOut={() => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); }}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 h-14 border-b border-gold/8 bg-braj-dark-2 shrink-0">
          <button onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-cream/50 hover:text-cream hover:bg-cream/5 transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect y="2" width="18" height="1.5" rx="0.75" fill="currentColor" />
              <rect y="8.25" width="12" height="1.5" rx="0.75" fill="currentColor" />
              <rect y="14.5" width="18" height="1.5" rx="0.75" fill="currentColor" />
            </svg>
          </button>
          <span className="text-sm font-serif text-gradient-bhagwa">Admin Panel</span>
        </div>
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={typeof window !== 'undefined' ? window.location.pathname : ''}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }} className="h-full">
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
