import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingAudioPlayer from '@/components/layout/FloatingAudioPlayer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
      <FloatingAudioPlayer />
    </>
  );
}
