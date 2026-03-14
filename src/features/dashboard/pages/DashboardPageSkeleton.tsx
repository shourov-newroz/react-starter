import * as React from 'react';

import { ButtonSkeleton } from '@/components/ui/button-skeleton';
import { HeadingSkeleton, TextSkeleton } from '@/components/ui/typography-skeleton';

/**
 * DashboardPageSkeleton component - provides a loading placeholder for DashboardPage
 * Matches DashboardPage layout: p-8 container, h1 heading area, p subtext, action button strip
 */
export function DashboardPageSkeleton(): React.ReactElement {
  return (
    <div className="p-8 overflow-hidden">
      <HeadingSkeleton size="h1" width="long" />
      <TextSkeleton size="base" width="medium" className="mt-4" />
      {/* Action button strip */}
      <div className="mt-8 flex gap-4">
        <ButtonSkeleton size="default" />
      </div>
    </div>
  );
}

export default DashboardPageSkeleton;
