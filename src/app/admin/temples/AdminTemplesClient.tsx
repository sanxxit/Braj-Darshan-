'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Link as LinkIcon } from 'lucide-react';
import type { Temple, TrustLinks } from '@/lib/types';

type EditState = { [templeId: string]: Partial<Temple['timings']> & { aartis?: Temple['timings']['aartis'] } };
type LinkState = { [templeId: string]: TrustLinks };

export default function AdminTemplesClient({ initialTemples }: { initialTemples: Temple[] }) {
  const [temples, setTemples] = useState(initialTemples);
  const [editing, setEditing] = useState<string | null>(null);
  const [edits, setEdits] = useState<EditState>({});
  const [linkEditing, setLinkEditing] = useState<string | null>(null);
  const [linkEdits, setLinkEdits] = useState<LinkState>({});
  const [saved, setSaved] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const startEdit = (id: string, timings: Temple['timings']) => {
    setEditing(id);
    setEdits((prev) => ({
      ...prev,
      [id]: {
        opening_time: timings.opening_time,
        closing_time: timings.closing_time,
        evening_open: timings.evening_open,
        evening_close: timings.evening_close,
        aartis: timings.aartis.map((a) => ({ ...a })),
      },
    }));
  };

  const cancelEdit = () => setEditing(null);

  const saveEdit = async (id: string) => {
    setSaving(true);
    const timings = edits[id];
    await fetch(`/api/temples/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timings }),
    });
    setTemples((prev) => prev.map((t) => t.id === id ? { ...t, timings: { ...t.timings, ...timings } as Temple['timings'] } : t));
    setSaving(false);
    setEditing(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2500);
  };

  const startLinkEdit = (id: string, links?: Temple['trust_links']) => {
    setLinkEditing(id);
    setLinkEdits((prev) => ({ ...prev, [id]: { ...links } }));
  };

  const saveLinkEdit = async (id: string) => {
    setSaving(true);
    const trust_links = linkEdits[id];
    await fetch(`/api/temples/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trust_links }),
    });
    setTemples((prev) => prev.map((t) => t.id === id ? { ...t, trust_links } : t));
    setSaving(false);
    setLinkEditing(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2500);
  };

  const updateAartiTime = (templeId: string, aartiIndex: number, time: string) => {
    setEdits((prev) => {
      const aartis = [...(prev[templeId]?.aartis ?? [])];
      aartis[aartiIndex] = { ...aartis[aartiIndex], time };
      return { ...prev, [templeId]: { ...prev[templeId], aartis } };
    });
  };

  const updateField = (templeId: string, field: string, value: string) => {
    setEdits((prev) => ({ ...prev, [templeId]: { ...prev[templeId], [field]: value } }));
  };

  const updateLink = (templeId: string, field: keyof TrustLinks, value: string) => {
    setLinkEdits((prev) => ({ ...prev, [templeId]: { ...prev[templeId], [field]: value || undefined } }));
  };

  return (
    <div className="p-5 sm:p-8 max-w-4xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-cream">Temples & Timings</h1>
          <p className="text-cream/40 text-sm mt-1">{temples.length} temples · click a row to edit timings</p>
        </div>
        <div className="px-4 py-2 rounded-xl border border-bhagwa/20 bg-bhagwa/8 text-bhagwa/70 text-xs">
          Changes saved to Supabase
        </div>
      </div>

      <div className="rounded-2xl border border-gold/10 bg-braj-dark-2 overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-gold/8 text-[10px] uppercase tracking-[0.15em] text-cream/30">
          <span className="col-span-1">#</span>
          <span className="col-span-3">Temple</span>
          <span className="col-span-2">City</span>
          <span className="col-span-2">Opens</span>
          <span className="col-span-2">Mangala</span>
          <span className="col-span-1">Timings</span>
          <span className="col-span-1">Links</span>
        </div>

        {temples.map((temple) => {
          const isEditing = editing === temple.id;
          const isLinkEditing = linkEditing === temple.id;
          const isSaved = saved === temple.id;
          const edit = edits[temple.id];
          const linkEdit = linkEdits[temple.id];
          const mangala = temple.timings.aartis.find((a) => a.name === 'Mangala Aarti');

          return (
            <div key={temple.id} className={`border-b border-gold/6 last:border-0 transition-colors ${isEditing || isLinkEditing ? 'bg-bhagwa/4' : 'hover:bg-cream/2'}`}>
              <div className="grid grid-cols-12 gap-3 px-5 py-4 items-center">
                <span className="col-span-1 text-xs text-cream/30">#{temple.rank}</span>
                <div className="col-span-3 min-w-0">
                  <p className="text-sm text-cream truncate">{temple.name}</p>
                  <p className="text-[10px] text-cream/30 font-serif">{temple.name_hindi}</p>
                </div>
                <span className="col-span-2 text-xs text-cream/45">{temple.city}</span>
                <span className="col-span-2 text-xs text-cream/55 tabular-nums">{temple.timings.opening_time}</span>
                <span className="col-span-2 text-xs text-gold/70 tabular-nums">{mangala?.time ?? '—'}</span>
                <div className="col-span-1">
                  {isSaved ? (
                    <span className="flex items-center gap-1 text-xs text-green-400"><Check size={13} /> Saved</span>
                  ) : (
                    <button onClick={() => isEditing ? cancelEdit() : startEdit(temple.id, temple.timings)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${isEditing ? 'border-red-400/25 text-red-400/70 hover:bg-red-400/8' : 'border-bhagwa/20 text-bhagwa/60 hover:border-bhagwa/40 hover:text-bhagwa'}`}>
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  )}
                </div>
                <div className="col-span-1">
                  {!isSaved && (
                    <button onClick={() => isLinkEditing ? setLinkEditing(null) : startLinkEdit(temple.id, temple.trust_links)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${isLinkEditing ? 'border-red-400/25 text-red-400/70' : 'border-gold/20 text-gold/60 hover:border-gold/40 hover:text-gold'}`}>
                      {isLinkEditing ? 'Cancel' : 'Links'}
                    </button>
                  )}
                </div>
              </div>

              {/* Timings editor */}
              <AnimatePresence>
                {isEditing && edit && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <div className="px-5 pb-5 pt-1">
                      <div className="rounded-xl border border-bhagwa/15 bg-braj-dark-3 p-4 flex flex-col gap-5">
                        <p className="text-xs text-bhagwa/70 font-medium uppercase tracking-wider">✦ Timings Controller — {temple.name}</p>
                        <div>
                          <p className="text-[10px] text-cream/30 uppercase tracking-wider mb-3">Darshan Hours</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[{ field: 'opening_time', label: 'Morning Open' }, { field: 'closing_time', label: 'Morning Close' }, { field: 'evening_open', label: 'Evening Open' }, { field: 'evening_close', label: 'Evening Close' }].map(({ field, label }) => (
                              <div key={field} className="flex flex-col gap-1.5">
                                <label className="text-[10px] text-cream/40">{label}</label>
                                <input type="text" value={(edit as Record<string, string>)[field] ?? ''} onChange={(e) => updateField(temple.id, field, e.target.value)} placeholder="HH:MM AM/PM"
                                  className="px-3 py-2 rounded-lg bg-braj-dark-2 border border-gold/15 text-cream text-xs focus:outline-none focus:border-bhagwa/40 transition-all tabular-nums" />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] text-cream/30 uppercase tracking-wider mb-3">Aarti Schedule</p>
                          <div className="flex flex-col gap-2">
                            {(edit.aartis ?? []).map((aarti, idx) => (
                              <div key={aarti.name} className="flex items-center gap-3">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-bhagwa/50 shrink-0" />
                                  <span className="text-xs text-cream/60 truncate">{aarti.name}</span>
                                </div>
                                <input type="text" value={aarti.time} onChange={(e) => updateAartiTime(temple.id, idx, e.target.value)}
                                  className="w-28 px-3 py-1.5 rounded-lg bg-braj-dark-2 border border-gold/15 text-cream/80 text-xs focus:outline-none focus:border-bhagwa/40 transition-all text-right tabular-nums" />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end pt-2 border-t border-gold/8">
                          <button onClick={cancelEdit} className="px-4 py-2 rounded-xl border border-cream/10 text-cream/50 hover:text-cream/80 text-xs transition-all">Cancel</button>
                          <button onClick={() => saveEdit(temple.id)} disabled={saving}
                            className="px-4 py-2 rounded-xl bg-bhagwa hover:bg-bhagwa-light text-white text-xs font-medium transition-all shadow-bhagwa flex items-center gap-1.5 disabled:opacity-60">
                            <Check size={13} /> {saving ? 'Saving…' : 'Save Timings'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Trust links editor */}
              <AnimatePresence>
                {isLinkEditing && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <div className="px-5 pb-5 pt-1">
                      <div className="rounded-xl border border-gold/20 bg-braj-dark-3 p-4 flex flex-col gap-5">
                        <div>
                          <p className="text-xs text-gold/70 font-medium uppercase tracking-wider flex items-center gap-2"><LinkIcon size={13} /> Trust Links — {temple.name}</p>
                          <p className="text-[10px] text-cream/35 mt-1">Only add official temple trust links.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {([{ field: 'official_website', label: 'Official Website' }, { field: 'live_darshan_link', label: 'Live Darshan URL' }, { field: 'puja_booking_link', label: 'Puja Booking URL' }, { field: 'donation_link', label: 'Donation Link' }] as { field: keyof TrustLinks; label: string }[]).map(({ field, label }) => (
                            <div key={field} className="flex flex-col gap-1.5">
                              <label className="text-[10px] text-cream/40">{label}</label>
                              <input type="url" value={linkEdit?.[field] ?? ''} onChange={(e) => updateLink(temple.id, field, e.target.value)} placeholder="https://..."
                                className="px-3 py-2 rounded-lg bg-braj-dark-2 border border-gold/15 text-cream text-xs focus:outline-none focus:border-gold/40 transition-all placeholder:text-cream/20" />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 justify-end pt-2 border-t border-gold/8">
                          <button onClick={() => setLinkEditing(null)} className="px-4 py-2 rounded-xl border border-cream/10 text-cream/50 hover:text-cream/80 text-xs transition-all">Cancel</button>
                          <button onClick={() => saveLinkEdit(temple.id)} disabled={saving}
                            className="px-4 py-2 rounded-xl bg-gold hover:bg-gold-light text-braj-dark text-xs font-semibold transition-all flex items-center gap-1.5 disabled:opacity-60">
                            <Check size={13} /> {saving ? 'Saving…' : 'Save Links'}
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
        Changes are persisted to Supabase via <code className="text-bhagwa/50">PATCH /api/temples/:id</code>
      </p>
    </div>
  );
}
