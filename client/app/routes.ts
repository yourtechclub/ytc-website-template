import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/_layout._index.tsx"),
    // Add your routes here:
    // route("articles", "routes/articles._index.tsx"),
    // route("articles/:slug", "routes/articles.$slug.tsx"),
    // Dynamic pages by slug (e.g., /about, /contact)
    route(":slug", "routes/$.tsx"),
  ]),
] satisfies RouteConfig;
