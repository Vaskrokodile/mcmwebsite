"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Homepage" },
  { href: "/pricing", label: "Pricing" },
  { href: "/portfolio", label: "Case Studies" },
  { href: "/mineconsulting", label: "Mineconsulting" },
  { href: "/services", label: "Services" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-white/[0.07]">
      <div className="max-w-[1280px] mx-auto flex items-center gap-10 px-6 py-3.5">
        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? "text-white" : "text-white/55 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://discord.gg/minecom"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-white/55 hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <Link href="/contact" className="btn-ghost">Sign up</Link>
          <a href="https://discord.gg/minecom" className="btn-purple">Talk to Us</a>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#021420]/95 backdrop-blur-xl border-t border-white/[0.07] px-6 py-6 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-base font-medium transition-colors ${
                pathname === link.href ? "text-white" : "text-white/55"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a href="https://discord.gg/minecom" target="_blank" rel="noopener noreferrer" className="text-base text-white/55">
            Contact Us
          </a>
          <div className="flex gap-3 mt-2">
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-ghost">Sign up</Link>
            <a href="https://discord.gg/minecom" className="btn-purple">Talk to Us</a>
          </div>
        </div>
      )}
    </header>
  );
}
