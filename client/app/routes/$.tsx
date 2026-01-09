import type { Route } from "./+types/$";
import { fetchPage } from "~/lib/sdk";
import { BlockRenderer } from "~/components/blocks";

export const meta: Route.MetaFunction = ({ data }) => {
  const page = data?.page;
  return [
    { title: page?.seo?.metaTitle || page?.title || "Page" },
    { name: "description", content: page?.seo?.metaDescription || "" },
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug || params["*"];
  
  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const page = await fetchPage(slug);
  
  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }

  return { page };
}

export default function DynamicPage({ loaderData }: Route.ComponentProps) {
  const { page } = loaderData;

  return (
    <>
      {page.blocks && <BlockRenderer blocks={page.blocks} />}
    </>
  );
}
