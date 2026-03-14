// InputSkeleton
//
// Mirrors the exact dimensions from the real `Input` component.
// Only layout-affecting props are accepted — no data/behaviour.

import { cn } from '@/lib/utils';

import { Skeleton } from './skeleton';

interface InputSkeletonProps {
  /**
   * Override the default skeleton width.
   * Accepts any Tailwind width class, e.g. "w-32", "w-full", "w-48".
   * Default is "w-full" to match the real Input.
   */
  width?: string;
  className?: string;
}

/**
 * Drop-in skeleton replacement for `<Input>`.
 *
 * Usage — replace the real input while data loads:
 * ```tsx
 * isLoading
 *   ? <InputSkeleton />
 *   : <Input placeholder="Enter your name" />
 * ```
 *
 * With custom width:
 * ```tsx
 * <InputSkeleton width="w-48" />
 * ```
 *
 * Real Input dimensions: h-7 w-full rounded-md px-2
 * Skeleton uses: h-7 (base Skeleton provides rounded-md)
 */
function InputSkeleton({ width = 'w-full', className }: InputSkeletonProps) {
  return <Skeleton className={cn('h-7', width, className)} />;
}

// Exports

export { InputSkeleton };
export type { InputSkeletonProps };
