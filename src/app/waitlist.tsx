"use client";

import { useState } from "react";

// 興趣名單表單：目前只有介面，送出後不會儲存或寄出 email，只顯示提示訊息
export default function Waitlist() {
  const [joined, setJoined] = useState(false);

  return (
    <div className="mx-auto w-full max-w-2xl">
      {joined ? (
        <p
          role="status"
          className="rounded-full border border-[#1c1a17]/15 bg-white/50 px-6 py-4 text-center font-serif text-xl font-bold"
        >
          收到了，請等待好消息！
        </p>
      ) : (
        <form
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setJoined(true);
          }}
        >
          <label htmlFor="waitlist-email" className="sr-only">
            Email
          </label>
          <input
            id="waitlist-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="min-w-0 flex-1 rounded-full border border-[#1c1a17]/15 bg-white/50 px-6 py-4 text-lg outline-none transition-colors placeholder:text-[#1c1a17]/35 focus:border-[#1c1a17]"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#1c1a17] px-7 py-4 font-medium text-[#efe9dc] transition-[gap,background-color] hover:gap-5 hover:bg-[#c8324a]"
          >
            加入興趣名單 <span aria-hidden>→</span>
          </button>
        </form>
      )}
      <p className="mt-4 text-center text-sm text-[#1c1a17]/60">
        我們只會在開賣時通知你，絕不寄送垃圾信，可隨時退出。
      </p>
    </div>
  );
}
