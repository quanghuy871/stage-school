export default {
    name: "titleContentButtonImage",
    title: "Title Content Button Image",
    type: "object",
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            const { title } = selection;
            return {
                title,
                subtitle: "Title Content Button Image",
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
            type: "image",
        },
        {
            name: "richContent",
            title: "Rich Content",
            type: "array",
            of: [{ type: "block" }],
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
