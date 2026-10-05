import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { LanguageProvider } from '@/lib/language'
import { LanguageToggle } from '@/components/language-toggle'
import { LayoutDashboard, PenTool, BookOpen, Library, BookText, LogOut, GraduationCap } from 'lucide-react'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Learn', href: '/learn', icon: GraduationCap },
    { name: 'Writing', href: '/writing', icon: PenTool },
    { name: 'Grammar', href: '/grammar', icon: BookOpen },
    { name: 'Vocabulary', href: '/vocabulary', icon: Library },
    { name: 'Reading', href: '/reading', icon: BookText },
  ]

  return (
    <LanguageProvider>
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">ProfiPath</h1>
          <p className="text-sm text-slate-400 mt-1">Hello, {profile?.display_name || 'Student'}</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <LanguageToggle />
        </div>
        <div className="p-4 border-t border-slate-800">
          <form action="/auth/signout" method="post">
            <button className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors w-full text-left text-slate-400 hover:text-white">
              <LogOut className="w-5 h-5" />
              <span>Sign out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-slate-50 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
    </LanguageProvider>
  )
}
