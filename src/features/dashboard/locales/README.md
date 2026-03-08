# Dashboard Feature Locales

This directory contains translation files for the dashboard feature.

## File Structure

```
locales/
├── en.json    # English translations
├── ar.json    # Arabic translations
└── ku.json    # Kurdish translations
```

## Adding New Translations

1. Add new keys to each language file
2. Keys should be consistent across all language files
3. Use the same key names (case-sensitive)

## Example

```json
{
  "Welcome to your dashboard! :)": "Welcome to your dashboard! :)",
  "Copyright © {{year}} Travluence. All rights reserved.": "Copyright © {{year}} Travluence. All rights reserved."
}
```

## Feature Ownership

This locale is owned by the `dashboard` feature. All translation changes for dashboard-related strings should be made in this directory rather than the central `src/lib/i18n/locales/` folder.
