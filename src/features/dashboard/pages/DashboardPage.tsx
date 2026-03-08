import React from 'react';
import { Link } from 'react-router-dom';

import { AUTH_LINKS, useAuthT } from '@/features/auth';
import { useCommonT } from '@/lib/i18n';

import { useDashboardT } from '../hooks';

export function DashboardPage(): React.ReactElement {
  const t = useDashboardT();
  const tAuth = useAuthT();
  const tCommon = useCommonT();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight">{t('Welcome to your dashboard! :)')}</h1>
      <p className="mt-4 text-muted-foreground">{tCommon('Loading')}</p>
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
