import { createServerClient } from '@/lib/supabase/server';
import { temples as staticTemples } from '@/lib/data/temples';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingAudioPlayer from '@/components/layout/FloatingAudioPlayer';
import HeroSection from '@/components/home/HeroSection';
import ExploreGrid from '@/components/home/ExploreGrid';
import FestivalHighlight from '@/components/home/FestivalHighlight';
import TopTemplesStrip from '@/components/home/TopTemplesStrip';
import JoinCTA from '@/components/home/JoinCTA';
import type { Temple } from '@/lib/types';

async function fetchTopTemples(): Promise<Temple[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('temples')
      .select('*')
      .eq('is_active', true)
      .order('rank', { ascending: true })
      .limit(5);
    if (error || !data?.length) return staticTemples.slice(0, 5);
    return data as Temple[];
  } catch {
    return staticTemples.slice(0, 5);
  }
}

export default async function HomePage() {
  const topTemples = await fetchTopTemples();

  return (
    <>
      <Header />
      <HeroSection />
      <ExploreGrid />
      <FestivalHighlight />
      <TopTemplesStrip temples={topTemples} />
      <JoinCTA />
      <Footer />
      <FloatingAudioPlayer />
    </>
  );
}
