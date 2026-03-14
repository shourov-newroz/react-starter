import * as React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

/**
 * ProfilePageSkeleton component - provides a loading placeholder for ProfilePage
 * Matches ProfilePage layout: p-8, avatar circle, name line, email line, bio section, location section, joined section
 */
export function ProfilePageSkeleton(): React.ReactElement {
  return (
    <div className="p-8 overflow-hidden">
      {/* Heading */}
      {/* Avatar and name section */}
      <div className="mt-8">
        <div className="animate-pulse">
          {/* Avatar circle */}
          <Skeleton className="h-24 w-24 rounded-full" />
          {/* Name line */}
          <div className="mt-4">
            <Skeleton className="h-6 w-48" />
          </div>
          {/* Email line */}
          <div className="mt-2">
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </div>
      {/* Bio section */}
      <div className="mt-6">
        <Skeleton className="h-4 w-32" />
        <div className="mt-2">
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="mt-1">
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      {/* Location section */}
      <div className="mt-4">
        <Skeleton className="h-4 w-24" />
        <div className="mt-1">
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      {/* Joined section */}
      <div className="mt-4">
        <Skeleton className="h-4 w-20" />
        <div className="mt-1">
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
}

export default ProfilePageSkeleton;
