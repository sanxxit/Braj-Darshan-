import type { Metadata } from 'next';
import { createServerClient } from '@/lib/supabase/server';
import { temples as staticTemples } from '@/lib/data/temples';
import { hotels as staticHotels } from '@/lib/data/hotels';
import MapLoader from '@/components/map/MapLoader';
import type { Temple, Hotel } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Interactive Map — Braj Darshan',
  description: 'Find temples, hotels, food stalls, and sacred sites on the Braj interactive map.',
};

async function fetchMapData(): Promise<{ temples: Temple[]; hotels: Hotel[] }> {
  try {
    const supabase = createServerClient();
    const [{ data: t }, { data: h }] = await Promise.all([
      supabase.from('temples').select('id,name,deity,city,lat,lng,rank,timings,entry_fee,crowd_status').eq('is_active', true).order('rank'),
      supabase.from('hotels').select('id,name,category,city,lat,lng,price_per_night,rating').eq('is_active', true),
    ]);
    return {
      temples: (t?.length ? t : staticTemples) as Temple[],
      hotels:  (h?.length ? h : staticHotels)  as Hotel[],
    };
  } catch {
    return { temples: staticTemples, hotels: staticHotels };
  }
}

export default async function MapPage() {
  const { temples, hotels } = await fetchMapData();

  return (
    <div className="flex flex-col" style={{ height: '100dvh' }}>
      {/* Compact header */}
      <div className="shrink-0 px-4 sm:px-6 pt-4 pb-3 flex items-center justify-between border-b border-gold/8">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-bhagwa/60 mb-0.5">✦ Sacred Coordinates ✦</p>
          <h1 className="text-lg font-serif text-cream">Map of Holy Braj</h1>
        </div>
        <div className="flex gap-2 text-xs text-cream/35">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-bhagwa/60 inline-block" /> {temples.length} Temples</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gold/60 inline-block" /> {hotels.length} Hotels</span>
        </div>
      </div>

      {/* Full-height map */}
      <div className="flex-1 overflow-hidden">
        <MapLoader temples={temples} hotels={hotels} />
      </div>
    </div>
  );
}
