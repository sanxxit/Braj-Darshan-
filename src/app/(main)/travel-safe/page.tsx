import type { Metadata } from 'next';
import { ShieldCheck, AlertTriangle, Phone, MapPin, IndianRupee, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Travel Safe — Braj Darshan',
  description: 'Anti-scam guide and honest advice for first-time Braj pilgrims. From verified locals who love you.',
};

const SCAM_ALERTS = [
  {
    icon: '🛺',
    title: 'E-Rickshaw Overcharging',
    description: 'Fixed fare from Mathura Railway Station to Vrindavan: ₹60–₹80 per person (shared). ₹300–₹400 for a full private day tour. If someone quotes ₹800 for the same, walk away.',
    tip: 'Ask the driver to show their fare board. All licensed e-rickshaws have one.',
  },
  {
    icon: '🧑‍🏫',
    title: '"Free" Temple Guides Who Aren\'t Free',
    description: 'Many touts near temple gates offer free guiding and then demand ₹1,000–₹2,000 at the end. Govt-registered guides charge a clear ₹200–₹500 and show their UP Tourism ID card upfront.',
    tip: 'Our Verified Brajwasi guides are pre-vetted. Look for the gold ✓ badge on their profile.',
  },
  {
    icon: '🌺',
    title: 'Prasad & Puja Shops Near Gates',
    description: 'Shops right outside temple gates often charge 5x for flower malas and puja items. Walk one lane inside for the same items at real prices. ₹20 for a small mala, ₹50 for a full puja thaali.',
    tip: 'Temple trusts like ISKCON and Prem Mandir have official prasad counters with fixed prices inside the complex.',
  },
  {
    icon: '📿',
    title: '"Holy Men" Demanding Money',
    description: 'Sadhus in saffron who approach tourists near ghats and demand money for blessings, or tie a thread on your wrist and ask for ₹500. No genuine sadhu will ever ask for payment.',
    tip: 'If someone touches you without consent and asks money, firmly say "nahi chahiye" (I don\'t want it) and leave.',
  },
  {
    icon: '🏨',
    title: 'Hotel Bait & Switch',
    description: '"Book with us directly and save!" — then the room is dirty or the AC doesn\'t work. Always see the room before paying. For ashram stays, confirm that your booking is with the ashram\'s official office.',
    tip: 'Our listed hotels are personally reviewed. For others, look up recent reviews on MakeMyTrip or Google.',
  },
  {
    icon: '📸',
    title: 'Photo Demands at Ghats',
    description: 'Groups of men near Vishram Ghat will offer to take your photo, then charge ₹200–₹500. Sometimes women in traditional dress will ask for a "joint photo" and demand money afterwards.',
    tip: 'Use your own camera. Politely decline and keep walking. It\'s not rude, it\'s smart.',
  },
];

const EMERGENCY = [
  { label: 'Tourist Police Mathura',   number: '0565-2400250',   icon: Phone },
  { label: 'Vrindavan Police Station', number: '0565-2443131',   icon: Phone },
  { label: 'UP Tourist Helpline',       number: '1800-180-5522',  icon: Phone },
  { label: 'National Emergency',        number: '112',            icon: Phone },
];

const VERIFIED_TIPS = [
  'A Verified Brajwasi will always show you a Braj Darshan verification card or badge.',
  'They will quote prices upfront and will not change them at the end.',
  'They will not pressure you to visit shops, restaurants, or hotels where they earn a commission.',
  'If in doubt, call the number on their profile — our team can confirm their identity.',
];

