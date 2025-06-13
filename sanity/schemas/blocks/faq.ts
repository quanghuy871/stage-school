export default {
    name: "faq",
    title: "FAQ",
    type: "object",
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            const { title } = selection;
            return {
                title,
                subtitle: "FAQ",
            };
        },
    },
    fields: [
        {
            name: "subtitle",
            title: "Subtitle",
            type: "string",
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
            of: [
                {
                    type: "block",
                },
            ],
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
        {
            name: "items",
            title: "Items",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "item",
                    title: "Item",
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
                            of: [
                                {
                                    type: "block",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};
