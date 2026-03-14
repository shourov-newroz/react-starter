// LabelSkeleton
//
// Mirrors the exact dimensions from the real `Label` component.
// Only layout-affecting props are accepted — no data/behaviour.

import { cn } from '@/lib/utils';

import { Skeleton } from './skeleton';

interface LabelSkeletonProps {
  /**
   * Override the default skeleton width.
   * Accepts any Tailwind width class, e.g. "w-32", "w-48", "w-full".
   * Default is a reasonable width for label text.
   */
  width?: string;
  className?: string;
}

/**
 * Drop-in skeleton replacement for `<Label>`.
 *
 * Usage — replace the real label while data loads:
 * ```tsx
 * isLoading
 *   ? <LabelSkeleton />
 *   : <Label>Email address</Label>
 * ```
 *
 * With custom width:
 * ```tsx
 * <LabelSkeleton width="w-32" />
 * ```
 *
 * Real Label dimensions: text-xs/relaxed (approximately h-3.5)
 * Skeleton uses: h-3 rounded-sm
 */
function LabelSkeleton({ width = 'w-20', className }: LabelSkeletonProps) {
  return <Skeleton className={cn('h-3 rounded-sm', width, className)} />;
}

// Exports

export { LabelSkeleton };
export type { LabelSkeletonProps };
