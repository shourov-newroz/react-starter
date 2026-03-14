import { describe, expect, it } from 'vitest';

import { render, screen } from '@/tests/test-utils';

import {
  Heading,
  Paragraph,
  Text,
  headingVariants,
  paragraphVariants,
  textVariants,
} from './typography';

describe('Heading', () => {
  it('renders with default props', () => {
    render(<Heading>Test Heading</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Heading');
  });

  it('applies correct size classes', () => {
    const { container: h1 } = render(<Heading size="h1">H1</Heading>);
    expect(h1.firstChild).toHaveClass('text-3xl');

    const { container: h2 } = render(<Heading size="h2">H2</Heading>);
    expect(h2.firstChild).toHaveClass('text-2xl');

    const { container: h3 } = render(<Heading size="h3">H3</Heading>);
    expect(h3.firstChild).toHaveClass('text-xl');

    const { container: h4 } = render(<Heading size="h4">H4</Heading>);
    expect(h4.firstChild).toHaveClass('text-lg');

    const { container: h5 } = render(<Heading size="h5">H5</Heading>);
    expect(h5.firstChild).toHaveClass('text-md');

    const { container: h6 } = render(<Heading size="h6">H6</Heading>);
    expect(h6.firstChild).toHaveClass('text-sm');
  });

  it('applies correct variant classes', () => {
    const { container: defaultVariant } = render(<Heading variant="default">Default</Heading>);
    expect(defaultVariant.firstChild).toHaveClass('text-foreground');

    const { container: mutedVariant } = render(<Heading variant="muted">Muted</Heading>);
    expect(mutedVariant.firstChild).toHaveClass('text-muted-foreground');

    const { container: accentVariant } = render(<Heading variant="accent">Accent</Heading>);
    expect(accentVariant.firstChild).toHaveClass('text-accent-foreground');
  });

  it('applies correct weight classes', () => {
    const { container: normal } = render(<Heading weight="normal">Normal</Heading>);
    expect(normal.firstChild).toHaveClass('font-normal');

    const { container: bold } = render(<Heading weight="bold">Bold</Heading>);
    expect(bold.firstChild).toHaveClass('font-bold');

    const { container: semibold } = render(<Heading weight="semibold">Semibold</Heading>);
    expect(semibold.firstChild).toHaveClass('font-semibold');
  });

  it('renders as different heading elements based on as prop', () => {
    const { container: h2 } = render(<Heading as="h2">H2</Heading>);
    expect(h2.querySelector('h2')).toBeInTheDocument();

    const { container: h3 } = render(<Heading as="h3">H3</Heading>);
    expect(h3.querySelector('h3')).toBeInTheDocument();
  });

  it('has correct data-slot attribute', () => {
    render(<Heading>Test</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveAttribute('data-slot', 'heading');
  });
});

describe('Text', () => {
  it('renders with default props', () => {
    render(<Text>Test Text</Text>);
    const text = screen.getByText('Test Text');
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass('text-base');
  });

  it('applies correct size classes', () => {
    const { container: sm } = render(<Text size="sm">Small</Text>);
    expect(sm.firstChild).toHaveClass('text-sm');

    const { container: base } = render(<Text size="base">Base</Text>);
    expect(base.firstChild).toHaveClass('text-base');

    const { container: lg } = render(<Text size="lg">Large</Text>);
    expect(lg.firstChild).toHaveClass('text-lg');

    const { container: xl } = render(<Text size="xl">Extra Large</Text>);
    expect(xl.firstChild).toHaveClass('text-xl');
  });

  it('applies correct variant classes', () => {
    const { container: defaultVariant } = render(<Text variant="default">Default</Text>);
    expect(defaultVariant.firstChild).toHaveClass('text-foreground');

    const { container: mutedVariant } = render(<Text variant="muted">Muted</Text>);
    expect(mutedVariant.firstChild).toHaveClass('text-muted-foreground');

    const { container: accentVariant } = render(<Text variant="accent">Accent</Text>);
    expect(accentVariant.firstChild).toHaveClass('text-accent-foreground');

    const { container: destructiveVariant } = render(
      <Text variant="destructive">Destructive</Text>
    );
    expect(destructiveVariant.firstChild).toHaveClass('text-destructive');
  });

  it('applies correct weight classes', () => {
    const { container: normal } = render(<Text weight="normal">Normal</Text>);
    expect(normal.firstChild).toHaveClass('font-normal');

    const { container: medium } = render(<Text weight="medium">Medium</Text>);
    expect(medium.firstChild).toHaveClass('font-medium');

    const { container: semibold } = render(<Text weight="semibold">Semibold</Text>);
    expect(semibold.firstChild).toHaveClass('font-semibold');
  });

  it('has correct data-slot attribute', () => {
    render(<Text>Test</Text>);
    const text = screen.getByText('Test');
    expect(text).toHaveAttribute('data-slot', 'text');
  });
});

describe('Paragraph', () => {
  it('renders with default props', () => {
    render(<Paragraph>Test Paragraph</Paragraph>);
    const paragraph = screen.getByText('Test Paragraph');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass('leading-normal');
    expect(paragraph).toHaveClass('text-left');
  });

  it('applies correct leading classes', () => {
    const { container: tight } = render(<Paragraph leading="tight">Tight</Paragraph>);
    expect(tight.firstChild).toHaveClass('leading-tight');

    const { container: normal } = render(<Paragraph leading="normal">Normal</Paragraph>);
    expect(normal.firstChild).toHaveClass('leading-normal');

    const { container: relaxed } = render(<Paragraph leading="relaxed">Relaxed</Paragraph>);
    expect(relaxed.firstChild).toHaveClass('leading-relaxed');
  });

  it('applies correct align classes', () => {
    const { container: left } = render(<Paragraph align="left">Left</Paragraph>);
    expect(left.firstChild).toHaveClass('text-left');

    const { container: center } = render(<Paragraph align="center">Center</Paragraph>);
    expect(center.firstChild).toHaveClass('text-center');

    const { container: right } = render(<Paragraph align="right">Right</Paragraph>);
    expect(right.firstChild).toHaveClass('text-right');
  });

  it('has correct data-slot attribute', () => {
    render(<Paragraph>Test</Paragraph>);
    const paragraph = screen.getByText('Test');
    expect(paragraph).toHaveAttribute('data-slot', 'paragraph');
  });
});

describe('CVA Variants', () => {
  it('headingVariants produces correct class strings', () => {
    expect(headingVariants({})).toContain('text-3xl');
    expect(headingVariants({ size: 'h2' })).toContain('text-2xl');
    expect(headingVariants({ variant: 'muted' })).toContain('text-muted-foreground');
    expect(headingVariants({ weight: 'bold' })).toContain('font-bold');
  });

  it('textVariants produces correct class strings', () => {
    expect(textVariants({})).toContain('text-base');
    expect(textVariants({ size: 'lg' })).toContain('text-lg');
    expect(textVariants({ variant: 'destructive' })).toContain('text-destructive');
    expect(textVariants({ weight: 'semibold' })).toContain('font-semibold');
  });

  it('paragraphVariants produces correct class strings', () => {
    expect(paragraphVariants({})).toContain('leading-normal');
    expect(paragraphVariants({ leading: 'tight' })).toContain('leading-tight');
    expect(paragraphVariants({ align: 'center' })).toContain('text-center');
    expect(paragraphVariants({ align: 'right' })).toContain('text-right');
  });
});
