"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  CheckCircle2,
  Mail,
  MessageSquareText,
  ShieldAlert,
  Sparkles,
  UserRound,
} from "lucide-react";

const steps = [
  {
    id: "breach",
    label: "Rule breach detected",
    title: "You broke one of your rules.",
    description:
      "JNV catches the breach immediately and surfaces it before it gets ignored.",
    icon: ShieldAlert,
    accent: "from-rose-500/30 to-orange-500/20",
    emailSubject: "Rule breach detected",
    emailBody:
      "You entered a trade outside your setup. Log in now and review the mistake before your next session.",
    journalPrompt: null,
    aiReply: null,
  },
  {
    id: "email",
    label: "Email notification",
    title: "An accountability email lands in the inbox.",
    description:
      "The trader gets an immediate nudge to review the decision instead of brushing it off.",
    icon: Mail,
    accent: "from-sky-500/30 to-cyan-500/20",
    emailSubject: "Action required: rule breach",
    emailBody:
      "Your last trade violated your rules. Open JNV, explain the mistake, and review the decision path.",
    journalPrompt: null,
    aiReply: null,
  },
  {
    id: "login",
    label: "Login + reflection",
    title: "The trader logs in and explains the mistake.",
    description:
      "JNV forces reflection with structured prompts that make the error impossible to skip.",
    icon: UserRound,
    accent: "from-violet-500/30 to-indigo-500/20",
    emailSubject: null,
    emailBody: null,
    journalPrompt: {
      prompt: "Why did you take this trade outside your setup?",
      bullets: [
        "What rule did you ignore?",
        "What emotion was driving the decision?",
        "What should happen next time?",
      ],
    },
    aiReply: null,
  },
  {
    id: "ai",
    label: "AI feedback",
    title: "The AI coach closes the loop.",
    description:
      "The mistake is turned into a clear lesson, so the same breach is less likely to repeat.",
    icon: Sparkles,
    accent: "from-emerald-500/30 to-teal-500/20",
    emailSubject: null,
    emailBody: null,
    journalPrompt: null,
    aiReply:
      "This was a FOMO-driven entry after missing the first move. Your setup rule was broken, so the priority is to review your entry criteria before the next session.",
  },
];

