import { ShieldCheck } from 'lucide-react';

interface Props {
  label?: string;
  size?: 'sm' | 'md';
}

export default function VerifiedBadge({ label = 'Verified Brajwasi', size = 'sm' }: Props) {
  const ismd = size === 'md';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${
        ismd ? 'px-3 py-1 text-xs' : 'px-2 py-0.5 text-[10px]'
      }`}
      style={{
        background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.06))',
        border: '1px solid rgba(212,175,55,0.35)',
        color: '#D4AF37',
      }}
    >
      <ShieldCheck size={ismd ? 13 : 11} strokeWidth={2.2} />
      {label}
    </span>
  );
}
