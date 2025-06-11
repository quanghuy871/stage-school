export default {
  title: "Rich Content",
  name: "richContent",
  type: "array",
  of: [
    {
      type: "block",
      marks: {
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "linkType",
                title: "Link Type",
                type: "string",
                initialValue: "href",
                options: {
                  list: [
                    { title: "URL", value: "href" },
                    { title: "Page", value: "page" },
                    { title: "Post", value: "post" },
                  ],
                  layout: "radio",
                },
              },
              {
                name: "href",
                title: "URL",
                type: "url",
                hidden: ({ parent }) => parent?.linkType !== "href",
                validation: (Rule) =>
                  Rule.custom((value, context) =>
                    context.parent?.linkType === "href" && !value
                      ? "URL is required when Link Type is URL"
                      : true
                  ),
              },
              {
                name: "page",
                title: "Page",
                type: "reference",
                to: [{ type: "page" }],
                hidden: ({ parent }) => parent?.linkType !== "page",
                validation: (Rule) =>
                  Rule.custom((value, context) =>
                    context.parent?.linkType === "page" && !value
                      ? "Page reference is required when Link Type is Page"
                      : true
                  ),
              },
              {
                name: "solution",
                title: "Solution",
                type: "reference",
                to: [{ type: "solution" }],
                hidden: ({ parent }) => parent?.linkType !== "solution",
                validation: (Rule) =>
                  Rule.custom((value, context) =>
                    context.parent?.linkType === "solution" && !value
                      ? "Solution reference is required when Link Type is Solution"
                      : true
                  ),
              },
              {
                name: "openInNewTab",
                title: "Open in new tab",
                type: "boolean",
                initialValue: false,
              },
            ],
          },
        ],
      },
    },
  ],
};
