import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface UnauthorizedRouteProps {
  isAuthenticated: boolean;
  children: ReactNode;
}

const UnauthorizedRoute: React.FC<UnauthorizedRouteProps> = ({ isAuthenticated, children }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default UnauthorizedRoute;
