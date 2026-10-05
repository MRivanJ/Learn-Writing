'use client'

import { useState, use } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

// Pre-defined prompts for MVP
const PROMPTS: Record<string, { title: string; text: string }> = {
  'ielts-task1': {
    title: 'IELTS Task 1',
    text: 'The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying full-time or part-time. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
  },
  'ielts-task2': {
    title: 'IELTS Task 2',
    text: 'Some people believe that unpaid community service should be a compulsory part of high school programmes (for example working for a charity, improving the neighbourhood or teaching sports to younger children). To what extent do you agree or disagree?',
  },
  'toefl-independent': {
    title: 'TOEFL Independent',
    text: 'Do you agree or disagree with the following statement? It is better to use printed material such as books and articles to do research than it is to use the internet. Use specific reasons and examples to support your answer.',
  },
  'toefl-integrated': {
    title: 'TOEFL Integrated',
    text: 'Read the passage about the decline of the bee population. Then, write an essay summarizing the points made in the lecture you listened to, explaining how they cast doubt on the points made in the reading passage.',
  }
}

export default function WritingEditorPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const id = params.id
  
  const [essay, setEssay] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const promptData = PROMPTS[id]
  const wordCount = essay.trim().split(/\\s+/).filter(w => w.length > 0).length

  if (!promptData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Prompt not found</h2>
        <Link href="/writing" className="text-primary hover:underline mt-4 inline-block">
          Return to Writing Practice
        </Link>
      </div>
    )
  }

  const handleSubmit = async () => {
    if (wordCount < 50) {
      setError("Your essay is too short to be evaluated accurately. Please write at least 50 words.")
      return
    }

    setIsSubmitting(true)
    setError(null)
    setFeedback(null)

    try {
      // Get AI Feedback
      const response = await fetch('/api/ai/grade-essay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptType: id,
          promptText: promptData.text,
          essayText: essay
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to grade essay')
      }

      setFeedback(data)

      // Save to Supabase
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        await supabase.from('writing_submissions').insert({
          user_id: user.id,
          prompt_type: id,
          prompt_text: promptData.text,
          essay_text: essay,
          band_score: data.band_score,
          feedback: data.feedback
        })
      }

    } catch (err: any) {
      console.error(err)
      setError(err.message || 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <Link href="/writing" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to prompts
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">{promptData.title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Editor Section */}
        <div className="md:col-span-1 lg:col-span-2 space-y-4">
          <Card className="bg-slate-50 border-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm uppercase text-muted-foreground tracking-wider">Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-slate-800 leading-relaxed">{promptData.text}</p>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="relative">
            <Textarea 
              placeholder="Start writing your essay here..."
              className="min-h-[400px] text-base p-4 resize-y leading-relaxed font-serif"
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              disabled={isSubmitting || !!feedback}
            />
            <div className="absolute bottom-4 right-4 text-xs font-medium text-muted-foreground bg-white/80 px-2 py-1 rounded">
              {wordCount} words
            </div>
          </div>

          {!feedback ? (
            <div className="flex justify-end">
              <Button onClick={handleSubmit} disabled={isSubmitting || wordCount === 0}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Evaluating...' : 'Submit for Feedback'}
              </Button>
            </div>
          ) : (
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => { setFeedback(null); setEssay(''); }}>
                Write Another Essay
              </Button>
            </div>
          )}
        </div>

        {/* Feedback Panel */}
        <div className="md:col-span-1 lg:col-span-1">
          {feedback ? (
            <Card className="border-green-200 shadow-md">
              <CardHeader className="bg-green-50/50 pb-4 border-b">
                <CardTitle className="flex items-center text-green-800">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
                  Evaluation Ready
                </CardTitle>
                <div className="mt-4 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-slate-900">{feedback.band_score}</span>
                  <span className="text-sm font-medium text-slate-500 uppercase mt-1">Overall Score</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Sub Scores */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase text-slate-500">Criteria Scores</h4>
                  
                  {['task_achievement', 'coherence', 'lexical', 'grammar'].map(criterion => {
                    if (feedback.feedback[criterion] === undefined) return null;
                    return (
                      <div key={criterion} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{criterion.replace('_', ' ')}</span>
                        <span className="font-medium">{feedback.feedback[criterion]}</span>
                      </div>
                    )
                  })}
                </div>

                {/* Overall Comments */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm uppercase text-slate-500">Overall Comments</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {feedback.feedback.overall_comments}
                  </p>
                </div>

                {/* Grammar Errors */}
                {feedback.feedback.errors && feedback.feedback.errors.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase text-slate-500">Suggested Corrections</h4>
                    <ul className="space-y-3">
                      {feedback.feedback.errors.map((err: any, idx: number) => (
                        <li key={idx} className="bg-red-50 p-3 rounded-md text-sm border border-red-100">
                          <div className="line-through text-red-600/70 mb-1">{err.original}</div>
                          <div className="text-green-700 font-medium mb-1">→ {err.correction}</div>
                          <div className="text-xs text-slate-600">{err.explanation}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full bg-slate-50 border-dashed shadow-none">
              <CardContent className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-8">
                <p>Submit your essay to see detailed feedback, band score, and grammar corrections here.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
