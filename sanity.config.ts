import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { structure } from "./sanity/src/structure";
import { visionTool } from "@sanity/vision";
import { seoMetaFields } from "sanity-plugin-seo";
import { media } from "sanity-plugin-media";
import schemas from "./sanity/schemas";
import Logo from "./sanity/src/theme/components/logo";
import Navbar from "./sanity/src/theme/components/navbar";
import { linkField } from "sanity-plugin-link-field";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { presentationTool } from 'sanity/presentation';
import {resolve} from "@/sanity/presentation/resolver";
import dotenv from "dotenv";

dotenv.config();

const SANITY_STUDIO_PREVIEW_URL = process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

const config = defineConfig({
  title: "Stage School",
  projectId,
  dataset,
  apiVersion,
  basePath: "/studio",
  icon: Logo,
  plugins: [
    structureTool({
      structure,
    }),
    visionTool({
      defaultApiVersion: apiVersion,
    }),
    seoMetaFields(),
    media(),
    linkField({
      linkableSchemaTypes: ['page'],
    }),
    presentationTool({
      resolve,
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
  ],
  studio: {
    components: {
      navbar: Navbar,
    },
  },
  schema: { types: schemas },
});

export default config;