import * as React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

/**
 * GenericPageSkeleton component - provides a generic loading fallback for routes
 * Simple full-viewport non-scrollable skeleton: min-h-screen overflow-hidden container
 * with a header bar skeleton + 3 content block skeletons
 * Used as fallback in App.tsx for routes that don't yet define a specific fallback
 */
export function GenericPageSkeleton(): React.ReactElement {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Header bar skeleton */}
      <header className="border-b px-4 py-3">
        <Skeleton className="h-7 w-40" />
      </header>
      {/* Content blocks */}
      <main className="p-4 space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </main>
    </div>
  );
}
