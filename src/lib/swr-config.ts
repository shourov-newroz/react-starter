import type { AxiosError } from 'axios';
import type { SWRConfiguration } from 'swr';

import { apiClient } from '@/services/api-client';
import type { ApiError } from '@/types/api.types';

import { logger } from './logger';
import serverErrorHandler from './serverErrorHandler';

export const swrConfig: SWRConfiguration = {
  fetcher: (url: string) => apiClient.sendGetRequest(url),
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  revalidateOnMount: true,
  refreshWhenOffline: false,
  shouldRetryOnError: true,
  errorRetryCount: 3,
  dedupingInterval: 2000,
  focusThrottleInterval: 5000,
  onError: (error: AxiosError<ApiError>) => {
    serverErrorHandler(error);
  },
  onErrorRetry: (error, key, _config, revalidate, { retryCount }) => {
    logger.debug('SWR error retry', { key, retryCount });
    // Never retry on 404.
    if (error.status === 404) return;

    // Only retry up to 10 times.
    if (retryCount >= 3) return;

    // Retry after 5 seconds.
    setTimeout(() => revalidate({ retryCount }), 5000);
  },
};
