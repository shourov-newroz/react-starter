import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingFallback } from '@/components/LoadingFallback';
import i18n from '@/lib/i18n/config';
import { swrConfig } from '@/lib/swr-config';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): React.ReactElement {
  return (
    <I18nextProvider i18n={i18n}>
      <ErrorBoundary>
        <SWRConfig value={swrConfig}>
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
          </BrowserRouter>
        </SWRConfig>
      </ErrorBoundary>
    </I18nextProvider>
  );
}
