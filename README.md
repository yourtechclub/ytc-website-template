# YTC Website Template

🚀 **A production-ready monorepo template for building websites with React Router 7 + Strapi 5**

## Quick Start

### 1. Create a new project from this template

Click **"Use this template"** on GitHub, or:

```bash
gh repo create my-project --template yourtechclub/ytc-website-template --private
git clone git@github.com:your-org/my-project.git
cd my-project
```

### 2. Setup

```bash
yarn setup    # Install dependencies + create .env files
yarn seed     # Load starter content (optional)
yarn dev      # Start development servers
```

### 3. Access

- **Frontend**: http://localhost:5174
- **Strapi Admin**: http://localhost:1337/admin

---

## Project Structure

```
├── client/                 # React Router 7 Frontend
│   ├── app/
│   │   ├── components/
│   │   │   ├── blocks/    # Content blocks (your custom designs)
│   │   │   └── ui/        # shadcn/ui components
│   │   ├── lib/           # SDK & utilities
│   │   ├── routes/        # Page routes
│   │   └── tokens.css     # Design tokens (customize per project)
│   └── package.json
│
├── server/                 # Strapi 5 Backend
│   ├── src/
│   │   ├── api/           # Content types
│   │   └── components/    # Strapi block schemas
│   └── package.json
│
├── packages/              # Shared code
│   └── core/              # SDK, utilities, shared types
│
└── package.json           # Root workspace
```

---

## Workflow: Figma → Live Website

### Step 1: Design Tokens

Extract colors, fonts, and spacing from Figma and add to `client/app/tokens.css`:

```css
:root {
  --color-brand: #your-brand-color;
  --color-accent: #your-accent-color;
  --font-heading: 'Your Heading Font', sans-serif;
  --font-body: 'Your Body Font', sans-serif;
}
```

### Step 2: Generate Blocks from Figma

Use the Figma MCP server in VS Code with Copilot:

```
Prompt: "Generate a React component for this Figma node: [node-id]
Use Tailwind CSS with our design tokens.
Also create the Strapi schema for content editors."
```

### Step 3: Register Blocks

Add your new block to `client/app/components/blocks/registry.ts`:

```typescript
export const blockRegistry = {
  'blocks.hero': Hero,
  'blocks.your-new-block': YourNewBlock,
}
```

### Step 4: Add Block to Strapi

Add the block component to your Page dynamic zone in Strapi.

---

## Design Tokens

This template uses CSS custom properties for theming. Override in `client/app/tokens.css`:

| Token | Purpose |
|-------|---------|
| `--color-brand` | Primary brand color |
| `--color-accent` | Accent/CTA color |
| `--color-background` | Page background |
| `--color-foreground` | Text color |
| `--font-heading` | Heading typeface |
| `--font-body` | Body typeface |
| `--spacing-section` | Vertical section spacing |

---

## SDK Features

The template includes a shared SDK (`packages/core` or `client/app/lib/sdk.ts`):

```typescript
// Strapi data fetching
import { fetchPage, fetchCollection } from '~/lib/sdk'

// Image optimization
import { getStrapiMedia } from '~/lib/sdk'

// Block rendering
import { BlockRenderer } from '~/components/blocks/BlockRenderer'
```

---

## Deployment

### Digital Ocean App Platform

1. Connect your GitHub repo
2. Set environment variables
3. Deploy!

### Environment Variables

```env
# Client
STRAPI_URL=https://your-cms.domain.com

# Server
DATABASE_CLIENT=postgres
DATABASE_URL=your-database-url
```

---

## Creating New Projects

1. **Use this template** on GitHub
2. **Clone** the new repo
3. **Run** `yarn setup`
4. **Import** design tokens from Figma
5. **Generate** blocks using Figma MCP
6. **Deploy** to staging

Estimated time: **~4-6 hours** for a complete website with 10 blocks.

---

## License

Private - YourTechClub
