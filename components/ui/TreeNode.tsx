"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GuideTreeNode } from "@/types/guide";

interface TreeNodeProps {
  node: GuideTreeNode;
  currentSlug?: string;
  depth?: number;
  storageKey: string;
}

export default function TreeNode({
  node,
  currentSlug,
  depth = 0,
  storageKey,
}: TreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isLeaf = !hasChildren && node.slug;
  const isActive = currentSlug === node.slug;
  const isDraft = node.status === "draft";

  const nodeKey = `${storageKey}-${node.label}`;

  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(nodeKey);
    if (stored !== null) return stored === "true";
    return false;
  });

  useEffect(() => {
    if (currentSlug && hasChildren) {
      const hasActiveChild = checkActiveChild(node, currentSlug);
      if (hasActiveChild) {
        setIsExpanded(true);
      }
    }
  }, [currentSlug, node, hasChildren]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(nodeKey, String(isExpanded));
    }
  }, [isExpanded, nodeKey]);

  if (isLeaf) {
    if (isDraft) {
      return (
        <div
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted cursor-not-allowed"
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-muted shrink-0" />
          <span className="truncate">{node.label}</span>
          <span className="text-[10px] bg-sidebar-hover text-muted px-1.5 py-0.5 rounded-full ml-auto shrink-0">
            작성중
          </span>
        </div>
      );
    }

    return (
      <Link
        href={`/guides/${node.slug}`}
        className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors mx-1 ${
          isActive
            ? "sidebar-link-active"
            : "hover:bg-sidebar-hover text-foreground/80"
        }`}
        style={{ paddingLeft: `${depth * 12 + 12}px` }}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            isActive ? "bg-primary" : "bg-muted"
          }`}
        />
        <span className="truncate">{node.label}</span>
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1.5 w-full px-3 py-1.5 text-sm font-medium hover:bg-sidebar-hover rounded-md transition-colors mx-1 text-left"
        style={{ paddingLeft: `${depth * 12 + 12}px` }}
      >
        <svg
          className={`w-3 h-3 shrink-0 transition-transform ${
            isExpanded ? "rotate-90" : ""
          }`}
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
        <span className="truncate">{node.label}</span>
      </button>
      {isExpanded && hasChildren && (
        <div>
          {node.children!.map((child, i) => (
            <TreeNode
              key={`${child.label}-${i}`}
              node={child}
              currentSlug={currentSlug}
              depth={depth + 1}
              storageKey={storageKey}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function checkActiveChild(node: GuideTreeNode, slug: string): boolean {
  if (node.slug === slug) return true;
  if (node.children) {
    return node.children.some((child) => checkActiveChild(child, slug));
  }
  return false;
}
