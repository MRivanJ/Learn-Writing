import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { grammarLessons } from '@/data/lessons/grammar'
import { writingLessons } from '@/data/lessons/writing'
import { readingLessons } from '@/data/lessons/reading'
import { vocabularyLessons } from '@/data/lessons/vocabulary'

export const metadata: Metadata = {
  title: 'Lessons - ProfiPath',
}

const LESSONS_DB: Record<string, any> = {
  grammar: grammarLessons,
  writing: writingLessons,
  reading: readingLessons,
  vocabulary: vocabularyLessons,
}

export default async function LevelLessonsPage(props: { params: Promise<{ skill: string, level: string }> }) {
  const params = await props.params
  const { skill, level } = params

  const skillDb = LESSONS_DB[skill]
  if (!skillDb || !skillDb[level]) {
    notFound()
  }

  const lessons = skillDb[level]

  // Fetch progress
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  let completedLessonIds = new Set<string>()
  if (user) {
    const { data } = await supabase
      .from('lesson_progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      
    if (data) {
      data.forEach(row => completedLessonIds.add(row.lesson_id))
    }
  }

  const completedCount = lessons.filter((l: any) => completedLessonIds.has(l.id)).length
  const progressPercent = Math.round((completedCount / lessons.length) * 100) || 0

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <Link href="/learn" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn
        </Link>
        <h2 className="text-3xl font-bold tracking-tight capitalize">{skill} - {level}</h2>
        <p className="text-muted-foreground mt-2">
          Select a lesson to start studying.
        </p>
      </div>

      <div className="bg-slate-100 p-4 rounded-lg flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Level Progress</span>
            <span className="text-sm font-medium">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
        <div className="text-sm text-slate-500 font-medium">
          {completedCount} / {lessons.length}
        </div>
      </div>

      <div className="grid gap-4">
        {lessons.map((lesson: any, idx: number) => {
          const isCompleted = completedLessonIds.has(lesson.id)
          return (
            <Card key={lesson.id} className={`transition-colors hover:border-slate-300 ${isCompleted ? 'bg-slate-50' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <span className="text-muted-foreground">{idx + 1}.</span> {lesson.title}
                      {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </CardTitle>
                    <CardDescription className="text-sm max-w-2xl">
                      {lesson.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {lesson.readingTimeMins} mins
                </div>
                <Link href={`/learn/${skill}/${level}/${lesson.id}`}>
                  <Button variant={isCompleted ? "outline" : "default"}>
                    {isCompleted ? 'Review Lesson' : 'Start Lesson'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
