'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { translateText } from '@/lib/translation-text';

type Language = 'en' | 'ar';
type Dictionary = Record<string, string>;
const preferenceKey = 'mahal-language';
const LanguageContext = createContext<{ language: Language; busy: boolean; error: string; changeLanguage: (language: Language) => void; translate: (source: string) => string }>({ language: 'en', busy: false, error: '', changeLanguage: () => {}, translate: source => source });
const excluded = 'script, style, noscript, code, pre, [data-no-translate], [translate="no"], body [lang="ar"]';
const attributes = ['placeholder', 'aria-label', 'aria-description', 'alt', 'title'];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [dictionary, setDictionary] = useState<Dictionary>({});
  const originals = useRef(new WeakMap<Text, { source: string; translated: string }>());
  const originalAttributes = useRef(new WeakMap<Element, Map<string, { source: string; translated: string }>>());
  const request = useRef(0);
  const documentTitle = useRef({ source: '', translated: '' });

  const changeLanguage = useCallback(async (next: Language) => {
    const id = ++request.current;
    setError('');
    if (next === 'en') {
      setLanguage('en');
      setBusy(false);
      try { localStorage.setItem(preferenceKey, 'en'); } catch { /* Storage is optional. */ }
      return;
    }
    setBusy(true);
    try {
      // This static chunk is cached by the browser. Visitors never call OpenL.
      const saved = await import('../public/translations/ar.json');
      if (id !== request.current) return;
      setDictionary(saved.default);
      setLanguage('ar');
      try { localStorage.setItem(preferenceKey, 'ar'); } catch { /* Storage is optional. */ }
    } catch {
      if (id === request.current) setError('Arabic could not be loaded. Please try again.');
    } finally {
      if (id === request.current) setBusy(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => {
      try { if (localStorage.getItem(preferenceKey) === 'ar') void changeLanguage('ar'); } catch { /* Use English if storage is unavailable. */ }
    });
    const sync = (event: StorageEvent) => {
      if (event.key === preferenceKey) void changeLanguage(event.newValue === 'ar' ? 'ar' : 'en');
    };
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener('storage', sync); };
  }, [changeLanguage]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dataset.language = language;

    const textRecords = originals.current;
    const attributeRecords = originalAttributes.current;
    const process = () => {
      observer.disconnect();
      const previousTitle = documentTitle.current;
      const sourceTitle = document.title === previousTitle.translated ? previousTitle.source : document.title;
      const translatedTitle = language === 'ar' ? translateText(sourceTitle, dictionary) : sourceTitle;
      documentTitle.current = { source: sourceTitle, translated: translatedTitle };
      if (document.title !== translatedTitle) document.title = translatedTitle;
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = node as Text;
        if (!text.parentElement || text.parentElement.closest(`${excluded}, textarea`)) continue;
        const current = text.nodeValue ?? '';
        const previous = textRecords.get(text);
        // React may replace a label or counter. Capture that new source text.
        const source = previous && current === previous.translated ? previous.source : current;
        const translated = language === 'ar' ? translateText(source, dictionary) : source;
        textRecords.set(text, { source, translated });
        if (current !== translated) text.nodeValue = translated;
      }
      document.body.querySelectorAll('[placeholder], [aria-label], [aria-description], [alt], [title]').forEach(element => {
        if (element.closest(excluded)) return;
        let records = attributeRecords.get(element);
        if (!records) { records = new Map(); attributeRecords.set(element, records); }
        for (const attribute of attributes) {
          const current = element.getAttribute(attribute);
          if (current === null) continue;
          const previous = records.get(attribute);
          const source = previous && current === previous.translated ? previous.source : current;
          const translated = language === 'ar' ? translateText(source, dictionary) : source;
          records.set(attribute, { source, translated });
          if (current !== translated) element.setAttribute(attribute, translated);
        }
      });
      observer.observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: attributes });
    };
    let frame = 0;
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(process);
    });
    process();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [language, dictionary]);

  const translate = useCallback((source: string) => language === 'ar' ? translateText(source, dictionary) : source, [language, dictionary]);
  return <LanguageContext.Provider value={{ language, busy, error, changeLanguage, translate }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }
