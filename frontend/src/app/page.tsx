import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="px-6 py-4 flex items-center justify-between border-b bg-white">
        <h1 className="text-2xl font-bold text-primary">ProfiPath</h1>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:underline">
            Log in
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight max-w-3xl mb-6 text-slate-900">
          Master English for your next big opportunity
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mb-10">
          AI-powered practice for TOEFL and IELTS. Improve your writing, grammar, vocabulary, and reading skills with personalized feedback.
        </p>
        <div className="flex gap-4">
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8">Start Learning for Free</Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="text-lg px-8">Sign In</Button>
          </Link>
        </div>
      </main>
      
      <footer className="py-6 text-center text-slate-500 text-sm border-t bg-white">
        © {new Date().getFullYear()} ProfiPath. All rights reserved.
      </footer>
    </div>
  )
}
