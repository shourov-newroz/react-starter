import { Heading, Text } from '@/components/ui/typography';
import { useCommonT } from '@/lib/i18n/useAppTranslation';

/**
 * Demo component to showcase error handling and observability features.
 *
 * Features demonstrated:
 * 1. ErrorBoundary catching rendering errors
 * 2. Logger utility for different log levels
 * 3. Error normalization utility
 * 4. Error type classification
 */
function ErrorHandlingDemo(): React.ReactElement {
  const t = useCommonT();

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <Heading size="h1">{t('Error Handling & Observability Demo')}</Heading>
        <Text variant="muted" className="mt-2">
          {t(
            'This page demonstrates the error handling and observability features of the application.'
          )}
        </Text>
      </div>
    </div>
  );
}

export default ErrorHandlingDemo;
