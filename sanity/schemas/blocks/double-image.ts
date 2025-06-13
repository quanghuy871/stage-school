export default {
    name: "doubleImage",
    title: "Double Image",
    type: "object",
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            const { title } = selection;
            return {
                title,
                subtitle: "Double Image",
            };
        },
    },
    fields: [
        {
            name: "firstImage",
            title: "First Image",
            type: "accessibleImage",
        },
        {
            name: "secondImage",
            title: "Second Image",
            type: "accessibleImage",
        },
    ],
};
