import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Parallax from "../parallax";
import { Sheen, SiteFooter, glass, glassBase, navLinks, overline, two } from "../shared";
import SiteHeader from "../site-header";

export const metadata: Metadata = {
  title: "芒果專欄｜果島芒果",
  description: "怎麼挑芒果、怎麼保存與催熟、各品種差在哪裡——三篇文章帶你把芒果吃得更好。",
};

const posts = [
  {
    id: "how-to-pick",
    category: "挑選",
    title: "怎麼挑一顆好芒果？看、聞、摸三步驟",
    summary: "顏色紅不代表一定甜。學會這三個動作，在水果攤前就不會猶豫。",
    image: "/images/mango-2-closeup.jpg",
    alt: "一顆紅黃相間的芒果特寫",
    sections: [
      {
        heading: "看：果形飽滿、果皮有光澤",
        body: "好的芒果果肩圓潤、果身飽滿，果皮乾淨有光澤。表面有一層薄薄的白色果粉是正常的，代表沒有被過度擦拭。果皮上若有大片黑斑或凹陷，通常是碰傷或炭疽病的痕跡，放不久。",
      },
      {
        heading: "聞：蒂頭附近有香氣",
        body: "把芒果拿近，聞一聞果蒂周圍。熟度夠的芒果會有明顯的甜香；完全沒有味道代表還沒熟，帶酒味或酸味則是過熟了。",
      },
      {
        heading: "摸：微軟有彈性",
        body: "用手掌輕輕握住，不要用指尖按壓。果肉微軟、有一點彈性就是可以吃的時候。整顆硬邦邦要再放幾天，軟到會留下指印就太熟了。",
      },
    ],
  },
  {
    id: "storage",
    category: "保存",
    title: "買回家的芒果怎麼放？後熟與保存的方法",
    summary: "芒果會繼續熟成，放對地方才能在最好吃的時候吃到。",
    image: "/images/mango-1-bowl.jpg",
    alt: "盤子裡盛滿黃綠色的芒果",
    sections: [
      {
        heading: "還沒熟：放室溫，不要進冰箱",
        body: "芒果是會後熟的水果，還硬的時候請放在室溫通風處，通常一到三天就會變軟變香。太早放進冰箱會讓它停止熟成，果皮還可能出現寒害的黑斑。想快一點的話，可以用紙袋包起來，或和蘋果、香蕉放在一起。",
      },
      {
        heading: "已經熟：冷藏並盡快吃完",
        body: "熟了的芒果用紙包好放進冰箱冷藏，可以多放幾天，但香氣會慢慢變淡，建議三到五天內吃完。吃之前先拿出來回溫十幾分鐘，甜味和香氣會更明顯。",
      },
      {
        heading: "吃不完：切丁冷凍",
        body: "一次買太多的話，把果肉切成丁、平鋪在保鮮盒或夾鏈袋裡冷凍。之後可以直接當冰品吃，或拿來打果汁、做冰沙和芒果冰，可以保存一到兩個月。",
      },
    ],
  },
  {
    id: "varieties",
    category: "品種",
    title: "愛文、金煌、土芒果，差在哪裡？",
    summary: "同樣叫芒果，香氣、甜度和口感其實差很多。",
    image: "/images/mango-5-market.jpg",
    alt: "市場上堆在一起的紅黃色芒果",
    sections: [
      {
        heading: "愛文：香氣濃、酸甜平衡",
        body: "臺灣最具代表性的品種，果皮鮮紅、果肉橙黃細緻，纖維少、香氣濃郁，甜中帶一點點酸。產季大約在五到八月，是送禮和做芒果冰最常見的選擇。",
      },
      {
        heading: "金煌：個頭大、純甜少酸",
        body: "臺灣本土育成的品種，果實長而碩大，一顆常常超過一台斤。果皮金黃、果肉厚實，幾乎沒有纖維，酸度很低，喜歡純甜口感的人會很愛。",
      },
      {
        heading: "土芒果：小小一顆、香氣最野",
        body: "果皮綠色、個頭小，纖維比較多，但香氣非常濃烈，是很多人記憶中的古早味。產季最早，大約四到六月。未熟的青果也常被拿來醃成情人果。",
      },
    ],
  },
];

