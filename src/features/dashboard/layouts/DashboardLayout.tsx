import React from 'react';
import { Outlet } from 'react-router-dom';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useNavigationT } from '@/lib/i18n';

import { useDashboardT } from '../hooks';

const DashboardLayout: React.FC = () => {
  const tNav = useNavigationT();
  const tDash = useDashboardT();
  const currentYear = new Date().getFullYear();

  return (
    <div className="dashboard-layout min-h-screen">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h1 className="text-xl font-bold">{tNav('Dashboard')}</h1>
        <LanguageSwitcher />
      </header>
      <main className="p-4">
        <Outlet />
      </main>
      <footer className="border-t px-4 py-3 text-center text-sm text-muted-foreground">
        <p>
          {tDash('Copyright © {{year}} Travluence. All rights reserved.', { year: currentYear })}
        </p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
