import type { ReactElement } from 'react';

import { Heading } from '@/components/ui/typography';

import { useVerificationT } from '../hooks/useTranslation';

/**
 * Page Verification Page
 * Displays page + PageSkeleton pairs for dimension comparison
 */
function PageVerificationPage(): ReactElement {
  const t = useVerificationT();

  return (
    <div className="container mx-auto py-8">
      <Heading size="h1" className="mb-8">
        {t('pageVerification')}
      </Heading>
      <p className="text-muted-foreground">{t('pagesDescription')}</p>
    </div>
  );
}

export default PageVerificationPage;
