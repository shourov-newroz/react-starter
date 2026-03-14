/**
 * Verification feature type definitions
 * Defines types for the component/layout/page verification system
 */

export interface VerificationItem {
  id: string;
  name: string;
  description: string;
  uiComponent: React.ReactNode;
  skeletonComponent: React.ReactNode;
}

export interface VerificationSection {
  id: string;
  title: string;
  description: string;
  items: VerificationItem[];
}

export interface SideBySideProps {
  label: string;
  actual: React.ReactNode;
  skeleton: React.ReactNode;
  showOverlay?: boolean;
}

export interface ComparisonRowProps {
  label: string;
  actual: React.ReactNode;
  skeleton: React.ReactNode;
}
