import { createServerClient } from '@/lib/supabase/server';
import { temples as staticTemples } from '@/lib/data/temples';
import AdminTemplesClient from './AdminTemplesClient';
import type { Temple } from '@/lib/types';

async function fetchTemples(): Promise<Temple[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.from('temples').select('*').order('rank');
    if (error || !data?.length) return staticTemples;
    return data as Temple[];
  } catch {
    return staticTemples;
  }
}

export default async function AdminTemplesPage() {
  const temples = await fetchTemples();
  return <AdminTemplesClient initialTemples={temples} />;
}
