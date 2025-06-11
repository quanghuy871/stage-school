import { FolderIcon } from "@sanity/icons";

const formSubmission = {
  name: "formSubmission",
  title: "Form Submissions",
  type: "document",
  icon: FolderIcon,
  fields: [
    {
      name: "firstName",
      title: "First Name",
      type: "string",
      hidden: ({ parent }) => !parent?.firstName,
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
      hidden: ({ parent }) => !parent?.lastName,
    },
    {
      name: "contactNumber",
      title: "Contact Number",
      type: "string",
      hidden: ({ parent }) => !parent?.contactNumber,
    },
    {
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      hidden: ({ parent }) => !parent?.contactEmail,
    },
    {
      name: "businessName",
      title: "Business Name",
      type: "string",
      hidden: ({ parent }) => !parent?.businessName,
    },
    {
      name: "industry",
      title: "Industry",
      type: "string",
      hidden: ({ parent }) => !parent?.industry,
    },
    {
      name: "locationCity",
      title: "Location",
      type: "string",
      hidden: ({ parent }) => !parent?.locationCity,
    },
    {
      name: "linkedin",
      title: "Linkedin",
      type: "string",
      hidden: ({ parent }) => !parent?.linkedin,
    },
    {
      name: "whichBestDescribesYourNeeds",
      title: "Which best describes your needs?",
      type: "string",
      hidden: ({ parent }) => !parent?.whichBestDescribesYourNeeds,
    },
    {
      name: "howCanWeHelp",
      title: "Message",
      type: "text",
      hidden: ({ parent }) => !parent?.howCanWeHelp,
    },
    {
      name: "lastlyTellUsALittleBitAboutYourself",
      title: "Tell Us A Little Bit About Yourself",
      type: "text",
      hidden: ({ parent }) => !parent?.lastlyTellUsALittleBitAboutYourself,
    },
    {
      name: "yourResumeCv",
      title: "Resume/CV",
      type: "string",
      hidden: ({ parent }) => !parent?.yourResumeCv,
    },
    {
      name: "coverLetter",
      title: "Cover Letter",
      type: "string",
      hidden: ({ parent }) => !parent?.coverLetter,
    },
  ],
};

export default formSubmission;
