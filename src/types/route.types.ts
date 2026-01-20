import React from 'react';

type BaseRoute = {
  element?: React.ComponentType | React.ReactNode;
  name?: string;
  children?: RouteConfig[];
};

type PublicRoute = BaseRoute & {
  isPublic?: true;
  isProtected?: never;
};

type ProtectedRoute = BaseRoute & {
  isPublic?: never;
  isProtected?: true;
};

type BaseRouteWithAuth = PublicRoute | ProtectedRoute;

type LayoutRoute = BaseRouteWithAuth & {
  isLayout: true;
  path?: string;
  index?: never;
};

type PathRoute = BaseRouteWithAuth & {
  isLayout?: never;
  path?: string;
  index?: boolean;
};

export type RouteConfig = LayoutRoute | PathRoute;
