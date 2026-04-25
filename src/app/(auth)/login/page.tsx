'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

const GITA_QUOTE = {
  text: 'Fix your mind on Me, be devoted to Me, worship Me, bow down to Me. So shall you come to Me. I promise you truly, for you are dear to Me.',
  ref: 'Bhagavad Gita 18.65',
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('braj_user_email', trimmed);
    }
    // Small delay for UX feel
    await new Promise((r) => setTimeout(r, 600));
    router.push('/');
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)' }}
      />

      {/* Rotating mandala */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.05] pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full"
        >
          <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={i} x1="250" y1="20" x2="250" y2="70" stroke="#D4AF37" strokeWidth="1.2" transform={`rotate(${i * 22.5} 250 250)`} />
            ))}
            <circle cx="250" cy="250" r="220" stroke="#FF671F" strokeWidth="0.8" strokeDasharray="6 10" />
            <circle cx="250" cy="250" r="170" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="3 7" />
          </svg>
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full border border-bhagwa/35 bg-bhagwa/10 flex items-center justify-center">
              <span className="text-2xl">🪈</span>
            </div>
            <span className="text-xl font-serif text-gradient-bhagwa">ब्रज दर्शन</span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gold/15 bg-braj-dark-2 p-7">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h1 className="text-xl font-serif text-cream mb-1">
              Welcome, Bhakt 🙏
            </h1>
            <p className="text-cream/45 text-sm mb-6">
              Enter your email to personalize your Braj Darshan experience.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email input */}
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                  autoFocus
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-braj-dark-3 border border-gold/15 text-cream text-sm placeholder:text-cream/25 focus:outline-none focus:border-bhagwa/50 focus:ring-1 focus:ring-bhagwa/25 transition-all disabled:opacity-50"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-400/80 text-xs">{error}</p>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-bhagwa hover:bg-bhagwa-light text-white text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-bhagwa hover:shadow-bhagwa-lg"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                    Entering…
                  </>
                ) : (
                  <>
                    Continue to Braj <ArrowRight size={15} />
                  </>
                )}
              </motion.button>
            </form>

            <p className="text-cream/25 text-xs text-center mt-4 leading-relaxed">
              No password or verification needed. Just enter and explore.
            </p>
          </motion.div>
        </div>

        {/* Gita quote */}
        <div className="mt-8 text-center px-2">
          <p className="text-cream/30 text-xs italic font-serif leading-relaxed">
            &ldquo;{GITA_QUOTE.text}&rdquo;
          </p>
          <p className="text-gold/30 text-[10px] mt-1.5">{GITA_QUOTE.ref}</p>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-cream/30 hover:text-cream/60 transition-colors">
            ← Back to Braj Darshan
          </Link>
        </div>
      </div>
    </div>
  );
}
