import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Writing Practice - ProfiPath',
  description: 'Practice your writing skills for IELTS and TOEFL',
}

export default function WritingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Writing Practice</h2>
        <p className="text-muted-foreground">
          Select a prompt to start writing and receive AI-powered feedback.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>IELTS Task 1</CardTitle>
            <CardDescription>Describe a chart, graph, or diagram</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">Practice summarizing visual information in 150+ words.</p>
            <Link href="/writing/ielts-task1" className="block w-full">
              <Button className="w-full">Start Practice</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>IELTS Task 2</CardTitle>
            <CardDescription>Write an opinion essay</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">Practice writing a discursive essay in 250+ words.</p>
            <Link href="/writing/ielts-task2" className="block w-full">
              <Button className="w-full">Start Practice</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TOEFL Independent</CardTitle>
            <CardDescription>Express your opinion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">Write an essay based on your own experience and opinion.</p>
            <Link href="/writing/toefl-independent" className="block w-full">
              <Button className="w-full">Start Practice</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TOEFL Integrated</CardTitle>
            <CardDescription>Read, listen, and write</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">Summarize points from a passage and lecture.</p>
            <Link href="/writing/toefl-integrated" className="block w-full">
              <Button className="w-full">Start Practice</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
