import React from 'react';
import useSWR from 'swr';

import { useCommonT } from '@/lib/i18n/useAppTranslation';

import { DASHBOARD_API_ENDPOINTS } from '../config/dashboard.config';
import { useDashboardT } from '../hooks/useTranslation';

/**
 * User profile type definition
 */
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  joinedAt: string;
}

/**
 * API response type
 */
interface ProfileResponse {
  user: UserProfile;
}

function ProfilePage(): React.ReactElement {
  const t = useDashboardT();
  const tCommon = useCommonT();

  // Fetch user profile using SWR
  const { data, error, isLoading, mutate } = useSWR<ProfileResponse>(
    DASHBOARD_API_ENDPOINTS.USER_PROFILE
  );

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold tracking-tight">{t('Profile')}</h1>
        <div className="mt-8 animate-pulse">
          <div className="h-32 w-32 rounded-full bg-muted mb-4"></div>
          <div className="h-6 w-48 bg-muted rounded mb-2"></div>
          <div className="h-4 w-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold tracking-tight">{t('Profile')}</h1>
        <div className="mt-4 p-4 border border-destructive rounded-md" role="alert">
          <p className="text-destructive">{tCommon('Something went wrong')}</p>
          <button
            type="button"
            className="mt-2 text-sm text-primary hover:underline"
            onClick={() => {
              mutate();
            }}
          >
            {tCommon('Reload Page')}
          </button>
        </div>
      </div>
    );
  }

  const { user } = data ?? {};

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight">{t('Profile')}</h1>
      <p className="mt-4 text-muted-foreground">{tCommon('This is the user profile page.')}</p>

      {user && (
        <div className="mt-8 flex flex-col items-start gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-24 w-24 rounded-full object-cover border-2 border-primary"
            />
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="grid gap-4 text-sm">
            {user.bio && (
              <div>
                <span className="font-medium">{t('Bio')}</span>
                <p className="text-muted-foreground">{user.bio}</p>
              </div>
            )}
            {user.location && (
              <div>
                <span className="font-medium">{t('Location')}</span>
                <p className="text-muted-foreground">{user.location}</p>
              </div>
            )}
            <div>
              <span className="font-medium">{t('Joined')}</span>
              <p className="text-muted-foreground">
                {new Date(user.joinedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
