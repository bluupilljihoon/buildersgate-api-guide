"use client";

import Link from "next/link";
import { Guide, PLATFORM_LABELS, Platform } from "@/types/guide";

interface GuideCardProps {
  guide: Guide;
}

const platformColors: Record<string, string> = {
  common: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  web: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  app: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
};

export default function GuideCard({ guide }: GuideCardProps) {
  const isDraft = guide.status === "draft";

  if (isDraft) {
    return (
      <div className="relative p-5 rounded-xl border border-border-color bg-card-bg opacity-60 cursor-not-allowed">
        <div className="flex items-start justify-between mb-3">
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              platformColors[guide.platform] || ""
            }`}
          >
            {PLATFORM_LABELS[guide.platform as Platform]}
          </span>
          <span className="text-[10px] bg-sidebar-hover text-muted px-2 py-0.5 rounded-full">
            작성중
          </span>
        </div>
        <h3 className="font-semibold text-sm mb-1.5">{guide.title}</h3>
        <p className="text-xs text-muted line-clamp-2">{guide.description}</p>
        <div className="mt-3 flex items-center gap-2 text-[10px] text-muted">
          <span>{guide.category}</span>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group relative p-5 rounded-xl border border-border-color bg-card-bg hover:border-primary/30 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
            platformColors[guide.platform] || ""
          }`}
        >
          {PLATFORM_LABELS[guide.platform as Platform]}
        </span>
      </div>
      <h3 className="font-semibold text-sm mb-1.5 group-hover:text-primary transition-colors">
        {guide.title}
      </h3>
      <p className="text-xs text-muted line-clamp-2">{guide.description}</p>
      <div className="mt-3 flex items-center justify-between text-[10px] text-muted">
        <span>{guide.category}</span>
        <span>{guide.updatedAt}</span>
      </div>
    </Link>
  );
}
