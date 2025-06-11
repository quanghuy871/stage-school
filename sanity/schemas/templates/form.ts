import { ComposeIcon } from "@sanity/icons";

const form = {
  name: "form",
  title: "Form",
  type: "document",
  icon: ComposeIcon,
  fields: [
    {
      name: "title",
      title: "Title*",
      type: "string",
      description: "Field must contain a unique value",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug*",
      description: "Field must contain a unique value",
      type: "slug",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "field",
      title: "Fields",
      type: "formBuilder",
    },
    {
      name: "submitButtonText",
      title: "Submit Button Text*",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "webhookUrl",
      title: "Webhook URL",
      description: 'Paste the webhook URL from your Zapier “Catch Hook” step.',
      type: "string",
    },
    {
      name: "onRedirect",
      title: "On Submit",
      type: "link",
      options: {
        enableText: true,
      },
    },
  ],
};

export default form;
