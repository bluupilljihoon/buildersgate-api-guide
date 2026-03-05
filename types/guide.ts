export interface GuideMeta {
  title: string;
  description: string;
  platform: "common" | "web" | "app";
  category: string;
  subcategory: string;
  order: number;
  status: "done" | "draft";
  updatedAt: string;
  tags: string[];
}

export interface Guide extends GuideMeta {
  slug: string;
  content: string;
}

export interface GuideTreeNode {
  label: string;
  slug?: string;
  status?: "done" | "draft";
  children?: GuideTreeNode[];
}

export interface GuideTree {
  platform: string;
  categories: GuideTreeNode[];
}

export type Platform = "all" | "common" | "web" | "app";

export const PLATFORM_LABELS: Record<Platform, string> = {
  all: "전체",
  common: "웹/앱 공통",
  web: "웹",
  app: "앱",
};
