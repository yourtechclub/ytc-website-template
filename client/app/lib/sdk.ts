import { strapi as createStrapiClient } from "@strapi/client";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const BASE_API_URL = STRAPI_URL + "/api";

const sdk = createStrapiClient({
  baseURL: BASE_API_URL,
});

/**
 * Fetch data from Strapi API with custom populate
 */
export async function fetchFromStrapi<T = any>(
  endpoint: string, 
  params?: Record<string, any>
): Promise<T> {
  const url = new URL(`${BASE_API_URL}/${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (typeof value === 'object') {
        url.searchParams.append(key, JSON.stringify(value));
      } else {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Strapi fetch error: ${response.status}`);
  }
  return response.json();
}

/**
 * Get the full URL for Strapi media
 */
export function getStrapiMedia(url: string | undefined | null): string | null {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

/**
 * Get the Strapi URL
 */
export function getStrapiURL(): string {
  return STRAPI_URL;
}

/**
 * Fetch a page by slug with all blocks populated
 */
export async function fetchPage(slug: string) {
  const response = await fetchFromStrapi('pages', {
    filters: { slug: { $eq: slug } },
    populate: 'deep',
  });
  return response.data?.[0] || null;
}

/**
 * Fetch a collection with pagination
 */
export async function fetchCollection<T = any>(
  collection: string,
  options?: {
    page?: number;
    pageSize?: number;
    filters?: Record<string, any>;
    sort?: string[];
    populate?: string | Record<string, any>;
  }
): Promise<{ data: T[]; meta: { pagination: any } }> {
  const params: Record<string, any> = {
    populate: options?.populate || 'deep',
  };

  if (options?.page) params['pagination[page]'] = options.page;
  if (options?.pageSize) params['pagination[pageSize]'] = options.pageSize;
  if (options?.filters) params.filters = options.filters;
  if (options?.sort) params.sort = options.sort;

  return fetchFromStrapi(collection, params);
}

export default sdk;
