import type { Metadata } from 'next';
import { createServerClient } from '@/lib/supabase/server';
import { temples as staticTemples } from '@/lib/data/temples';
import TemplesList from '@/components/temples/TemplesList';
import type { Temple } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Temples of Braj — Aarti Timings & Darshan',
  description: 'Precise aarti, darshan, and opening timings for top 20 temples in Mathura and Vrindavan — verified by locals.',
};

async function fetchTemples(): Promise<Temple[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('temples')
      .select('*')
      .eq('is_active', true)
      .order('rank', { ascending: true });
    if (error || !data?.length) return staticTemples;
    return data as Temple[];
  } catch {
    return staticTemples;
  }
}

export default async function TemplesPage() {
  const temples = await fetchTemples();

  return (
    <div className="min-h-dvh">
      {/* ── Page Hero ─────────────────────────── */}
      <section className="relative pt-14 pb-10 px-4 sm:px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(255,103,31,0.07) 0%, transparent 60%)' }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-bhagwa/70 mb-3">✦ Top 20 Temples ✦</p>
          <h1 className="text-4xl sm:text-5xl font-serif text-cream mb-3">
            Sacred Sites of <span className="text-gradient-bhagwa">Braj</span>
          </h1>
          <p className="text-cream/45 text-sm leading-relaxed">
            Precise Aarti, Darshan & opening timings — verified by locals.
          </p>
        </div>
      </section>

      <TemplesList temples={temples} />
    </div>
  );
}
