'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, RefreshCw } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Word = {
  word: string
  definition: string
  example: string
  synonyms: string[]
  partOfSpeech: string
}

export default function VocabularyPage() {
  const [words, setWords] = useState<Word[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWords = async () => {
    setLoading(true)
    setError(null)
    setIsFlipped(false)
    setCurrentIndex(0)
    
    try {
      const res = await fetch('/api/ai/vocabulary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: 'advanced' })
      })
      const data = await res.json()
      
      if (!res.ok) throw new Error(data.error || 'Failed to load')
      setWords(data.words)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWords()
  }, [])

  const handleDifficulty = async (difficulty: 'easy' | 'medium' | 'hard') => {
    const currentWord = words[currentIndex]
    
    // Save to supabase (fire and forget)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      // Calculate next review based on basic spaced repetition logic
      let daysToAdd = 1
      if (difficulty === 'easy') daysToAdd = 4
      else if (difficulty === 'medium') daysToAdd = 2
      
      const nextReview = new Date()
      nextReview.setDate(nextReview.getDate() + daysToAdd)

      supabase.from('vocabulary_progress').upsert({
        user_id: user.id,
        word: currentWord.word,
        difficulty,
        next_review_at: nextReview.toISOString()
      }, { onConflict: 'user_id,word' }).then()
    }

    // Move to next word
    if (currentIndex < words.length - 1) {
      setIsFlipped(false)
      setCurrentIndex(i => i + 1)
    } else {
      // Out of words in this batch, fetch more
      fetchWords()
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Curating your vocabulary list...</p>
      </div>
    )
  }

  if (error || words.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
        <p className="text-muted-foreground">{error || 'No words found.'}</p>
        <Button onClick={fetchWords} className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    )
  }

  const currentWord = words[currentIndex]

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Vocabulary Builder</h2>
        <p className="text-muted-foreground mt-2">
          Master academic words for your exams.
        </p>
      </div>

      <div className="flex justify-between text-sm text-muted-foreground font-medium px-2">
        <span>Word {currentIndex + 1} of {words.length}</span>
      </div>

      <div className="perspective-1000">
        <Card 
          className={`w-full min-h-[350px] relative cursor-pointer transition-all duration-500 transform-style-3d shadow-md hover:shadow-lg ${isFlipped ? 'rotate-x-180' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of card */}
          <div className={`absolute inset-0 backface-hidden flex flex-col items-center justify-center bg-white rounded-lg p-6 ${isFlipped ? 'invisible' : 'visible'}`}>
            <h3 className="text-5xl font-bold text-slate-900 mb-4">{currentWord.word}</h3>
            <p className="text-sm text-slate-400 font-medium animate-pulse">(Click to flip)</p>
          </div>

          {/* Back of card */}
          <div className={`absolute inset-0 backface-hidden rotate-x-180 flex flex-col justify-center bg-slate-50 rounded-lg p-8 border-t-4 border-t-primary ${!isFlipped ? 'invisible' : 'visible'}`}>
            <div className="space-y-6">
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="text-3xl font-bold text-slate-900">{currentWord.word}</h3>
                  <span className="text-sm italic text-slate-500">{currentWord.partOfSpeech}</span>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">{currentWord.definition}</p>
              </div>
              
              <div className="bg-white p-4 rounded-md border border-slate-200">
                <span className="text-xs uppercase font-bold text-slate-400 mb-1 block">Example</span>
                <p className="italic text-slate-600">"{currentWord.example}"</p>
              </div>

              {currentWord.synonyms && currentWord.synonyms.length > 0 && (
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 mr-2">Synonyms:</span>
                  <span className="text-sm text-slate-600">{currentWord.synonyms.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {isFlipped && (
        <div className="flex flex-col sm:flex-row gap-3 pt-6 animate-in slide-in-from-bottom-4">
          <Button 
            onClick={(e) => { e.stopPropagation(); handleDifficulty('hard'); }}
            variant="outline" 
            className="flex-1 py-6 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            Hard (Review Soon)
          </Button>
          <Button 
            onClick={(e) => { e.stopPropagation(); handleDifficulty('medium'); }}
            variant="outline" 
            className="flex-1 py-6 text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
          >
            Medium
          </Button>
          <Button 
            onClick={(e) => { e.stopPropagation(); handleDifficulty('easy'); }}
            variant="outline" 
            className="flex-1 py-6 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
          >
            Easy (Got it!)
          </Button>
        </div>
      )}
    </div>
  )
}
