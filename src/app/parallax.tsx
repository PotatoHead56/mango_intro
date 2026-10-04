"use client";

import { useEffect, useRef } from "react";

// 滾動視差：speed 為負會比頁面慢（像遠景），為正則比頁面快（像前景）
// origin="center"：依元素與視窗中心的距離位移，元素在畫面正中時歸零
// origin="top"：依頁面捲動量位移，頁面在最頂端時歸零（給首屏元素用，避免一載入就偏移）
export default function Parallax({
  speed,
  limit,
  origin = "center",
  minWidth,
  className,
  children,
}: {
  speed: number;
  limit?: number;
  origin?: "center" | "top";
  minWidth?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wide = minWidth ? window.matchMedia(`(min-width: ${minWidth}px)`) : null;
    let frame = 0;
    let offset = 0;

    const update = () => {
      frame = 0;
      if (wide && !wide.matches) {
        offset = 0;
        el.style.transform = "";
        return;
      }
      let next: number;
      if (origin === "top") {
        next = -window.scrollY * speed;
      } else {
        const rect = el.getBoundingClientRect();
        // 扣掉目前的位移，才是元素原本的位置
        const center = rect.top - offset + rect.height / 2;
        next = (center - window.innerHeight / 2) * speed;
      }
      if (limit !== undefined) next = Math.max(-limit, Math.min(limit, next));
      offset = next;
      el.style.transform = `translate3d(0, ${next.toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      el.style.transform = "";
    };
  }, [speed, limit, origin, minWidth]);

  return (
    <div ref={ref} className={`will-change-transform ${className ?? ""}`}>
      {children}
    </div>
  );
}