export function AccountabilityDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = steps[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % steps.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  const progress = useMemo(() => {
    return ((activeIndex + 1) / steps.length) * 100;
  }, [activeIndex]);

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10">
          {/* Left: copy */}
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              Accountability that forces reflection
            </div>

            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              When a rule breaks, the review starts immediately.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
              JNV does not let a mistake disappear into your broker history.
              It flags the breach, sends the reminder, opens the journal, and
              pushes the trader to explain what happened before the lesson is
              lost.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Detect",
                  copy: "Identify rule breaches as they happen.",
                  icon: Bell,
                },
                {
                  title: "Reflect",
                  copy: "Force a written explanation before moving on.",
                  icon: MessageSquareText,
                },
                {
                  title: "Improve",
                  copy: "Turn each mistake into a clear action.",
                  icon: CheckCircle2,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur"
                  >
                    <Icon className="h-5 w-5 text-indigo-300" />
                    <div className="mt-3 text-sm font-medium text-white">
                      {item.title}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-white/65">
                      {item.copy}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: animated demo */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 shadow-[0_30px_120px_rgba(0,0,0,0.15)]" style={{ backgroundColor: '#eef1f8' }}>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <div className="text-sm font-medium text-slate-800">
                    Rule Accountability Flow
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Automatic review loop · 4-step demo
                  </div>
                </div>
              </div>

              {/* Progress + step tabs */}
              <div className="px-5 py-4">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {steps.map((step, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={step.id}
                        onClick={() => setActiveIndex(index)}
                        className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
                          isActive
                            ? "border-indigo-400 bg-indigo-500 text-white"
                            : "border-slate-300 bg-white/60 text-slate-600 hover:border-slate-400 hover:text-slate-800"
                        }`}
                      >
                        {step.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main panels */}
              <div className="grid gap-4 px-5 pb-5 lg:grid-cols-[1.1fr_0.9fr]">
                {/* Left panel: animated state */}
                <div className="relative min-h-[420px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-4">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className={`absolute inset-0 rounded-[1.6rem] bg-gradient-to-br ${active.accent}`}
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1023]/80 px-4 py-3 backdrop-blur">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                        <active.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {active.title}
                        </div>
                        <div className="text-xs text-white/55">
                          Step {activeIndex + 1} of {steps.length}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid flex-1 gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                      {/* Email panel */}
                      <div className="rounded-[1.4rem] border border-white/10 bg-[#0a0f22]/95 p-4 shadow-inner shadow-black/20">
                        <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/45">
                          <Mail className="h-4 w-4" />
                          Email alert
                        </div>

                        <AnimatePresence mode="wait">
                          {active.emailSubject ? (
                            <motion.div
                              key={active.id + "email"}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.35 }}
                              className="space-y-4"
                            >
                              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                <div className="text-xs uppercase tracking-[0.18em] text-white/40">
                                  Subject
                                </div>
                                <div className="mt-2 text-sm font-medium text-white">
                                  {active.emailSubject}
                                </div>
                              </div>
                              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-white/70">
                                {active.emailBody}
                              </div>
                              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs font-medium text-amber-200">
                                <ArrowRight className="h-3.5 w-3.5" />
                                Open JNV to review the breach
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              key={active.id + "email-empty"}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="grid h-full place-items-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-center text-sm text-white/35"
                            >
                              Email appears here in the first two steps.
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Journal + AI panels */}
                      <div className="grid gap-4">
                        <div className="rounded-[1.4rem] border border-white/10 bg-[#0a0f22]/95 p-4 shadow-inner shadow-black/20">
                          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/45">
                            <UserRound className="h-4 w-4" />
                            Journal review
                          </div>

                          <AnimatePresence mode="wait">
                            {active.journalPrompt ? (
                              <motion.div
                                key={active.id + "journal"}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.35 }}
                                className="space-y-3"
                              >
                                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-medium text-white">
                                  {active.journalPrompt.prompt}
                                </div>
                                <div className="space-y-2">
                                  {active.journalPrompt.bullets.map((bullet) => (
                                    <div
                                      key={bullet}
                                      className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-white/70"
                                    >
                                      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300" />
                                      <span>{bullet}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div
                                key={active.id + "journal-empty"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid h-[138px] place-items-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-center text-sm text-white/35"
                              >
                                Reflection prompts appear after the login step.
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="rounded-[1.4rem] border border-white/10 bg-[#0a0f22]/95 p-4 shadow-inner shadow-black/20">
                          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/45">
                            <Sparkles className="h-4 w-4" />
                            AI coach feedback
                          </div>

                          <AnimatePresence mode="wait">
                            {active.aiReply ? (
                              <motion.div
                                key={active.id + "ai"}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.35 }}
                                className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-7 text-emerald-50"
                              >
                                {active.aiReply}
                              </motion.div>
                            ) : (
                              <motion.div
                                key={active.id + "ai-empty"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid h-[112px] place-items-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-center text-sm text-white/35"
                              >
                                AI feedback appears after the trader explains the mistake.
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right info panel */}
                <div className="flex flex-col justify-between gap-4 rounded-[1.6rem] border border-slate-200 bg-white/70 p-5">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                      The loop
                    </div>
                    <div className="mt-2 text-xl font-semibold text-slate-900">
                      Rule breach → login → reflection → AI feedback
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      The trader breaks a rule, JNV reacts, and the review
                      process begins immediately. The mistake cannot be ignored.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      "Detect the breach before it gets ignored.",
                      "Force the trader to explain the decision.",
                      "Turn the mistake into a clear lesson.",
                    ].map((line) => (
                      <div
                        key={line}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#0a0f22]/80 px-4 py-3 text-sm text-white/70"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white/[0.04] p-4">
                    <div className="text-sm font-medium text-slate-900">
                      Built for accountability, not passive tracking.
                    </div>
                    <div className="mt-2 text-sm leading-7 text-slate-600">
                      The goal is not to record more trades. The goal is to stop
                      repeated mistakes from becoming repeated losses.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
