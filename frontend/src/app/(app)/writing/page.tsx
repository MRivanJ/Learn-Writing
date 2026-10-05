import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PACKAGES, LEVEL_COLORS } from '@/data/packages'

export const metadata: Metadata = {
  title: 'Writing Practice - ProfiPath',
  description: 'Practice your writing skills for IELTS and TOEFL',
}

export default function WritingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Writing Practice</h2>
        <p className="text-muted-foreground">
          Complete standardized writing packages or select a specific prompt format.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Standard Packages</h3>
        <p className="text-muted-foreground text-sm">Write essays and get graded with AI feedback.</p>
        <div className="grid gap-4 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <Card key={pkg.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Package {pkg.id}</CardTitle>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${LEVEL_COLORS[pkg.level]}`}>
                    {pkg.label}
                  </span>
                </div>
                <CardDescription className="min-h-[40px] mt-2">
                  <span className="block">{pkg.description.en}</span>
                  <span className="block text-xs mt-1 opacity-70 italic">{pkg.description.id}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link href={`/writing/package/${pkg.id}`} className="block w-full">
                  <Button className="w-full">Start Writing</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold mt-8">Free Practice</h3>
        <p className="text-muted-foreground text-sm">Select a specific exam format to practice.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>IELTS Task 1</CardTitle>
              <CardDescription>Describe a chart, graph, or diagram</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">Practice summarizing visual information in 150+ words.</p>
              <Link href="/writing/ielts-task1" className="block w-full">
                <Button className="w-full" variant="outline">Start Practice</Button>
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
                <Button className="w-full" variant="outline">Start Practice</Button>
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
                <Button className="w-full" variant="outline">Start Practice</Button>
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
                <Button className="w-full" variant="outline">Start Practice</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
