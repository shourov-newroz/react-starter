import React from 'react';

import { useCommonT, useNavigationT } from '@/lib/i18n/useAppTranslation';

function ProfilePage(): React.ReactElement {
  const tNav = useNavigationT();
  const tCommon = useCommonT();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight">{tNav('Profile')}</h1>
      <p className="mt-4 text-muted-foreground">{tCommon('This is the user profile page.')}</p>
    </div>
  );
}

export default ProfilePage;
