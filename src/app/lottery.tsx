"use client";

import { useEffect, useRef, useState } from "react";
import { overline } from "./shared";

const CODE = "MANGO90";
const WIN_RATE = 0.1;
const DRAW_DELAY = 1200;

type Status = "idle" | "drawing" | "win" | "lose";

const primaryButton =
  "rounded-full bg-[#1c1a17] px-8 py-4 font-medium text-[#efe9dc] transition-colors hover:bg-[#c8324a] disabled:opacity-60 disabled:hover:bg-[#1c1a17]";

// 抽獎小程式：按鈕開啟 modal，每次抽有 10% 機率中九折優惠券
export default function Lottery({ className }: { className: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  useEffect(() => cancel, []);

  const open = () => {
    setStatus("idle");
    setCopied(false);
    dialog.current?.showModal();
  };

  const draw = () => {
    cancel();
    setStatus("drawing");
    setCopied(false);
    timer.current = setTimeout(() => {
      setStatus(Math.random() < WIN_RATE ? "win" : "lose");
    }, DRAW_DELAY);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
    } catch {
      // 瀏覽器不允許寫入剪貼簿時，使用者仍可手動選取代碼
    }
  };

  return (
    <>
      <button type="button" onClick={open} className={className}>
        抽優惠券
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="lottery-title"
        onClose={cancel}
        // 點到 dialog 本身代表點在內容外的遮罩上
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-[2rem] bg-[#efe9dc] text-[#1c1a17] shadow-[0_30px_60px_-25px_rgba(28,26,23,0.6)] backdrop:bg-[#1c1a17]/50 backdrop:backdrop-blur-sm"
      >
        <div className="relative p-8 text-center">
          <button
            type="button"
            aria-label="關閉"
            onClick={() => dialog.current?.close()}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#1c1a17]/20 text-lg leading-none transition-colors hover:bg-[#1c1a17]/10"
          >
            ×
          </button>

          <p className={overline}>Lucky Draw</p>
          <h2 id="lottery-title" className="mt-3 font-serif text-3xl font-black">
            芒果抽抽樂
          </h2>

          <div aria-live="polite" className="mt-6 flex min-h-48 flex-col items-center justify-center">
            {status === "idle" && (
              <>
                <p aria-hidden className="text-6xl">🥭</p>
                <p className="mt-5 leading-8 text-[#1c1a17]/75">
                  有 10% 的機會抽中芒果九折優惠券，試試手氣吧。
                </p>
              </>
            )}
            {status === "drawing" && (
              <>
                <p aria-hidden className="animate-bounce text-6xl">🥭</p>
                <p className="mt-5 text-[#1c1a17]/75">抽獎中…</p>
              </>
            )}
            {status === "win" && (
              <>
                <p className="font-serif text-2xl font-black text-[#c8324a]">恭喜中獎！</p>
                <p className="mt-2 text-sm text-[#1c1a17]/75">芒果九折優惠券</p>
                <p className="mt-3 select-all rounded-xl border border-dashed border-[#1c1a17]/40 px-5 py-3 font-mono text-3xl font-bold tracking-wider">
                  {CODE}
                </p>
                <p className="mt-3 text-sm text-[#1c1a17]/65">訂購時告訴我們這組代碼即可折抵。</p>
              </>
            )}
            {status === "lose" && (
              <>
                <p aria-hidden className="text-6xl grayscale">🥭</p>
                <p className="mt-5 font-serif text-2xl font-black">差一點點</p>
                <p className="mt-2 text-sm text-[#1c1a17]/75">這次沒有抽中，再試一次吧。</p>
              </>
            )}
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            {status === "win" ? (
              <>
                <button type="button" onClick={copy} className={`${primaryButton} w-full`}>
                  {copied ? "已複製" : "複製優惠碼"}
                </button>
                <a
                  href="#order"
                  onClick={() => dialog.current?.close()}
                  className="text-sm underline-offset-8 hover:underline"
                >
                  去訂購 →
                </a>
              </>
            ) : (
              <button
                type="button"
                onClick={draw}
                disabled={status === "drawing"}
                className={`${primaryButton} w-full`}
              >
                {status === "lose" ? "再抽一次" : status === "drawing" ? "抽獎中…" : "開始抽獎"}
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