export default function Blog() {
  return (
    <div id="top" className="relative flex-1 overflow-x-clip bg-[#efe9dc] text-[#1c1a17]">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax
          speed={-0.5}
          origin="top"
          className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[#f2c230] md:-right-32 md:-top-24 md:h-[26rem] md:w-[26rem]"
        />
        <Parallax
          speed={-0.5}
          className="absolute -left-32 top-[80rem] h-72 w-72 rounded-full bg-[#f08a24] lg:-left-48 lg:h-[28rem] lg:w-[28rem]"
        />
        <Parallax
          speed={0.4}
          className="absolute -right-24 top-[150rem] h-64 w-64 rounded-full bg-[#8fbf4d] lg:-right-32 lg:h-[24rem] lg:w-[24rem]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-8">
        <SiteHeader links={navLinks} className={glassBase} />

        <section className="pb-16 pt-12 md:pt-16 lg:pb-20 lg:pt-24">
          <p className={overline}>Journal — 芒果專欄</p>
          <h1 className="mt-6 font-serif text-5xl font-black leading-[1.15] sm:mt-8 sm:text-7xl">
            把芒果
            <br />
            吃得更好。
          </h1>
          <p className="mt-8 max-w-md text-base leading-8 text-[#1c1a17]/75 sm:text-lg sm:leading-9">
            怎麼挑、怎麼放、哪個品種適合你。三篇文章，把吃芒果這件事講清楚。
          </p>

          <ol className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
            {posts.map((p, i) => (
              <li key={p.id}>
                <a
                  href={`#${p.id}`}
                  className={`${glass} block h-full rounded-2xl p-6 transition-transform hover:-translate-y-1`}
                >
                  <Sheen />
                  <span className="relative block">
                    <span className="font-mono text-xs text-[#1c1a17]/50">
                      {two(i + 1)}・{p.category}
                    </span>
                    <span className="mt-3 block font-serif text-xl font-bold leading-snug">{p.title}</span>
                    <span className="mt-3 block text-sm leading-7 text-[#1c1a17]/70">{p.summary}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        {posts.map((p, i) => (
          <article
            key={p.id}
            id={p.id}
            className="scroll-mt-28 border-t border-[#1c1a17] pb-20 pt-10 sm:pb-28"
          >
            <div className="grid gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
              <div className={`md:col-span-5 ${i % 2 ? "md:order-2" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_rgba(28,26,23,0.6)] md:sticky md:top-28 md:aspect-[4/5]">
                  <Parallax speed={-0.2} limit={70} className="absolute inset-x-0 -inset-y-[25%]">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      preload={i === 0}
                      sizes="(min-width: 1024px) 440px, (min-width: 768px) 40vw, 92vw"
                      className="object-cover"
                    />
                  </Parallax>
                </div>
              </div>

              <div className="md:col-span-7">
                <p className={overline}>
                  {two(i + 1)} — {p.category}
                </p>
                <h2 className="mt-4 font-serif text-3xl font-black leading-tight sm:text-5xl sm:leading-tight">
                  {p.title}
                </h2>
                <p className="mt-6 text-lg leading-9 text-[#1c1a17]/75">{p.summary}</p>
                <div className="mt-8">
                  {p.sections.map((s) => (
                    <section key={s.heading} className="border-t border-[#1c1a17]/25 py-7">
                      <h3 className="font-serif text-2xl font-bold">{s.heading}</h3>
                      <p className="mt-3 leading-8 text-[#1c1a17]/80">{s.body}</p>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}

        <section className={`${glass} mb-20 rounded-2xl p-7 sm:mb-28 sm:p-12`}>
          <Sheen />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className={overline}>讀完了</p>
              <p className="mt-3 font-serif text-3xl font-black sm:text-4xl">不如直接吃一顆。</p>
            </div>
            <Link
              href="/#products"
              className="self-start rounded-full bg-[#1c1a17] px-8 py-4 font-medium text-[#efe9dc] transition-colors hover:bg-[#c8324a] md:self-auto"
            >
              選購芒果
            </Link>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
