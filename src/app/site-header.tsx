"use client";

import Link from "next/link";
import { useState } from "react";

type NavLink = { href: string; label: string };

export default function SiteHeader({
  links,
  className,
}: {
  links: NavLink[];
  className: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`${className} sticky top-3 z-20 mt-3 rounded-2xl px-4 py-3 sm:top-4 sm:mt-4 sm:px-5`}>
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="flex items-baseline gap-3" onClick={() => setOpen(false)}>
          <span className="font-serif text-xl font-black leading-none sm:text-2xl">果島芒果</span>
          <span className="hidden text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[#1c1a17]/60 xl:inline">
            Guodao Mango
          </span>
        </Link>

        <nav aria-label="主選單" className="hidden gap-5 text-sm md:flex lg:gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="underline-offset-8 decoration-[#1c1a17]/40 hover:underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#order"
            onClick={() => setOpen(false)}
            className="rounded-full bg-[#1c1a17] px-4 py-2 text-sm font-medium text-[#efe9dc] transition-colors hover:bg-[#c8324a] sm:px-5"
          >
            立即訂購
          </Link>
          <button
            type="button"
            aria-label={open ? "關閉選單" : "開啟選單"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-[#1c1a17]/20 md:hidden"
          >
            <span
              className={`h-px w-4 bg-[#1c1a17] transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-4 bg-[#1c1a17] transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="手機選單"
        className={`${open ? "block" : "hidden"} mt-3 md:hidden`}
      >
        <ul>
          {links.map((l) => (
            <li key={l.href} className="border-t border-[#1c1a17]/15">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 font-serif text-lg font-bold"
              >
                {l.label}
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
