// import "server-only";

import type { QueryParams } from "@sanity/client";
import client from "../client";
// import { draftMode } from "next/headers";

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

export const token = process.env.SANITY_API_TOKEN;

/**
 * Fetches data from the Sanity API.
 *
 * @param query - The GROQ query to execute.
 * @param params - The query parameters.
 * @param tags - The tags for the fetch request.
 * @returns The query response as promise.
 * @throws An error if the `SANITY_API_TOKEN` environment variable is required but not defined.
 */
export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<QueryResponse> {
  // const { isEnabled } = await draftMode()

  // if (isEnabled && !token) {
  //   throw new Error(
  //     "The `SANITY_API_TOKEN` environment variable is required."
  //   );
  // }
  const isDevelopment = process.env.NEXT_PUBLIC_SANITY_DATASET === "development";

  return client
    .withConfig({ useCdn: true })
    .fetch<QueryResponse>(query, params, {
      // ...(isEnabled && {
      //   token: token,
      //   perspective: "previewDrafts",
      // }),
      next: {
        // ...(isEnabled && { revalidate: 3600 }),
        tags,
      },
    });
}
