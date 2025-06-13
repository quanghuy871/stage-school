import { BookIcon } from "@sanity/icons";

const page = {
    name: "page",
    title: "Pages",
    type: "document",
    icon: BookIcon,
    preview: {
        select: {
            title: "title",
            isDraft: "_id",
        },
        prepare(selection) {
            const { title, isDraft } = selection;
            const status = isDraft.startsWith("drafts.") ? "Draft" : "Published";
            return {
                title,
                subtitle: status,
            };
        },
    },
    prepare(selection) {
      const { title, isDraft } = selection;
      const status = isDraft.startsWith("drafts.") ? "Draft" : "Published";
      return {
        title,
        subtitle: status,
      };
    },
  },
  groups: [
    {
      title: "SEO",
      name: "seo",
    },
    {
      title: "Main",
      name: "main",
      default: true,
    },
  ],
  fields: [
    {
      name: "seo",
      title: "Seo",
      type: "customSeoMetaFields",
      group: "seo",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      group: "main",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" },
      group: "main",
    },
    {
      name: "content",
      title: "Blocks",
      type: "array",
      group: "main",
      description: "This is where you can add custom blocks.",
      of: [
        { type: "landingBanner" },
        { type: "titleContentButton" },
        { type: "titleListButton" },
        { type: "titleFourColumn" },
        { type: "cta" },
        { type: "titleContentButtonImage" },
        { type: "titleAnimation" },
      ],
    },
  ],
};

export default page;
