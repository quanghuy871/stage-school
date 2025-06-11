export default {
    name: "titleContentButton",
    title: "Title Content Button",
    type: "object",
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            const { title } = selection;
            return {
                title,
                subtitle: "Title Content Button",
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
            name: "link",
            title: "Link",
            type: "link",
            options: {
                enableText: true,
            },
        },
    ],
};
