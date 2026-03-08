import { Component, type ReactNode } from 'react';

import { useCommonT } from '@/lib/i18n/useAppTranslation';
import { logger } from '@/lib/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logger.error('ErrorBoundary caught error', error, {
      componentStack: errorInfo.componentStack,
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || <ErrorBoundaryFallback errorMessage={this.state.error?.message} />
      );
    }

    return this.props.children;
  }
}

function ErrorBoundaryFallback({ errorMessage }: { errorMessage?: string }): ReactNode {
  const t = useCommonT();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t('Something went wrong')}</h1>
        <p className="mt-2 text-muted-foreground">{errorMessage}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded bg-primary px-4 py-2 text-white"
        >
          {t('Reload Page')}
        </button>
      </div>
    </div>
  );
}
