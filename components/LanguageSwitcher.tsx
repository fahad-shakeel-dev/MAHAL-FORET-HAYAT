'use client';

import { Globe, LoaderCircle } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export function LanguageSwitcher() {
  const { language, busy, error, changeLanguage } = useLanguage();
  return <div data-no-translate className="relative shrink-0">
    <button type="button" onClick={() => changeLanguage(language === 'en' ? 'ar' : 'en')} disabled={busy} aria-label={language === 'en' ? 'Translate website to Arabic' : 'Switch website to English'} aria-busy={busy} className="inline-flex min-h-8 items-center gap-2 rounded-lg px-2 text-xs text-neutral-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 disabled:cursor-wait">
      {busy ? <LoaderCircle size={14} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Globe size={14} className="text-brand-400" aria-hidden="true" />}
      <span lang={language === 'en' ? 'ar' : 'en'}>{language === 'en' ? 'العربية' : 'English'}</span>
    </button>
    <span role="status" aria-live="polite" className="sr-only">{busy ? 'Loading saved Arabic translations' : ''}</span>
    {error && <p role="alert" className="absolute end-0 top-full z-[60] mt-2 w-56 rounded-xl border border-neutral-200 bg-white p-3 text-xs leading-5 text-neutral-800 shadow-lg">{error}</p>}
  </div>;
}
