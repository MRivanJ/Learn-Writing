import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { LessonView } from '@/components/lesson-view'
import { grammarLessons } from '@/data/lessons/grammar'
import { writingLessons } from '@/data/lessons/writing'
import { readingLessons } from '@/data/lessons/reading'
import { vocabularyLessons } from '@/data/lessons/vocabulary'

export const metadata: Metadata = {
  title: 'Lesson - ProfiPath',
}

const LESSONS_DB: Record<string, any> = {
  grammar: grammarLessons,
  writing: writingLessons,
  reading: readingLessons,
  vocabulary: vocabularyLessons,
}

export default async function LessonPage(props: { params: Promise<{ skill: string, level: string, lesson: string }> }) {
  const params = await props.params
  const { skill, level, lesson: lessonId } = params

  const skillDb = LESSONS_DB[skill]
  if (!skillDb || !skillDb[level]) {
    notFound()
  }

  const lessonsList = skillDb[level]
  const lessonData = lessonsList.find((l: any) => l.id === lessonId)

  if (!lessonData) {
    notFound()
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div>
        <Link href={`/learn/${skill}/${level}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {level} {skill}
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">{lessonData.title}</h2>
        <p className="text-muted-foreground mt-2">
          {lessonData.description}
        </p>
      </div>

      <LessonView lesson={lessonData} skill={skill} />
    </div>
  )
}
