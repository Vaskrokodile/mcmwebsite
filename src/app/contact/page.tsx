"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const gameTypes = ["Minecraft Server", "Minecraft Network", "Roblox Experience", "UGC Game (Other)", "Game Studio"];
const budgetRanges = ["Under $1,000/mo", "$1,000 - $5,000/mo", "$5,000 - $15,000/mo", "$15,000+/mo", "Not sure yet"];
const serviceOptions = ["AI Video Production", "Influencer Marketing", "Growth Campaigns", "Community Building", "Full-Service Package"];

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", gameName: "", gameType: "", currentPlayers: "",
    budget: "", services: [] as string[], goals: "",
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const toggleService = (s: string) =>
    setForm((p) => ({ ...p, services: p.services.includes(s) ? p.services.filter((x) => x !== s) : [...p.services, s] }));

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-cyan-400/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="font-heading italic text-3xl font-medium mb-4">Request Received</h1>
          <p className="text-white/55">
            Thanks, {form.name}! We&apos;ll review your details and get back to you within 24 hours
            with a custom growth strategy for {form.gameName || "your game"}.
          </p>
        </div>
      </section>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/50 transition-colors";
  const optionClass = (active: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-left transition-all cursor-pointer ${
      active ? "border-cyan-400/50 bg-cyan-400/10 text-white" : "border-white/10 bg-white/5 text-white/55 hover:border-white/20"
    }`;

  return (
    <section className="py-24 px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-cyan-400">Get Started</span>
          <h1 className="font-heading italic text-[clamp(2.5rem,5vw,3.5rem)] font-medium mt-3 mb-3">
            Let&apos;s Grow Your Game
          </h1>
          <p className="text-white/55">Tell us about your project and goals. We&apos;ll craft a custom plan.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step >= s ? "bg-cyan-400 text-[#0c4a6e]" : "bg-white/10 text-white/30"
              }`}>{s}</div>
              {s < 3 && <div className={`w-12 h-px ${step > s ? "bg-cyan-400" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-5 animate-[fadeIn_0.3s_ease]">
              <h2 className="text-xl font-bold mb-4">About You</h2>
              <div>
                <label className="block text-sm text-white/55 mb-2">Your Name</label>
                <input type="text" required value={form.name} onChange={(e) => set("name", e.target.value)} className={inputClass} placeholder="John Smith" />
              </div>
              <div>
                <label className="block text-sm text-white/55 mb-2">Email Address</label>
                <input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} className={inputClass} placeholder="you@server.com" />
              </div>
              <div>
                <label className="block text-sm text-white/55 mb-2">Game / Server Name</label>
                <input type="text" value={form.gameName} onChange={(e) => set("gameName", e.target.value)} className={inputClass} placeholder="e.g. SkyVault Network" />
              </div>
              <button type="button" onClick={() => setStep(2)} disabled={!form.name || !form.email}
                className="w-full py-3.5 rounded-xl font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                style={{ background: "linear-gradient(90deg, #f0fdff 0%, #22d3ee 100%)", color: "#0c4a6e" }}>
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-[fadeIn_0.3s_ease]">
              <h2 className="text-xl font-bold mb-4">Your Project</h2>
              <div>
                <label className="block text-sm text-white/55 mb-3">Game Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {gameTypes.map((t) => (
                    <button key={t} type="button" onClick={() => set("gameType", t)} className={optionClass(form.gameType === t)}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/55 mb-2">Current Daily Players</label>
                <input type="text" value={form.currentPlayers} onChange={(e) => set("currentPlayers", e.target.value)} className={inputClass} placeholder="e.g. 500" />
              </div>
              <div>
                <label className="block text-sm text-white/55 mb-3">Monthly Budget</label>
                <div className="space-y-2">
                  {budgetRanges.map((r) => (
                    <button key={r} type="button" onClick={() => set("budget", r)} className={optionClass(form.budget === r)}>{r}</button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="px-6 py-3.5 rounded-xl border border-white/10 text-white/55 hover:bg-white/5 transition-colors cursor-pointer">Back</button>
                <button type="button" onClick={() => setStep(3)} className="flex-1 py-3.5 rounded-xl font-bold cursor-pointer" style={{ background: "linear-gradient(90deg, #f0fdff 0%, #22d3ee 100%)", color: "#0c4a6e" }}>Continue</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-[fadeIn_0.3s_ease]">
              <h2 className="text-xl font-bold mb-4">Services & Goals</h2>
              <div>
                <label className="block text-sm text-white/55 mb-3">Services You&apos;re Interested In</label>
                <div className="space-y-2">
                  {serviceOptions.map((s) => (
                    <button key={s} type="button" onClick={() => toggleService(s)}
                      className={`${optionClass(form.services.includes(s))} flex items-center gap-3`}>
                      <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                        form.services.includes(s) ? "border-cyan-400 bg-cyan-400" : "border-white/20"
                      }`}>
                        {form.services.includes(s) && (
                          <svg className="w-3 h-3 text-[#0c4a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        )}
                      </div>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/55 mb-2">Your Growth Goals</label>
                <textarea value={form.goals} onChange={(e) => set("goals", e.target.value)} rows={4} className={`${inputClass} resize-none`}
                  placeholder="Tell us what success looks like for you..." />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="px-6 py-3.5 rounded-xl border border-white/10 text-white/55 hover:bg-white/5 transition-colors cursor-pointer">Back</button>
                <button type="submit" className="flex-1 py-3.5 rounded-xl font-bold cursor-pointer hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all"
                  style={{ background: "linear-gradient(90deg, #f0fdff 0%, #22d3ee 100%)", color: "#0c4a6e" }}>
                  Submit Request
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
