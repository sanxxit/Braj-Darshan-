'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Temple, Hotel } from '@/lib/types';

/* ── Fix Leaflet default icon path (Next.js / webpack issue) ─ */
function fixLeafletIcons() {
  // @ts-expect-error - private Leaflet field
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

/* ── Custom pin icon factory ─────────────────────────────── */
function makeIcon(bg: string, emoji: string): L.DivIcon {
  return L.divIcon({
    className: '',
    iconSize: [34, 40],
    iconAnchor: [17, 40],
    popupAnchor: [0, -42],
    html: `
      <div style="
        position:relative;
        width:34px;height:40px;
        display:flex;align-items:center;justify-content:center;
      ">
        <div style="
          position:absolute;bottom:0;left:50%;transform:translateX(-50%);
          width:0;height:0;
          border-left:7px solid transparent;
          border-right:7px solid transparent;
          border-top:10px solid ${bg};
        "></div>
        <div style="
          position:absolute;top:0;left:0;right:0;bottom:10px;
          background:${bg};
          border-radius:50% 50% 50% 50% / 55% 55% 45% 45%;
          border:2px solid rgba(255,255,255,0.25);
          box-shadow:0 2px 10px rgba(0,0,0,0.5);
          display:flex;align-items:center;justify-content:center;
          font-size:14px;line-height:1;
        ">${emoji}</div>
      </div>
    `,
  });
}

const ICONS = {
  temple: makeIcon('#FF671F', '🛕'),
  hotel:  makeIcon('#D4AF37', '🏨'),
};

type FilterType = 'temple' | 'hotel';

const FILTER_LABELS: Record<FilterType, { emoji: string; label: string; color: string }> = {
  temple: { emoji: '🛕', label: 'Temples', color: '#FF671F' },
  hotel:  { emoji: '🏨', label: 'Hotels',  color: '#D4AF37' },
};

const MATHURA_CENTER: [number, number] = [27.5180, 77.6100];

interface Props { temples: Temple[]; hotels: Hotel[]; }

export default function BrajMap({ temples, hotels }: Props) {
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState<Set<FilterType>>(new Set(['temple', 'hotel']));

  useEffect(() => {
    fixLeafletIcons();
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-braj-dark-2 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-bhagwa/20 border-t-bhagwa animate-spin" />
          <p className="text-cream/30 text-sm">Loading map…</p>
        </div>
      </div>
    );
  }

  const toggleFilter = (f: FilterType) => {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(f)) { if (next.size > 1) next.delete(f); }
      else next.add(f);
      return next;
    });
  };

  return (
    <div className="relative w-full h-full">
      {/* Map */}
      <MapContainer
        center={MATHURA_CENTER}
        zoom={12}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        {/* CartoDB Dark tiles — matches our dark aesthetic */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> &copy; <a href="https://carto.com">CARTO</a>'
          maxZoom={19}
        />

        {/* Temple markers */}
        {filters.has('temple') && temples.map((t) => (
          <Marker key={t.id} position={[t.lat, t.lng]} icon={ICONS.temple}>
            <Popup>
              <div style={{ minWidth: 180, fontFamily: 'sans-serif' }}>
                <p style={{ fontSize: 11, color: '#FF671F', marginBottom: 2, fontWeight: 600 }}>#{t.rank} Temple</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#FFF8E7', marginBottom: 4 }}>{t.name}</p>
                <p style={{ fontSize: 11, color: '#E8DCC8', opacity: 0.6, marginBottom: 6 }}>{t.deity} · {t.city}</p>
                <div style={{ borderTop: '1px solid rgba(212,175,55,0.2)', paddingTop: 6 }}>
                  <p style={{ fontSize: 11, color: '#D4AF37' }}>
                    🕯 {t.timings.aartis[0]?.name}: {t.timings.aartis[0]?.time}
                  </p>
                  <p style={{ fontSize: 10, color: '#FFF8E7', opacity: 0.4, marginTop: 2 }}>
                    Opens {t.timings.opening_time} · {t.entry_fee}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Hotel markers */}
        {filters.has('hotel') && hotels.map((h) => (
          <Marker key={h.id} position={[h.lat, h.lng]} icon={ICONS.hotel}>
            <Popup>
              <div style={{ minWidth: 180, fontFamily: 'sans-serif' }}>
                <p style={{ fontSize: 11, color: '#D4AF37', marginBottom: 2, fontWeight: 600 }}>{h.category}</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#FFF8E7', marginBottom: 4 }}>{h.name}</p>
                <p style={{ fontSize: 11, color: '#E8DCC8', opacity: 0.6, marginBottom: 6 }}>{h.city}</p>
                <div style={{ borderTop: '1px solid rgba(212,175,55,0.2)', paddingTop: 6, display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: 12, color: '#D4AF37', fontWeight: 600 }}>₹{h.price_per_night.toLocaleString('en-IN')}/night</p>
                  <p style={{ fontSize: 11, color: '#FFF8E7', opacity: 0.5 }}>★ {h.rating}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* ── Overlay controls ───────────────────── */}
      {/* Filter pills */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
        {(Object.entries(FILTER_LABELS) as [FilterType, typeof FILTER_LABELS[FilterType]][]).map(([key, { emoji, label, color }]) => (
          <button
            key={key}
            onClick={() => toggleFilter(key)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all backdrop-blur-sm"
            style={{
              background: filters.has(key) ? `${color}22` : 'rgba(17,17,17,0.8)',
              border: `1px solid ${filters.has(key) ? `${color}55` : 'rgba(212,175,55,0.15)'}`,
              color: filters.has(key) ? color : 'rgba(255,248,231,0.45)',
            }}
          >
            <span>{emoji}</span>
            {label}
            <span style={{ opacity: 0.5, fontSize: 10 }}>
              ({key === 'temple' ? temples.length : hotels.length})
            </span>
          </button>
        ))}
      </div>

      {/* Info badge */}
      <div className="absolute bottom-4 left-4 z-[1000] px-3 py-1.5 rounded-full bg-braj-dark/85 backdrop-blur-sm border border-gold/12 text-[10px] text-cream/40">
        Click any pin for details
      </div>

      {/* Attribution override */}
      <style>{`
        .leaflet-control-attribution {
          background: rgba(17,17,17,0.8) !important;
          color: rgba(255,248,231,0.3) !important;
          font-size: 9px !important;
        }
        .leaflet-control-attribution a { color: rgba(255,103,31,0.5) !important; }
        .leaflet-popup-content-wrapper {
          background: #1A1A1A !important;
          border: 1px solid rgba(212,175,55,0.2) !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6) !important;
        }
        .leaflet-popup-tip { background: #1A1A1A !important; }
        .leaflet-popup-close-button { color: rgba(255,248,231,0.4) !important; }
      `}</style>
    </div>
  );
}
