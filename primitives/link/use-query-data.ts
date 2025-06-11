import { useState, useEffect } from "react";
import client from "../../sanity/lib/client";

const useQueryInternalLink = (to, trueTo) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchInternalLink = async () => {
      try {
        if (to?.internalLink?._ref && to?.internalLink?._type === "reference") {
          const fetchedData = await client.fetch(
            `*[_id == $id][0]{_type, slug, title}`,
            { id: to?.internalLink._ref }
          );

          if (fetchedData?._type === "solution") {
            fetchedData.slug.current = `solutions/${fetchedData?.slug?.current}`;
          }

          setData({
            ...trueTo,
            internalLink: {
              ...fetchedData,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching internal link:", error);
      }
    };

    if (to?.internalLink?._ref && to?.internalLink?._type === "reference") {
      fetchInternalLink();
    }
  }, [to?.internalLink?._ref, to?.internalLink?._type, trueTo]);

  return data;
};

export default useQueryInternalLink;