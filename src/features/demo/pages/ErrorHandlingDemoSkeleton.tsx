import * as React from 'react';

import { HeadingSkeleton, TextSkeleton } from '@/components/ui/typography-skeleton';

/**
 * ErrorHandlingDemoSkeleton component - provides a loading placeholder for ErrorHandlingDemo
 * Simple skeleton: heading, 2-3 text lines, 2 button skeletons
 */
export function ErrorHandlingDemoSkeleton(): React.ReactElement {
  return (
    <div className="container mx-auto py-8 space-y-8 overflow-hidden">
      <HeadingSkeleton size="h1" width="long" />
      <TextSkeleton size="base" width="short" className="mt-2" />
      <TextSkeleton size="base" width="medium" />
      <TextSkeleton size="base" width="long" />
    </div>
  );
}

export default ErrorHandlingDemoSkeleton;
