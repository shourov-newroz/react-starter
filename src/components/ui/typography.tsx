import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Heading component variants using CVA
 * Sizes: h1 (text-3xl), h2 (text-2xl), h3 (text-xl), h4 (text-lg), h5 (text-md), h6 (text-sm)
 * Variants: default, muted, accent
 * Weights: normal, bold, semibold
 */
const headingVariants = cva('scroll-m-20 tracking-tight', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-accent-foreground',
    },
    size: {
      h1: 'text-3xl font-bold',
      h2: 'text-2xl font-semibold',
      h3: 'text-xl font-semibold',
      h4: 'text-lg font-semibold',
      h5: 'text-md font-medium',
      h6: 'text-sm font-medium',
    },
    weight: {
      normal: 'font-normal',
      bold: 'font-bold',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'h1',
    weight: 'bold',
  },
});

export interface HeadingProps
  extends React.ComponentProps<'h1'>, VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Heading component - displays headings with configurable size, variant, and weight
 * Uses CVA for consistent styling across all heading levels
 */
function Heading({
  className,
  variant,
  size,
  weight,
  as,
  ...props
}: HeadingProps): React.ReactElement {
  const Component = as || 'h1';
  return (
    <Component
      data-slot="heading"
      className={cn(headingVariants({ variant, size, weight, className }))}
      {...props}
    />
  );
}

/**
 * Text component variants using CVA
 * Sizes: sm (text-sm), base (text-base), lg (text-lg), xl (text-xl)
 * Variants: default, muted, accent, destructive
 * Weights: normal, medium, semibold
 */
const textVariants = cva('', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-accent-foreground',
      destructive: 'text-destructive',
    },
    size: {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'base',
    weight: 'normal',
  },
});

export interface TextProps
  extends React.ComponentProps<'span'>, VariantProps<typeof textVariants> {}

/**
 * Text component - displays inline text with configurable size, variant, and weight
 * Uses CVA for consistent styling
 */
function Text({ className, variant, size, weight, ...props }: TextProps): React.ReactElement {
  return (
    <span
      data-slot="text"
      className={cn(textVariants({ variant, size, weight, className }))}
      {...props}
    />
  );
}

/**
 * Paragraph component variants using CVA
 * Leading: tight, normal, relaxed
 * Alignment: left, center, right
 */
const paragraphVariants = cva('', {
  variants: {
    leading: {
      tight: 'leading-tight',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    leading: 'normal',
    align: 'left',
  },
});

export interface ParagraphProps
  extends React.ComponentProps<'p'>, VariantProps<typeof paragraphVariants> {}

/**
 * Paragraph component - displays paragraph text with configurable leading and alignment
 * Uses CVA for consistent styling
 */
function Paragraph({ className, leading, align, ...props }: ParagraphProps): React.ReactElement {
  return (
    <p
      data-slot="paragraph"
      className={cn(paragraphVariants({ leading, align, className }))}
      {...props}
    />
  );
}

export { Heading, headingVariants, Paragraph, paragraphVariants, Text, textVariants };
