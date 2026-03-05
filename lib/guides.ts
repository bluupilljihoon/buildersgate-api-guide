import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Guide, GuideMeta, GuideTree, GuideTreeNode } from "@/types/guide";

const CONTENT_DIR = path.join(process.cwd(), "content/guides");

function getGuideFiles(dir: string, basePath: string = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      files.push(...getGuideFiles(fullPath, relativePath));
    } else if (entry.name === "guide.md") {
      files.push(basePath);
    }
  }

  return files;
}

export function getAllGuides(): Guide[] {
  const slugs = getGuideFiles(CONTENT_DIR);

  const guides = slugs
    .map((slug) => {
      const filePath = path.join(CONTENT_DIR, slug, "guide.md");
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        ...(data as GuideMeta),
        slug: slug.replace(/\\/g, "/"),
        content,
      };
    })
    .sort((a, b) => a.order - b.order);

  return guides;
}

export function getGuideBySlug(slug: string): Guide | null {
  const filePath = path.join(CONTENT_DIR, slug, "guide.md");

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    ...(data as GuideMeta),
    slug,
    content,
  };
}

export function getGuidesByPlatform(
  platform: string
): Guide[] {
  const all = getAllGuides();
  if (platform === "all") return all;
  return all.filter((g) => g.platform === platform);
}

export function getGuideTree(): GuideTree[] {
  const guides = getAllGuides();
  const platforms = ["common", "web", "app"] as const;

  return platforms.map((platform) => {
    const platformGuides = guides.filter((g) => g.platform === platform);
    const categoryMap = new Map<string, Map<string, Guide[]>>();

    for (const guide of platformGuides) {
      if (!categoryMap.has(guide.category)) {
        categoryMap.set(guide.category, new Map());
      }
      const subMap = categoryMap.get(guide.category)!;
      if (!subMap.has(guide.subcategory)) {
        subMap.set(guide.subcategory, []);
      }
      subMap.get(guide.subcategory)!.push(guide);
    }

    const categoryNodes: Array<{ node: GuideTreeNode; minOrder: number }> = [];

    for (const [category, subMap] of categoryMap) {
      const subEntries = [...subMap.entries()];
      const allGuides = subEntries.flatMap(([, gs]) => gs);
      const minOrder = Math.min(...allGuides.map((g) => g.order));

      // 서브카테고리가 하나뿐이면 중간 단계를 제거하고 가이드를 카테고리 바로 아래로 올림
      // (기타처럼 서브카테고리가 여러 개인 경우는 유지)
      const isFlattenable = subEntries.length === 1;

      if (isFlattenable) {
        const [, subGuides] = subEntries[0];
        const sorted = subGuides.sort((a, b) => a.order - b.order);

        if (sorted.length === 1) {
          categoryNodes.push({
            node: {
              label: sorted[0].title,
              slug: sorted[0].slug,
              status: sorted[0].status,
            },
            minOrder,
          });
        } else {
          categoryNodes.push({
            node: {
              label: category,
              children: sorted.map((g) => ({
                label: g.title,
                slug: g.slug,
                status: g.status,
              })),
            },
            minOrder,
          });
        }
      } else {
        const children: GuideTreeNode[] = [];

        for (const [subcategory, subGuides] of subMap) {
          children.push({
            label: subcategory,
            children: subGuides
              .sort((a, b) => a.order - b.order)
              .map((g) => ({
                label: g.title,
                slug: g.slug,
                status: g.status,
              })),
          });
        }

        categoryNodes.push({
          node: { label: category, children },
          minOrder,
        });
      }
    }

    const categories = categoryNodes
      .sort((a, b) => a.minOrder - b.minOrder)
      .map(({ node }) => node);

    return {
      platform,
      categories,
    };
  });
}

export function getAllSlugs(): string[] {
  return getGuideFiles(CONTENT_DIR).map((s) => s.replace(/\\/g, "/"));
}

export function getAdjacentGuides(
  currentSlug: string
): { prev: Guide | null; next: Guide | null } {
  const allGuides = getAllGuides().filter((g) => g.status === "done");
  const index = allGuides.findIndex((g) => g.slug === currentSlug);

  return {
    prev: index > 0 ? allGuides[index - 1] : null,
    next: index < allGuides.length - 1 ? allGuides[index + 1] : null,
  };
}
