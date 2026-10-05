'use client'

import { useState, use } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { DataTable } from '@/components/prompt-visual'
import { IdText } from '@/components/id-text'
import { GlossaryText } from '@/components/glossary-text'
import { READING_PACKAGES, type ReadingPassage } from '@/data/reading-packages'
import { getPackage } from '@/data/packages'

export default function ReadingPackagePage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const idStr = params.id
  const idNum = parseInt(idStr)
  
  const pkgMeta = getPackage(idNum)
  const passages: ReadingPassage[] = READING_PACKAGES[idNum] || []
  const passage = passages[0] // We only have 1 passage per package for now
  
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  if (!pkgMeta || !passage) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Package Not Found</h2>
        <Link href="/reading" className="mt-4 inline-block">
          <Button variant="outline">Back to packages</Button>
        </Link>
      </div>
    )
  }

  const handleSelectAnswer = (qId: string, option: string) => {
    if (isSubmitted) return
    setAnswers(prev => ({ ...prev, [qId]: option }))
  }

  const handleSubmit = async () => {
    setIsSubmitted(true)
    
    let currentScore = 0
    passage.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        currentScore += 1
      }
    })
    setScore(currentScore)

    // Save to supabase
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const totalQuestions = passage.questions.length
      supabase.from('reading_sessions').insert({
        user_id: user.id,
        passage_text: passage.title,
        score: currentScore,
        total_questions: totalQuestions,
        package_id: idNum
      }).then()
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/reading" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to packages
        </Link>
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Package {idNum}: {pkgMeta.label}</h2>
          <p className="text-muted-foreground">
            {pkgMeta.description.en}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Passage Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold font-serif">{passage.title}</h3>
          <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed font-serif text-lg">
            {passage.content.split(/\n\s*\n/).map((paragraph, idx) => (
              <p key={idx} className="mb-4">
                <GlossaryText text={paragraph} glossary={passage.glossary} />
              </p>
            ))}
          </div>
          {passage.table && <DataTable table={passage.table} />}
        </div>

        {/* Questions Section */}
        <div className="space-y-8">
          {isSubmitted && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-center text-blue-900 mb-2">Score: {score} / {passage.questions.length}</h3>
                <p className="text-center text-blue-700 text-sm">Review your answers below.</p>
              </CardContent>
            </Card>
          )}

          {passage.questions.map((q, idx) => (
            <Card key={q.id}>
              <CardHeader>
                <CardTitle className="text-lg leading-snug">
                  <span className="text-muted-foreground mr-2">{idx + 1}.</span> 
                  {q.text}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2">
                  {q.options.map((option, optIdx) => {
                    const isSelected = answers[q.id] === option
                    const isCorrect = q.correctAnswer === option
                    
                    let btnClass = "justify-start h-auto py-3 text-left whitespace-normal"
                    let variant: "outline" | "default" | "secondary" = "outline"
                    
                    if (isSelected && !isSubmitted) variant = "default"
                    
                    if (isSubmitted) {
                      if (isCorrect) btnClass += " border-green-500 bg-green-50 text-green-900"
                      else if (isSelected) btnClass += " border-red-500 bg-red-50 text-red-900"
                      else btnClass += " opacity-50"
                    }
                    
                    return (
                      <Button 
                        key={optIdx} 
                        variant={variant}
                        className={btnClass}
                        onClick={() => handleSelectAnswer(q.id, option)}
                        disabled={isSubmitted}
                      >
                        <span className="font-semibold mr-4 text-slate-400">{String.fromCharCode(65 + optIdx)}</span>
                        {option}
                        
                        {isSubmitted && isCorrect && <CheckCircle className="ml-auto h-5 w-5 text-green-600" />}
                        {isSubmitted && isSelected && !isCorrect && <XCircle className="ml-auto h-5 w-5 text-red-600" />}
                      </Button>
                    )
                  })}
                </div>
                
                {isSubmitted && (
                  <div className={`mt-4 p-4 rounded-md text-sm ${answers[q.id] === q.correctAnswer ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
                    <span className="font-bold">Explanation: </span>
                    {q.explanation}
                    <IdText text={q.explanationId} label="Penjelasan" className="bg-white/70" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {!isSubmitted && Object.keys(answers).length === passage.questions.length && (
            <Button size="lg" className="w-full" onClick={handleSubmit}>
              Submit Answers
            </Button>
          )}
          {isSubmitted && (
             <Link href="/reading" className="block w-full mt-4">
               <Button className="w-full" variant="outline">Back to Packages</Button>
             </Link>
          )}
        </div>
      </div>
    </div>
  )
}
