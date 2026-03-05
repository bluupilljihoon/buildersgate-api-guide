"use client";

import Link from "next/link";
import { Guide, Platform } from "@/types/guide";
import Breadcrumb from "@/components/layout/Breadcrumb";
import RightSidebar from "@/components/layout/RightSidebar";
import GuideContent from "@/components/guide/GuideContent";

interface GuideDetailClientProps {
  guide: Guide;
  prevGuide: { title: string; slug: string } | null;
  nextGuide: { title: string; slug: string } | null;
}

export default function GuideDetailClient({
  guide,
  prevGuide,
  nextGuide,
}: GuideDetailClientProps) {
  return (
    <div className="flex">
      <article className="flex-1 min-w-0 max-w-4xl mx-auto px-6 py-8">
        <Breadcrumb
          platform={guide.platform as Platform}
          category={guide.category}
          title={guide.title}
        />

        <div className="mt-4 mb-8">
          <h1 className="text-3xl font-bold mb-3">{guide.title}</h1>
          <p className="text-muted text-sm mb-4">{guide.description}</p>
          <div className="flex items-center gap-3 flex-wrap">
            {guide.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-1 bg-sidebar-bg border border-border-color rounded-full text-muted"
              >
                {tag}
              </span>
            ))}
            <span className="text-[11px] text-muted ml-auto">
              최종 수정: {guide.updatedAt}
            </span>
          </div>
        </div>

        <GuideContent content={guide.content} slug={guide.slug} />

        <nav className="mt-12 pt-6 border-t border-border-color flex items-center justify-between gap-4">
          {prevGuide ? (
            <Link
              href={`/guides/${prevGuide.slug}`}
              className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors group"
            >
              <svg
                className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="line-clamp-1">{prevGuide.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextGuide ? (
            <Link
              href={`/guides/${nextGuide.slug}`}
              className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors group text-right"
            >
              <span className="line-clamp-1">{nextGuide.title}</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
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
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>

      <RightSidebar content={guide.content} />
    </div>
  );
}
