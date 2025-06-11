const seo = {
  name: "seoPreferences",
  title: "SEO preferences",
  type: "document",
  groups: [
    {
      title: "SEO",
      name: "seo",
      default: true,
    },
    {
      title: "Social card",
      name: "socialCard",
    },
  ],
  fields: [
    {
      name: "fallbackTitle",
      title: "Fallback title*",
      type: "string",
      description:
        "If there is no title available for a record, this will be used as the default",
      group: "seo",
      validation: (Rule) => Rule.required().error("Required"),
    },
    {
      name: "titleSuffix",
      title: "Title suffix",
      type: "string",
      description:
        "The SEO title will include both the title of the record and this suffix if they are 60 characters or less in total",
      group: "seo",
    },
    {
      name: "fallbackDescription",
      title: "Fallback description*",
      type: "string",
      description:
        "The SEO title will include both the title of the record and this suffix if they are 60 characters or less in total",
      group: "seo",
      validation: (Rule) => Rule.required().error("Required"),
    },
    {
      name: "noindex",
      title: "Prevent your site from being indexed by search engines?",
      type: "boolean",
      description: "This will add a noindex tag to all the pages",
      group: "seo",
    },
    {
      name: "websiteName",
      title: "Website name*",
      type: "string",
      description: "This will populate the og:site_name Open Graph tag",
      group: "socialCard",
      validation: (Rule) => Rule.required().error("Required."),
    },
    {
      name: "fallbackSocialImage",
      title: "Fallback social card image",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "If there is no image available for a record, this image will be used as the default for sharing",
      group: "socialCard",
    },
    {
      name: "fallbackPageAddress",
      title: "Facebook page address",
      type: "string",
      description: "This will populate the article:publisher Open Graph tag",
      group: "socialCard",
    },
    {
      name: "twitterAccount",
      title: "Twitter (X) account",
      type: "string",
      description: "This will populate the twitter:site Open Graph tag",
      group: "socialCard",
    },
    {
      name: "defaultTwitter",
      title: "Default Twitter (X) card type*",
      type: "string",
      description:
        "Unless a different setting is present at the record's level, this will be the type of card used for sharing on Twitter (X)",
      group: "socialCard",
      validation: (Rule) => Rule.required().error("Required"),
      initialValue: "Summary with large image",
      options: {
        list: ["Summary with large image", "Summary"],
      },
    },
  ],
};

export default seo;
