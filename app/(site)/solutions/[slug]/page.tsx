import React from "react";
import { getSolutionSlug, getSolution } from "@/sanity/lib/api/queries";
import { seo } from "@/utils/generate-metadata";
import { sanityFetch } from "@/sanity/lib/api/live";
import BlockRenderer from "@/utils/block-renderer";
import { type Page} from "@/sanity.types";
import { type Metadata } from "next";
import SolutionIntro from "@/components/blocks/solution-intro"
import LenisProvider from "@/components/lenis-provider"; 
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: getSolutionSlug,
    perspective: "published",
    stega: false,
  });

  return data;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const {data} = await sanityFetch({
    query: getSolution,
    params: { slug },
    stega: false,
  });

  return seo(data);
}

const Page = async (props: Props) => {
  const { slug } = await props.params;

  const [{ data: page }] = await Promise.all([
    sanityFetch({ query: getSolution, params: { slug } }),
  ]);

  if (!page) return notFound();

  return (
    <>
      <LenisProvider>
        <SolutionIntro page={page} />
        <BlockRenderer key={slug} data={page?.content} />
      </LenisProvider>
    </>
  );
};

export default Page;