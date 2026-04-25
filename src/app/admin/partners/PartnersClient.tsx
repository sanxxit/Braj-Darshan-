'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ShieldCheck, Clock, UserCheck } from 'lucide-react';
import VerifiedBadge from '@/components/common/VerifiedBadge';
import type { Partner, PartnerStatus } from '@/lib/types';

const STATUS_COLORS: Record<PartnerStatus, string> = {
  pending:  'text-yellow-400/80 border-yellow-400/25 bg-yellow-400/8',
  approved: 'text-green-400/80 border-green-400/25 bg-green-400/8',
  rejected: 'text-red-400/60  border-red-400/20  bg-red-400/6',
};

const CATEGORY_EMOJI: Record<Partner['category'], string> = {
  Hotel: '🏨', Taxi: '🛺', Guide: '🧑‍🏫', FoodVendor: '🍛', PujaShop: '📿',
};

const FILTER_TABS: { label: string; value: PartnerStatus | 'all' }[] = [
  { label: 'All', value: 'all' }, { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' }, { label: 'Rejected', value: 'rejected' },
];

export default function PartnersClient({ initialPartners }: { initialPartners: Partner[] }) {
  const [partners, setPartners] = useState(initialPartners);
  const [tab, setTab] = useState<PartnerStatus | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [note, setNote] = useState<Record<string, string>>({});
  const [flash, setFlash] = useState<{ id: string; action: PartnerStatus } | null>(null);
  const [saving, setSaving] = useState(false);

  const setStatus = async (id: string, status: PartnerStatus) => {
    setSaving(true);
    const verification_note = note[id] || partners.find((p) => p.id === id)?.verification_note;
    const body = { status, is_verified: status === 'approved', ...(verification_note ? { verification_note } : {}) };
    setPartners((prev) => prev.map((p) => p.id === id ? { ...p, ...body } : p));
    await fetch(`/api/partners/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setSaving(false);
    setExpanded(null);
    setFlash({ id, action: status });
    setTimeout(() => setFlash(null), 2500);
  };

  const visible = tab === 'all' ? partners : partners.filter((p) => p.status === tab);
  const counts = {
    all: partners.length,
    pending: partners.filter((p) => p.status === 'pending').length,
    approved: partners.filter((p) => p.status === 'approved').length,
    rejected: partners.filter((p) => p.status === 'rejected').length,
  };

  return (
    <div className="p-5 sm:p-8 max-w-4xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-serif text-cream">Partner Verifications</h1>
        <p className="text-cream/40 text-sm mt-1">Review and approve Brajwasi guides, taxi drivers, hotels, and vendors.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Pending Review', value: counts.pending, color: 'text-yellow-400', border: 'border-yellow-400/20', bg: 'bg-yellow-400/5' },
          { label: 'Verified',       value: counts.approved, color: 'text-green-400', border: 'border-green-400/20',  bg: 'bg-green-400/5' },
          { label: 'Rejected',       value: counts.rejected, color: 'text-red-400',   border: 'border-red-400/20',    bg: 'bg-red-400/5' },
        ].map(({ label, value, color, border, bg }) => (
          <div key={label} className={`rounded-xl border ${border} ${bg} px-4 py-3 flex flex-col gap-1`}>
            <p className={`text-2xl font-serif ${color}`}>{value}</p>
            <p className="text-[10px] text-cream/35 uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {FILTER_TABS.map(({ label, value }) => (
          <button key={value} onClick={() => setTab(value)}
            className={`px-3 py-1.5 rounded-full text-xs transition-all border ${tab === value ? 'bg-bhagwa/15 border-bhagwa/35 text-bhagwa' : 'border-gold/15 text-cream/40 hover:border-gold/30 hover:text-cream/65'}`}>
            {label}<span className="ml-1.5 opacity-50">({counts[value]})</span>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-gold/10 bg-braj-dark-2 overflow-hidden">
        {visible.length === 0 && <div className="px-5 py-12 text-center text-cream/25 text-sm">No partners in this category.</div>}
        {visible.map((partner) => {
          const isExpanded = expanded === partner.id;
          const isFlashed = flash?.id === partner.id;

          return (
            <div key={partner.id} className={`border-b border-gold/6 last:border-0 transition-colors ${isExpanded ? 'bg-bhagwa/4' : 'hover:bg-cream/2'}`}>
              <div className="px-5 py-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-braj-dark-3 border border-gold/10 flex items-center justify-center text-lg shrink-0 mt-0.5">{CATEGORY_EMOJI[partner.category]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm text-cream font-medium">{partner.name}</p>
                    {partner.is_verified && <VerifiedBadge />}
                  </div>
                  <p className="text-xs text-cream/40 mt-0.5">{partner.category} · {partner.city}</p>
                  <p className="text-xs text-cream/35 mt-1 leading-relaxed line-clamp-2">{partner.offer}</p>
                  {partner.verification_note && <p className="text-[10px] text-gold/45 mt-1 italic">{partner.verification_note}</p>}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[partner.status]}`}>
                    {partner.status === 'pending' && <Clock size={9} className="inline mr-1" />}
                    {partner.status === 'approved' && <ShieldCheck size={9} className="inline mr-1" />}
                    {partner.status === 'rejected' && <X size={9} className="inline mr-1" />}
                    {partner.status}
                  </span>
                  {isFlashed ? (
                    <span className="flex items-center gap-1 text-[10px] text-green-400"><Check size={11} /> Done</span>
                  ) : (
                    <button onClick={() => setExpanded(isExpanded ? null : partner.id)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${isExpanded ? 'border-red-400/25 text-red-400/70' : 'border-bhagwa/20 text-bhagwa/60 hover:border-bhagwa/40 hover:text-bhagwa'}`}>
                      {isExpanded ? 'Close' : 'Review'}
                    </button>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                    <div className="px-5 pb-5 pt-1">
                      <div className="rounded-xl border border-bhagwa/15 bg-braj-dark-3 p-4 flex flex-col gap-4">
                        <p className="text-xs text-bhagwa/70 font-medium uppercase tracking-wider">Review — {partner.name}</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div><p className="text-[10px] text-cream/30 mb-1">Phone</p><p className="text-xs text-cream/70">{partner.phone}</p></div>
                          <div><p className="text-[10px] text-cream/30 mb-1">Applied</p><p className="text-xs text-cream/70">{new Date(partner.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p></div>
                          <div className="col-span-2"><p className="text-[10px] text-cream/30 mb-1">What they offer</p><p className="text-xs text-cream/65 leading-relaxed">{partner.offer}</p></div>
                        </div>
                        <div>
                          <label className="text-[10px] text-cream/30 uppercase tracking-wider block mb-2">Verification Note (shown on profile)</label>
                          <input type="text" value={note[partner.id] ?? partner.verification_note ?? ''} onChange={(e) => setNote((n) => ({ ...n, [partner.id]: e.target.value }))} placeholder="e.g. ID verified on-site. Fair prices confirmed."
                            className="w-full px-3 py-2.5 rounded-lg bg-braj-dark-2 border border-gold/15 text-cream text-xs focus:outline-none focus:border-bhagwa/40 transition-all placeholder:text-cream/20" />
                        </div>
                        <div className="flex gap-2 pt-1 border-t border-gold/8">
                          <button onClick={() => setStatus(partner.id, 'approved')} disabled={saving}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-medium hover:bg-green-500/22 transition-all disabled:opacity-60">
                            <UserCheck size={13} /> {saving ? 'Saving…' : 'Approve & Verify'}
                          </button>
                          <button onClick={() => setStatus(partner.id, 'rejected')} disabled={saving}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-400/8 border border-red-400/20 text-red-400/70 text-xs font-medium hover:bg-red-400/15 transition-all disabled:opacity-60">
                            <X size={13} /> Reject
                          </button>
                          {partner.status !== 'pending' && (
                            <button onClick={() => setStatus(partner.id, 'pending')} disabled={saving}
                              className="px-3 py-2.5 rounded-xl border border-yellow-400/20 text-yellow-400/60 text-xs hover:bg-yellow-400/5 transition-all disabled:opacity-60">
                              Reset
                            </button>
                          )}
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
        Approvals update <code className="text-bhagwa/50">is_verified</code> in Supabase via <code className="text-bhagwa/50">PATCH /api/partners/:id</code>
      </p>
    </div>
  );
}
