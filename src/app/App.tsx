import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Providers } from './providers';

const Loading = (): React.ReactElement => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const LoginPage = lazy(() =>
  import('@/features/auth/pages/LoginPage').then((module) => ({ default: module.LoginPage }))
);

function HomePage(): React.ReactElement {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight">Welcome to React Starter</h1>
      <p className="mt-4 text-muted-foreground">
        This is a production-grade React + Vite + TypeScript frontend foundation.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="/login"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}

function NotFoundPage(): React.ReactElement {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight">404</h1>
      <p className="mt-4 text-muted-foreground">Page not found</p>
    </div>
  );
}

function AppRoutes(): React.ReactNode {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

function App(): React.ReactNode {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}

export default App;
