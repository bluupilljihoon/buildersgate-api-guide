"use client";

import { useState } from "react";
import { Guide, Platform } from "@/types/guide";
import GuideCard from "@/components/guide/GuideCard";
import PlatformTabs from "@/components/ui/PlatformTabs";

interface HomeClientProps {
  guides: Guide[];
}

export default function HomeClient({ guides }: HomeClientProps) {
  const [platform, setPlatform] = useState<Platform>("all");

  const filtered =
    platform === "all"
      ? guides
      : guides.filter((g) => g.platform === platform);

  const categories = [...new Set(filtered.map((g) => g.category))];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">개발자 가이드</h1>
        <p className="text-muted text-sm">
          개발 작업 시 필요한 각종 API 키 발급 및 설정 가이드를 제공합니다.
        </p>
      </div>

      <div className="mb-6">
        <PlatformTabs
          current={platform}
          onChange={setPlatform}
          variant="page"
        />
      </div>

      <div className="text-xs text-muted mb-4">
        총 {filtered.length}개의 가이드
      </div>

      {categories.map((category) => (
        <section key={category} className="mb-10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded-full" />
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered
              .filter((g) => g.category === category)
              .map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
