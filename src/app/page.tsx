import Image from "next/image";
import Lottery from "./lottery";
import Parallax from "./parallax";
import SecretCoupon from "./secret-coupon";
import { Sheen, SiteFooter, glass, glassBase, navLinks, overline, two, varieties } from "./shared";
import SiteHeader from "./site-header";
import Waitlist from "./waitlist";
import Welcome from "./welcome";

// 價格、規格與聯絡方式皆為示意內容，上線前請換成實際資料
const products = [
  {
    id: "gift-box",
    name: "愛文芒果禮盒",
    en: "Irwin Gift Box",
    spec: "5 台斤・約 8–10 顆",
    price: "880",
    desc: "挑選果形飽滿、紅度均勻的特級果，每顆套袋保護，適合送禮。",
    image: "/images/mango-2-closeup.jpg",
    alt: "一顆紅黃相間的芒果特寫",
    tag: "最多人選",
  },
  {
    id: "family-box",
    name: "愛文芒果家庭箱",
    en: "Irwin Family Box",
    spec: "10 台斤・約 16–20 顆",
    price: "1,480",
    desc: "大小不一但甜度不打折，自己吃、打果汁、做芒果冰都剛好。",
    image: "/images/mango-5-market.jpg",
    alt: "堆在一起的紅黃色芒果",
    tag: "自家吃最划算",
  },
  {
    id: "jinhuang",
    name: "金煌芒果",
    en: "Jinhuang Mango",
    spec: "5 台斤・約 4–6 顆",
    price: "680",
    desc: "果實碩大、果肉厚實幾乎沒有纖維，酸度低，喜歡純甜口感的首選。",
    image: "/images/mango-1-bowl.jpg",
    alt: "盤子裡盛滿黃綠色的芒果",
    tag: "果肉最厚",
  },
];

const promises = [
  {
    title: "在欉紅才採收",
    body: "等果實在樹上自然轉色、香氣出來才採，不提早採收催熟。",
  },
  {
    title: "逐顆分級挑選",
    body: "採收後依重量、外觀與熟度分級，有碰傷或熟度不足的不出貨。",
  },
  {
    title: "冷藏宅配到府",
    body: "裝箱當天低溫出貨，收到後放室溫一到兩天，果蒂周圍微軟就是最好吃的時候。",
  },
];

const steps = [
  { title: "選擇品項", body: "決定要禮盒、家庭箱或金煌，以及需要的箱數。" },
  { title: "傳訊息下單", body: "透過 LINE 或電話告訴我們品項、數量、收件資訊與希望到貨日。" },
  { title: "確認與付款", body: "我們回覆出貨日與金額，匯款或貨到付款皆可。" },
  { title: "產地直送", body: "採收後分級裝箱，冷藏宅配送到你手上。" },
];

const monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function Home() {
  return (
    <div className="relative flex-1 overflow-x-clip bg-[#efe9dc] text-[#1c1a17]">
      {/* 背景色塊：邊緣清楚的圓，讓玻璃疊上去時才有東西可以透 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax
          speed={-0.5}
          origin="top"
          className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-[#f08a24] md:-right-32 md:-top-24 md:h-[28rem] md:w-[28rem] lg:-right-40 lg:-top-32 lg:h-[38rem] lg:w-[38rem]"
        />
        <Parallax
          speed={-0.5}
          className="absolute -left-32 top-[70rem] h-72 w-72 rounded-full bg-[#f2c230] lg:-left-48 lg:h-[30rem] lg:w-[30rem]"
        />
        <Parallax
          speed={0.4}
          className="absolute -right-24 top-[130rem] h-64 w-64 rounded-full bg-[#c8324a] lg:-right-32 lg:h-[26rem] lg:w-[26rem]"
        />
        <Parallax
          speed={-0.6}
          className="absolute -left-20 top-[210rem] h-56 w-56 rounded-full bg-[#8fbf4d] lg:-left-24 lg:h-72 lg:w-72"
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-8">
        <SiteHeader links={navLinks} className={glassBase} />

        <section
          id="top"
          className="grid items-center gap-12 pb-24 pt-12 md:grid-cols-2 md:gap-10 md:pt-16 lg:grid-cols-12 lg:gap-12 lg:pt-24"
        >
          <div className="lg:col-span-7">
            <Welcome />
            <h1 className="mt-6 font-serif text-5xl font-black leading-[1.15] sm:mt-8 sm:text-7xl md:text-6xl lg:text-8xl">
              在欉紅的，
              <br />
              才叫芒果。666
            </h1>
            <p className="mt-8 max-w-md text-base leading-8 text-[#1c1a17]/75 sm:mt-10 sm:text-lg sm:leading-9">
              等到果實在樹上熟透、香氣飽滿才採收，分級裝箱後冷藏直送。每年夏天只賣這一季，賣完就等明年。
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="#products"
                className="rounded-full bg-[#1c1a17] px-8 py-4 font-medium text-[#efe9dc] transition-colors hover:bg-[#c8324a]"
              >
                選購芒果
              </a>
              <a
                href="#order"
                className="inline-flex items-center gap-3 border-b border-[#1c1a17] pb-1 font-medium transition-[gap] hover:gap-5"
              >
                怎麼訂購 <span aria-hidden>→</span>
              </a>
              <Lottery className="rounded-full border border-[#1c1a17] px-8 py-4 font-medium transition-colors hover:border-[#c8324a] hover:bg-[#c8324a] hover:text-[#efe9dc]" />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md md:max-w-none lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_rgba(28,26,23,0.6)]">
              <Parallax speed={-0.25} limit={100} className="absolute inset-x-0 -inset-y-[30%]">
                <Image
                  src="/images/mango-4-on-tree.jpg"
                  alt="掛在枝頭、帶著水珠的芒果"
                  fill
                  preload
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 45vw, 92vw"
                  className="object-cover"
                />
              </Parallax>
            </div>
            <Parallax
              speed={0.25}
              limit={45}
              className="absolute -bottom-8 left-4 right-4 sm:left-auto sm:-right-4 sm:w-64 lg:-right-6"
            >
              <div className={`${glass} rounded-2xl p-5`}>
                <Sheen />
                <div className="relative">
                  <p className={overline}>本季主打</p>
                  <p className="mt-2 font-serif text-2xl font-black">愛文芒果</p>
                  <p className="mt-1 text-sm text-[#1c1a17]/70">產季 5 – 8 月・現採現出</p>
                </div>
              </div>
            </Parallax>
          </div>
        </section>

        <section id="products" className="scroll-mt-28 pb-20 sm:pb-28 pt-8">
          <div className="flex items-end justify-between border-b border-[#1c1a17] pb-4">
            <h2 className="font-serif text-4xl font-black sm:text-5xl">芒果選購</h2>
            <p className={overline}>01 — {two(products.length)}</p>
          </div>
          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-20 lg:grid-cols-3">
            {products.map((p, i) => (
              // 桌機三欄時，中間那張與兩側反向位移，做出錯落感
              <Parallax key={p.id} speed={i % 2 ? -0.12 : 0.12} limit={48} minWidth={1024}>
              <article className={`${glass} flex h-full flex-col rounded-2xl p-3`}>
                <Sheen />
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 350px, (min-width: 640px) 45vw, 92vw"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/40 px-3 py-1 text-xs font-medium backdrop-blur-md">
                    {p.tag}
                  </span>
                </div>
                <div className="relative flex flex-1 flex-col p-4 pt-6">
                  <p className="font-mono text-xs text-[#1c1a17]/50">{two(i + 1)}</p>
                  <h3 className="mt-2 font-serif text-2xl font-black">{p.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#1c1a17]/55">{p.en}</p>
                  <p className="mt-4 leading-8 text-[#1c1a17]/80">{p.desc}</p>
                  <p className="mt-4 border-t border-[#1c1a17]/20 pt-3 text-sm text-[#1c1a17]/65">
                    {p.spec}
                  </p>
                  <div className="mt-auto flex items-end justify-between pt-6">
                    <p className="font-serif text-3xl font-black">
                      <span className="mr-1 text-sm font-medium">NT$</span>
                      {p.price}
                    </p>
                    <a
                      href="#order"
                      className="rounded-full bg-[#1c1a17] px-5 py-2 text-sm font-medium text-[#efe9dc] transition-colors hover:bg-[#c8324a]"
                    >
                      我要訂購
                    </a>
                  </div>
                </div>
              </article>
              </Parallax>
            ))}
          </div>
          <p className="mt-6 text-sm text-[#1c1a17]/60 lg:mt-20">
            價格含運（本島），離島運費另計。芒果為農產品，實際顆數依當批果實大小略有不同。
          </p>
        </section>

        <section id="seasons" className="scroll-mt-28 pb-20 sm:pb-28">
          <div className="flex items-end justify-between border-b border-[#1c1a17] pb-4">
            <h2 className="font-serif text-4xl font-black sm:text-5xl">產季年曆</h2>
            <p className={overline}>Jan — Dec</p>
          </div>

          <div className={`${glass} mt-8 rounded-2xl p-4 sm:mt-10 sm:p-9`}>
            <Sheen />
            <div className="relative grid grid-cols-[3.5rem_1fr] items-center gap-x-2 gap-y-3 sm:grid-cols-[7rem_1fr] sm:gap-x-6">
              <span className="text-xs text-[#1c1a17]/55">月份</span>
              <div className="grid grid-cols-12 gap-0.5 text-center font-mono text-[0.6rem] text-[#1c1a17]/55 sm:gap-1 sm:text-xs">
                {monthNumbers.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
              {varieties.map((v) => (
                <div key={v.name} className="contents">
                  <span className="font-serif text-sm font-bold sm:text-base">{v.name}</span>
                  <div
                    className="grid grid-cols-12 gap-0.5 sm:gap-1"
                    role="img"
                    aria-label={`${v.name}產季：${v.season}`}
                  >
                    {monthNumbers.map((m) => {
                      const inSeason = v.months.includes(m);
                      return (
                        <span
                          key={m}
                          className={`h-6 rounded-full sm:h-7 ${
                            inSeason
                              ? "shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.12)]"
                              : "bg-[#1c1a17]/[0.07]"
                          }`}
                          style={inSeason ? { backgroundColor: v.color } : undefined}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 max-w-2xl leading-8 text-[#1c1a17]/75">
            芒果的產季會隨每年天氣前後移動。愛文最甜的時候通常落在六、七月，想送禮的話建議提早預訂。
          </p>
        </section>

        <section id="waitlist" className={`${glass} mb-20 scroll-mt-28 rounded-2xl px-5 py-10 sm:mb-28 sm:p-12`}>
          <Sheen />
          <div className="relative">
            <div className="mb-8 text-center">
              <p className={overline}>Waitlist</p>
              <h2 className="mt-3 font-serif text-3xl font-black sm:text-4xl">開賣第一時間通知你</h2>
            </div>
            <Waitlist />
          </div>
        </section>

        <section id="about" className="scroll-mt-28 pb-20 sm:pb-28">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
            <div className="relative mx-auto w-full max-w-md md:col-span-5 md:max-w-none">
              <SecretCoupon className={glassBase} />
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_rgba(28,26,23,0.6)]">
                <Parallax speed={-0.25} limit={100} className="absolute inset-x-0 -inset-y-[30%]">
                  <Image
                    src="/images/mango-3-pile.jpg"
                    alt="剛採收、紅黃綠相間的芒果堆"
                    fill
                    sizes="(min-width: 1024px) 420px, (min-width: 768px) 40vw, 92vw"
                    className="object-cover"
                  />
                </Parallax>
              </div>
              <div className={`${glassBase} absolute bottom-4 left-4 right-4 rounded-2xl px-5 py-4`}>
                <Sheen />
                <p className="relative font-serif text-lg font-bold">熟了才採，採了就出。</p>
              </div>
            </div>
            <div className="md:col-span-7">
              <h2 className="font-serif text-4xl font-black leading-tight sm:text-5xl">我們的堅持</h2>
              <ol className="mt-8">
                {promises.map((r, i) => (
                  <li
                    key={r.title}
                    className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-[#1c1a17]/25 py-7 last:border-b"
                  >
                    <span className="font-mono text-xs leading-8 text-[#1c1a17]/50">{two(i + 1)}</span>
                    <div>
                      <h3 className="font-serif text-2xl font-bold">{r.title}</h3>
                      <p className="mt-3 max-w-lg leading-8 text-[#1c1a17]/80">{r.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="order" className="scroll-mt-28 pb-20 sm:pb-28">
          <div className="flex items-end justify-between border-b border-[#1c1a17] pb-4">
            <h2 className="font-serif text-4xl font-black sm:text-5xl">如何訂購</h2>
            <p className={overline}>4 Steps</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <ol className="grid gap-x-8 sm:grid-cols-2 lg:col-span-7">
              {steps.map((s, i) => (
                <li key={s.title} className="border-t border-[#1c1a17]/25 py-6">
                  <span className="font-mono text-xs text-[#1c1a17]/50">{two(i + 1)}</span>
                  <h3 className="mt-2 font-serif text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 leading-8 text-[#1c1a17]/80">{s.body}</p>
                </li>
              ))}
            </ol>
            <div className={`${glass} rounded-2xl p-7 sm:p-9 lg:col-span-5`}>
              <Sheen />
              <div className="relative">
                <p className={overline}>聯絡我們</p>
                <p className="mt-3 font-serif text-3xl font-black">現在就訂一箱</p>
                <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 text-sm">
                  <dt className="border-t border-[#1c1a17]/20 py-3 text-[#1c1a17]/55">LINE</dt>
                  <dd className="border-t border-[#1c1a17]/20 py-3">@your-line-id</dd>
                  <dt className="border-t border-[#1c1a17]/20 py-3 text-[#1c1a17]/55">電話</dt>
                  <dd className="border-t border-[#1c1a17]/20 py-3">0900-000-000</dd>
                  <dt className="border-t border-[#1c1a17]/20 py-3 text-[#1c1a17]/55">時間</dt>
                  <dd className="border-t border-[#1c1a17]/20 py-3">週一至週六 9:00 – 18:00</dd>
                  <dt className="border-t border-[#1c1a17]/20 py-3 text-[#1c1a17]/55">付款</dt>
                  <dd className="border-t border-[#1c1a17]/20 py-3">銀行匯款、貨到付款</dd>
                </dl>
                <a
                  href="tel:0900000000"
                  className="mt-6 block rounded-full bg-[#1c1a17] px-8 py-4 text-center font-medium text-[#efe9dc] transition-colors hover:bg-[#c8324a]"
                >
                  打電話訂購
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
