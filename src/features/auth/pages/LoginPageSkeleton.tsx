import * as React from 'react';

import { HeadingSkeleton, TextSkeleton } from '@/components/ui/typography-skeleton';

/**
 * LoginPageSkeleton component - provides a loading placeholder for LoginPage
 * Matches LoginPage layout: min-h-screen flex items-center justify-center, centered card with title skeleton,
 * subtitle skeleton, form skeleton (2 input skeletons + button skeleton)
 */
export function LoginPageSkeleton(): React.ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background overflow-hidden">
      <div className="w-full max-w-md space-y-6 p-8">
        <div className="text-center">
          <HeadingSkeleton size="h1" width="medium" />
          <TextSkeleton size="base" width="long" className="mt-2" />
        </div>
      </div>
    </div>
  );
}

export default LoginPageSkeleton;
