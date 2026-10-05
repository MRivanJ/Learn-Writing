import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PACKAGES, LEVEL_COLORS } from '@/data/packages'

export const metadata: Metadata = {
  title: 'Reading Comprehension - ProfiPath',
  description: 'Practice your English reading skills',
}

export default function ReadingMenuPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reading Comprehension</h2>
        <p className="text-muted-foreground">
          Complete standardized passages or generate random ones.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Standard Packages</h3>
        <p className="text-muted-foreground text-sm">Read the passages and answer questions.</p>
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
                <Link href={`/reading/package/${pkg.id}`} className="block w-full">
                  <Button className="w-full">Start Test</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold mt-8">Free Practice (AI Generated)</h3>
        <p className="text-muted-foreground text-sm">Generate random academic passages for infinite practice.</p>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Random Academic Topic</CardTitle>
            <CardDescription>1 passage, 5 questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/reading/free" className="block w-full max-w-xs">
              <Button className="w-full" variant="outline">Generate Passage</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
