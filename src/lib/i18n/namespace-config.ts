/**
 * Namespace configuration for translations
 * Maps namespaces to their feature ownership and file paths
 */

/**
 * Namespace definitions for translations
 * Each namespace represents a separate translation file
 */
export const NAMESPACES = ['auth', 'common', 'dashboard', 'navigation', 'language'] as const;
export type Namespace = (typeof NAMESPACES)[number];

/**
 * Namespace configuration with ownership and path information
 */
export interface NamespaceConfig {
  name: Namespace;
  feature: string;
  path: string;
  isShared: boolean;
}

/**
 * Namespace path mapping - maps namespace to feature path
 * Feature namespaces use flat JSON files (e.g., en.json, ar.json)
 * Shared namespaces fallback to central location
 * NOTE: Paths are relative to project root (where index.html is served from)
 */
export const NAMESPACE_CONFIG: Record<Namespace, NamespaceConfig> = {
  auth: {
    name: 'auth',
    feature: 'auth',
    path: '/src/features/auth/locales',
    isShared: false,
  },
  dashboard: {
    name: 'dashboard',
    feature: 'dashboard',
    path: '/src/features/dashboard/locales',
    isShared: false,
  },
  common: {
    name: 'common',
    feature: 'core',
    path: '/src/lib/i18n/locales',
    isShared: true,
  },
  navigation: {
    name: 'navigation',
    feature: 'core',
    path: '/src/lib/i18n/locales',
    isShared: true,
  },
  language: {
    name: 'language',
    feature: 'core',
    path: '/src/lib/i18n/locales',
    isShared: true,
  },
};

/**
 * Default namespace for translations
 */
export const DEFAULT_NAMESPACE: Namespace = 'common';

/**
 * Get the feature name that owns a namespace
 */
export function getNamespaceFeature(namespace: string): string {
  return NAMESPACE_CONFIG[namespace as Namespace]?.feature || NAMESPACE_CONFIG.common.feature;
}

/**
 * Get the import path for a namespace
 */
export function getNamespacePath(namespace: string): string {
  return NAMESPACE_CONFIG[namespace as Namespace]?.path || NAMESPACE_CONFIG.common.path;
}

/**
 * Check if a namespace is shared (core)
 */
export function isSharedNamespace(namespace: string): boolean {
  return NAMESPACE_CONFIG[namespace as Namespace]?.isShared || true;
}
