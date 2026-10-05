import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Dashboard - ProfiPath',
  description: 'Your progress dashboard',
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 1. Average Writing Score
  const { data: writingData } = await supabase
    .from('writing_submissions')
    .select('band_score, feedback, package_id')
    .eq('user_id', user.id)

  let avgWritingScore = 0
  let writingSubmissionsCount = 0
  let writingCriteriaAvg: Record<string, { total: number, count: number }> = {
    task_achievement: { total: 0, count: 0 },
    coherence: { total: 0, count: 0 },
    lexical: { total: 0, count: 0 },
    grammar: { total: 0, count: 0 }
  }

  const completedPackages = {
    writing: new Set<number>(),
    grammar: new Set<number>(),
    reading: new Set<number>()
  }

  if (writingData && writingData.length > 0) {
    writingSubmissionsCount = writingData.length
    const totalScore = writingData.reduce((acc, row) => acc + (Number(row.band_score) || 0), 0)
    avgWritingScore = totalScore / writingSubmissionsCount

    // Calculate weak writing criteria and package tracking
    writingData.forEach(row => {
      if (row.package_id) completedPackages.writing.add(row.package_id)
      
      const fb = row.feedback as any
      if (fb) {
        ['task_achievement', 'coherence', 'lexical', 'grammar'].forEach(crit => {
          if (fb[crit] !== undefined) {
            writingCriteriaAvg[crit].total += Number(fb[crit])
            writingCriteriaAvg[crit].count += 1
          }
        })
      }
    })
  }

  // 2. Grammar Accuracy
  const { data: grammarData } = await supabase
    .from('grammar_results')
    .select('is_correct, topic, package_id')
    .eq('user_id', user.id)

  let grammarAccuracy = 0
  let grammarTotal = 0
  let topicAccuracy: Record<string, { correct: number, total: number }> = {}

  if (grammarData && grammarData.length > 0) {
    grammarTotal = grammarData.length
    const correctCount = grammarData.filter(r => r.is_correct).length
    grammarAccuracy = Math.round((correctCount / grammarTotal) * 100)

    // Calculate weak grammar topics and package tracking
    grammarData.forEach(row => {
      if (row.package_id) completedPackages.grammar.add(row.package_id)
      
      if (!topicAccuracy[row.topic]) {
        topicAccuracy[row.topic] = { correct: 0, total: 0 }
      }
      topicAccuracy[row.topic].total += 1
      if (row.is_correct) {
        topicAccuracy[row.topic].correct += 1
      }
    })
  }

  // 3. Words Learned
  const { data: vocabData } = await supabase
    .from('vocabulary_progress')
    .select('difficulty')
    .eq('user_id', user.id)
  
  let wordsLearnedCount = vocabData ? vocabData.length : 0

  // 4. Reading Score
  const { data: readingData } = await supabase
    .from('reading_sessions')
    .select('score, total_questions, package_id')
    .eq('user_id', user.id)

  let readingAccuracy = 0
  let readingTotalPassages = 0
  if (readingData && readingData.length > 0) {
    readingTotalPassages = readingData.length
    let totalScore = 0
    let totalQuestions = 0
    readingData.forEach(r => {
      if (r.package_id) completedPackages.reading.add(r.package_id)
      
      totalScore += (r.score || 0)
      totalQuestions += (r.total_questions || 5)
    })
    readingAccuracy = Math.round((totalScore / totalQuestions) * 100)
  }

  // 5. Calculate Weak Areas (Areas for Improvement)
  type WeakArea = { name: string, type: 'Grammar' | 'Writing', score: number, formatted: string }
  const weakAreas: WeakArea[] = []

  // Add grammar topics (only if they have at least 2 questions attempted)
  for (const [topic, stats] of Object.entries(topicAccuracy)) {
    if (stats.total >= 2) {
      const pct = Math.round((stats.correct / stats.total) * 100)
      if (pct < 80) { // arbitrary threshold
        weakAreas.push({ name: topic, type: 'Grammar', score: pct, formatted: `${pct}%` })
      }
    }
  }

  // Add writing criteria
  for (const [crit, stats] of Object.entries(writingCriteriaAvg)) {
    if (stats.count > 0) {
      const avg = stats.total / stats.count
      if (avg < 7.0) { // arbitrary threshold
        // Title case the criterion name
        const critName = crit.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        weakAreas.push({ name: critName, type: 'Writing', score: avg * 10, formatted: avg.toFixed(1) }) // score multiplied by 10 for sorting
      }
    }
  }

  // Sort by score ascending (lowest first)
  weakAreas.sort((a, b) => a.score - b.score)

  // Take top 5 weakest
  const topWeakAreas = weakAreas.slice(0, 5)

  // 6. Format Package Stats
  const packagesList = [1, 2, 3] // The 3 fixed packages
  const packageNames = ['1: Beginner', '2: Medium', '3: Expert']

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your progress based on your completed exercises.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Writing Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{writingSubmissionsCount > 0 ? avgWritingScore.toFixed(1) : '-'}</div>
            <p className="text-xs text-muted-foreground">
              Based on {writingSubmissionsCount} essay{writingSubmissionsCount !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Grammar Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{grammarTotal > 0 ? `${grammarAccuracy}%` : '-'}</div>
            <p className="text-xs text-muted-foreground">
              Based on {grammarTotal} question{grammarTotal !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Words Learned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wordsLearnedCount}</div>
            <p className="text-xs text-muted-foreground">
              In your flashcard deck
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reading Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readingTotalPassages > 0 ? `${readingAccuracy}%` : '-'}</div>
            <p className="text-xs text-muted-foreground">
              Average across {readingTotalPassages} passage{readingTotalPassages !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Areas for Improvement</CardTitle>
            <CardDescription>
              Based on your recent scores, focus on these topics next.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topWeakAreas.length > 0 ? (
              <ul className="space-y-4">
                {topWeakAreas.map((area, idx) => (
                  <li key={idx} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                    <div>
                      <span className="font-medium block">{area.name}</span>
                      <span className="text-xs text-muted-foreground">{area.type}</span>
                    </div>
                    <span className="text-amber-500 font-bold bg-amber-50 px-2 py-1 rounded">
                      {area.formatted}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-muted-foreground text-center py-8">
                Not enough data to calculate weak areas. Keep practicing!
              </div>
            )}
            
            <div className="mt-6 pt-4 border-t">
              <Link href="/grammar" className="block">
                <Button variant="outline" className="w-full">Practice Grammar Weaknesses</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Package Completion</CardTitle>
            <CardDescription>
              Your progress in the standard curriculum
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {packagesList.map((pkgId, i) => (
                <li key={pkgId} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                  <span className="font-medium">Package {packageNames[i]}</span>
                  <div className="flex gap-2">
                    <span className={`text-xs px-2 py-1 rounded border ${completedPackages.grammar.has(pkgId) ? 'bg-green-100 text-green-800 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>Grammar</span>
                    <span className={`text-xs px-2 py-1 rounded border ${completedPackages.reading.has(pkgId) ? 'bg-green-100 text-green-800 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>Reading</span>
                    <span className={`text-xs px-2 py-1 rounded border ${completedPackages.writing.has(pkgId) ? 'bg-green-100 text-green-800 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>Writing</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
