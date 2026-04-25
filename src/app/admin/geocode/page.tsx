'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Copy, Check } from 'lucide-react';

/* ── Mock geocoding results keyed by landmark ──────────────── */
const MOCK_RESULTS: Record<string, { lat: number; lng: number; formatted: string }> = {
  'vrindavan':   { lat: 27.5794, lng: 77.7039, formatted: 'Vrindavan, Mathura, Uttar Pradesh 281121, India' },
  'mathura':     { lat: 27.5036, lng: 77.6738, formatted: 'Mathura, Uttar Pradesh 281001, India' },
  'govardhan':   { lat: 27.4967, lng: 77.4661, formatted: 'Govardhan, Mathura, Uttar Pradesh 281502, India' },
  'barsana':     { lat: 27.6495, lng: 77.3825, formatted: 'Barsana, Mathura, Uttar Pradesh 281405, India' },
  'iskcon':      { lat: 27.5829, lng: 77.7064, formatted: 'ISKCON Krishna Balaram Mandir, Raman Reti, Vrindavan, UP 281121' },
  'prem mandir': { lat: 27.5779, lng: 77.7062, formatted: 'Prem Mandir, Raman Reti, Vrindavan, Mathura, UP 281121' },
};

function findMockResult(address: string) {
  const lower = address.toLowerCase();
  for (const [key, val] of Object.entries(MOCK_RESULTS)) {
    if (lower.includes(key)) return val;
  }
  return { lat: 27.5036 + (Math.random() - 0.5) * 0.1, lng: 77.6738 + (Math.random() - 0.5) * 0.1, formatted: `${address}, India (approximate)` };
}

type Stage = 'idle' | 'loading' | 'done';

interface GeoResult { lat: number; lng: number; formatted: string }

export default function GeocodePage() {
  const [address, setAddress] = useState('');
  const [stage, setStage] = useState<Stage>('idle');
  const [result, setResult] = useState<GeoResult | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleGeocode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    setStage('loading');
    setResult(null);
    await new Promise((r) => setTimeout(r, 1200));
    setResult(findMockResult(address));
    setStage('done');
  };

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-5 sm:p-8 max-w-3xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif text-cream">Add New Location</h1>
        <p className="text-cream/40 text-sm mt-1">
          Enter any address in Braj — coordinates are auto-fetched and ready to save.
        </p>
      </div>

      {/* Geocode form */}
      <div className="rounded-2xl border border-gold/12 bg-braj-dark-2 p-6 flex flex-col gap-5">
        <div className="flex items-center gap-2 mb-1">
          <MapPin size={16} className="text-bhagwa/70" />
          <p className="text-sm font-medium text-cream">Auto-Geocoding</p>
        </div>

        <form onSubmit={handleGeocode} className="flex gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/30" />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Banke Bihari Temple, Vrindavan, UP"
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-braj-dark-3 border border-gold/12 text-cream text-sm placeholder:text-cream/25 focus:outline-none focus:border-bhagwa/40 transition-all"
            />
          </div>
          <motion.button type="submit" disabled={stage === 'loading' || !address.trim()} whileTap={{ scale: 0.97 }}
            className="px-5 py-3 rounded-xl bg-bhagwa hover:bg-bhagwa-light text-white text-sm font-medium transition-all disabled:opacity-50 shadow-bhagwa shrink-0 flex items-center gap-2">
            {stage === 'loading'
              ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" />
              : <>Find Coords →</>}
          </motion.button>
        </form>

        {/* Result */}
        <AnimatePresence>
          {stage === 'done' && result && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="rounded-xl border border-green-400/20 bg-green-400/5 p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-xs text-green-400 font-medium">Coordinates found</p>
              </div>
              <p className="text-xs text-cream/50 leading-relaxed">{result.formatted}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Latitude',  value: result.lat.toFixed(6), key: 'lat' },
                  { label: 'Longitude', value: result.lng.toFixed(6), key: 'lng' },
                ].map(({ label, value, key }) => (
                  <div key={key} className="flex items-center justify-between px-3 py-2 rounded-lg bg-braj-dark-3 border border-gold/10">
                    <div>
                      <p className="text-[10px] text-cream/30 mb-0.5">{label}</p>
                      <p className="text-sm text-cream tabular-nums font-medium">{value}</p>
                    </div>
                    <button onClick={() => copy(value, key)} className="p-1.5 rounded-lg text-cream/30 hover:text-gold transition-colors">
                      {copied === key ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full py-2.5 rounded-xl bg-gold hover:bg-gold-light text-braj-dark font-semibold text-sm transition-all">
                Save to Database →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* API Logic outline */}
      <div className="rounded-2xl border border-gold/10 bg-braj-dark-2 overflow-hidden">
        <div className="px-5 py-4 border-b border-gold/8 flex items-center gap-2">
          <span className="text-sm">⚙️</span>
          <p className="text-sm font-medium text-cream">Production Geocoding Logic</p>
          <span className="text-xs text-cream/30 ml-auto">Google Maps Geocoding API</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          {/* Step 1 */}
          <Step n={1} title="Admin submits address form" code={`POST /api/admin/locations\n{ "address": "Banke Bihari Temple, Vrindavan, UP" }`} />
          {/* Step 2 */}
          <Step n={2} title="Server calls Geocoding API" code={`// server-side (keeps API key secret)\nconst res = await fetch(\n  \`https://maps.googleapis.com/maps/api/geocode/json\` +\n  \`?address=\${encodeURIComponent(address)}\` +\n  \`&key=\${process.env.GOOGLE_MAPS_API_KEY}\`\n);\nconst { results } = await res.json();\nconst { lat, lng } = results[0].geometry.location;`} lang="ts" />
          {/* Step 3 */}
          <Step n={3} title="Coordinates stored in database" code={`// e.g. Supabase / Prisma\nawait db.location.create({\n  data: {\n    name: "Banke Bihari Temple",\n    address,\n    lat,    // 27.5754\n    lng,    // 77.6976\n    type: "Temple",\n  },\n});`} lang="ts" />
          {/* Step 4 */}
          <Step n={4} title="Pin instantly appears on the frontend map" code={`// BrajMap.tsx reads all locations from API\n// New temple pin is rendered by react-leaflet\n// No manual lat/lng entry needed`} />
        </div>
      </div>
    </div>
  );
}

function Step({ n, title, code, lang = 'text' }: { n: number; title: string; code: string; lang?: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-6 h-6 rounded-full bg-bhagwa/15 border border-bhagwa/25 flex items-center justify-center text-xs text-bhagwa font-medium shrink-0 mt-0.5">{n}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-cream/70 mb-2">{title}</p>
        <pre className="text-[11px] text-cream/50 bg-braj-dark-3 border border-gold/8 rounded-xl p-3 overflow-x-auto leading-relaxed whitespace-pre-wrap">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
