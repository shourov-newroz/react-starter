import type { ReactElement } from 'react';

import { HeadingSkeleton } from '@/components/ui/typography-skeleton';

/**
 * Skeleton loader for LayoutVerificationPage
 */
function LayoutVerificationPageSkeleton(): ReactElement {
  return (
    <div className="container mx-auto py-8">
      <HeadingSkeleton size="h1" width="long" className="mb-8" />
      <HeadingSkeleton size="h6" width="medium" />
    </div>
  );
}

export default LayoutVerificationPageSkeleton;
