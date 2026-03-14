import React from 'react';
import useSWR from 'swr';

import { Heading, Text } from '@/components/ui/typography';
import { useCommonT } from '@/lib/i18n/useAppTranslation';

import { DASHBOARD_API_ENDPOINTS } from '../config/dashboard.config';
import { useDashboardT } from '../hooks/useTranslation';

import ProfilePageSkeleton from './ProfilePageSkeleton';

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
    return <ProfilePageSkeleton />;
  }

  if (error) {
    return (
      <div className="p-8">
        <Heading size="h1">{t('Profile')}</Heading>
        <div className="mt-4 p-4 border border-destructive rounded-md" role="alert">
          <Text variant="destructive">{tCommon('Something went wrong')}</Text>
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
      <Heading size="h1">{t('Profile')}</Heading>
      <Text variant="muted" className="mt-4">
        {tCommon('This is the user profile page.')}
      </Text>

      {user && (
        <div className="mt-8 flex flex-col items-start gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-24 w-24 rounded-full object-cover border-2 border-primary"
            />
            <div>
              <Heading size="h3" weight="semibold">
                {user.name}
              </Heading>
              <Text variant="muted">{user.email}</Text>
            </div>
          </div>

          <div className="grid gap-4 text-sm">
            {user.bio && (
              <div>
                <span className="font-medium">{t('Bio')}</span>
                <Text variant="muted">{user.bio}</Text>
              </div>
            )}
            {user.location && (
              <div>
                <span className="font-medium">{t('Location')}</span>
                <Text variant="muted">{user.location}</Text>
              </div>
            )}
            <div>
              <span className="font-medium">{t('Joined')}</span>
              <Text variant="muted">{new Date(user.joinedAt).toLocaleDateString()}</Text>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
