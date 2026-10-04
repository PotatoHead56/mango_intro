import Link from "next/link";

export const varieties = [
  { name: "土芒果", months: [4, 5, 6], season: "4 – 6 月", color: "#8fbf4d" },
  { name: "愛文", months: [5, 6, 7, 8], season: "5 – 8 月", color: "#c8324a" },
  { name: "金煌", months: [6, 7, 8], season: "6 – 8 月", color: "#f2c230" },
  { name: "凱特", months: [8, 9, 10], season: "8 – 10 月", color: "#f08a24" },
];

export const navLinks = [
  { href: "/#products", label: "芒果選購" },
  { href: "/#seasons", label: "產季年曆" },
  { href: "/#about", label: "我們的堅持" },
  { href: "/#order", label: "如何訂購" },
  { href: "/blog", label: "芒果專欄" },
  { href: "/game", label: "接芒果" },
];

// 不含定位，給需要 sticky / absolute 的元素用
export const glassBase =
  "overflow-hidden border border-white/70 bg-white/30 shadow-[0_20px_50px_-20px_rgba(28,26,23,0.35),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl backdrop-saturate-150";

export const glass = `relative ${glassBase}`;

export const overline = "text-xs font-medium uppercase tracking-[0.3em] text-[#1c1a17]/60";

export const two = (n: number) => String(n).padStart(2, "0");

// 玻璃左上角的斜向反光
export function Sheen() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/55 via-white/0 via-40% to-transparent"
    />
  );
}

export function SiteFooter() {
  return (
    <footer className="relative bg-[#1c1a17] text-[#efe9dc]">
      <div className="mx-auto w-full max-w-6xl px-4 pb-8 pt-14 sm:px-8 sm:pt-16">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-6">
            <p className="font-serif text-5xl font-black leading-none sm:text-7xl lg:text-8xl">果島芒果</p>
            <p className="mt-6 max-w-xs leading-8 text-[#efe9dc]/70">
              在欉紅採收、產地直送的臺灣芒果。每年夏天，只賣這一季。
            </p>
          </div>
          <nav aria-label="頁尾選單" className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[#efe9dc]/50">網站導覽</p>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="underline-offset-8 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[#efe9dc]/50">產季速查</p>
            <ul className="mt-5 flex flex-col gap-3">
              {varieties.map((v) => (
                <li key={v.name} className="flex justify-between gap-4">
                  <span className="font-serif font-bold">{v.name}</span>
                  <span className="font-mono text-xs leading-6 text-[#efe9dc]/60">{v.season}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-[#efe9dc]/20 pt-6 text-xs text-[#efe9dc]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 果島芒果 Guodao Mango</p>
          <a href="#top" className="underline-offset-8 hover:underline">
            回到頂端 ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
