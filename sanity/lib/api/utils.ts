import { projectId, dataset, studioUrl } from "@/sanity/env";
import { createDataAttribute, CreateDataAttributeProps } from "next-sanity";

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, "id" | "type" | "path">>;

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config);
}