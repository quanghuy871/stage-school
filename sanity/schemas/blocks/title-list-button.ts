export default {
    name: "titleListButton",
    title: "Title List Button",
    type: "object",
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            const { title } = selection;
            return {
                title,
                subtitle: "Title List Button",
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
            name: "list",
            title: "List",
            type: "array",
            of: [{ type: "string" }],
        },
        {
            name: "button",
            title: "Button",
            type: "link",
            options: {
                enableText: true,
            },
        },
    ],
};
