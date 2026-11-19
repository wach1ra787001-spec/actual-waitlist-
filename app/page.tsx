import { WaitlistBackground } from '@/components/waitlist/background'
import { WaitlistHero } from '@/components/waitlist/hero'
import { FloatingCards } from '@/components/waitlist/floating-cards'
import { SuggestFeature } from '@/components/waitlist/suggest-feature'
import { TrustSection } from '@/components/waitlist/trust-section'
import { WhyJNV } from '@/components/waitlist/why-jnv'
import { ScreenshotShowcase } from '@/components/waitlist/screenshot-showcase'
import { AICoachDemo } from '@/components/waitlist/ai-coach-demo'
import { JournalDemo } from '@/components/waitlist/journal-demo'
import { AccountabilityDemo } from '@/components/waitlist/accountability-demo'

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center overflow-x-hidden">
      <WaitlistBackground />

      <div className="relative z-10 w-full flex flex-col items-center gap-0">
        {/* Header */}
        <header className="w-full flex items-center justify-center pt-8 px-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-indigo-500/30">
              J
            </div>
            <span className="text-white font-semibold tracking-tight text-sm">JNV Pro</span>
          </div>
        </header>

        {/* Hero */}
        <WaitlistHero />

        {/* Floating dashboard cards */}
        <FloatingCards />

        {/* Why JNV Section */}
        <WhyJNV />

        {/* Screenshot Showcase */}
        <ScreenshotShowcase />

        {/* JnV AI Coach Demo */}
        <AICoachDemo />

        {/* Journaling trades demo */}
        <JournalDemo />

        {/* Accountability Demo Animation */}
        <AccountabilityDemo />

        {/* Suggest Feature Section */}
        <SuggestFeature />

        {/* Why Trust Us Section */}
        <TrustSection />

        {/* Footer CTA */}
        <footer className="relative z-10 w-full max-w-3xl mx-auto px-4 py-20 text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight text-balance">
            Ready to Become the Trader{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)' }}
            >
              You Set Out to Be?
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed">
            Join founding members and help shape the future of trader development.
          </p>
          <a href="/waitlist/form">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-lg shadow-xl shadow-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/60 hover:scale-105 transition-all duration-300 border border-indigo-400/30">
              Reserve Your Spot
            </button>
          </a>
          <p className="text-slate-600 text-xs pt-6 border-t border-slate-800 w-full">
            &copy; {new Date().getFullYear()} JNV Trading Journal. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  )
}
