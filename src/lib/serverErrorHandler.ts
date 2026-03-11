import { AxiosError } from 'axios';

import type { ApiError } from '@/types/api.types';

import { logger } from './logger';

// Generic Error Handler for Server-Side Validation Errors
const serverErrorHandler = (error: AxiosError<ApiError>): void => {
  if (error.response && error.response.data) {
    // log the error
    logger.error(error.response.data.message);

    const { data } = error.response;
    logger.debug('Server error response data', { data });
  } else {
    logger.error('Error without response', error as Error);
    // Optionally show a generic error message
    // warningToast('Something went wrong. Please try again.');
  }
};

export default serverErrorHandler;
