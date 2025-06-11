import React, { type ReactElement } from "react";
import { getPageSlug, getPage } from "@/sanity/lib/api/queries";
import { seo } from "@/utils/generate-metadata";
import { sanityFetch } from "@/sanity/lib/api/live";
import BlockRenderer from "@/utils/block-renderer";
import LenisProvider from "@/components/lenis-provider";
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: getPageSlug,
    perspective: "published",
    stega: false,
  });

  return data.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata() {
  const { data } = await sanityFetch({
    query: getPage,
    params: { slug: "index" },
    stega: false,
  });

  return seo(data);
}

export default async function HomePage() {
  const { data: page } = await sanityFetch({
    query: getPage,
    params: { slug: "index" },
    perspective: "published",
  });

  if (!page) return notFound();

  return (
    <LenisProvider>
      <BlockRenderer key="index" data={page.content} />
    </LenisProvider>
  );
}
