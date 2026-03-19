import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies | Minecom - UGC Game Marketing Results",
  description: "See how Minecom drives real results for Minecraft servers and UGC games. Case studies with verified metrics, player growth, and video performance data.",
};

const caseStudies = [
  {
    name: "ComplexGaming",
    image: "/complexgaming.png",
    alt: "ComplexGaming Social Media Strategy",
    description: "ComplexGaming, a premier Minecraft network, achieved significant growth through social media automation and strategic outreach, scaling their player base through high-impact viral content.",
    metrics: [
      { val: "400k", label: "VIEWS" },
      { val: "300+", label: "CONVERSIONS" },
    ],
    challenge: "Stagnant player growth despite quality gameplay. Their content wasn't reaching the right audiences on YouTube and TikTok.",
    solution: "Deployed AI-generated short-form video pipeline producing 500+ unique clips/week. Combined with targeted influencer seeding across 15 Minecraft creators.",
    tags: ["AI Video", "Social Automation", "YouTube"],
    reverse: false,
    shine: false,
  },
  {
    name: "CraftyNetwork",
    image: "/craftynetwork.png",
    alt: "CraftyNetwork Campaign",
    description: "CraftyNetwork has established itself as a leading force in the Minecraft community, leveraging high-impact video content to drive consistent daily engagement and player retention.",
    metrics: [
      { val: "200k/day", label: "VIEWS" },
      { val: "1,000+", label: "CONVERSIONS" },
    ],
    challenge: "High player churn and inconsistent daily active users. Needed sustainable content flywheel to maintain engagement.",
    solution: "Built always-on content engine with daily AI-edited highlights, community clips, and tournament recaps. Scaled Discord community to 25K+ members with automated engagement flows.",
    tags: ["Content Engine", "Discord Growth", "Retention"],
    reverse: true,
    shine: true,
  },
  {
    name: "SkyBlock Empire",
    image: null,
    alt: "",
    description: "Scaled a mid-tier SkyBlock server from 200 to 2,400 daily active players in 90 days using AI-generated YouTube content and targeted influencer partnerships.",
    metrics: [
      { val: "+340%", label: "PLAYER GROWTH" },
      { val: "8.5M", label: "VIDEO VIEWS" },
    ],
    challenge: "Small server with great gameplay but zero marketing presence. Competing against networks with 10x their budget.",
    solution: "Launched multi-platform blitz: 2,000 AI videos in first month across TikTok and YouTube Shorts. Partnered with 8 mid-tier creators for authentic gameplay sessions. Implemented Discord welcome funnel converting 40% of joiners to daily players.",
    tags: ["Launch Campaign", "Influencer", "TikTok"],
    reverse: false,
    shine: false,
  },
  {
    name: "PixelVerse Studios",
    image: null,
    alt: "",
    description: "Launched a multi-platform campaign combining AI video content with Roblox influencer events, achieving 520% DAU growth in 60 days for their flagship experience.",
    metrics: [
      { val: "+520%", label: "DAU INCREASE" },
      { val: "12M", label: "IMPRESSIONS" },
    ],
    challenge: "Roblox experience with strong mechanics but low discoverability. Needed to break through Roblox's algorithm and drive organic visits.",
    solution: "Orchestrated in-game influencer events with 12 Roblox creators reaching 4M+ combined followers. Supported with AI-generated event recap videos and UGC contest driving 3,000+ player-created clips.",
    tags: ["Roblox", "Events", "UGC Contest"],
    reverse: true,
    shine: true,
  },
];

export default function PortfolioPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-24 flex flex-col gap-32">
      <h1 className="font-heading text-[clamp(4rem,8vw,6rem)] italic font-medium text-center text-white [text-shadow:0_10px_30px_rgba(0,0,0,0.3)]">
        Portfolio
      </h1>

      {caseStudies.map((study) => (
        <section
          key={study.name}
          className={`flex items-center gap-16 ${study.reverse ? "flex-row-reverse" : ""} max-md:!flex-col max-md:text-center max-md:gap-12`}
        >
          {/* Image */}
          <div className="flex-1 flex justify-center">
            {study.image ? (
              <div className="relative w-full max-w-[500px] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]"
                style={{ transform: study.reverse ? "rotate(3deg)" : "rotate(-3deg)" }}
              >
                <Image
                  src={study.image}
                  alt={study.alt}
                  width={500}
                  height={350}
                  className="w-full h-auto rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10"
                />
              </div>
            ) : (
              <div className="w-full max-w-[500px] aspect-video rounded-xl border border-white/10 flex items-center justify-center"
                style={{
                  background: "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(6,182,212,0.08) 100%)",
                  backdropFilter: "blur(24px)",
                }}
              >
                <span className="text-6xl font-bold text-white/10">{study.name[0]}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col gap-6">
            <h2 className={`font-heading italic font-bold text-5xl text-white tracking-tight ${study.shine ? "rainbow-shine" : ""}`}>
              {study.name}
            </h2>
            <p className="text-lg leading-relaxed text-white/55 max-w-[500px] max-md:max-w-full max-md:mx-auto">
              {study.description}
            </p>

            {/* Challenge / Solution */}
            {study.challenge && (
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-semibold tracking-[0.1em] uppercase text-cyan-400">Challenge</span>
                  <p className="text-sm text-white/45 leading-relaxed mt-1">{study.challenge}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-[0.1em] uppercase text-cyan-400">Solution</span>
                  <p className="text-sm text-white/45 leading-relaxed mt-1">{study.solution}</p>
                </div>
              </div>
            )}

            {/* Metrics */}
            <div className="flex gap-8 mt-2 max-md:justify-center">
              {study.metrics.map((m) => (
                <div key={m.label} className="metric-glass">
                  <span className={`text-4xl font-bold text-white leading-none ${study.shine ? "rainbow-shine" : ""}`}>
                    {m.val}
                  </span>
                  <span className="text-xs font-bold tracking-[0.1em] text-white/50 uppercase">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap max-md:justify-center">
              {study.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <div className="text-center py-16">
        <h2 className="font-heading italic text-4xl font-medium text-white mb-4">
          Ready to be the next success story?
        </h2>
        <p className="text-white/55 mb-8">Let&apos;s build your growth engine.</p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/contact" className="btn-teal">Get Started &rarr;</Link>
          <a href="https://discord.gg/minecom" className="btn-purple">Talk to Us</a>
        </div>
      </div>
    </div>
  );
}
