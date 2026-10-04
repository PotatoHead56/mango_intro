import type { Metadata } from "next";
import Parallax from "../parallax";
import { SiteFooter, glassBase, navLinks, overline } from "../shared";
import SiteHeader from "../site-header";
import MangoGame from "./mango-game";

export const metadata: Metadata = {
  title: "接芒果小遊戲｜果島芒果",
  description: "15 秒內用籃子接住掉下來的芒果，看看你能拿幾分。",
};

export default function Game() {
  return (
    <div id="top" className="relative flex-1 overflow-x-clip bg-[#efe9dc] text-[#1c1a17]">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax
          speed={-0.5}
          origin="top"
          className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[#f08a24] md:-right-32 md:-top-24 md:h-[26rem] md:w-[26rem]"
        />
        <Parallax
          speed={-0.4}
          origin="top"
          className="absolute -left-32 top-[30rem] h-72 w-72 rounded-full bg-[#f2c230] lg:-left-40 lg:h-[24rem] lg:w-[24rem]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-8">
        <SiteHeader links={navLinks} className={glassBase} />

        <section className="pb-10 pt-12 text-center md:pt-16">
          <p className={overline}>Mini Game — 純娛樂</p>
          <h1 className="mt-6 font-serif text-5xl font-black leading-[1.15] sm:text-7xl">接芒果</h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-8 text-[#1c1a17]/75 sm:text-lg">
            芒果熟了會自己掉下來。拿好籃子，15 秒內能接幾顆？
          </p>
        </section>

        <section className="pb-20 sm:pb-28">
          <MangoGame />
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
