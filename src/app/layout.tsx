import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_TC } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 中文字型檔很大，交給瀏覽器依 unicode-range 分段載入，不做 preload
const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  preload: false,
});

export const metadata: Metadata = {
  title: "果島芒果｜在欉紅愛文芒果・產地直送",
  description: "在欉紅採收、分級裝箱、冷藏宅配的臺灣芒果。愛文禮盒、家庭箱與金煌芒果，夏季限定。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifTC.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
