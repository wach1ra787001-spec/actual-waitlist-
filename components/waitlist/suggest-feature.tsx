'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'

export function SuggestFeature() {
  const [isOpen, setIsOpen] = useState(false)
  const [suggestion, setSuggestion] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), suggestion: suggestion.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage({ type: 'error', text: data.error || 'Failed to submit suggestion.' })
        return
      }

      setMessage({ type: 'success', text: data.message })
      setSuggestion('')
      setEmail('')
      setTimeout(() => {
        setIsOpen(false)
        setMessage(null)
      }, 2000)
    } catch (error) {
      console.error('[v0] Error submitting suggestion:', error)
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative z-10 w-full px-4 py-16 md:py-20">
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.button
              key="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={() => setIsOpen(true)}
              className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600/20 to-indigo-500/20 border border-indigo-400/30 text-white font-semibold hover:from-indigo-600/30 hover:to-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
            >
              ✨ Suggest a Feature
            </motion.button>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/20 to-indigo-800/10 border border-indigo-400/20 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Share Your Idea</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">Your Suggestion</label>
                  <textarea
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    placeholder="Tell us what feature would make JNV Pro even better..."
                    className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-colors resize-none h-24"
                    required
                  />
                </div>

                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg text-sm font-medium ${
                      message.type === 'success'
                        ? 'bg-green-900/30 border border-green-500/30 text-green-300'
                        : 'bg-red-900/30 border border-red-500/30 text-red-300'
                    }`}
                  >
                    {message.text}
                  </motion.div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    {isLoading ? 'Sending...' : 'Submit'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                      setSuggestion('')
                      setEmail('')
                      setMessage(null)
                    }}
                    disabled={isLoading}
                    className="px-4 py-3 rounded-lg bg-slate-700/30 border border-slate-600/50 text-slate-300 font-semibold hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
