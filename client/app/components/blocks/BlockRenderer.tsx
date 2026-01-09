import React from "react";

// Import your custom blocks here
// import { Hero } from "./Hero";
// import { CTA } from "./CTA";

/**
 * Block Registry
 * 
 * Register all your content blocks here.
 * The key should match the Strapi component name (e.g., "blocks.hero")
 */
export const blockRegistry: Record<string, React.ComponentType<any>> = {
  // Example:
  // "blocks.hero": Hero,
  // "blocks.cta": CTA,
};

/**
 * Generic Block type from Strapi
 */
export interface Block {
  id: number;
  __component: string;
  [key: string]: any;
}

interface BlockRendererProps {
  blocks: Block[];
  className?: string;
}

/**
 * BlockRenderer Component
 * 
 * Renders an array of Strapi dynamic zone blocks using the block registry.
 * 
 * Usage:
 * ```tsx
 * <BlockRenderer blocks={page.blocks} />
 * ```
 */
export function BlockRenderer({ blocks, className }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {blocks.map((block) => {
        const Component = blockRegistry[block.__component];

        if (!Component) {
          // Log unknown blocks in development
          if (process.env.NODE_ENV === "development") {
            console.warn(`Unknown block type: ${block.__component}`);
          }
          return null;
        }

        return <Component key={`${block.__component}-${block.id}`} {...block} />;
      })}
    </div>
  );
}

export default BlockRenderer;
