'use client'

import { useState, useEffect, use } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Question = {
  id: string
  text: string
  options: string[]
  correctAnswer: string
  explanation: string
}

export default function GrammarDrillPage(props: { params: Promise<{ topic: string }> }) {
  const params = use(props.params)
  const topic = decodeURIComponent(params.topic)
  
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await fetch('/api/ai/grammar-drill', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic })
        })
        const data = await res.json()
        
        if (!res.ok) throw new Error(data.error || 'Failed to load')
        
        setQuestions(data.questions)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadQuestions()
  }, [topic])

  const handleSelect = (option: string) => {
    if (isAnswered) return
    setSelectedOption(option)
  }

  const handleCheck = async () => {
    if (!selectedOption) return
    
    setIsAnswered(true)
    const currentQ = questions[currentIndex]
    const isCorrect = selectedOption === currentQ.correctAnswer
    
    if (isCorrect) {
      setScore(s => s + 1)
    }

    // Save result in background
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      supabase.from('grammar_results').insert({
        user_id: user.id,
        question_text: currentQ.text,
        correct_answer: currentQ.correctAnswer,
        user_answer: selectedOption,
        is_correct: isCorrect,
        topic: topic
      }).then()
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setIsComplete(true)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Generating questions for {topic}...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
        <p className="text-muted-foreground">{error}</p>
        <Link href="/grammar" className="mt-4 inline-block">
          <Button variant="outline">Back to topics</Button>
        </Link>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Drill Complete!</CardTitle>
            <CardDescription>Topic: {topic}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-6xl font-bold text-primary">
              {score} / {questions.length}
            </div>
            <p className="text-lg text-muted-foreground">
              {score === questions.length ? 'Perfect score! Great job.' : 'Keep practicing to improve.'}
            </p>
            <Link href="/grammar" className="block w-full mt-8">
              <Button className="w-full">Choose Another Topic</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQ = questions[currentIndex]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <Link href="/grammar" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to topics
        </Link>
        <div className="text-sm font-medium text-slate-500">
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="leading-relaxed text-xl">{currentQ.text}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {currentQ.options.map((option, i) => {
              const isSelected = selectedOption === option
              const isCorrect = option === currentQ.correctAnswer
              
              let variant: "outline" | "default" | "destructive" | "secondary" = "outline"
              if (isSelected && !isAnswered) variant = "default"
              
              let borderClass = ""
              if (isAnswered) {
                if (isCorrect) borderClass = "border-green-500 bg-green-50 text-green-900"
                else if (isSelected) borderClass = "border-red-500 bg-red-50 text-red-900"
                else borderClass = "opacity-50"
              }

              return (
                <Button 
                  key={i}
                  variant={variant}
                  className={`justify-start h-auto py-3 px-4 text-left whitespace-normal ${borderClass}`}
                  onClick={() => handleSelect(option)}
                  disabled={isAnswered}
                >
                  <span className="font-semibold mr-4 text-slate-400">{String.fromCharCode(65 + i)}</span>
                  {option}
                  
                  {isAnswered && isCorrect && <CheckCircle className="ml-auto h-5 w-5 text-green-600" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="ml-auto h-5 w-5 text-red-600" />}
                </Button>
              )
            })}
          </div>

          {!isAnswered ? (
            <div className="pt-4 flex justify-end">
              <Button onClick={handleCheck} disabled={!selectedOption}>Check Answer</Button>
            </div>
          ) : (
            <div className="pt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className={`p-4 rounded-md text-sm ${selectedOption === currentQ.correctAnswer ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
                <strong>Explanation: </strong>
                {currentQ.explanation}
              </div>
              <div className="flex justify-end">
                <Button onClick={handleNext}>
                  {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
