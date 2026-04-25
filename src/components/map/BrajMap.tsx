'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import type { Temple, Hotel } from '@/lib/types';

/* ── Fix Leaflet default icon path ───────────────────────── */
function fixLeafletIcons() {
  // @ts-expect-error - private Leaflet field
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

/* ── Custom SVG pin factory ──────────────────────────────── */
function makePin(fill: string, textColor: string, label: string): L.DivIcon {
  return L.divIcon({
    className: '',
    iconSize: [36, 46],
    iconAnchor: [18, 46],
    popupAnchor: [0, -48],
    html: `
      <svg width="36" height="46" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg">
        <filter id="ds"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.22"/></filter>
        <path d="M18 2C10.27 2 4 8.27 4 16C4 27 18 44 18 44C18 44 32 27 32 16C32 8.27 25.73 2 18 2Z"
          fill="${fill}" stroke="white" stroke-width="2" filter="url(#ds)"/>
        <circle cx="18" cy="16" r="8" fill="white" opacity="0.92"/>
        <text x="18" y="20" text-anchor="middle" font-size="10" font-weight="700"
          font-family="system-ui,sans-serif" fill="${textColor}">${label}</text>
      </svg>`,
  });
}

const TEMPLE_ICON = makePin('#E8541A', '#E8541A', '🛕');
const HOTEL_ICON  = makePin('#B8860B', '#B8860B', 'H');

/* ── Govardhan Parikrama path (21 km approximate) ───────── */
const PARIKRAMA: [number, number][] = [
  [27.4967, 77.4661],[27.5010, 77.4590],[27.5080, 77.4545],
  [27.5150, 77.4530],[27.5184, 77.4750],[27.5220, 77.4880],
  [27.5270, 77.4920],[27.5310, 77.4850],[27.5330, 77.4750],
  [27.5280, 77.4640],[27.5200, 77.4570],[27.5100, 77.4555],
  [27.4990, 77.4600],[27.4967, 77.4661],
];

/* ── Map controller — programmatic flyTo ────────────────── */
type FlyTarget = { lat: number; lng: number; zoom: number; key: number };

function MapController({ target }: { target: FlyTarget | null }) {
  const map = useMap();
  const prevKey = useRef(-1);
  useEffect(() => {
    if (target && target.key !== prevKey.current) {
      prevKey.current = target.key;
      map.flyTo([target.lat, target.lng], target.zoom, { duration: 1.1 });
    }
  }, [target, map]);
  return null;
}

/* ── Crowd badge helper ──────────────────────────────────── */
function crowdStyle(level?: string): { bg: string; color: string } {
  if (level === 'peaceful') return { bg: '#dcfce7', color: '#16a34a' };
  if (level === 'busy')     return { bg: '#ffedd5', color: '#ea580c' };
  if (level === 'extreme')  return { bg: '#fee2e2', color: '#dc2626' };
  return { bg: '#fef9c3', color: '#ca8a04' }; // moderate
}

const CITIES = ['All', 'Mathura', 'Vrindavan', 'Govardhan'];
const CENTER: [number, number] = [27.5180, 77.6100];

interface Props { temples: Temple[]; hotels: Hotel[]; }

export default function BrajMap({ temples, hotels }: Props) {
  const [mounted,      setMounted]      = useState(false);
  const [showTemples,  setShowTemples]  = useState(true);
  const [showHotels,   setShowHotels]   = useState(true);
  const [showParikrama,setShowParikrama]= useState(true);
  const [city,         setCity]         = useState('All');
  const [search,       setSearch]       = useState('');
  const [activeId,     setActiveId]     = useState<string | null>(null);
  const [flyTarget,    setFlyTarget]    = useState<FlyTarget | null>(null);
  const flyKey = useRef(0);

  useEffect(() => { fixLeafletIcons(); setMounted(true); }, []);

  const filteredTemples = useMemo(() => temples.filter(t =>
    showTemples &&
    (city === 'All' || t.city === city) &&
    (!search || t.name.toLowerCase().includes(search.toLowerCase()) || t.deity?.toLowerCase().includes(search.toLowerCase()))
  ), [temples, showTemples, city, search]);

  const filteredHotels = useMemo(() => hotels.filter(h =>
    showHotels &&
    (city === 'All' || h.city === city) &&
    (!search || h.name.toLowerCase().includes(search.toLowerCase()))
  ), [hotels, showHotels, city, search]);

  const flyTo = (lat: number, lng: number, id: string) => {
    flyKey.current += 1;
    setFlyTarget({ lat, lng, zoom: 16, key: flyKey.current });
    setActiveId(id);
  };

  if (!mounted) return (
    <div className="w-full h-full bg-stone-100 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-bhagwa/30 border-t-bhagwa animate-spin" />
        <p className="text-stone-500 text-sm">Loading map…</p>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex">

      {/* ── LEFT SIDEBAR (desktop only) ─────────────────────── */}
      <aside className="hidden md:flex flex-col w-72 shrink-0 bg-white border-r border-stone-200 h-full overflow-hidden">

        {/* Search */}
        <div className="p-3 border-b border-stone-100">
          <div className="relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search temples & hotels…"
              className="w-full pl-7 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/20 transition-all"
            />
          </div>
        </div>

        {/* City pills */}
        <div className="flex gap-1 p-2 border-b border-stone-100 flex-wrap">
          {CITIES.map(c => (
            <button key={c} onClick={() => setCity(c)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${city === c ? 'bg-bhagwa text-white shadow-sm' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Type toggles */}
        <div className="flex gap-1.5 p-2.5 border-b border-stone-100">
          <button onClick={() => setShowTemples(p => !p)}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-semibold transition-all border ${showTemples ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-stone-50 text-stone-400 border-stone-200'}`}>
            🛕 {temples.length} Temples
          </button>
          <button onClick={() => setShowHotels(p => !p)}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-semibold transition-all border ${showHotels ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-stone-50 text-stone-400 border-stone-200'}`}>
            🏨 {hotels.length} Hotels
          </button>
        </div>

        {/* Scrollable item list */}
        <div className="flex-1 overflow-y-auto overscroll-contain">

          {filteredTemples.length > 0 && (
            <div className="px-3 pt-2.5 pb-1">
              <p className="text-[9px] uppercase tracking-widest text-stone-400 font-semibold">Temples</p>
            </div>
          )}
          {filteredTemples.map(t => {
            const cs = crowdStyle(t.crowd_status?.level);
            return (
              <button key={t.id} onClick={() => flyTo(t.lat, t.lng, t.id)}
                className={`w-full text-left px-3 py-2.5 transition-colors hover:bg-stone-50 ${activeId === t.id ? 'bg-orange-50 border-l-2 border-l-orange-400' : 'border-l-2 border-l-transparent'}`}>
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-bold text-orange-500 mt-0.5 shrink-0 w-5">#{t.rank}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-stone-700 truncate leading-tight">{t.name}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">{t.city}</p>
                  </div>
                  {t.crowd_status && (
                    <span className="shrink-0 text-[8px] px-1.5 py-0.5 rounded-full font-semibold capitalize mt-0.5"
                      style={{ background: cs.bg, color: cs.color }}>
                      {t.crowd_status.level}
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          {filteredHotels.length > 0 && (
            <div className="px-3 pt-3 pb-1">
              <p className="text-[9px] uppercase tracking-widest text-stone-400 font-semibold">Hotels</p>
            </div>
          )}
          {filteredHotels.map(h => (
            <button key={h.id} onClick={() => flyTo(h.lat, h.lng, h.id)}
              className={`w-full text-left px-3 py-2.5 transition-colors hover:bg-stone-50 ${activeId === h.id ? 'bg-amber-50 border-l-2 border-l-amber-400' : 'border-l-2 border-l-transparent'}`}>
              <div className="flex items-start gap-2">
                <span className="text-sm shrink-0">🏨</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-stone-700 truncate leading-tight">{h.name}</p>
                  <p className="text-[10px] text-stone-400 mt-0.5">{h.city} · {h.category}</p>
                </div>
                <span className="shrink-0 text-[10px] font-bold text-amber-700 mt-0.5">
                  ₹{h.price_per_night.toLocaleString('en-IN')}
                </span>
              </div>
            </button>
          ))}

          {filteredTemples.length === 0 && filteredHotels.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-10 text-stone-400">
              <span className="text-2xl opacity-40">🔍</span>
              <p className="text-xs">No results found</p>
            </div>
          )}
        </div>

        {/* Parikrama toggle */}
        <div className="p-2.5 border-t border-stone-100 shrink-0">
          <button onClick={() => setShowParikrama(p => !p)}
            className={`w-full py-2 rounded-lg text-[10px] font-semibold transition-all border ${showParikrama ? 'bg-green-50 text-green-700 border-green-200' : 'bg-stone-50 text-stone-400 border-stone-200'}`}>
            🚶 Govardhan Parikrama (21 km)
          </button>
        </div>
      </aside>

      {/* ── MAP ───────────────────────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden">
        <MapContainer center={CENTER} zoom={12} style={{ width: '100%', height: '100%' }} zoomControl>
          {/* CartoDB Positron — clean white tiles, no API key needed */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org">OSM</a> &copy; <a href="https://carto.com">CARTO</a>'
            maxZoom={19}
          />

          <MapController target={flyTarget} />

          {/* Govardhan Parikrama route */}
          {showParikrama && (
            <Polyline positions={PARIKRAMA} color="#16a34a" weight={3.5} opacity={0.75} dashArray="10 7" />
          )}

          {/* Temple markers */}
          {filteredTemples.map(t => (
            <Marker key={t.id} position={[t.lat, t.lng]} icon={TEMPLE_ICON}
              eventHandlers={{ click: () => setActiveId(t.id) }}>
              <Popup minWidth={210}>
                <div style={{ fontFamily: 'system-ui,sans-serif' }}>
                  <div style={{ borderBottom: '1px solid #f0ebe0', paddingBottom: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 9, color: '#E8541A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      #{t.rank} · Temple
                    </span>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#111', margin: '3px 0 2px', lineHeight: 1.3 }}>{t.name}</p>
                    <p style={{ fontSize: 11, color: '#6b7280', margin: 0 }}>{t.deity} · {t.city}</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <p style={{ margin: 0, fontSize: 11, color: '#374151' }}>
                      ⏰ <strong>Opens</strong> {t.timings?.opening_time} — {t.timings?.closing_time}
                    </p>
                    {t.timings?.evening_open && (
                      <p style={{ margin: 0, fontSize: 11, color: '#374151' }}>
                        🌙 <strong>Evening</strong> {t.timings.evening_open} — {t.timings.evening_close}
                      </p>
                    )}
                    {t.timings?.aartis?.[0] && (
                      <p style={{ margin: 0, fontSize: 11, color: '#374151' }}>
                        🪔 {t.timings.aartis[0].name}: <strong>{t.timings.aartis[0].time}</strong>
                      </p>
                    )}
                    <p style={{ margin: 0, fontSize: 11, color: '#374151' }}>
                      🎟 {t.entry_fee}
                    </p>
                    {t.crowd_status && (() => {
                      const cs = crowdStyle(t.crowd_status.level);
                      return (
                        <span style={{ display: 'inline-block', width: 'fit-content', fontSize: 10, padding: '2px 8px', borderRadius: 99, fontWeight: 600, background: cs.bg, color: cs.color, textTransform: 'capitalize' }}>
                          {t.crowd_status.level} crowd
                        </span>
                      );
                    })()}
                  </div>

                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, padding: '8px 14px', background: '#E8541A', color: 'white', borderRadius: 8, fontSize: 11, fontWeight: 600, textDecoration: 'none' }}>
                    Get Directions →
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Hotel markers */}
          {filteredHotels.map(h => (
            <Marker key={h.id} position={[h.lat, h.lng]} icon={HOTEL_ICON}
              eventHandlers={{ click: () => setActiveId(h.id) }}>
              <Popup minWidth={210}>
                <div style={{ fontFamily: 'system-ui,sans-serif' }}>
                  <div style={{ borderBottom: '1px solid #f0ebe0', paddingBottom: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 9, color: '#B8860B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {h.category} · Hotel
                    </span>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#111', margin: '3px 0 2px', lineHeight: 1.3 }}>{h.name}</p>
                    <p style={{ fontSize: 11, color: '#6b7280', margin: 0 }}>{h.city}</p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#B8860B', lineHeight: 1 }}>
                      ₹{h.price_per_night.toLocaleString('en-IN')}
                      <span style={{ fontSize: 10, fontWeight: 400, color: '#9ca3af' }}>/night</span>
                    </span>
                    <span style={{ fontSize: 12, color: '#6b7280' }}>★ {h.rating}</span>
                  </div>

                  {h.is_verified && (
                    <span style={{ display: 'inline-block', fontSize: 10, padding: '2px 8px', borderRadius: 99, fontWeight: 600, background: '#dcfce7', color: '#16a34a', marginBottom: 10 }}>
                      ✓ Verified
                    </span>
                  )}

                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lng}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 14px', background: '#B8860B', color: 'white', borderRadius: 8, fontSize: 11, fontWeight: 600, textDecoration: 'none' }}>
                    Get Directions →
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* ── Mobile top filter bar ──────────────────────────── */}
        <div className="md:hidden absolute top-3 left-3 right-3 z-[1000] flex gap-1.5 flex-wrap">
          {CITIES.map(c => (
            <button key={c} onClick={() => setCity(c)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-sm shadow-sm transition-all ${city === c ? 'bg-bhagwa text-white' : 'bg-white/90 text-stone-600 border border-stone-200'}`}>
              {c}
            </button>
          ))}
          <button onClick={() => setShowParikrama(p => !p)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-sm shadow-sm transition-all ${showParikrama ? 'bg-green-500 text-white' : 'bg-white/90 text-stone-600 border border-stone-200'}`}>
            🚶 Parikrama
          </button>
        </div>

        {/* Map polish styles */}
        <style>{`
          .leaflet-popup-content-wrapper {
            background: white !important;
            border: 1px solid #e5e7eb !important;
            border-radius: 14px !important;
            box-shadow: 0 8px 30px rgba(0,0,0,0.13) !important;
            padding: 0 !important;
          }
          .leaflet-popup-content { margin: 14px 16px !important; }
          .leaflet-popup-tip { background: white !important; }
          .leaflet-popup-close-button {
            color: #9ca3af !important; font-size: 18px !important;
            top: 6px !important; right: 8px !important; font-weight: 300 !important;
          }
          .leaflet-control-zoom {
            border: 1px solid #e5e7eb !important;
            border-radius: 10px !important;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important;
          }
          .leaflet-control-zoom a {
            background: white !important; color: #374151 !important;
            border-color: #e5e7eb !important; width: 32px !important; height: 32px !important;
            line-height: 32px !important; font-size: 16px !important;
          }
          .leaflet-control-zoom a:hover { background: #f9fafb !important; color: #E8541A !important; }
          .leaflet-control-attribution {
            background: rgba(255,255,255,0.85) !important;
            color: #9ca3af !important; font-size: 9px !important;
            backdrop-filter: blur(4px);
          }
          .leaflet-control-attribution a { color: #E8541A !important; }
        `}</style>
      </div>
    </div>
  );
}
