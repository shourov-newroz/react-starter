import type { ReactElement } from 'react';

import { HeadingSkeleton } from '@/components/ui/typography-skeleton';

/**
 * Skeleton loader for ComponentVerificationPage
 * Displays placeholder content while the verification page loads
 */
function ComponentVerificationPageSkeleton(): ReactElement {
  return (
    <div className="container mx-auto py-8">
      <HeadingSkeleton size="h1" width="long" className="mb-8" />

      <div className="space-y-8">
        {/* Button Section Skeleton */}
        <div className="border rounded-lg p-4">
          <HeadingSkeleton size="h6" width="medium" className="mb-4" />
          <div className="space-y-4">
            <HeadingSkeleton size="h6" width="short" />
            <div className="flex gap-4">
              <HeadingSkeleton size="h4" width="medium" />
              <HeadingSkeleton size="h4" width="medium" />
            </div>
          </div>
        </div>

        {/* Typography Section Skeleton */}
        <div className="border rounded-lg p-4">
          <HeadingSkeleton size="h6" width="medium" className="mb-4" />
          <div className="space-y-4">
            <HeadingSkeleton size="h6" width="short" />
            <div className="space-y-2">
              <HeadingSkeleton size="h3" width="medium" />
              <HeadingSkeleton size="h2" width="medium" />
              <HeadingSkeleton size="h1" width="medium" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComponentVerificationPageSkeleton;
