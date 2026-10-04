"use client";

import { useEffect, useRef, useState } from "react";

const CODE = "gg500";
const HOVER_DELAY = 500;

// 隱藏彩蛋：滑鼠在這塊看不見的區域停留超過 0.5 秒，才會浮出優惠碼
export default function SecretCoupon({ className }: { className: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  useEffect(() => cancel, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
    } catch {
      // 瀏覽器不允許寫入剪貼簿時，使用者仍可手動選取代碼
    }
  };

  return (
    <div
      className="absolute right-full top-0 mr-6 hidden h-full w-56 xl:block"
      onMouseEnter={() => {
        cancel();
        timer.current = setTimeout(() => setOpen(true), HOVER_DELAY);
      }}
      onMouseLeave={() => {
        cancel();
        setOpen(false);
        setCopied(false);
      }}
    >
      <div
        role="status"
        aria-hidden={!open}
        className={`${className} absolute right-0 top-1/2 w-52 -translate-y-1/2 rounded-2xl p-5 transition duration-300 ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#1c1a17]/60">被你發現了</p>
        <p className="mt-3 text-sm text-[#1c1a17]/75">隱藏優惠碼</p>
        <p className="mt-1 select-all font-mono text-3xl font-bold tracking-wider">{CODE}</p>
        <div className="mt-4 flex items-center gap-3 text-sm">
          <button
            type="button"
            onClick={copy}
            tabIndex={open ? 0 : -1}
            className="rounded-full bg-[#1c1a17] px-4 py-2 font-medium text-[#efe9dc] transition-colors hover:bg-[#c8324a]"
          >
            {copied ? "已複製" : "複製"}
          </button>
          <a
            href="#order"
            tabIndex={open ? 0 : -1}
            className="underline-offset-8 hover:underline"
          >
            去訂購 →
          </a>
        </div>
      </div>
    </div>
  );
}
