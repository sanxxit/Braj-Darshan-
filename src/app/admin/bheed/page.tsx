import { createServerClient } from '@/lib/supabase/server';
import { temples as staticTemples } from '@/lib/data/temples';
import BheedClient from './BheedClient';
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

export default async function BheedPage() {
  const temples = await fetchTemples();
  return <BheedClient initialTemples={temples} />;
}
