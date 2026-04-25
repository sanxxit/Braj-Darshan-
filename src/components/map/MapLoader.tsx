'use client';

import dynamic from 'next/dynamic';
import type { Temple, Hotel } from '@/lib/types';

interface Props { temples: Temple[]; hotels: Hotel[]; }

const BrajMap = dynamic(() => import('./BrajMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-braj-dark-2 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-bhagwa/20 border-t-bhagwa animate-spin" />
        <p className="text-cream/30 text-sm">Loading map…</p>
      </div>
    </div>
  ),
});

export default function MapLoader({ temples, hotels }: Props) {
  return <BrajMap temples={temples} hotels={hotels} />;
}
