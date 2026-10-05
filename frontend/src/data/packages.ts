import type { Bilingual } from '@/lib/language'

export type Level = 'beginner' | 'medium' | 'expert'

export type PackageMeta = {
  id: 1 | 2 | 3
  level: Level
  label: string
  description: Bilingual
}

/** The three practice packages shared by Grammar, Reading and Writing. */
export const PACKAGES: PackageMeta[] = [
  {
    id: 1,
    level: 'beginner',
    label: 'Beginner',
    description: {
      en: 'Everyday English and simple structures. A good place to start.',
      id: 'Bahasa Inggris sehari-hari dan struktur sederhana. Cocok untuk memulai.',
    },
  },
  {
    id: 2,
    level: 'medium',
    label: 'Medium',
    description: {
      en: 'Exam-style questions at a middle level (around IELTS 5.5–6.5).',
      id: 'Soal bergaya ujian tingkat menengah (sekitar IELTS 5.5–6.5).',
    },
  },
  {
    id: 3,
    level: 'expert',
    label: 'Expert',
    description: {
      en: 'Advanced structures and tricky details (IELTS 7+ / TOEFL 90+).',
      id: 'Struktur lanjutan dan detail yang menjebak (IELTS 7+ / TOEFL 90+).',
    },
  },
]

export function getPackage(id: number) {
  return PACKAGES.find((p) => p.id === id)
}

export const LEVEL_COLORS: Record<Level, string> = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-amber-100 text-amber-800 border-amber-200',
  expert: 'bg-red-100 text-red-800 border-red-200',
}
