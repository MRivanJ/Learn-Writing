import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, PenTool, BookText, Library } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Learn - ProfiPath',
  description: 'Learn Grammar, Writing, Reading, and Vocabulary',
}

const SKILLS = [
  { id: 'grammar', name: 'Grammar', icon: BookOpen, description: 'Learn tenses, clauses, and structures.' },
  { id: 'writing', name: 'Writing', icon: PenTool, description: 'Master essay structure and academic tasks.' },
  { id: 'reading', name: 'Reading', icon: BookText, description: 'Improve comprehension and speed.' },
  { id: 'vocabulary', name: 'Vocabulary', icon: Library, description: 'Expand your academic word list.' },
]

const LEVELS = [
  { id: 'beginner', name: 'Beginner', color: 'bg-green-100 text-green-800' },
  { id: 'medium', name: 'Medium', color: 'bg-amber-100 text-amber-800' },
  { id: 'expert', name: 'Expert', color: 'bg-red-100 text-red-800' },
]

export default function LearnPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Learn</h2>
        <p className="text-muted-foreground">
          Study lessons first, then practice what you've learned.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {SKILLS.map((skill) => (
          <Card key={skill.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <skill.icon className="w-5 h-5" />
                {skill.name}
              </CardTitle>
              <CardDescription>{skill.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-3">
                {LEVELS.map(level => (
                  <Link href={`/learn/${skill.id}/${level.id}`} key={level.id} className="w-full">
                    <Button variant="outline" className="w-full justify-between">
                      <span>{level.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${level.color}`}>
                        View Lessons
                      </span>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
