/**
 * LanguageSwitcher Component
 * A dropdown to switch between supported languages
 */

import { ChevronDown, Globe } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  SUPPORTED_LANGUAGES,
  getLanguageConfigWithDefault,
  type LanguageCode,
} from '@/lib/i18n/locales';
import { cn } from '@/lib/utils';

/**
 * Props for LanguageSwitcher component
 */
interface LanguageSwitcherProps {
  /** Optional className for custom styling */
  className?: string;
  /** Callback when language changes */
  onLanguageChange?: (language: LanguageCode) => void;
}

/**
 * LanguageSwitcher - A dropdown component for switching between supported languages
 * Supports both LTR and RTL orientations
 */
export function LanguageSwitcher({ className, onLanguageChange }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = getLanguageConfigWithDefault(i18n.language);

  const handleLanguageSelect = async (languageCode: LanguageCode) => {
    await i18n.changeLanguage(languageCode);
    setIsOpen(false);
    onLanguageChange?.(languageCode);
  };

  const handleKeyDown = (event: React.KeyboardEvent, languageCode: LanguageCode) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleLanguageSelect(languageCode);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2',
          'text-sm ring-offset-background transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50'
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4" />
        <span className="flex-1 text-start">{currentLanguage.nativeName}</span>
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsOpen(false);
            }}
            role="button"
            tabIndex={-1}
            aria-hidden="true"
          />

          {/* Dropdown menu */}
          <ul
            className={cn(
              'absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 shadow-md',
              'text-popover-foreground'
            )}
            role="listbox"
            aria-label="Language options"
          >
            {SUPPORTED_LANGUAGES.map((language) => (
              <li
                key={language.code}
                role="option"
                aria-selected={language.code === currentLanguage.code}
                onClick={() => handleLanguageSelect(language.code)}
                onKeyDown={(e) => handleKeyDown(e, language.code)}
                tabIndex={0}
                className={cn(
                  'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5',
                  'text-sm outline-none transition-colors',
                  language.code === currentLanguage.code
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <span className="flex-1">{language.nativeName}</span>
                <span className="ms-2 text-muted-foreground">{language.name}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default LanguageSwitcher;
