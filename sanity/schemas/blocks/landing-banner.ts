export default {
  name: "landingBanner",
  title: "Landing Banner",
  type: "object",
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
        subtitle: "Landing Banner",
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
      name: "video",
      title: "Video",
      type: "string",
    },
    {
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [
        {
          type: "link",
          options: {
            enableText: true,
          },
        },
      ],
    },
  ],
};
