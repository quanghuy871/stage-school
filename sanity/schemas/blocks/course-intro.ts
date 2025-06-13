export default {
    name: "courseIntro",
    title: "Course Intro",
    type: "object",
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            const { title } = selection;
            return {
                title,
                subtitle: "Course Intro",
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
            name: "link",
            title: "Link",
            type: "link",
            options: {
                enableText: true,
            },
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
                            name: "firstRichContent",
                            title: "First Rich Content",
                            type: "array",
                            of: [
                                {
                                    type: "block",
                                },
                            ],
                        },
                        {
                            name: "secondRichContent",
                            title: "Second Rich Content",
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
