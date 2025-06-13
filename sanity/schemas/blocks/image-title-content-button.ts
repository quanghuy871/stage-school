export default {
    name: "imageTitleContentButton",
    title: "Image Title Content Button",
    type: "object",
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            const { title } = selection;
            return {
                title,
                subtitle: "Image Title Content Button",
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
            name: "image",
            title: "Image",
            type: "accessibleImage",
        },
        {
            name: "richContent",
            title: "Rich Content",
            type: "array",
            of: [
                {
                    type: "block",
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