export default function TravelSafePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-12">

      {/* Header */}
      <div>
        <p className="text-xs tracking-[0.2em] uppercase text-bhagwa/60 mb-2">✦ From Your Braj Family ✦</p>
        <h1 className="text-3xl font-serif text-cream mb-4">Travel Safe in Braj</h1>
        <p className="text-cream/55 leading-relaxed">
          Braj is sacred, warm, and beautiful. Like any pilgrimage destination, it also has a few people who take advantage of first-timers.
          We wrote this guide the way an older sibling would — honest, no sugarcoating, with love.
        </p>
      </div>

      {/* Verified badge explainer */}
      <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/8 to-transparent p-6 flex gap-4">
        <ShieldCheck size={28} className="text-gold shrink-0 mt-0.5" strokeWidth={1.8} />
        <div>
          <p className="text-sm font-medium text-gold mb-1">What is a Verified Brajwasi?</p>
          <p className="text-sm text-cream/55 leading-relaxed mb-3">
            Every guide, taxi driver, and vendor with a gold ✓ badge on this app has been personally visited and vetted by our team.
            We spoke to previous pilgrims, checked their records, and confirmed their pricing is fair.
            When you book through a Verified Brajwasi, your trip is protected.
          </p>
          <ul className="flex flex-col gap-1.5">
            {VERIFIED_TIPS.map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-xs text-cream/45">
                <span className="text-gold mt-0.5 shrink-0">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scam alerts */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle size={16} className="text-bhagwa/80" strokeWidth={1.8} />
          <h2 className="text-lg font-serif text-cream">Common Tourist Traps — and How to Beat Them</h2>
        </div>

        <div className="flex flex-col gap-4">
          {SCAM_ALERTS.map((item) => (
            <div key={item.title} className="rounded-2xl border border-gold/10 bg-braj-dark-2 p-5 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-medium text-cream mb-1">{item.title}</h3>
                  <p className="text-sm text-cream/50 leading-relaxed">{item.description}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-xl bg-bhagwa/6 border border-bhagwa/15 px-3 py-2.5">
                <span className="text-bhagwa/80 text-xs shrink-0 mt-0.5">💡</span>
                <p className="text-xs text-cream/60 leading-relaxed">{item.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fair prices cheat sheet */}
      <div className="rounded-2xl border border-gold/12 bg-braj-dark-2 overflow-hidden">
        <div className="px-5 py-4 border-b border-gold/8 flex items-center gap-2">
          <IndianRupee size={15} className="text-gold/70" />
          <p className="text-sm font-medium text-cream">Fair Price Cheat Sheet</p>
          <span className="text-xs text-cream/30 ml-auto">as of 2025</span>
        </div>
        <div className="divide-y divide-gold/6">
          {[
            ['E-rickshaw (shared), Station → Vrindavan', '₹60–80 / person'],
            ['E-rickshaw (private), full day tour',       '₹350–450'],
            ['Registered guide, half day',                '₹200–350'],
            ['Registered guide, full day',                '₹500–700'],
            ['Flower mala (small)',                       '₹10–20'],
            ['Puja thaali (full set)',                    '₹40–60'],
            ['Mathura Peda (100g)',                       '₹60–80'],
            ['Boat ride at Vishram Ghat (30 min)',        '₹80–120 / boat'],
            ['Auto/cab, Mathura → Govardhan (one-way)',   '₹200–350'],
          ].map(([item, price]) => (
            <div key={item as string} className="flex items-center justify-between px-5 py-3">
              <p className="text-xs text-cream/50">{item}</p>
              <p className="text-xs text-gold/80 font-medium tabular-nums">{price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency contacts */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Phone size={15} className="text-bhagwa/80" />
          <h2 className="text-base font-serif text-cream">Emergency Contacts</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EMERGENCY.map(({ label, number }) => (
            <a key={label} href={`tel:${number.replace(/[-\s]/g, '')}`}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-gold/12 bg-braj-dark-2 hover:border-bhagwa/30 transition-all group">
              <div className="w-8 h-8 rounded-full bg-bhagwa/10 border border-bhagwa/20 flex items-center justify-center shrink-0">
                <Phone size={14} className="text-bhagwa/70" />
              </div>
              <div>
                <p className="text-xs text-cream/70 group-hover:text-cream transition-colors">{label}</p>
                <p className="text-sm text-bhagwa/80 font-medium tabular-nums">{number}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Closing note */}
      <div className="text-center py-6 border-t border-gold/8">
        <p className="text-gold/50 font-serif text-base italic mb-1">&ldquo;The one who serves with love needs no protection from fear.&rdquo;</p>
        <p className="text-cream/25 text-xs">Travel with awareness. Arrive with devotion. 🙏</p>
      </div>

    </div>
  );
}
