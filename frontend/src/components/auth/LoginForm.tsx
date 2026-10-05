'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [guestLoading, setGuestLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.message.toLowerCase().includes('email not confirmed')) {
        setError('Email belum dikonfirmasi. Anda dapat mematikan "Confirm email" di Supabase Dashboard (Auth > Providers > Email) atau gunakan tombol "Masuk sebagai Tamu" di bawah.')
      } else {
        setError(error.message)
      }
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  const handleGuestLogin = async () => {
    setGuestLoading(true)
    setError(null)

    try {
      // 1. Coba Anonymous Login terlebih dahulu
      const { data: anonData, error: anonError } = await supabase.auth.signInAnonymously()
      if (!anonError && anonData?.user) {
        router.push('/dashboard')
        router.refresh()
        return
      }

      // 2. Jika Anonymous auth belum diaktifkan di Supabase, gunakan akun demo lokal
      const demoEmail = 'tamu@profipath.local'
      const demoPassword = 'DemoPassword123!'

      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: demoPassword,
      })

      if (!signInErr) {
        router.push('/dashboard')
        router.refresh()
        return
      }

      // 3. Jika akun demo belum pernah dibuat, daftarkan otomatis
      const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
        email: demoEmail,
        password: demoPassword,
        options: {
          data: {
            display_name: 'Tamu / Demo User',
          },
        },
      })

      if (!signUpErr && signUpData?.session) {
        router.push('/dashboard')
        router.refresh()
        return
      }

      if (anonError) {
        setError(
          `Untuk login tanpa email: Buka Supabase Dashboard > Authentication > Providers > Aktifkan "Anonymous Sign-ins", atau matikan "Confirm email" di tab Email.`
        )
      } else {
        setError('Gagal masuk tamu. Pastikan izin auth di Supabase telah diatur.')
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan saat masuk tamu'
      setError(message)
    } finally {
      setGuestLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-bold">Sign in</CardTitle>
        <CardDescription className="text-center">
          Masuk ke akun Anda atau langsung gunakan mode Tamu
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription className="text-sm leading-relaxed">{error}</AlertDescription>
          </Alert>
        )}

        <Button 
          type="button" 
          variant="outline" 
          className="w-full border-dashed border-2 py-5 font-semibold text-slate-700 hover:bg-slate-100 hover:border-slate-400 flex items-center justify-center gap-2"
          onClick={handleGuestLogin}
          disabled={loading || guestLoading}
        >
          {guestLoading ? (
            'Menyiapkan sesi tamu...'
          ) : (
            <>
              <span>⚡</span>
              <span>Masuk sebagai Tamu (Tanpa Daftar)</span>
            </>
          )}
        </Button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500 font-medium">atau masuk dengan email</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="nama@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <Button className="w-full" type="submit" disabled={loading || guestLoading}>
            {loading ? 'Sedang masuk...' : 'Sign in'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="text-sm text-center text-muted-foreground w-full">
          Belum punya akun?{' '}
          <Link href="/signup" className="text-primary font-medium hover:underline">
            Daftar baru
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

