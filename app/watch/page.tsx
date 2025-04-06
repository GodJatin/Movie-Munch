'use client';

import { Suspense } from 'react';
import WatchContent from '../watch/WatchContent';

export default function WatchPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Loading stream...</div>}>
      <WatchContent />
    </Suspense>
  );
}
