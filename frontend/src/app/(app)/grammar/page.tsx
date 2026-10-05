import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Grammar Drills - ProfiPath',
  description: 'Practice your English grammar',
}

export default function GrammarPage() {
  const topics = [
    'Tenses',
    'Articles',
    'Prepositions',
    'Conditionals',
    'Passive Voice',
    'Subject-Verb Agreement'
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Grammar Drills</h2>
        <p className="text-muted-foreground">
          Select a topic to practice with AI-generated questions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics.map(topic => (
          <Card key={topic}>
            <CardHeader>
              <CardTitle>{topic}</CardTitle>
              <CardDescription>5 questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/grammar/${encodeURIComponent(topic)}`} className="block w-full">
                <Button className="w-full" variant="outline">Start Drill</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
