export default {
    name: "cta",
    title: "CTA",
    type: "object",
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            const { title } = selection;
            return {
                title,
                subtitle: "CTA",
            };
        },
    },
    fields: [
        {
            name: "backgroundImage",
            title: "Background Image",
            type: "accessibleImage",
        },
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
