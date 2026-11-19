'use client'

import Link from 'next/link'
import { WaitlistBackground } from '@/components/waitlist/background'
import { WaitlistForm } from '@/components/waitlist/waitlist-form'

export default function WaitlistFormPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center overflow-x-hidden">
      <WaitlistBackground />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Header */}
        <header className="w-full flex items-center justify-between pt-8 px-6">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-indigo-500/30">
              J
            </div>
            <span className="text-white font-semibold tracking-tight text-sm">JNV | PRO</span>
          </Link>
          <Link
            href="/"
            className="text-slate-400 hover:text-slate-300 text-sm transition-colors"
          >
            Back
          </Link>
        </header>

        {/* Waitlist form */}
        <section className="w-full pb-24 pt-8">
          <WaitlistForm />
        </section>

        {/* Footer */}
        <footer className="relative z-10 pb-8 text-center">
          <p className="text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} JNV Trading Journal. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  )
}
