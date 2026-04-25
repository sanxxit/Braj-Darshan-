import { createServerClient } from '@/lib/supabase/server';
import { partners as staticPartners } from '@/lib/data/partners';
import PartnersClient from './PartnersClient';
import type { Partner } from '@/lib/types';

async function fetchPartners(): Promise<Partner[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.from('partners').select('*').order('created_at', { ascending: false });
    if (error || !data?.length) return staticPartners;
    return data as Partner[];
  } catch {
    return staticPartners;
  }
}

export default async function AdminPartnersPage() {
  const partners = await fetchPartners();
  return <PartnersClient initialPartners={partners} />;
}
