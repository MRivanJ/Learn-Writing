'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'id'

/** A text that exists in both English and Indonesian. */
export type Bilingual = { en: string; id: string }

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'id',
  setLang: () => {},
})

const STORAGE_KEY = 'profipath-lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Indonesian help is on by default; the choice is remembered in the browser.
  const [lang, setLangState] = useState<Lang>('id')

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'id') setLangState(saved)
  }, [])

  const setLang = (next: Lang) => {
    setLangState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
