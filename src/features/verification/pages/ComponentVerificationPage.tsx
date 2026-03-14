import type { ReactElement } from 'react';

import { Button } from '@/components/ui/button';
import { ButtonSkeleton } from '@/components/ui/button-skeleton';
import { Input } from '@/components/ui/input';
import { InputSkeleton } from '@/components/ui/input-skeleton';
import { Label } from '@/components/ui/label';
import { LabelSkeleton } from '@/components/ui/label-skeleton';
import { Heading } from '@/components/ui/typography';
import { HeadingSkeleton } from '@/components/ui/typography-skeleton';

import SideBySide from '../components/SideBySide';
import { useVerificationT } from '../hooks/useTranslation';

/**
 * Component Verification Page
 * Displays all UI component + Skeleton pairs side-by-side for visual comparison
 */
function ComponentVerificationPage(): ReactElement {
  const t = useVerificationT();

  return (
    <div className="container mx-auto py-8">
      <Heading size="h1" className="mb-8">
        {t('componentVerification')}
      </Heading>

      <div className="space-y-8">
        {/* Button Section */}
        <div className="border rounded-lg p-4">
          <Heading size="h4" className="mb-4">
            {t('buttonComponent')}
          </Heading>
          <div className="space-y-4">
            <SideBySide
              label={t('buttonDefault')}
              actual={<Button>{t('buttonDefaultText')}</Button>}
              skeleton={<ButtonSkeleton />}
            />
            <SideBySide
              label={t('buttonSmall')}
              actual={<Button size="sm">{t('buttonSmallText')}</Button>}
              skeleton={<ButtonSkeleton size="sm" />}
            />
            <SideBySide
              label={t('buttonLarge')}
              actual={<Button size="lg">{t('buttonLargeText')}</Button>}
              skeleton={<ButtonSkeleton size="lg" />}
            />
          </div>
        </div>

        {/* Typography Section */}
        <div className="border rounded-lg p-4">
          <Heading size="h4" className="mb-4">
            {t('typographyComponent')}
          </Heading>
          <div className="space-y-4">
            <SideBySide
              label={t('headingH1')}
              actual={<Heading size="h1">{t('headingText1')}</Heading>}
              skeleton={<HeadingSkeleton size="h1" />}
            />
            <SideBySide
              label={t('headingH2')}
              actual={<Heading size="h2">{t('headingText2')}</Heading>}
              skeleton={<HeadingSkeleton size="h2" />}
            />
            <SideBySide
              label={t('headingH3')}
              actual={<Heading size="h3">{t('headingText3')}</Heading>}
              skeleton={<HeadingSkeleton size="h3" />}
            />
          </div>
        </div>

        {/* Input Section */}
        <div className="border rounded-lg p-4">
          <Heading size="h4" className="mb-4">
            {t('inputComponent')}
          </Heading>
          <div className="space-y-4">
            <SideBySide
              label={t('inputDefault')}
              actual={<Input placeholder="Enter text..." />}
              skeleton={<InputSkeleton />}
            />
          </div>
        </div>

        {/* Label Section */}
        <div className="border rounded-lg p-4">
          <Heading size="h4" className="mb-4">
            {t('labelComponent')}
          </Heading>
          <div className="space-y-4">
            <SideBySide
              label={t('labelDefault')}
              actual={<Label>{t('labelText')}</Label>}
              skeleton={<LabelSkeleton />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComponentVerificationPage;
