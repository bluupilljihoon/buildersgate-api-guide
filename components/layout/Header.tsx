"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Guide } from "@/types/guide";

interface HeaderProps {
  allGuides: Guide[];
  onToggleSidebar: () => void;
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

export default function Header({
  allGuides,
  onToggleSidebar,
  onToggleDarkMode,
  isDarkMode,
}: HeaderProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Guide[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = allGuides.filter(
      (g) =>
        g.title.toLowerCase().includes(lower) ||
        g.description.toLowerCase().includes(lower) ||
        g.tags.some((t) => t.toLowerCase().includes(lower))
    );
    setResults(filtered);
    setIsOpen(true);
  }, [query, allGuides]);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 border-b border-border-color bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-sidebar-hover transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="text-lg font-bold hidden sm:inline">빌더스게이트 각종 API 발급 가이드</span>
        </Link>
      </div>

      <div ref={searchRef} className="relative w-full max-w-md mx-4">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="가이드 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-border-color bg-sidebar-bg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        {isOpen && results.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-card-bg border border-border-color rounded-lg shadow-lg overflow-hidden max-h-80 overflow-y-auto z-50">
            {results.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery("");
                }}
                className="block px-4 py-3 hover:bg-sidebar-hover transition-colors border-b border-border-color last:border-0"
              >
                <div className="font-medium text-sm">{guide.title}</div>
                <div className="text-xs text-muted mt-0.5 line-clamp-1">
                  {guide.description}
                </div>
              </Link>
            ))}
          </div>
        )}
        {isOpen && query && results.length === 0 && (
          <div className="absolute top-full mt-2 w-full bg-card-bg border border-border-color rounded-lg shadow-lg p-4 text-center text-sm text-muted z-50">
            검색 결과가 없습니다.
          </div>
        )}
      </div>

      <button
        onClick={onToggleDarkMode}
        className="p-2 rounded-lg hover:bg-sidebar-hover transition-colors shrink-0"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
    </header>
  );
}
