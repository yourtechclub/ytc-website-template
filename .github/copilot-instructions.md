# YTC Website Template - AI Coding Instructions

## Project Overview

This is a **React Router 7 + Strapi 5** monorepo template for building websites.

**Architecture:**
- `client/` - React Router 7 frontend
- `server/` - Strapi 5 CMS backend
- `packages/` - Shared code (optional)

## Development Commands

```bash
yarn setup    # First-time setup (install + create .env files)
yarn dev      # Start both servers
yarn seed     # Load seed data
```

**URLs:**
- Frontend: http://localhost:5174
- Strapi Admin: http://localhost:1337/admin

---

## Workflow: Figma → Code

### 1. Extract Design Tokens

When starting a new project, extract design tokens from Figma:

```
Prompt: "Extract design tokens from Figma [URL]:
- Colors (brand, accent, neutral, semantic)
- Typography (fonts, sizes, weights)
- Spacing scale
- Border radius
- Shadows

Output as CSS custom properties for client/app/tokens.css"
```

### 2. Generate Blocks from Figma

For each content block in the Figma design:

```
Prompt: "Generate a React component for this Figma node: [node-id]

Requirements:
1. Use Tailwind CSS with our design tokens (var(--color-brand), etc.)
2. Use shadcn/ui primitives (Button, Card, etc.) where appropriate
3. Create TypeScript interface for props
4. Make it responsive (mobile-first)

Also generate:
- Strapi component schema (JSON) for content editors
- The schema should have fields for all editable content
```

### 3. Register New Blocks

After generating a block, register it:

**React Component:** `client/app/components/blocks/YourBlock.tsx`

**Block Registry:** Update `client/app/components/blocks/BlockRenderer.tsx`:
```typescript
import { YourBlock } from "./YourBlock";

export const blockRegistry = {
  "blocks.your-block": YourBlock,
};
```

**Strapi Schema:** `server/src/components/blocks/your-block.json`

**Page Dynamic Zone:** Add to `server/src/api/page/content-types/page/schema.json`:
```json
{
  "blocks": {
    "components": [
      "blocks.your-block"
    ]
  }
}
```

---

## Component Conventions

### React Components

```tsx
// client/app/components/blocks/Hero.tsx
import type { FC } from 'react'
import { getStrapiMedia } from '~/lib/sdk'

interface HeroProps {
  headline: string
  subheadline?: string
  backgroundImage?: {
    url: string
    alternativeText?: string
  }
  cta?: {
    label: string
    url: string
  }
}

export const Hero: FC<HeroProps> = ({ 
  headline, 
  subheadline, 
  backgroundImage,
  cta 
}) => {
  return (
    <section className="section bg-background">
      <div className="container">
        <h1 className="font-heading text-5xl md:text-7xl font-bold">
          {headline}
        </h1>
        {subheadline && (
          <p className="mt-6 text-xl text-muted-foreground">
            {subheadline}
          </p>
        )}
      </div>
    </section>
  )
}
```

**Rules:**
- Use TypeScript interfaces for props
- Use semantic HTML (`<section>`, `<article>`, etc.)
- Use design token CSS variables
- Mobile-first responsive design
- Named exports

### Strapi Component Schemas

```json
{
  "collectionName": "components_blocks_heroes",
  "info": {
    "displayName": "Hero",
    "icon": "picture",
    "description": "Hero section with headline and image"
  },
  "attributes": {
    "headline": {
      "type": "string",
      "required": true
    },
    "subheadline": {
      "type": "text"
    },
    "backgroundImage": {
      "type": "media",
      "allowedTypes": ["images"]
    },
    "ctaLabel": {
      "type": "string"
    },
    "ctaUrl": {
      "type": "string"
    }
  }
}
```

---

## Data Fetching

Use the SDK helpers in `client/app/lib/sdk.ts`:

```typescript
import { fetchPage, fetchCollection, getStrapiMedia } from '~/lib/sdk'

// In a route loader:
export async function loader({ params }) {
  const page = await fetchPage(params.slug)
  return { page }
}
```

---

## Design Tokens

Located in `client/app/tokens.css`. Key tokens:

| Token | Usage |
|-------|-------|
| `--color-brand-*` | Brand color scale |
| `--color-accent-*` | Accent color scale |
| `--font-heading` | Heading typeface |
| `--font-body` | Body typeface |
| `--spacing-section` | Vertical section spacing |

Use in Tailwind:
```html
<div class="bg-[var(--color-brand-500)]">
```

Or define in Tailwind config for cleaner classes.

---

## File Structure for New Blocks

When creating a new block:

```
client/app/components/blocks/
├── YourBlock.tsx           # React component

server/src/components/blocks/
├── your-block.json         # Strapi schema
```

Then update:
- `client/app/components/blocks/BlockRenderer.tsx` (registry)
- `server/src/api/page/content-types/page/schema.json` (dynamic zone)
