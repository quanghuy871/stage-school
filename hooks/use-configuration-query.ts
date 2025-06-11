import { useEffect, useState } from "react";
import { sanityFetch } from "@/sanity/lib/api/fetch";
import { getConfigurations } from "@/sanity/lib/api/queries";
import { type Configuration } from "@/sanity.types";

export const useConfigurationQuery = () => {
  const [configs, setConfigs] = useState<Configuration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const solutionsData = await sanityFetch<Configuration[]>({ query: getConfigurations });
        setConfigs(solutionsData);
      } catch (error) { 
        setError(error as Error);
        console.error("Error fetching configurations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfigs();
  }, []);

  return { configs, loading, error };
};