import type { ReactElement } from 'react';

import { Heading } from '@/components/ui/typography';

interface SideBySideProps {
  /** Label for the comparison row */
  label: string;
  /** The actual UI component */
  actual: React.ReactNode;
  /** The skeleton component */
  skeleton: React.ReactNode;
  /** Whether to show overlay mode (50% opacity) */
  showOverlay?: boolean;
}

/**
 * SideBySide component for comparing actual UI with skeleton
 * Displays actual component and skeleton side by side for visual verification
 */
function SideBySide({
  label,
  actual,
  skeleton,
  showOverlay = false,
}: SideBySideProps): ReactElement {
  return (
    <div className="space-y-2">
      <Heading size="h6" className="text-muted-foreground">
        {label}
      </Heading>
      <div className="flex items-center gap-4">
        <div
          className="flex items-center justify-center p-4 border rounded-lg min-w-[200px]"
          data-testid="actual-component"
        >
          {actual}
        </div>
        <div
          className={`flex items-center justify-center p-4 border rounded-lg min-w-[200px] ${
            showOverlay ? 'opacity-50' : ''
          }`}
          data-testid="skeleton-component"
        >
          {skeleton}
        </div>
      </div>
    </div>
  );
}

export default SideBySide;
