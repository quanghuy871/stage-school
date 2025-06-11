export default {
  name: "accessibleImage",
  type: "object",
  fields: [
    {
      name: "asset",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "alt",
      type: "string",
      title: "Alt text",
      hidden: ({ parent }) => !parent?.asset,
    },
    {
      name: "caption",
      type: "string",
      title: "Caption",
      hidden: ({ parent }) => !parent?.asset,
    },
  ],
};
