import {
  defineLocations,
  PresentationPluginOptions,
  defineDocuments,
  type DocumentLocation,
} from "sanity/presentation";

// Define home location as a constant
const HOME_LOCATION: DocumentLocation = {
  title: "Home",
  href: "/",
};

/**
 * Resolves the correct href for a given document type and slug.
 * @param documentType - The type of the document.
 * @param slug - The document's slug.
 * @returns The resolved href or undefined if invalid.
 */
const resolveHref = (documentType?: string, slug?: string): string | undefined => {
  if (!slug) return undefined;

  const routes: Record<string, string> = {
    solution: `/solutions/${slug}`,
    page: `/${slug}`,
  };

  return routes[documentType!] ?? (console.warn("Invalid document type:", documentType), undefined);
};

export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    {
      route: "/:slug",
      filter: `_type == "page" && slug.current == $slug || _id == $slug`,
    },
    {
      route: "/posts/:slug",
      filter: `_type == "solution" && slug.current == $slug || _id == $slug`,
    },
  ]),
  locations: {
    settings: defineLocations({
      locations: [HOME_LOCATION],
      message: "This document is used on all pages",
      tone: "positive",
    }),
    page: defineLocations({
      select: {
        name: "name",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.name || "Untitled",
            href: resolveHref("page", doc?.slug)!,
          },
        ],
      }),
    }),
    solution: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: resolveHref("solution", doc?.slug)!,
          },
          HOME_LOCATION,
        ].filter(Boolean) as DocumentLocation[],
      }),
    }),
  },
};
