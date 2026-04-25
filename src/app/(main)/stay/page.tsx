import type { Metadata } from 'next';
import { createServerClient } from '@/lib/supabase/server';
import { hotels as staticHotels } from '@/lib/data/hotels';
import type { Hotel, HotelCategory } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Stay in Braj — Hotels, Ashrams & Guesthouses',
  description: 'Verified hotels, heritage haveli, and peaceful ashrams in Mathura and Vrindavan for every budget.',
};

const CATEGORY_BADGE: Record<HotelCategory, string> = {
  Budget:      'bg-green-400/10 border-green-400/20 text-green-400/80',
  'Mid-Range': 'bg-bhagwa/10 border-bhagwa/20 text-bhagwa/80',
  Heritage:    'bg-gold/10 border-gold/20 text-gold/80',
  Ashram:      'bg-lotus/10 border-lotus/20 text-lotus/80',
};

const CARD_GRADIENTS = [
  'from-bhagwa/18 to-transparent',
  'from-gold/15 to-transparent',
  'from-lotus/15 to-transparent',
  'from-peacock/15 to-transparent',
  'from-bhagwa/12 to-transparent',
];

async function fetchHotels(): Promise<Hotel[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false });
    if (error || !data?.length) return staticHotels;
    return data as Hotel[];
  } catch {
    return staticHotels;
  }
}

export default async function StayPage() {
  const hotels = await fetchHotels();
  return (
    <div className="min-h-dvh">
      {/* Hero */}
      <section className="relative pt-14 pb-10 px-4 sm:px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 60%)' }}
        />
        <div className="relative z-10 max-w-xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-3">✦ Stay in Braj ✦</p>
          <h1 className="text-4xl sm:text-5xl font-serif text-cream mb-3">
            Rest Your Feet,<br />
            <span className="text-gradient-gold">Refresh Your Soul</span>
          </h1>
          <p className="text-cream/45 text-sm leading-relaxed">
            From budget pilgrim rooms to serene ashrams — stay where the locals recommend.
          </p>
        </div>
      </section>

      {/* Hotel grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hotels.map((hotel, i) => (
            <article key={hotel.id} className="group rounded-2xl border border-gold/12 bg-braj-dark-2 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold/25 hover:shadow-card-hover">
              {/* Image placeholder */}
              <div className={`h-40 bg-gradient-to-br ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} relative flex items-center justify-center`}>
                <span className="text-4xl opacity-20 select-none">🏨</span>
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full border font-medium ${CATEGORY_BADGE[hotel.category]}`}>
                    {hotel.category}
                  </span>
                </div>
                {hotel.is_verified && (
                  <div className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full border border-green-400/20 bg-green-400/8 text-green-400/70">
                    ✓ Verified
                  </div>
                )}
                <div className="absolute bottom-0 inset-x-0 px-4 py-2 bg-gradient-to-t from-braj-dark-2/80 to-transparent">
                  <p className="text-xs text-cream/50">{hotel.city}</p>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <div>
                  <h3 className="text-sm font-medium text-cream group-hover:text-gold-light transition-colors">{hotel.name}</h3>
                  <p className="text-xs text-cream/40 mt-1 line-clamp-2 leading-relaxed">{hotel.description}</p>
                </div>

                {/* Price + Rating */}
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-base font-serif text-gold">₹{hotel.price_per_night.toLocaleString('en-IN')}</span>
                    <span className="text-cream/30 text-[10px]"> /night</span>
                  </div>
                  <div className="flex items-center gap-1 text-cream/50">
                    <span className="text-gold/60">★</span>
                    <span>{hotel.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5">
                  {hotel.amenities.slice(0, 4).map((a) => (
                    <span key={a} className="text-[10px] px-2 py-0.5 rounded-full border border-cream/10 text-cream/35 bg-cream/4">
                      {a}
                    </span>
                  ))}
                  {hotel.amenities.length > 4 && (
                    <span className="text-[10px] text-cream/25">+{hotel.amenities.length - 4} more</span>
                  )}
                </div>

                {/* Contact */}
                <div className="pt-2 border-t border-gold/8">
                  <a
                    href={`tel:${hotel.contact_phone}`}
                    className="flex items-center gap-2 text-xs text-bhagwa/70 hover:text-bhagwa transition-colors"
                  >
                    <span>📞</span>
                    <span>{hotel.contact_phone}</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Tip */}
        <div className="mt-10 rounded-2xl border border-gold/12 bg-braj-dark-2 px-6 py-5 flex gap-4 items-start">
          <span className="text-xl shrink-0">🙏</span>
          <div>
            <p className="text-sm font-medium text-cream mb-1">Brajwasi Booking Tip</p>
            <p className="text-sm text-cream/45 leading-relaxed">
              For major festivals (Janmashtami, Holi, Govardhan Puja), rooms fill up <strong className="text-cream/65">2–3 months in advance</strong>.
              Ashrams often offer affordable last-minute rooms but fill quickly on festival days.
              Always call ahead to confirm availability.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
