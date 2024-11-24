import { client } from "./client";

interface SanityFetchOptions {
  query: string;
  params?: Record<string, unknown>;
  tag?: string;
}

export async function sanityFetch<T = unknown>({
  query,
  params = {},
  tag,
}: SanityFetchOptions): Promise<T> {
  try {
    const data = await client.fetch(query, params, { cache: "no-cache", tag });
    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return [] as unknown as T;
  }
}
