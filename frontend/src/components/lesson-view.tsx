'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IdText } from '@/components/id-text'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { Lesson } from '@/data/lessons/types'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export function LessonView({ lesson, skill }: { lesson: Lesson, skill: string }) {
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)
  
  const allAnswered = Object.keys(quizAnswers).length === lesson.quiz.length

  const handleSelect = (qIdx: number, option: string) => {
    if (isQuizSubmitted) return
    setQuizAnswers(prev => ({ ...prev, [qIdx]: option }))
  }

  const submitQuiz = async () => {
    setIsQuizSubmitted(true)
    
    // Mark as completed in db
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('lesson_progress').insert({
          user_id: user.id,
          lesson_id: lesson.id
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="space-y-12">
      {/* 1. Explanations */}
      <div className="space-y-10">
        {lesson.sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-4">
            <h3 className="text-2xl font-semibold border-b pb-2">{section.heading}</h3>
            
            <div className="text-lg text-slate-800 leading-relaxed">
              <p>{section.content.en}</p>
              <IdText text={section.content.id} label="Terjemahan" className="mt-2" />
            </div>

            {section.examples && section.examples.length > 0 && (
              <Card className="bg-slate-50 border-slate-200">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm text-slate-500 uppercase">Examples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {section.examples.map((ex, eIdx) => (
                    <div key={eIdx} className="border-l-4 border-primary pl-4 py-1">
                      <p className="font-medium text-slate-900">{ex.en}</p>
                      <p className="text-sm text-slate-600 mt-1">{ex.id}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      {/* 2. Common Mistakes */}
      {lesson.commonMistakes && (
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="py-3 pb-2 flex flex-row items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <CardTitle className="text-sm text-amber-800 uppercase">Common Mistakes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-900">{lesson.commonMistakes.en}</p>
            <IdText text={lesson.commonMistakes.id} label="Terjemahan" className="mt-2 bg-white/60" />
          </CardContent>
        </Card>
      )}

      {/* 3. Mini Quiz */}
      <div className="pt-8 border-t">
        <h3 className="text-2xl font-bold mb-6">Mini Check</h3>
        <div className="space-y-6">
          {lesson.quiz.map((q, qIdx) => (
            <Card key={qIdx}>
              <CardHeader>
                <CardTitle className="text-lg">{q.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = quizAnswers[qIdx] === opt
                    const isCorrect = q.correctAnswer === opt
                    let variant: "outline" | "default" | "secondary" = "outline"
                    let btnClass = "justify-start py-3 text-left"

                    if (isSelected && !isQuizSubmitted) variant = "default"
                    if (isQuizSubmitted) {
                      if (isCorrect) btnClass += " border-green-500 bg-green-50 text-green-900"
                      else if (isSelected) btnClass += " border-red-500 bg-red-50 text-red-900"
                      else btnClass += " opacity-50"
                    }

                    return (
                      <Button 
                        key={oIdx}
                        variant={variant}
                        className={btnClass}
                        onClick={() => handleSelect(qIdx, opt)}
                        disabled={isQuizSubmitted}
                      >
                        {opt}
                        {isQuizSubmitted && isCorrect && <CheckCircle className="ml-auto w-4 h-4 text-green-600" />}
                        {isQuizSubmitted && isSelected && !isCorrect && <XCircle className="ml-auto w-4 h-4 text-red-600" />}
                      </Button>
                    )
                  })}
                </div>
                
                {isQuizSubmitted && (
                  <div className={`mt-4 p-4 rounded-md text-sm ${quizAnswers[qIdx] === q.correctAnswer ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
                    <span className="font-bold">Explanation: </span>
                    {q.explanation.en}
                    <IdText text={q.explanation.id} label="Penjelasan" className="mt-2 bg-white/70" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {!isQuizSubmitted && (
            <Button className="w-full" size="lg" disabled={!allAnswered} onClick={submitQuiz}>
              Check Answers
            </Button>
          )}

          {isQuizSubmitted && (
            <div className="pt-6 space-y-4">
              <div className="text-center p-6 bg-slate-100 rounded-lg">
                <h4 className="text-xl font-bold mb-2">Lesson Completed!</h4>
                <p className="text-muted-foreground mb-6">You're ready to practice what you learned.</p>
                <Link href={`/${skill}/package/${lesson.practicePackageId}`}>
                  <Button size="lg" className="w-full md:w-auto">
                    Practice Package {lesson.practicePackageId}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
