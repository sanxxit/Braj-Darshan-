'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

const GITA_QUOTE = {
  text: 'Fix your mind on Me, be devoted to Me, worship Me, bow down to Me. So shall you come to Me. I promise you truly, for you are dear to Me.',
  ref: 'Bhagavad Gita 18.65',
};

type Stage = 'idle' | 'loading' | 'sent';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState<Stage>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setStage('loading');
    // Simulate API call — replace with real magic-link call
    await new Promise((r) => setTimeout(r, 1400));
    setStage('sent');
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
          <AnimatePresence mode="wait">
            {stage !== 'sent' ? (
              <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                <h1 className="text-xl font-serif text-cream mb-1">
                  Welcome, Bhakt 🙏
                </h1>
                <p className="text-cream/45 text-sm mb-6">
                  Enter your email for a secure, passwordless sign-in link.
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
                      disabled={stage === 'loading'}
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
                    disabled={stage === 'loading'}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-bhagwa hover:bg-bhagwa-light text-white text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-bhagwa hover:shadow-bhagwa-lg"
                  >
                    {stage === 'loading' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                        />
                        Sending link…
                      </>
                    ) : (
                      <>
                        Send Magic Link <ArrowRight size={15} />
                      </>
                    )}
                  </motion.button>
                </form>

                <p className="text-cream/25 text-xs text-center mt-4 leading-relaxed">
                  No password needed. A secure login link will be sent to your email.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex flex-col items-center text-center gap-4 py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle size={44} className="text-bhagwa" />
                </motion.div>
                <div>
                  <h2 className="text-lg font-serif text-cream mb-1">Link sent! 🙏</h2>
                  <p className="text-cream/45 text-sm leading-relaxed">
                    Check <span className="text-bhagwa">{email}</span> for your sign-in link.
                    It expires in 10 minutes.
                  </p>
                </div>
                <button
                  onClick={() => { setStage('idle'); setEmail(''); }}
                  className="text-xs text-cream/35 hover:text-cream/60 transition-colors mt-2"
                >
                  Use a different email
                </button>
              </motion.div>
            )}
          </AnimatePresence>
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
