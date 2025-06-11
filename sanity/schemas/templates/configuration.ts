const configuration = {
  name: "configuration",
  title: "Configurations",
  type: "document",
  groups: [
    {
      title: "Appearance",
      name: "appearance",
      default: true,
    },
    {
      title: "Site Settings",
      name: "siteSetting",
    },
  ],
  fields: [
    {
      name: "logo",
      title: "Logo",
      type: "accessibleImage",
      group: "appearance",
    },
    {
      name: "offcanvasBackground",
      title: "Offcanvas Background",
      type: "accessibleImage",
      group: "appearance",
    },
  ],
};

export default configuration;
