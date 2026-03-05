import { notFound } from "next/navigation";
import {
  getGuideBySlug,
  getAllSlugs,
  getAdjacentGuides,
} from "@/lib/guides";
import GuideDetailClient from "./GuideDetailClient";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug.split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const guide = getGuideBySlug(slugPath);

  if (!guide) return { title: "가이드를 찾을 수 없습니다" };

  return {
    title: `${guide.title} - 빌더스게이트 API 가이드`,
    description: guide.description,
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const guide = getGuideBySlug(slugPath);

  if (!guide) notFound();

  const { prev, next } = getAdjacentGuides(slugPath);

  return (
    <GuideDetailClient
      guide={guide}
      prevGuide={prev ? { title: prev.title, slug: prev.slug } : null}
      nextGuide={next ? { title: next.title, slug: next.slug } : null}
    />
  );
}
