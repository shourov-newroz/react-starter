import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { normalizeError } from '@/lib/error';
import { useCommonT } from '@/lib/i18n/useAppTranslation';
import { logger } from '@/lib/logger';
import type { ApiError } from '@/types/api.types';
import { ErrorType } from '@/types/error.types';

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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [logOutput, setLogOutput] = useState<string[]>([]);
  const t = useCommonT();

  const addLog = (message: string): void => {
    setLogOutput((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const handleThrowError = (): void => {
    addLog('Throwing error...');
    throw new Error('This is a demo error thrown from ErrorHandlingDemo');
  };

  const handleApiError = (): void => {
    addLog('Simulating API error...');
    const apiError: ApiError = {
      message: 'Invalid credentials',
      code: 'AUTH_FAILED',
      status: 401,
      details: { attemptedAt: new Date().toISOString() },
    };
    const normalized = normalizeError(apiError);
    addLog(`Normalized error type: ${normalized.type}`);
    addLog(`Normalized message: ${normalized.message}`);
    addLog(`Status code: ${normalized.statusCode}`);
  };

  const handleNetworkError = (): void => {
    addLog('Simulating network error...');
    const networkError = new Error('Network request failed');
    const normalized = normalizeError(networkError);
    addLog(`Normalized error type: ${normalized.type}`);
    addLog(`Normalized message: ${normalized.message}`);
  };

  const handleLoggerDemo = (level: 'debug' | 'info' | 'warn' | 'error'): void => {
    addLog(`Logger.${level}('Test message') called`);
    switch (level) {
      case 'debug':
        logger.debug('Debug message from ErrorHandlingDemo');
        break;
      case 'info':
        logger.info('Info message from ErrorHandlingDemo');
        break;
      case 'warn':
        logger.warn('Warning message from ErrorHandlingDemo');
        break;
      case 'error':
        logger.error('Error message from ErrorHandlingDemo', new Error('Demo error'));
        break;
    }
  };

  const handleValidationError = (): void => {
    addLog('Simulating validation error...');
    const validationError: ApiError = {
      message: 'Email format is invalid',
      code: 'VALIDATION_ERROR',
      status: 400,
      details: { field: 'email', value: 'invalid-email' },
    };
    const normalized = normalizeError(validationError);
    addLog(`Normalized error type: ${normalized.type}`);
    addLog(`Normalized message: ${normalized.message}`);
    addLog(`Error code: ${normalized.code}`);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('Error Handling & Observability Demo')}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t(
            'This page demonstrates the error handling and observability features of the application.'
          )}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Error Boundary Demo */}
        <Card>
          <CardHeader>
            <CardTitle>{t('ErrorBoundary Demo')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t(
                'Click the button below to throw an error that will be caught by the ErrorBoundary. The ErrorBoundary will display a fallback UI with the error message.'
              )}
            </p>
            <Button onClick={handleThrowError} variant="destructive">
              {t('Throw Error')}
            </Button>
          </CardContent>
        </Card>

        {/* Logger Demo */}
        <Card>
          <CardHeader>
            <CardTitle>{t('Logger Demo')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t(
                'Test the logger utility with different log levels. Check the browser console to see the output.'
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => handleLoggerDemo('debug')} variant="outline" size="sm">
                {t('Debug')}
              </Button>
              <Button onClick={() => handleLoggerDemo('info')} variant="outline" size="sm">
                {t('Info')}
              </Button>
              <Button onClick={() => handleLoggerDemo('warn')} variant="outline" size="sm">
                {t('Warn')}
              </Button>
              <Button onClick={() => handleLoggerDemo('error')} variant="outline" size="sm">
                {t('Error')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Normalization Demo */}
        <Card>
          <CardHeader>
            <CardTitle>{t('Error Normalization Demo')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t('Test the normalizeError utility with different error types.')}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleApiError} variant="default" size="sm">
                {t('API Error (401)')}
              </Button>
              <Button onClick={handleValidationError} variant="default" size="sm">
                {t('Validation Error (400)')}
              </Button>
              <Button onClick={handleNetworkError} variant="default" size="sm">
                {t('Network Error')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Form Demo */}
        <Card>
          <CardHeader>
            <CardTitle>{t('Error Form Demo')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setErrorMessage('Form submission error: Please fix the validation errors.');
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email">{t('Email')}</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('Password')}</Label>
                <Input id="password" type="password" placeholder="Enter your password" required />
              </div>
              <Button type="submit">{t('Submit (will show error)')}</Button>
              {errorMessage && <p className="text-sm text-destructive mt-2">{errorMessage}</p>}
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Log Output */}
      <Card>
        <CardHeader>
          <CardTitle>{t('Log Output')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm max-h-64 overflow-auto">
            {logOutput.length === 0 ? (
              <p className="text-muted-foreground">{t('No logs yet. Try the demos above.')}</p>
            ) : (
              <ul className="space-y-1">
                {logOutput.map((log, index) => (
                  <li key={index}>{log}</li>
                ))}
              </ul>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLogOutput([])}
            className="mt-4"
            disabled={logOutput.length === 0}
          >
            {t('Clear Logs')}
          </Button>
        </CardContent>
      </Card>

      {/* Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>{t('Error Types Reference')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(
              [
                { type: ErrorType.NETWORK, description: 'Network connectivity issues' },
                { type: ErrorType.VALIDATION, description: 'Invalid input data (400)' },
                {
                  type: ErrorType.AUTH,
                  description: 'Authentication/authorization failures (401, 403)',
                },
                { type: ErrorType.NOT_FOUND, description: 'Resource not found (404)' },
                { type: ErrorType.SERVER, description: 'Backend server errors (5xx)' },
                { type: ErrorType.UNKNOWN, description: 'Unexpected/unknown errors' },
              ] as const
            ).map(({ type, description }) => (
              <div key={type} className="border rounded p-3">
                <code className="text-sm font-bold">{type}</code>
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ErrorHandlingDemo;
