"use client";

import { useState, useEffect } from "react";
import { Guide, GuideTree } from "@/types/guide";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";

interface ClientLayoutProps {
  children: React.ReactNode;
  allGuides: Guide[];
  tree: GuideTree[];
  currentSlug?: string;
}

export default function ClientLayout({
  children,
  allGuides,
  tree,
  currentSlug,
}: ClientLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const dark = stored ? stored === "true" : prefersDark;
    setIsDarkMode(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("darkMode", String(next));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        allGuides={allGuides}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      <div className="flex flex-1">
        <LeftSidebar
          tree={tree}
          currentSlug={currentSlug}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
