import { defineLive } from "next-sanity";
import client from '@/sanity/lib/client';

const token = process.env.SANITY_API_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});