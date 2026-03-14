// ─────────────────────────────────────────────────────────────────────────────
// ButtonSkeleton
//
// Mirrors every size variant from `buttonVariants` 1-to-1.
// Only layout-affecting props are accepted (size, width) — no data/behaviour.
// ─────────────────────────────────────────────────────────────────────────────

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
  // ── text sizes ──────────────────────────────────────────────────
  //   real:  h-8  px-2.5 rounded-lg  (defaultVariants)
  default: {
    className: 'h-8 w-24 rounded-lg',
  },
  //   real:  h-6  px-2   rounded-[min(var(--radius-md),10px)]
  xs: {
    className: 'h-6 w-16 rounded-[min(var(--radius-md),10px)]',
  },
  //   real:  h-7  px-2.5 rounded-[min(var(--radius-md),12px)]
  sm: {
    className: 'h-7 w-20 rounded-[min(var(--radius-md),12px)]',
  },
  //   real:  h-9  px-2.5 rounded-lg
  lg: {
    className: 'h-9 w-28 rounded-lg',
  },

  // ── icon sizes (square, no inner text glyph) ────────────────────
  //   real:  size-6  rounded-[min(var(--radius-md),10px)]
  'icon-xs': {
    className: 'size-6 rounded-[min(var(--radius-md),10px)]',
  },
  //   real:  size-7  rounded-[min(var(--radius-md),12px)]
  'icon-sm': {
    className: 'size-7 rounded-[min(var(--radius-md),12px)]',
  },
  //   real:  size-8  rounded-lg
  icon: {
    className: 'size-8 rounded-lg',
  },
  //   real:  size-9  rounded-lg
  'icon-lg': {
    className: 'size-9 rounded-lg',
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

// ─────────────────────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────────────────────

export { ButtonSkeleton };
export type { ButtonSkeletonProps };
