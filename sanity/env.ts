/**
 * This module exports environment variables required for the Sanity API.
 * It ensures that the necessary environment variables are defined and provides
 * default values where applicable.
 */

/**
 * The API version to use for Sanity requests.
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-07-11";

/**
 * The dataset to use for Sanity requests.
 * Throws an error if the environment variable is not defined.
 */
export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing: NEXT_PUBLIC_SANITY_DATASET"
);

/**
 * The project ID to use for Sanity requests.
 * Throws an error if the environment variable is not defined.
 */
export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

/**
 * The base url to use for Sanity Studio.
 * Throws an error if the environment variable is not defined.
 */
export const studioUrl = assertValue(
  process.env.NEXT_PUBLIC_BASE_URL,
  "Missing: NEXT_PUBLIC_BASE_URL"
);

/**
 * Asserts that a given environment variable is defined.
 * Throws an error with the provided message if the variable is undefined.
 *
 * @param env - The environment variable to check.
 * @param errorMessage - The error message to throw if the variable is undefined.
 * @returns The environment variable if it is defined.
 * @throws An error if the environment variable is undefined.
 */
function assertValue<T>(env: T | undefined, errorMessage: string): T {
  if (env === undefined) {
    throw new Error(errorMessage);
  }
  return env;
}