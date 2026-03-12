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

        {guide.attachments && guide.attachments.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border-color">
            <h3 className="text-sm font-semibold text-muted mb-3">첨부파일</h3>
            <div className="flex flex-col gap-2">
              {guide.attachments.map((attachment) => (
                <a
                  key={attachment.file}
                  href={attachment.file}
                  download
                  className="inline-flex items-center gap-2.5 w-fit px-4 py-2.5 rounded-lg border border-border-color bg-sidebar-bg hover:bg-primary/5 hover:border-primary/40 transition-colors text-sm text-foreground/80 hover:text-primary group"
                >
                  <svg
                    className="w-4 h-4 text-muted group-hover:text-primary transition-colors shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                  </svg>
                  {attachment.label}
                </a>
              ))}
            </div>
          </div>
        )}

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
