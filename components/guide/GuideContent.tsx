"use client";

import { useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import ImageModal from "./ImageModal";

interface GuideContentProps {
  content: string;
  slug: string;
}

export default function GuideContent({ content, slug }: GuideContentProps) {
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const transformImageSrc = useCallback(
    (src: string) => {
      if (src.startsWith("http") || src.startsWith("/")) return src;
      return `/images/guides/${slug}/${src}`;
    },
    [slug]
  );

  const generateId = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9가-힣\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  return (
    <>
      <div className="prose max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h2: ({ children }) => {
              const text = extractText(children);
              const id = generateId(text);
              return (
                <h2
                  id={id}
                  className="text-2xl font-bold mt-10 mb-4 pb-2 border-b border-border-color"
                >
                  {children}
                </h2>
              );
            },
            h3: ({ children }) => {
              const text = extractText(children);
              const id = generateId(text);
              return (
                <h3 id={id} className="text-xl font-semibold mt-8 mb-3">
                  {children}
                </h3>
              );
            },
            p: ({ children }) => (
              <p className="mb-4 leading-7 text-foreground/85">{children}</p>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {children}
              </a>
            ),
            img: ({ src, alt }) => {
              const resolvedSrc =
                typeof src === "string" ? transformImageSrc(src) : "";
              return (
                <img
                  src={resolvedSrc}
                  alt={alt || ""}
                  loading="lazy"
                  className="my-4 rounded-lg border border-border-color cursor-pointer hover:shadow-lg transition-shadow max-w-full"
                  onClick={() =>
                    setModalImage({ src: resolvedSrc, alt: alt || "" })
                  }
                />
              );
            },
            ul: ({ children }) => (
              <ul className="mb-4 pl-6 list-disc space-y-1.5 text-foreground/85">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-4 pl-6 list-decimal space-y-1.5 text-foreground/85">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="leading-7">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary/30 bg-primary/5 px-4 py-3 my-4 rounded-r-lg text-foreground/70 [&>p]:mb-0">
                {children}
              </blockquote>
            ),
            code: ({ className, children, ...props }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-code-bg px-1.5 py-0.5 rounded text-sm font-mono text-primary">
                    {children}
                  </code>
                );
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            pre: ({ children }) => (
              <pre className="bg-code-bg border border-border-color rounded-lg p-4 overflow-x-auto my-4 text-sm">
                {children}
              </pre>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-4">
                <table className="w-full border-collapse border border-border-color">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border border-border-color bg-sidebar-bg px-3 py-2 text-left text-sm font-semibold">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-border-color px-3 py-2 text-sm">
                {children}
              </td>
            ),
            hr: () => <hr className="my-8 border-border-color" />,
            strong: ({ children }) => (
              <strong className="font-semibold text-foreground">
                {children}
              </strong>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {modalImage && (
        <ImageModal
          src={modalImage.src}
          alt={modalImage.alt}
          isOpen={true}
          onClose={() => setModalImage(null)}
        />
      )}
    </>
  );
}

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children && typeof children === "object" && "props" in children) {
    const el = children as { props: { children?: React.ReactNode } };
    return extractText(el.props.children);
  }
  return "";
}
