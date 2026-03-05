import { visit } from "unist-util-visit";
import type { Root, Image } from "mdast";

export function remarkImagePath(slug: string) {
  return () => {
    return (tree: Root) => {
      visit(tree, "image", (node: Image) => {
        const src = node.url;
        if (src && !src.startsWith("http") && !src.startsWith("/")) {
          node.url = `/images/guides/${slug}/${src}`;
        }
      });
    };
  };
}
