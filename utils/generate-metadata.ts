import { getSiteMetadata } from "@/sanity/lib/api/queries";
import imageUrlBuilder from "@sanity/image-url";
// import { sanityFetch } from "@/sanity/lib/api/fetch";
import client from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/api/live";
import { type GetSiteMetadataResult, type SeoPreferences, type Page, GetPageResult } from "@/sanity.types";

interface Metadata {
  title: string;
  description: string;
  images: string[];
  openGraph: {
    type: string;
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    locale?: string;
    images?:string[];
  };
  twitter: {
    cardType: string;
    site: string;
    handle: string;
    title?: string;
    description?: string;
    images?:string[];
  };
  robots: string;
  keywords: string[];
  other?: {
    "article:publisher"?: string;
  };
}

export async function seo(page: GetPageResult): Promise<Metadata> {
  const {
    metaTitle,
    metaDescription,
    metaImage,
    openGraph,
    seoKeywords,
    twitter,
    nofollowAttributes,
  } = page?.seo || {};
  
  const siteMetadata = await client.fetch(
    getSiteMetadata,
  );

  if (!siteMetadata) {
    throw new Error("Failed to fetch site metadata.");
  }

  const {
    fallbackTitle,
    fallbackDescription,
    noindex,
    websiteName,
    fallbackSocialImage,
    fallbackPageAddress,
    twitterAccount,
    defaultTwitter,
  } = siteMetadata as any;

  let imageUrl;

  const builder = imageUrlBuilder(client);

  if (metaImage) {
    imageUrl = builder.image(metaImage).url();
  } else if (fallbackSocialImage?._type === "image" && fallbackSocialImage?.asset?._ref) {
    imageUrl = builder.image(fallbackSocialImage).url();
  }

  return {
    title: metaTitle || fallbackTitle || "",
    description: metaDescription || fallbackDescription || "",
    images: [imageUrl],
    openGraph: {
      type: "website",
      title: openGraph?.title || metaTitle || fallbackTitle,
      description:
        openGraph?.description || metaDescription || fallbackDescription,
      url: openGraph?.url || "",
      siteName: openGraph?.siteName || websiteName,
      images: [imageUrl],
      locale: "en_AU",
    },
    twitter: {
      cardType: twitter?.cardType || defaultTwitter || "summary_large_image",
      site: twitter?.site || twitterAccount || "",
      handle: twitter?.creator || twitterAccount || "",
      title: openGraph?.title || metaTitle || fallbackTitle,
      images: [imageUrl],
      description:
        openGraph?.description || metaDescription || fallbackDescription,
    },
    robots: nofollowAttributes || noindex ? "noindex,nofollow" : "index,follow",
    keywords: seoKeywords || ["Floorscape"],
    other: {
      "article:publisher": fallbackPageAddress,
    },
  };
}