import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mineconsulting - Learn How to Grow Your Server for Free",
  description: "Exclusive consulting program from Minecom. Learn server shaping, monetization, and growth strategies — only 100 spots available.",
};

export default function MineconsultingPage() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-6 py-16">
      <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.1] mb-8">
        Learn how to grow your <br />
        server <em className="headline-italic" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>for free.</em>
      </h1>

      <p className="text-lg text-white/60 max-w-[500px] mb-12 leading-relaxed">
        From shaping the server, to monetization and growing it, learn all the secrets.
      </p>

      <div className="flex items-center justify-center gap-6 flex-wrap">
        <a href="https://discord.gg/consulting" className="btn-purple text-lg px-8 py-3">
          Enroll Now
        </a>
        <div className="flex items-center gap-3 text-white font-medium text-base opacity-90">
          <span className="text-xl">&rarr;</span>
          <span>only 100 spots in total, secure yours now !</span>
        </div>
      </div>
    </section>
  );
}
