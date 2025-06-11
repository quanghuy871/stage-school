import React from "react";
import { getPageSlug, getPage } from "@/sanity/lib/api/queries";
import { seo } from "@/utils/generate-metadata";
import { sanityFetch } from "@/sanity/lib/api/live";
import BlockRenderer from "@/utils/block-renderer";
import { type Page, type GetPageSlugResult } from "@/sanity.types";
import { type Metadata } from "next";
import LenisProvider from "@/components/lenis-provider";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: getPageSlug,
    perspective: "published",
    stega: false,
  });

  return data;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const {data} = await sanityFetch({
    query: getPage,
    params: { slug },
    stega: false,
  });

  return seo(data);
}

const Page = async (props: Props) => {
  const { slug } = await props.params;

  const [{ data: page }] = await Promise.all([
    sanityFetch({ query: getPage, params: { slug } }),
  ]);

  if (!page) return notFound();

  return (
    <>
    <LenisProvider>
      <BlockRenderer key={slug} data={page?.content} />
    </LenisProvider>
    </>
  );
};

export default Page;
