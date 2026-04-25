'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Temple, CrowdLevel, CrowdStatus } from '@/lib/types';
import DarshanRushBadge from '@/components/temples/DarshanRushBadge';

const LEVELS: { level: CrowdLevel; label: string; emoji: string; color: string }[] = [
  { level: 'peaceful', label: 'Peaceful', emoji: '🟢', color: '#4ade80' },
  { level: 'moderate', label: 'Moderate', emoji: '🟡', color: '#facc15' },
  { level: 'busy',     label: 'Busy',     emoji: '🟠', color: '#fb923c' },
  { level: 'extreme',  label: 'Extreme!', emoji: '🔴', color: '#f87171' },
];

type TempleWithCrowd = Temple & { crowd_status: CrowdStatus };

function ensureCrowd(temples: Temple[]): TempleWithCrowd[] {
  return temples.map((t) => ({
    ...t,
    crowd_status: t.crowd_status ?? { level: 'moderate' as CrowdLevel, updated_at: new Date().toISOString(), updated_by: 'Admin' },
  }));
}

export default function BheedClient({ initialTemples }: { initialTemples: Temple[] }) {
  const [temples, setTemples] = useState<TempleWithCrowd[]>(ensureCrowd(initialTemples));
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<{ level: CrowdLevel; note: string }>({ level: 'moderate', note: '' });
  const [saved, setSaved] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const startEdit = (id: string, current: CrowdStatus) => {
    setEditing(id);
    setDraft({ level: current.level, note: current.note ?? '' });
  };

  const applyQuick = async (id: string, level: CrowdLevel) => {
    const crowd_status: CrowdStatus = { level, updated_at: new Date().toISOString(), updated_by: 'Admin' };
    setTemples((prev) => prev.map((t) => t.id === id ? { ...t, crowd_status } : t));
    await fetch(`/api/temples/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ crowd_status }),
    });
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  const saveEdit = async (id: string) => {
    setSaving(true);
    const crowd_status: CrowdStatus = {
      level: draft.level,
      note: draft.note || undefined,
      updated_at: new Date().toISOString(),
      updated_by: 'Admin',
    };
    setTemples((prev) => prev.map((t) => t.id === id ? { ...t, crowd_status } : t));
    await fetch(`/api/temples/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ crowd_status }),
    });
    setSaving(false);
    setEditing(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2500);
  };

  return (
    <div className="p-5 sm:p-8 max-w-4xl mx-auto flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-cream">Darshan Rush — Bheed Meter</h1>
          <p className="text-cream/40 text-sm mt-1">Set real-time crowd levels visible to all pilgrims on the temple cards.</p>
        </div>
        <div className="flex flex-col gap-1.5 shrink-0">
          {LEVELS.map(({ emoji, label, color }) => (
            <div key={label} className="flex items-center gap-1.5 text-[10px]" style={{ color }}>
              <span>{emoji}</span> {label}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-gold/10 bg-braj-dark-2 overflow-hidden">
        {temples.map((temple) => {
          const isEditing = editing === temple.id;
          const isSaved = saved === temple.id;

          return (
            <div key={temple.id} className={`border-b border-gold/6 last:border-0 transition-colors ${isEditing ? 'bg-bhagwa/4' : 'hover:bg-cream/2'}`}>
              <div className="px-5 py-4 flex items-center gap-4">
                <div className="shrink-0 w-6 text-xs text-cream/30 text-center">#{temple.rank}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-cream truncate">{temple.name}</p>
                  <p className="text-[10px] text-cream/30">{temple.city}</p>
                </div>
                <div className="shrink-0"><DarshanRushBadge level={temple.crowd_status.level} compact /></div>
                <div className="flex gap-1 shrink-0">
                  {LEVELS.map(({ level, emoji }) => (
                    <button key={level} onClick={() => applyQuick(temple.id, level)} title={level}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-all ${temple.crowd_status.level === level ? 'bg-cream/10 ring-1 ring-cream/20' : 'opacity-40 hover:opacity-100'}`}>
                      {emoji}
                    </button>
                  ))}
                </div>
                <div className="shrink-0 w-20 text-right">
                  {isSaved && !isEditing ? (
                    <span className="flex items-center justify-end gap-1 text-xs text-green-400"><Check size={12} /> Saved</span>
                  ) : (
                    <button onClick={() => isEditing ? setEditing(null) : startEdit(temple.id, temple.crowd_status)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${isEditing ? 'border-red-400/25 text-red-400/70 hover:bg-red-400/8' : 'border-bhagwa/20 text-bhagwa/60 hover:border-bhagwa/40 hover:text-bhagwa'}`}>
                      {isEditing ? 'Cancel' : '+ Note'}
                    </button>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {isEditing && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                    <div className="px-5 pb-5 pt-1">
                      <div className="rounded-xl border border-bhagwa/15 bg-braj-dark-3 p-4 flex flex-col gap-4">
                        <p className="text-xs text-bhagwa/70 font-medium">Edit Bheed Status — {temple.name}</p>
                        <div>
                          <p className="text-[10px] text-cream/30 uppercase tracking-wider mb-2">Crowd Level</p>
                          <div className="flex gap-2 flex-wrap">
                            {LEVELS.map(({ level, label, color }) => (
                              <button key={level} onClick={() => setDraft((d) => ({ ...d, level }))}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all border"
                                style={draft.level === level ? { background: `${color}18`, border: `1px solid ${color}50`, color } : { background: 'transparent', border: '1px solid rgba(212,175,55,0.12)', color: 'rgba(255,248,231,0.35)' }}>
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] text-cream/30 uppercase tracking-wider block mb-2">Admin Note (optional)</label>
                          <input type="text" value={draft.note} onChange={(e) => setDraft((d) => ({ ...d, note: e.target.value }))} placeholder="e.g. Ekadashi today — expect 2hr queue at gate"
                            className="w-full px-3 py-2.5 rounded-lg bg-braj-dark-2 border border-gold/15 text-cream text-xs focus:outline-none focus:border-bhagwa/40 transition-all placeholder:text-cream/20" />
                        </div>
                        <div className="flex gap-2 justify-end pt-1 border-t border-gold/8">
                          <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl border border-cream/10 text-cream/50 hover:text-cream/80 text-xs transition-all">Cancel</button>
                          <button onClick={() => saveEdit(temple.id)} disabled={saving}
                            className="px-4 py-2 rounded-xl bg-bhagwa hover:bg-bhagwa-light text-white text-xs font-medium transition-all shadow-bhagwa flex items-center gap-1.5 disabled:opacity-60">
                            <Check size={13} /> {saving ? 'Saving…' : 'Update Status'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <p className="text-center text-cream/20 text-xs italic font-serif">
        Updates are persisted to Supabase via <code className="text-bhagwa/50">PATCH /api/temples/:id</code>
      </p>
    </div>
  );
}
