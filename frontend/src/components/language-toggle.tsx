'use client'

import { useLanguage } from '@/lib/language'

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  const base = 'flex-1 px-3 py-1.5 text-sm rounded-md transition-colors'
  const active = 'bg-primary text-white font-semibold'
  const idle = 'text-slate-300 hover:bg-slate-800'

  return (
    <div className="px-4 pb-4">
      <p className="text-xs uppercase text-slate-500 mb-2">Language / Bahasa</p>
      <div className="flex gap-1 rounded-md bg-slate-950 p-1">
        <button type="button" className={`${base} ${lang === 'en' ? active : idle}`} onClick={() => setLang('en')}>
          EN
        </button>
        <button type="button" className={`${base} ${lang === 'id' ? active : idle}`} onClick={() => setLang('id')}>
          ID
        </button>
      </div>
      <p className="text-xs text-slate-500 mt-2">
        {lang === 'id' ? 'Inggris + penjelasan Indonesia' : 'English only'}
      </p>
    </div>
  )
}
