import * as React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

/**
 * DashboardLayoutSkeleton component - provides a loading placeholder for DashboardLayout
 * Mirrors DashboardLayout exactly (header, main area) and is non-scrollable
 */
export function DashboardLayoutSkeleton(): React.ReactElement {
  return (
    <div className="dashboard-layout min-h-screen overflow-hidden">
      {/* Header zone */}
      <header className="flex items-center justify-between border-b px-4 py-3">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-8 w-20" />
      </header>
      {/* Main zone */}
      <main className="p-4">
        <div className="space-y-4">
          {/* Content block 1 */}
          <Skeleton className="h-6 w-3/4" />
          {/* Content block 2 */}
          <Skeleton className="h-4 w-full" />
          {/* Content block 3 */}
          <Skeleton className="h-4 w-5/6" />
          {/* Content block 4 */}
          <Skeleton className="h-4 w-4/5" />
        </div>
      </main>
      {/* Footer zone */}
    </div>
  );
}

export default DashboardLayoutSkeleton;
