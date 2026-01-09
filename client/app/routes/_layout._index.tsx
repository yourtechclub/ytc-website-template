import type { Route } from "./+types/_layout._index";
import { fetchFromStrapi } from "~/lib/sdk";
import { BlockRenderer } from "~/components/blocks";

export const meta: Route.MetaFunction = ({ data }) => {
  const page = data?.page;
  return [
    { title: page?.seo?.metaTitle || "Home" },
    { name: "description", content: page?.seo?.metaDescription || "" },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  // Fetch homepage (landing-page single type or page with slug "home")
  try {
    const response = await fetchFromStrapi("landing-page", {
      populate: "deep",
    });
    return { page: response.data };
  } catch (error) {
    // Fallback: try fetching a page with slug "home"
    try {
      const response = await fetchFromStrapi("pages", {
        filters: { slug: { $eq: "home" } },
        populate: "deep",
      });
      return { page: response.data?.[0] || null };
    } catch {
      return { page: null };
    }
  }
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { page } = loaderData;

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
          <p className="text-gray-600 mb-8">
            Your website template is ready. Start by adding content in Strapi.
          </p>
          <a
            href="http://localhost:1337/admin"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Open Strapi Admin
          </a>
        </div>
      </div>
    );
  }

  return <BlockRenderer blocks={page.blocks || []} />;
}
