'use client'

import { useLanguage } from '@/lib/language'

/**
 * Shows an Indonesian helper text under the English one.
 * Hidden when the language is set to English only, or when there is no Indonesian text.
 */
export function IdText({
  text,
  label = 'Bahasa Indonesia',
  className = '',
}: {
  text?: string | null
  label?: string
  className?: string
}) {
  const { lang } = useLanguage()
  if (lang !== 'id' || !text) return null

  return (
    <div className={`mt-2 rounded-md border-l-4 border-amber-400 bg-amber-50 px-3 py-2 text-sm text-amber-950 ${className}`}>
      <span className="block text-[10px] font-bold uppercase tracking-wide text-amber-600">{label}</span>
      {text}
    </div>
  )
}
