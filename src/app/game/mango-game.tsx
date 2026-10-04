"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Sheen, glass, overline } from "../shared";

const DURATION = 15;
const BASKET_WIDTH = 20; // 佔遊戲區寬度的百分比
const BASKET_SPEED = 110; // 鍵盤操作時每秒移動的百分比
const CATCH_TOP = 82; // 芒果落到這個高度（百分比）之後才算進籃子
const CATCH_BOTTOM = 96;
const GOLD_RATE = 0.15;

type Status = "ready" | "playing" | "over";
type Item = { id: number; x: number; y: number; speed: number; gold: boolean };
type Pop = { id: number; x: number; text: string; age: number };
type View = { items: Item[]; pops: Pop[]; basket: number; score: number; timeLeft: number };

const initialView: View = { items: [], pops: [], basket: 50, score: 0, timeLeft: DURATION };

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

// 接芒果小遊戲：15 秒內用籃子接住掉下來的芒果，純娛樂、不記錄任何資料
export default function MangoGame() {
  const area = useRef<HTMLDivElement>(null);
  const basket = useRef(50);
  const [status, setStatus] = useState<Status>("ready");
  const [view, setView] = useState<View>(initialView);
  const [best, setBest] = useState(0);

  useEffect(() => {
    if (status !== "playing") return;

    let items: Item[] = [];
    let pops: Pop[] = [];
    let score = 0;
    let elapsed = 0;
    let spawnIn = 0.3;
    let nextId = 0;
    let last = 0;
    let frame = 0;
    const keys = { left: false, right: false };
    basket.current = 50;

    const tick = (now: number) => {
      // 分頁切到背景再回來時 dt 會很大，限制上限避免芒果瞬間掉完
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      elapsed += dt;

      if (keys.left) basket.current -= BASKET_SPEED * dt;
      if (keys.right) basket.current += BASKET_SPEED * dt;
      basket.current = clamp(basket.current, BASKET_WIDTH / 2, 100 - BASKET_WIDTH / 2);

      // 越後面掉得越快、越密
      const progress = elapsed / DURATION;
      spawnIn -= dt;
      if (spawnIn <= 0) {
        items.push({
          id: nextId++,
          x: 6 + Math.random() * 88,
          y: -8,
          speed: 45 + progress * 35 + Math.random() * 20,
          gold: Math.random() < GOLD_RATE,
        });
        spawnIn = 0.6 - progress * 0.25 + Math.random() * 0.2;
      }

      const remaining: Item[] = [];
      for (const item of items) {
        const y = item.y + item.speed * dt;
        const inBasket =
          y >= CATCH_TOP &&
          item.y < CATCH_BOTTOM &&
          Math.abs(item.x - basket.current) <= BASKET_WIDTH / 2 + 2;
        if (inBasket) {
          const points = item.gold ? 3 : 1;
          score += points;
          pops.push({ id: item.id, x: item.x, text: `+${points}`, age: 0 });
        } else if (y < 110) {
          remaining.push({ ...item, y });
        }
      }
      items = remaining;
      pops = pops.map((p) => ({ ...p, age: p.age + dt })).filter((p) => p.age < 0.6);

      if (elapsed >= DURATION) {
        setView({ items: [], pops: [], basket: basket.current, score, timeLeft: 0 });
        setBest((b) => Math.max(b, score));
        setStatus("over");
        return;
      }

      setView({ items, pops, basket: basket.current, score, timeLeft: DURATION - elapsed });
      frame = requestAnimationFrame(tick);
    };

    const onKey = (e: KeyboardEvent) => {
      const down = e.type === "keydown";
      if (e.key === "ArrowLeft" || e.key === "a") keys.left = down;
      else if (e.key === "ArrowRight" || e.key === "d") keys.right = down;
      else return;
      e.preventDefault();
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, [status]);

  const start = () => {
    setView(initialView);
    setStatus("playing");
  };

  const moveBasket = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = area.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    basket.current = clamp(x, BASKET_WIDTH / 2, 100 - BASKET_WIDTH / 2);
    // 還沒開始或已結束時，籃子也跟著游標動，讓玩家先熟悉操作
    if (status !== "playing") setView((v) => ({ ...v, basket: basket.current }));
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="flex items-end justify-between">
        <div>
          <p className={overline}>得分</p>
          <p className="font-serif text-5xl font-black leading-none tabular-nums">{view.score}</p>
        </div>
        <div className="text-right">
          <p className={overline}>剩餘時間</p>
          <p className="font-serif text-5xl font-black leading-none tabular-nums">
            {Math.ceil(view.timeLeft)}
            <span className="ml-1 text-lg font-medium">秒</span>
          </p>
        </div>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#1c1a17]/10">
        <div
          className="h-full rounded-full bg-[#f08a24]"
          style={{ width: `${(view.timeLeft / DURATION) * 100}%` }}
        />
      </div>

      <div
        ref={area}
        role="application"
        aria-label="接芒果遊戲區，移動滑鼠、手指或按左右方向鍵控制籃子"
        onPointerMove={moveBasket}
        onPointerDown={moveBasket}
        className={`${glass} mt-4 h-[26rem] touch-none select-none rounded-[2rem] sm:h-[30rem] ${
          status === "playing" ? "cursor-none" : ""
        }`}
      >
        <Sheen />

        {view.items.map((item) => (
          <span
            key={item.id}
            aria-hidden
            className={`absolute -translate-x-1/2 -translate-y-1/2 text-4xl leading-none ${
              item.gold ? "scale-125 drop-shadow-[0_0_10px_#f2c230]" : ""
            }`}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
          >
            {item.gold ? "🌟" : "🥭"}
          </span>
        ))}

        {view.pops.map((p) => (
          <span
            key={p.id}
            aria-hidden
            className="absolute -translate-x-1/2 font-serif text-2xl font-black text-[#c8324a]"
            style={{ left: `${p.x}%`, top: `${78 - p.age * 30}%`, opacity: 1 - p.age / 0.6 }}
          >
            {p.text}
          </span>
        ))}

        <span
          aria-hidden
          className="absolute bottom-[4%] -translate-x-1/2 text-center text-6xl leading-none"
          style={{ left: `${view.basket}%`, width: `${BASKET_WIDTH}%` }}
        >
          🧺
        </span>

        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#efe9dc]/70 p-6 text-center backdrop-blur-sm">
            {status === "ready" ? (
              <>
                <p className="font-serif text-3xl font-black sm:text-4xl">準備好了嗎？</p>
                <p className="mt-3 max-w-xs leading-7 text-[#1c1a17]/75">
                  {DURATION} 秒內接住越多芒果越好。芒果 1 分，星星 3 分。
                </p>
              </>
            ) : (
              <div aria-live="polite">
                <p className={overline}>時間到</p>
                <p className="mt-2 font-serif text-3xl font-black sm:text-4xl">
                  你接到了 {view.score} 分
                </p>
                <p className="mt-3 text-[#1c1a17]/75">這次瀏覽的最高分：{best} 分</p>
              </div>
            )}
            <button
              type="button"
              onClick={start}
              className="mt-6 rounded-full bg-[#1c1a17] px-8 py-4 font-medium text-[#efe9dc] transition-colors hover:bg-[#c8324a]"
            >
              {status === "ready" ? "開始遊戲" : "再玩一次"}
            </button>
            {status === "over" && (
              <Link href="/#products" className="mt-4 text-sm underline-offset-8 hover:underline">
                去買真的芒果 →
              </Link>
            )}
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-sm text-[#1c1a17]/60">
        電腦：移動滑鼠或按 ← → 鍵　｜　手機：手指在遊戲區左右滑動
      </p>
    </div>
  );
}
