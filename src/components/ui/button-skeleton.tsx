// ButtonSkeleton
//
// Mirrors every size variant from `buttonVariants` 1-to-1.
// Only layout-affecting props are accepted (size, width) — no data/behaviour.

import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import type { buttonVariants } from './button';
import { Skeleton } from './skeleton';

/**
 * Skeleton size → dimension mapping.
 * Each entry reproduces the *exact* height/width/border-radius used by
 * the real Button so that no layout shift occurs on hydration.
 *
 * Icon variants use a fixed square (size-*) so `width` is also fixed.
 * Text variants are fluid by default; pass `width` to pin them.
 */
const SKELETON_SIZE_MAP = {
  // text sizes
  // real:  h-7 px-2 rounded-md (defaultVariants)
  default: {
    className: 'h-7 w-24 rounded-md',
  },
  // real:  h-5 px-2 rounded-sm
  xs: {
    className: 'h-5 w-16 rounded-sm',
  },
  // real:  h-6 px-2 rounded-md
  sm: {
    className: 'h-6 w-20 rounded-md',
  },
  // real:  h-8 px-2.5 rounded-md
  lg: {
    className: 'h-8 w-28 rounded-md',
  },

  // icon sizes (square, no inner text glyph)
  // real:  size-5 rounded-sm
  'icon-xs': {
    className: 'size-5 rounded-sm',
  },
  // real:  size-6 rounded-md
  'icon-sm': {
    className: 'size-6 rounded-md',
  },
  // real:  size-7 rounded-md
  icon: {
    className: 'size-7 rounded-md',
  },
  // real:  size-8 rounded-md
  'icon-lg': {
    className: 'size-8 rounded-md',
  },
} as const satisfies Record<
  NonNullable<VariantProps<typeof buttonVariants>['size']>,
  { className: string }
>;

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;

interface ButtonSkeletonProps {
  /** Must match the `size` prop you pass to the real <Button> */
  size?: ButtonSize;
  /**
   * Override the default skeleton width for text-button variants.
   * Accepts any Tailwind width class, e.g. "w-32", "w-full".
   * Has no effect on icon variants (they are always square).
   */
  width?: string;
  className?: string;
}

/**
 * Drop-in skeleton replacement for `<Button>`.
 *
 * Usage — replace the real button while data loads:
 * ```tsx
 * isLoading
 *   ? <ButtonSkeleton size="lg" />
 *   : <Button size="lg">Save changes</Button>
 * ```
 *
 * All size variants:
 * ```tsx
 * <ButtonSkeleton size="xs" />
 * <ButtonSkeleton size="sm" />
 * <ButtonSkeleton size="default" />
 * <ButtonSkeleton size="lg" />
 * <ButtonSkeleton size="icon-xs" />
 * <ButtonSkeleton size="icon-sm" />
 * <ButtonSkeleton size="icon" />
 * <ButtonSkeleton size="icon-lg" />
 * ```
 */
function ButtonSkeleton({ size = 'default', width, className }: ButtonSkeletonProps) {
  const { className: sizeClass } = SKELETON_SIZE_MAP[size];

  return (
    <Skeleton
      className={cn(
        // Base: replicate the real button's shrink-0 + inline-flex behaviour
        'shrink-0',
        // Size-matched dimensions and border-radius
        sizeClass,
        // Optional caller width override (only meaningful for text variants)
        width,
        className
      )}
    />
  );
}

// Exports

export { ButtonSkeleton };
export type { ButtonSkeletonProps };
