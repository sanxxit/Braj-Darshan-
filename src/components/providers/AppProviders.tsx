'use client';

import { useState, useEffect } from 'react';
import { KrishnaLoaderOverlay } from '@/components/loaders/KrishnaLoader';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only show loader on first visit per session
    const shown = sessionStorage.getItem('braj-loader-shown');
    if (shown) {
      setLoading(false);
    }
  }, []);

  const handleLoadComplete = () => {
    sessionStorage.setItem('braj-loader-shown', '1');
    setLoading(false);
  };

  return (
    <>
      <KrishnaLoaderOverlay show={loading} onComplete={handleLoadComplete} />
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </>
  );
}
