import type { Metadata } from 'next';
import { Inter, Crimson_Text } from 'next/font/google';
import './globals.css';
import AppProviders from '@/components/providers/AppProviders';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const crimson = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Braj Darshan — Experience Bhakti with Locals',
    template: '%s | Braj Darshan',
  },
  description: 'Plan your Mathura tour with the people who know Braj best. Temple timings, trip itineraries, festivals, hotels, and live darshan — all in one place.',
  keywords: ['Mathura', 'Vrindavan', 'Braj', 'Krishna', 'Temple', 'Darshan', 'Pilgrimage', 'Janmashtami', 'Holi', 'Govardhan'],
  openGraph: {
    title: 'Braj Darshan — Experience Bhakti with Locals',
    description: 'Your spiritual guide to Mathura & Vrindavan. Straight from the heart of Braj.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Braj Darshan',
    description: 'Plan your Mathura pilgrimage with locals who know Braj best.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${crimson.variable}`}>
      <body className="min-h-dvh bg-braj-dark text-cream antialiased">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
