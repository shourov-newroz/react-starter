import React from 'react';
import { Link } from 'react-router-dom';

import { Heading, Text } from '@/components/ui/typography';
import { AUTH_LINKS, useAuthT } from '@/features/auth';
import { useCommonT } from '@/lib/i18n';

import { useDashboardT } from '../hooks';

export function DashboardPage(): React.ReactElement {
  const t = useDashboardT();
  const tAuth = useAuthT();
  const tCommon = useCommonT();

  return (
    <div className="p-8">
      <Heading size="h1">{t('Welcome to your dashboard! :)')}</Heading>
      <Text variant="muted" className="mt-4">
        {tCommon('Loading')}
      </Text>
      <div className="mt-8 flex gap-4">
        <Link
          to={AUTH_LINKS.LOGIN}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          {tAuth('Login')}
        </Link>
      </div>
    </div>
  );
}

export default DashboardPage;
