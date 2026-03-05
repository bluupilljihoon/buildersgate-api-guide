"use client";

import Link from "next/link";
import { PLATFORM_LABELS, Platform } from "@/types/guide";

interface BreadcrumbProps {
  platform: Platform;
  category: string;
  title: string;
}

export default function Breadcrumb({
  platform,
  category,
  title,
}: BreadcrumbProps) {
  const items = [
    { label: "홈", href: "/" },
    { label: PLATFORM_LABELS[platform] || platform, href: `/?platform=${platform}` },
    { label: category, href: null },
    { label: title, href: null },
  ];

  return (
    <nav className="flex items-center gap-1.5 text-xs text-muted overflow-x-auto pb-1">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5 shrink-0">
          {i > 0 && (
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={i === items.length - 1 ? "text-foreground font-medium" : ""}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
