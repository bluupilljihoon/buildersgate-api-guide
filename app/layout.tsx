import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getAllGuides, getGuideTree } from "@/lib/guides";
import ClientLayout from "@/components/layout/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "빌더스게이트 각종 API 발급 가이드",
  description: "개발 작업 시 필요한 각종 API 키 발급 가이드를 제공하는 웹사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allGuides = getAllGuides();
  const tree = getGuideTree();

  const guidesForSearch = allGuides.map(({ content, ...meta }) => ({
    ...meta,
    content: "",
  }));

  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout allGuides={guidesForSearch} tree={tree}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
