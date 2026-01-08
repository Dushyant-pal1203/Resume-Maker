// components/SmartSection.tsx
import React, { useRef, useEffect, useState } from "react";

interface SmartSectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  maxHeight?: number; // Maximum height before forcing split
}

export function SmartSection({
  children,
  id,
  className = "",
  maxHeight = 800,
}: SmartSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [needsSplit, setNeedsSplit] = useState(false);
  const [splitContent, setSplitContent] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (sectionRef.current && typeof window !== "undefined") {
      const section = sectionRef.current;
      const sectionHeight = section.offsetHeight;
      const PAGE_HEIGHT = 1123; // A4 height at 96 DPI

      // If section is longer than 80% of a page, mark for splitting
      if (sectionHeight > PAGE_HEIGHT * 0.8) {
        setNeedsSplit(true);

        // Here you would implement logic to split the content
        // This is a simplified example
        const childNodes = Array.from(section.children);
        const splitIndex = Math.floor(childNodes.length / 2);

        // Create two parts
        const part1 = childNodes.slice(0, splitIndex);
        const part2 = childNodes.slice(splitIndex);

        // In a real implementation, you'd properly clone and render these
        setSplitContent([children, children]); // Simplified
      }
    }
  }, [children]);

  if (needsSplit && splitContent.length > 0) {
    return (
      <>
        <div
          ref={sectionRef}
          className={`${className} section-container allow-split`}
          id={`${id}-part1`}
        >
          {splitContent[0]}
        </div>
        <div
          className={`${className} section-container force-page-break`}
          id={`${id}-part2`}
        >
          {splitContent[1]}
        </div>
      </>
    );
  }

  return (
    <div ref={sectionRef} className={`${className} section-container`} id={id}>
      {children}
    </div>
  );
}
