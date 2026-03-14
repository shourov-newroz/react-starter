import type { ReactElement } from 'react';

import { Heading } from '@/components/ui/typography';

import { useVerificationT } from '../hooks/useTranslation';

/**
 * Layout Verification Page
 * Displays layout + LayoutSkeleton pairs for dimension comparison
 */
function LayoutVerificationPage(): ReactElement {
  const t = useVerificationT();

  return (
    <div className="container mx-auto py-8">
      <Heading size="h1" className="mb-8">
        {t('layoutVerification')}
      </Heading>
      <p className="text-muted-foreground">{t('layoutsDescription')}</p>
    </div>
  );
}

export default LayoutVerificationPage;
