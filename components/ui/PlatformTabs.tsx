"use client";

import { Platform, PLATFORM_LABELS } from "@/types/guide";

interface PlatformTabsProps {
  current: Platform;
  onChange: (platform: Platform) => void;
  variant?: "sidebar" | "page";
}

const platforms: Platform[] = ["all", "common", "web", "app"];

export default function PlatformTabs({
  current,
  onChange,
  variant = "sidebar",
}: PlatformTabsProps) {
  if (variant === "page") {
    return (
      <div className="flex gap-2 flex-wrap">
        {platforms.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              current === p
                ? "bg-primary text-white shadow-sm"
                : "bg-sidebar-bg hover:bg-sidebar-hover text-foreground/70"
            }`}
          >
            {PLATFORM_LABELS[p]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex border-b border-border-color">
      {platforms.filter((p) => p !== "all").map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`flex-1 px-2 py-2 text-xs font-medium transition-colors relative ${
            current === p
              ? "text-primary"
              : "text-muted hover:text-foreground/70"
          }`}
        >
          {PLATFORM_LABELS[p]}
          {current === p && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
}
