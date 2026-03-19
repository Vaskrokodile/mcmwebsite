import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | Minecom - AI Video, Influencer Marketing & Growth",
  description: "AI video production at 200K/month, influencer marketing, growth campaigns, and community building for Minecraft servers and UGC games.",
};

const services = [
  {
    icon: "🎬",
    title: "AI Video Production",
    subtitle: "200,000+ unique videos per month",
    description: "Our proprietary AI pipeline generates thousands of unique, engaging gaming videos daily. Each video is optimized for YouTube, TikTok, Shorts, and Reels with custom thumbnails, hooks, and CTAs.",
    features: [
      "Automated editing with game-specific AI models",
      "Platform-optimized formats (vertical, horizontal, square)",
      "Custom thumbnail generation with A/B testing",
      "Multi-language voiceover and caption support",
      "Real-time performance tracking per video",
    ],
    metric: "200K+",
    metricLabel: "Videos / Month",
  },
  {
    icon: "🤝",
    title: "Influencer Marketing",
    subtitle: "Curated creator networks",
    description: "We connect your server or game with verified gaming creators who have real, engaged audiences across Minecraft, Roblox, and emerging UGC platforms.",
    features: [
      "Verified creator network (no fake followers)",
      "Audience overlap analysis before partnerships",
      "Performance-based payment structures",
      "Content approval workflows",
      "Post-campaign ROI reporting",
    ],
    metric: "500+",
    metricLabel: "Active Creators",
  },
  {
    icon: "📈",
    title: "Growth Campaigns",
    subtitle: "Data-driven player acquisition",
    description: "Full-funnel campaigns designed to drive new players and keep them coming back. Paid media, organic content, and community tactics unified into a single growth engine.",
    features: [
      "Multi-platform campaign orchestration",
      "Player acquisition cost (PAC) optimization",
      "Retention-focused re-engagement sequences",
      "A/B tested ad creatives at scale",
      "Weekly performance dashboards",
    ],
    metric: "10x",
    metricLabel: "Avg. ROI",
  },
  {
    icon: "💬",
    title: "Community Building",
    subtitle: "Discord, forums, and beyond",
    description: "A thriving community is your best growth channel. We build and manage Discord servers, run events, automate engagement, and turn casual players into loyal advocates.",
    features: [
      "Discord server setup and optimization",
      "Automated welcome and onboarding flows",
      "Event planning and execution",
      "Moderation frameworks and training",
      "Community health analytics",
    ],
    metric: "300+",
    metricLabel: "Communities Scaled",
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-6 py-24">
      {/* Hero */}
      <div className="text-center mb-20">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-cyan-400">Services</span>
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight mt-3 mb-4">
          Your Growth Engine,{" "}
          <span className="blue-shine">Fully Managed</span>
        </h1>
        <p className="text-lg text-white/55 max-w-xl mx-auto">
          From AI video production to influencer partnerships — everything you need to scale your Minecraft server or UGC game.
        </p>
      </div>

      {/* Services */}
      <div className="space-y-20">
        {services.map((service, i) => (
          <div key={service.title} className={`flex gap-10 items-start max-md:flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
            <div className="flex-[3]">
              <div className="text-3xl mb-3">{service.icon}</div>
              <span className="text-xs font-semibold tracking-[0.1em] uppercase text-cyan-400">{service.subtitle}</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-2 mb-4">{service.title}</h2>
              <p className="text-white/55 leading-relaxed mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/50">
                    <svg className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-[2] flex justify-center">
              <div className="metric-glass text-center px-10 py-8 rounded-2xl">
                <div className="text-5xl font-bold text-white mb-2 blue-shine">{service.metric}</div>
                <div className="text-xs font-bold tracking-[0.1em] uppercase text-white/50">{service.metricLabel}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-24 pt-16 border-t border-white/[0.07]">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Let&apos;s Build Your Growth Engine
        </h2>
        <p className="text-white/55 mb-8">Tell us about your game and goals. We&apos;ll design a custom strategy.</p>
        <Link href="/contact" className="btn-purple text-lg px-8 py-3">Get Started</Link>
      </div>
    </div>
  );
}
