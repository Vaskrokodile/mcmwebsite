import Link from "next/link";
import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="max-w-[1280px] mx-auto px-6 pt-18 flex flex-col items-center text-center min-h-[calc(100vh-65px)]">
        <h1 className="text-[clamp(52px,7.5vw,100px)] font-extrabold tracking-[-0.04em] leading-[1.05] max-w-[1000px] mb-5">
          The art of growing<br />
          <em className="headline-italic text-[clamp(58px,8.5vw,110px)]">Ugc games.</em>
        </h1>

        <p className="text-xl text-white/55 leading-relaxed max-w-[700px] mb-12">
          Welcome to Minecom, the agency where you don&apos;t just get a service, you get
          a constantly innovating team, ready to scale beyond your expectations
          every day.
        </p>

        <div className="flex items-center gap-4 mb-20">
          <Link href="/contact" className="btn-teal">Talk to Us &rarr;</Link>
          <Link href="/portfolio" className="btn-dark-outline">Recent Work &darr;</Link>
        </div>

        <Dashboard />
      </section>
    </>
  );
}
