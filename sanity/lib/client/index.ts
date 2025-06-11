import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId} from '../../env';

const token = process.env.SANITY_API_TOKEN
const SANITY_STUDIO_PREVIEW_URL = process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

/**
 * Creates and exports a Sanity client instance.
 * The client is configured using environment variables defined in the env.ts module.
 */
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token,
  stega: {
    enabled: true,
    studioUrl: `${SANITY_STUDIO_PREVIEW_URL}/studio`,
  },
});

export default client;