import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing | Minecom - UGC Game Marketing",
  description: "Transparent pricing for Minecraft and UGC game marketing services. Coming soon.",
};

export default function PricingPage() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-6">
      <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-bold text-sm tracking-[0.05em] uppercase mb-8 text-[#0c4a6e] cursor-default"
        style={{
          background: "linear-gradient(90deg, #f0fdff 0%, #22d3ee 100%)",
          boxShadow: "inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.1), 0 10px 25px rgba(34,211,238,0.3)",
        }}>
        Coming Soon
      </div>
      <h1 className="font-heading italic font-medium text-[clamp(3.5rem,10vw,7rem)] leading-[1.1] text-white mb-6 tracking-tight">
        Transparent Pricing <br />
        <span className="blue-shine">Simplified.</span>
      </h1>
      <p className="text-xl text-white/55 max-w-[600px] mb-12 leading-relaxed">
        We&apos;re putting the final touches on our pricing plans to ensure you get the best value for your growth journey.
      </p>
      <div className="flex gap-6 items-center">
        <a href="https://discord.gg/minecom" target="_blank" rel="noopener noreferrer" className="btn-teal">
          Join our Discord
        </a>
        <Link href="/" className="btn-dark-outline">Back to Home</Link>
      </div>
    </section>
  );
}
