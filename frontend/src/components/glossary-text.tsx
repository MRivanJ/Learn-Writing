'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language'

export type GlossaryEntry = { word: string; meaningId: string }

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Paragraph text where hard words are underlined. Tapping one shows its
 * Indonesian meaning right below the paragraph. Only active in ID mode.
 */
export function GlossaryText({ text, glossary }: { text: string; glossary?: GlossaryEntry[] | null }) {
  const { lang } = useLanguage()
  const [open, setOpen] = useState<GlossaryEntry | null>(null)

  const entries = (glossary ?? []).filter((g) => g.word && g.meaningId)
  if (lang !== 'id' || entries.length === 0) return <>{text}</>

  const pattern = new RegExp(`\\b(${entries.map((g) => escapeRegExp(g.word)).join('|')})\\b`, 'gi')
  const parts = text.split(pattern)

  return (
    <>
      {parts.map((part, i) => {
        const entry = entries.find((g) => g.word.toLowerCase() === part.toLowerCase())
        if (!entry) return <span key={i}>{part}</span>
        return (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(open?.word === entry.word ? null : entry)}
            className="underline decoration-dotted decoration-amber-500 underline-offset-4 hover:bg-amber-100 rounded-sm cursor-help"
          >
            {part}
          </button>
        )
      })}
      {open && (
        <span className="mt-2 block rounded-md border-l-4 border-amber-400 bg-amber-50 px-3 py-2 text-sm font-sans text-amber-950">
          <strong>{open.word}</strong> = {open.meaningId}
        </span>
      )}
    </>
  )
}
