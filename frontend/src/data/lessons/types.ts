import { Bilingual } from '@/lib/language'

export type LessonSection = {
  heading: string
  content: Bilingual // Explain simple concept in EN & ID
  examples?: {
    en: string
    id: string
  }[]
}

export type LessonQuizQuestion = {
  question: string
  options: string[]
  correctAnswer: string
  explanation: Bilingual
}

export type Lesson = {
  id: string // e.g. "g-beg-1"
  title: string
  description: string
  readingTimeMins: number
  sections: LessonSection[]
  commonMistakes?: Bilingual
  quiz: LessonQuizQuestion[] // Mini 3-question check
  practicePackageId: number // ID of the package to practice (1, 2, or 3)
}

export type LevelLessons = {
  beginner: Lesson[]
  medium: Lesson[]
  expert: Lesson[]
}
