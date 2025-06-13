export default {
  name: "titleAnimation",
  title: "Title Animation",
  type: "object",
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Title Animation",
      };
    },
  },
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "richContent",
      title: "Rich Content",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "item",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "color",
              title: "Color",
              type: "string",
            },
            {
              name: "image",
              title: "Image",
              type: "accessibleImage",
            },
            {
              name: "link",
              title: "Link",
              type: "link",
              options: {
                enableText: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: "link",
      title: "Link",
      type: "link",
      options: {
        enableText: true,
      },
    },
  ],
};
