"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { overline } from "./shared";

const NAME_KEY = "guodao-visitor-name";
const SKIP_KEY = "guodao-welcome-skipped";
const CHANGE_EVENT = "guodao-visitor-name-change";
const MAX_LENGTH = 20;

// localStorage 被停用（例如無痕模式的某些設定）時，至少在這次瀏覽期間記得稱呼
let memoryName: string | null = null;

function readName() {
  if (memoryName) return memoryName;
  try {
    return localStorage.getItem(NAME_KEY);
  } catch {
    return null;
  }
}

function saveName(name: string) {
  memoryName = name;
  try {
    localStorage.setItem(NAME_KEY, name);
  } catch {
    // 寫不進去就只靠 memoryName
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function wasSkipped() {
  try {
    return sessionStorage.getItem(SKIP_KEY) === "1";
  } catch {
    return false;
  }
}

function markSkipped() {
  try {
    sessionStorage.setItem(SKIP_KEY, "1");
  } catch {
    // 記不住就算了，下次進站會再問一次
  }
}

// 第一次進站時詢問稱呼，之後在首屏顯示歡迎詞
export default function Welcome() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const name = useSyncExternalStore(subscribe, readName, () => null);

  const open = () => {
    if (input.current) input.current.value = readName() ?? "";
    dialog.current?.showModal();
  };

  useEffect(() => {
    if (!readName() && !wasSkipped()) dialog.current?.showModal();
  }, []);

  return (
    <>
      {name ? (
        <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-serif text-xl font-bold sm:text-2xl">歡迎你，{name}</span>
          <button
            type="button"
            onClick={open}
            className="text-xs text-[#1c1a17]/55 underline-offset-4 hover:underline"
          >
            更改稱呼
          </button>
        </p>
      ) : (
        <p className={overline}>產地直送 — Farm to Door</p>
      )}

      <dialog
        ref={dialog}
        aria-labelledby="welcome-title"
        // 按 Esc 或「先逛逛」關閉都算略過，這次瀏覽不再詢問
        onClose={() => {
          if (!readName()) markSkipped();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-[2rem] bg-[#efe9dc] text-[#1c1a17] shadow-[0_30px_60px_-25px_rgba(28,26,23,0.6)] backdrop:bg-[#1c1a17]/50 backdrop:backdrop-blur-sm"
      >
        <form
          className="p-8"
          onSubmit={(e) => {
            e.preventDefault();
            const value = input.current?.value.trim() ?? "";
            if (!value) return;
            saveName(value);
            dialog.current?.close();
          }}
        >
          <p className={overline}>Welcome</p>
          <h2 id="welcome-title" className="mt-3 font-serif text-3xl font-black">
            歡迎來到果島芒果
          </h2>
          <label htmlFor="visitor-name" className="mt-5 block leading-8 text-[#1c1a17]/75">
            請問怎麼稱呼你？
          </label>
          <input
            ref={input}
            id="visitor-name"
            name="name"
            type="text"
            required
            maxLength={MAX_LENGTH}
            autoComplete="nickname"
            placeholder="例如：小芒"
            className="mt-2 w-full rounded-full border border-[#1c1a17]/30 bg-white/60 px-5 py-3 text-lg outline-none transition-colors placeholder:text-[#1c1a17]/35 focus:border-[#1c1a17]"
          />
          <div className="mt-6 flex flex-col items-center gap-4">
            <button
              type="submit"
              className="w-full rounded-full bg-[#1c1a17] px-8 py-4 font-medium text-[#efe9dc] transition-colors hover:bg-[#c8324a]"
            >
              開始逛逛
            </button>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="text-sm text-[#1c1a17]/65 underline-offset-8 hover:underline"
            >
              先不用，直接看看
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
