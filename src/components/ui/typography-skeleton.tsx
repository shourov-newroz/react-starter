// ─────────────────────────────────────────────────────────────────────────────
// Typography Skeletons
//
// Mirrors every size variant from typography.tsx 1-to-1.
// Only layout-affecting props are accepted (size, width) — no data/behaviour.
// ─────────────────────────────────────────────────────────────────────────────

import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Skeleton } from './skeleton';
import { headingVariants, paragraphVariants, textVariants } from './typography';

// ─────────────────────────────────────────────────────────────────────────────
// HeadingSkeleton
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Height mappings for Heading component sizes
 * h1 (text-3xl), h2 (text-2xl), h3 (text-xl), h4 (text-lg), h5 (text-md), h6 (text-sm)
 */
const HEADING_HEIGHT_MAP = {
  h1: 'h-9',
  h2: 'h-8',
  h3: 'h-7',
  h4: 'h-6',
  h5: 'h-5',
  h6: 'h-4',
} as const satisfies Record<NonNullable<VariantProps<typeof headingVariants>['size']>, string>;

/**
 * Width variants for headings to simulate different text lengths
 */
const HEADING_WIDTH_MAP = {
  short: 'w-24',
  medium: 'w-48',
  long: 'w-72',
  full: 'w-full',
} as const;

type HeadingSize = NonNullable<VariantProps<typeof headingVariants>['size']>;
type HeadingWidth = keyof typeof HEADING_WIDTH_MAP;

interface HeadingSkeletonProps {
  /** Must match the `size` prop you pass to the real <Heading> */
  size?: HeadingSize;
  /** Width variant to simulate different heading lengths */
  width?: HeadingWidth;
  className?: string;
}

/**
 * Drop-in skeleton replacement for `<Heading>`.
 *
 * Usage — replace the real heading while data loads:
 * ```tsx
 * isLoading
 *   ? <HeadingSkeleton size="h1" />
 *   : <Heading size="h1">Page Title</Heading>
 * ```
 *
 * All size variants:
 * ```tsx
 * <HeadingSkeleton size="h1" />
 * <HeadingSkeleton size="h2" />
 * <HeadingSkeleton size="h3" />
 * <HeadingSkeleton size="h4" />
 * <HeadingSkeleton size="h5" />
 * <HeadingSkeleton size="h6" />
 * ```
 */
function HeadingSkeleton({
  size = 'h1',
  width = 'medium',
  className,
}: HeadingSkeletonProps): React.ReactElement {
  const heightClass = HEADING_HEIGHT_MAP[size];
  const widthClass = HEADING_WIDTH_MAP[width];

  return (
    <Skeleton
      data-testid="heading-skeleton"
      data-size={size}
      data-width={width}
      className={cn(heightClass, widthClass, className)}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TextSkeleton
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Height mappings for Text component sizes
 * sm (text-sm), base (text-base), lg (text-lg), xl (text-xl)
 */
const TEXT_HEIGHT_MAP = {
  sm: 'h-4',
  base: 'h-5',
  lg: 'h-6',
  xl: 'h-7',
} as const satisfies Record<NonNullable<VariantProps<typeof textVariants>['size']>, string>;

/**
 * Width variants for text to simulate different text lengths
 */
const TEXT_WIDTH_MAP = {
  short: 'w-16',
  medium: 'w-32',
  long: 'w-48',
  full: 'w-full',
} as const;

type TextSize = NonNullable<VariantProps<typeof textVariants>['size']>;
type TextWidth = keyof typeof TEXT_WIDTH_MAP;

interface TextSkeletonProps {
  /** Must match the `size` prop you pass to the real <Text> */
  size?: TextSize;
  /** Width variant to simulate different text lengths */
  width?: TextWidth;
  className?: string;
}

/**
 * Drop-in skeleton replacement for `<Text>`.
 *
 * Usage — replace the real text while data loads:
 * ```tsx
 * isLoading
 *   ? <TextSkeleton size="base" />
 *   : <Text size="base">Content</Text>
 * ```
 *
 * All size variants:
 * ```tsx
 * <TextSkeleton size="sm" />
 * <TextSkeleton size="base" />
 * <TextSkeleton size="lg" />
 * <TextSkeleton size="xl" />
 * ```
 */
function TextSkeleton({
  size = 'base',
  width = 'medium',
  className,
}: TextSkeletonProps): React.ReactElement {
  const heightClass = TEXT_HEIGHT_MAP[size];
  const widthClass = TEXT_WIDTH_MAP[width];

  return (
    <Skeleton
      data-testid="text-skeleton"
      data-size={size}
      data-width={width}
      className={cn(heightClass, widthClass, className)}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ParagraphSkeleton
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Height mappings for Paragraph leading variants
 * tight, normal, relaxed
 */
const PARAGRAPH_HEIGHT_MAP = {
  tight: 'h-4',
  normal: 'h-5',
  relaxed: 'h-6',
} as const satisfies Record<NonNullable<VariantProps<typeof paragraphVariants>['leading']>, string>;

/**
 * Number of lines for paragraph skeleton
 */
const PARAGRAPH_LINES = {
  single: 1,
  double: 2,
  triple: 3,
  quad: 4,
} as const;

type ParagraphLeading = NonNullable<VariantProps<typeof paragraphVariants>['leading']>;
type ParagraphLines = keyof typeof PARAGRAPH_LINES;

interface ParagraphSkeletonProps {
  /** Must match the `leading` prop you pass to the real <Paragraph> */
  leading?: ParagraphLeading;
  /** Number of skeleton lines to display */
  lines?: ParagraphLines;
  className?: string;
}

/**
 * Drop-in skeleton replacement for `<Paragraph>`.
 *
 * Usage — replace the real paragraph while data loads:
 * ```tsx
 * isLoading
 *   ? <ParagraphSkeleton leading="normal" lines="triple" />
 *   : <Paragraph leading="normal">Content</Paragraph>
 * ```
 *
 * All leading variants:
 * ```tsx
 * <ParagraphSkeleton leading="tight" />
 * <ParagraphSkeleton leading="normal" />
 * <ParagraphSkeleton leading="relaxed" />
 * ```
 */
function ParagraphSkeleton({
  leading = 'normal',
  lines = 'triple',
  className,
}: ParagraphSkeletonProps): React.ReactElement {
  const heightClass = PARAGRAPH_HEIGHT_MAP[leading];
  const lineCount = PARAGRAPH_LINES[lines];

  return (
    <div data-testid="paragraph-skeleton" data-leading={leading} data-lines={lines}>
      {Array.from({ length: lineCount }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            heightClass,
            // Make last line shorter to look like real paragraph
            index === lineCount - 1 && lineCount > 1 ? 'w-3/4' : 'w-full',
            className
          )}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────────────────────

export { HeadingSkeleton, ParagraphSkeleton, TextSkeleton };
export type { HeadingSkeletonProps, ParagraphSkeletonProps, TextSkeletonProps };
