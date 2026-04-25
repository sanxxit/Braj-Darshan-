'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import type { PartnerCategory } from '@/lib/types';

const CATEGORIES: { value: PartnerCategory; icon: string; label: string }[] = [
  { value: 'Hotel',      icon: '🏨', label: 'Hotel / Ashram'  },
  { value: 'Taxi',       icon: '🚕', label: 'Taxi / Auto'     },
  { value: 'Guide',      icon: '🧭', label: 'Local Guide'     },
  { value: 'FoodVendor', icon: '🛍', label: 'Food Vendor'     },
  { value: 'PujaShop',   icon: '🪔', label: 'Puja Shop'       },
];

const CITIES = ['Mathura', 'Vrindavan', 'Govardhan', 'Barsana', 'Nandgaon'];

type Stage = 'idle' | 'loading' | 'done' | 'error';

export default function JoinPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<PartnerCategory | ''>('');
  const [city, setCity] = useState('');
  const [offer, setOffer] = useState('');
  const [stage, setStage] = useState<Stage>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required.';
    if (!phone.trim() || phone.trim().length < 10) e.phone = 'Enter a valid 10-digit phone number.';
    if (!category) e.category = 'Please select a category.';
    if (!city) e.city = 'Please select your city.';
    if (!offer.trim()) e.offer = 'Tell us what you can offer.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStage('loading');
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), category, city, offer: offer.trim() }),
      });
      if (!res.ok) throw new Error('Server error');
      setStage('done');
    } catch {
      setStage('error');
    }
  };

  return (
    <div className="min-h-dvh">
      {/* Hero */}
      <section className="relative pt-14 pb-10 px-4 sm:px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 60%)' }}
        />
        <div className="relative z-10 max-w-xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-3">✦ Brajwasi Community ✦</p>
          <h1 className="text-4xl sm:text-5xl font-serif text-cream mb-3">
            Join <span className="text-gradient-gold">Braj Darshan</span>
          </h1>
          <p className="text-cream/45 text-sm leading-relaxed max-w-sm mx-auto">
            Are you a local guide, hotel, taxi, or food vendor in Braj?
            Connect with thousands of devotees visiting your sacred home.
          </p>
        </div>
      </section>

      <section className="max-w-lg mx-auto px-4 sm:px-6 pb-20">
        <AnimatePresence mode="wait">
          {stage === 'done' ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-gold/12 bg-braj-dark-2 p-10 flex flex-col items-center text-center gap-4"
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}>
                <CheckCircle size={48} className="text-bhagwa" />
              </motion.div>
              <h2 className="text-xl font-serif text-cream">Jai Shri Krishna! 🙏</h2>
              <p className="text-cream/45 text-sm leading-relaxed">
                Your registration has been received. Our team will review and contact you on <span className="text-bhagwa">{phone}</span> within 24–48 hours.
              </p>
              <p className="text-gold/40 text-xs italic font-serif mt-2">
                &ldquo;Service to man is service to God.&rdquo;
              </p>
            </motion.div>
          ) : stage === 'error' ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-red-400/20 bg-braj-dark-2 p-10 flex flex-col items-center text-center gap-4"
            >
              <p className="text-cream text-lg font-serif">Something went wrong 🙏</p>
              <p className="text-cream/45 text-sm">Please try again or contact us directly.</p>
              <button onClick={() => setStage('idle')} className="mt-2 px-5 py-2.5 rounded-xl border border-bhagwa/30 text-bhagwa text-sm hover:bg-bhagwa/10 transition-all">
                Try Again
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="rounded-2xl border border-gold/12 bg-braj-dark-2 p-6 sm:p-7 flex flex-col gap-5"
            >
              {/* Name */}
              <Field label="Your Name" error={errors.name}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Sharma"
                  className={inputClass(!!errors.name)}
                />
              </Field>

              {/* Phone */}
              <Field label="Phone Number" error={errors.phone}>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className={inputClass(!!errors.phone)}
                />
              </Field>

              {/* Category */}
              <Field label="I am a…" error={errors.category}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map(({ value, icon, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setCategory(value)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs text-left transition-all ${
                        category === value
                          ? 'border-bhagwa/50 bg-bhagwa/10 text-cream'
                          : 'border-gold/12 text-cream/50 hover:border-gold/25 hover:text-cream/70'
                      }`}
                    >
                      <span className="text-base">{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>
              </Field>

              {/* City */}
              <Field label="Your city / area" error={errors.city}>
                <div className="flex flex-wrap gap-2">
                  {CITIES.map((c) => (
                    <button key={c} type="button" onClick={() => setCity(c)}
                      className={`px-3 py-2 rounded-xl border text-xs transition-all ${city === c ? 'border-bhagwa/50 bg-bhagwa/10 text-cream' : 'border-gold/12 text-cream/50 hover:border-gold/25 hover:text-cream/70'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Offer */}
              <Field label="What can you offer right now?" error={errors.offer}>
                <textarea
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  rows={3}
                  placeholder="e.g. AC taxi for city tours, available 6 AM – 9 PM, ₹500/half-day…"
                  className={`${inputClass(!!errors.offer)} resize-none`}
                />
              </Field>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={stage === 'loading'}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gold hover:bg-gold-light text-braj-dark font-semibold text-sm transition-all disabled:opacity-60 shadow-gold hover:shadow-gold-lg"
              >
                {stage === 'loading' ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 rounded-full border-2 border-braj-dark/30 border-t-braj-dark" />
                    Submitting…
                  </>
                ) : 'Join the Platform →'}
              </motion.button>

              <p className="text-xs text-center text-cream/25">
                Free to join. Our team will verify and list your service.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

/* ── Helpers ────────────────────────────────────────────── */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-cream/50 font-medium">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400/80">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl bg-braj-dark-3 border ${hasError ? 'border-red-400/40' : 'border-gold/12'} text-cream text-sm placeholder:text-cream/25 focus:outline-none focus:border-bhagwa/40 focus:ring-1 focus:ring-bhagwa/15 transition-all`;
}
