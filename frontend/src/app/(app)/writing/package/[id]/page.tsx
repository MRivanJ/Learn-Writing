'use client'

import { useState, use } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { IdText } from '@/components/id-text'
import { PromptVisualCard, describeVisual } from '@/components/prompt-visual'
import { WRITING_PACKAGES, type WritingPrompt } from '@/data/writing-packages'
import { getPackage } from '@/data/packages'

export default function WritingPackagePage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const idStr = params.id
  const idNum = parseInt(idStr)
  
  const pkgMeta = getPackage(idNum)
  const prompts: WritingPrompt[] = WRITING_PACKAGES[idNum] || []
  const promptData = prompts[0] // 1 prompt per package for now
  
  const [essay, setEssay] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const wordCount = essay.trim().split(/\s+/).filter(w => w.length > 0).length

  if (!pkgMeta || !promptData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Package Not Found</h2>
        <Link href="/writing" className="mt-4 inline-block">
          <Button variant="outline">Back to packages</Button>
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
          promptType: promptData.id,
          promptText: promptData.text + (promptData.visual ? '\n\n' + describeVisual(promptData.visual) : ''),
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
          prompt_type: promptData.id,
          prompt_text: promptData.text,
          essay_text: essay,
          band_score: data.band_score,
          feedback: data.feedback,
          package_id: idNum
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
          Back to packages
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Package {idNum}: {pkgMeta.label}</h2>
        <p className="text-muted-foreground mb-4">
          {pkgMeta.description.en}
        </p>
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

          {promptData.visual && <PromptVisualCard visual={promptData.visual} />}

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
              <Link href="/writing">
                <Button variant="outline">Back to Packages</Button>
              </Link>
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
                  </p><IdText text={feedback.feedback.overall_comments_id} label="Komentar (Indonesia)" />
                </div>

                {/* Grammar Errors */}
                {feedback.feedback.errors && feedback.feedback.errors.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase text-slate-500">Suggested Corrections</h4>
                    <ul className="space-y-3">
                      {feedback.feedback.errors.map((err: any, idx: number) => (
                        <li key={idx} className="bg-red-50 p-3 rounded-md text-sm border border-red-100">
                          <div className="line-through text-red-600/70 mb-1">{err.original}</div>
                          <div className="text-green-700 font-medium">{err.correction}</div>
                          {err.explanation && <div className="mt-1 text-slate-600 text-xs">{err.explanation}</div>}
                          {err.explanation_id && <div className="mt-1 text-slate-500 text-xs italic">{err.explanation_id}</div>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg p-6 text-center text-slate-400">
              Submit your essay to see detailed feedback, scoring, and suggested corrections here.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
