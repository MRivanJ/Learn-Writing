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
import { PromptVisualCard, describeVisual, type PromptVisual } from '@/components/prompt-visual'

// Pre-defined prompts for MVP
const PROMPTS: Record<string, { title: string; text: string; visual?: PromptVisual }> = {
  'ielts-task1': {
    title: 'IELTS Task 1',
    text: 'The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying full-time or part-time. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    visual: {
      chart: {
        title: 'Students in further education in Britain (thousands)',
        yLabel: 'Thousands of students',
        xKey: 'period',
        series: ['Men full-time', 'Men part-time', 'Women full-time', 'Women part-time'],
        data: [
          { period: '1970/71', 'Men full-time': 100, 'Men part-time': 1000, 'Women full-time': 70, 'Women part-time': 750 },
          { period: '1980/81', 'Men full-time': 110, 'Men part-time': 800, 'Women full-time': 130, 'Women part-time': 1100 },
          { period: '1990/91', 'Men full-time': 130, 'Men part-time': 650, 'Women full-time': 200, 'Women part-time': 1400 },
        ],
      },
      table: {
        caption: 'Same data in table form (thousands)',
        headers: ['Period', 'Men full-time', 'Men part-time', 'Women full-time', 'Women part-time'],
        rows: [
          ['1970/71', 100, 1000, 70, 750],
          ['1980/81', 110, 800, 130, 1100],
          ['1990/91', 130, 650, 200, 1400],
        ],
      },
    },
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
    visual: {
      texts: [
        {
          heading: 'Reading Passage: The Decline of the Bee Population',
          body: 'Bee populations around the world have been falling sharply, and scientists have proposed three main explanations.\n\nFirst, pesticides called neonicotinoids are widely used on crops. These chemicals are absorbed by plants and found in pollen and nectar, where they damage the nervous systems of bees and weaken their ability to navigate back to the hive.\n\nSecond, the Varroa mite, a parasite that attaches to bees and feeds on them, has spread to nearly every continent. Infested colonies lose workers quickly and often collapse within a few seasons.\n\nThird, the loss of natural habitat has reduced the variety of flowering plants available. Bees that rely on a narrow diet become malnourished and are more vulnerable to disease.',
        },
        {
          heading: 'Lecture Transcript (summary of what you "listened" to)',
          body: 'Professor: The reading makes the problem sound simple, but the evidence is more complicated.\n\nTake pesticides. Laboratory studies used doses far higher than bees meet in real fields. In field trials with realistic doses, many colonies showed no measurable harm, and some countries that banned neonicotinoids saw their bee losses continue.\n\nAs for the Varroa mite, it is true that it is widespread, but beekeepers have developed effective treatments. Colonies that are monitored and treated regularly survive at rates close to normal, so the mite alone cannot explain the global decline.\n\nFinally, habitat loss. Honeybees are managed by people and are moved to wherever flowers are abundant, so they are not limited by local habitat. If anything, habitat loss matters more for wild bees than for the honeybees counted in most decline statistics.',
        },
      ],
    },
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
  const wordCount = essay.trim().split(/\s+/).filter(w => w.length > 0).length

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
                          <div className="text-green-700 font-medium mb-1">→ {err.correction}</div>
                          <div className="text-xs text-slate-600">{err.explanation}</div>
                          <IdText text={err.explanation_id} label="Penjelasan" className="text-xs" />
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
