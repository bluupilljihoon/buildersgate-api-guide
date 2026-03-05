"use client";

import { useState } from "react";
import { GuideTree, Platform } from "@/types/guide";
import PlatformTabs from "@/components/ui/PlatformTabs";
import TreeNode from "@/components/ui/TreeNode";

interface LeftSidebarProps {
  tree: GuideTree[];
  currentSlug?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function LeftSidebar({
  tree,
  currentSlug,
  isOpen,
  onClose,
}: LeftSidebarProps) {
  const [activePlatform, setActivePlatform] = useState<Platform>("common");

  const currentTree = tree.find((t) => t.platform === activePlatform);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 left-0 z-40 lg:z-0 h-screen lg:h-[calc(100vh-4rem)] w-72 bg-sidebar-bg border-r border-border-color overflow-y-auto transition-transform lg:translate-x-0 shrink-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border-color">
          <span className="font-bold">메뉴</span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-sidebar-hover"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <PlatformTabs
          current={activePlatform}
          onChange={setActivePlatform}
        />

        <nav className="py-2">
          {currentTree?.categories.map((node, i) => (
            <TreeNode
              key={`${node.label}-${i}`}
              node={node}
              currentSlug={currentSlug}
              storageKey={`tree-${activePlatform}`}
            />
          ))}
          {(!currentTree || currentTree.categories.length === 0) && (
            <div className="px-4 py-8 text-center text-sm text-muted">
              해당 플랫폼에 가이드가 없습니다.
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
