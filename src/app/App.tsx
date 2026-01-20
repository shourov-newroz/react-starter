import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingFallback } from '@/components/LoadingFallback';
import { routes } from '@/config/routes';
import { useAuth } from '@/features/auth';
import type { RouteConfig } from '@/types/route.types';

import AuthGuard from './AuthGuard';
import { Providers } from './providers';
import UnauthorizedRoute from './UnauthorizedRoute';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  const renderElement = (el: React.ComponentType | React.ReactNode): React.ReactNode => {
    if (typeof el === 'function') {
      return React.createElement(el);
    }
    return el;
  };

  const renderRouteElement = (route: RouteConfig): React.ReactNode => {
    let element;

    if (route.isProtected) {
      if (isLoading) {
        return <LoadingFallback />;
      }

      // Protected routes
      element = (
        <AuthGuard isAuthenticated={isAuthenticated}>{renderElement(route.element)}</AuthGuard>
      );
    } else if (route.isPublic) {
      // Public routes that should redirect to dashboard if authenticated
      element = (
        <UnauthorizedRoute isAuthenticated={isAuthenticated}>
          {renderElement(route.element)}
        </UnauthorizedRoute>
      );
    } else {
      // Regular public routes
      element = renderElement(route.element);
    }

    return (
      <Suspense fallback={<LoadingFallback />}>
        <ErrorBoundary>{element}</ErrorBoundary>
      </Suspense>
    );
  };

  const renderRoutes = (routes: RouteConfig[]): React.ReactNode => {
    return routes.map((route, index) => {
      // For layout routes, we want to render the layout element with its children
      if (route.isLayout) {
        return (
          <Route key={`layout-${index}`} element={renderRouteElement(route)}>
            {route.children && renderRoutes(route.children)}
          </Route>
        );
      }

      // For index routes
      if (route.index) {
        return <Route key={`index-${index}`} index element={renderRouteElement(route)} />;
      }

      // For regular routes
      const routeKey = route.path || `route-${index}`;
      return (
        <Route key={routeKey} path={route.path} element={renderRouteElement(route)}>
          {route.children && renderRoutes(route.children)}
        </Route>
      );
    });
  };

  return <Routes>{renderRoutes(routes)}</Routes>;
};

function App(): React.ReactNode {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}

export default App;
