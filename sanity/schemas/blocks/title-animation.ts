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
                            name: "subtitle",
                            title: "Subtitle",
                            type: "string",
                        },
                        {
                            name: "color",
                            title: "Color",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Vermillion", value: "vermillion" },
                                    { title: "Lime", value: "lime" },
                                    { title: "Orange", value: "orange" },
                                    { title: "Cyan", value: "cyan" },
                                ],
                            },
                        },
                        {
                            name: "image",
                            title: "Image",
                            type: "accessibleImage",
                        },
                        {
                            name: "tag",
                            title: "Tag",
                            type: "string",
                        },
                        {
                            name: "link",
                            title: "Link",
                            type: "link",
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
