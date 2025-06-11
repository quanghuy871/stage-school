import page from "././templates/page";
import configuration from "./templates/configuration";
import formSubmission from "./templates/form-submission";
import form from "./templates/form";
import seoPreferences from "./templates/seo";
import seoSchema from "./objects/seo-schema";

import accessibleImage from "././objects/accessible-image";
import formBuilder from "./objects/form-builder";
import formFields from "./objects/form-fields";

import landingBanner from "./blocks/landing-banner";
import titleContentButton from "./blocks/title-content-button";

const schemas = [
    page,
    landingBanner,
    titleContentButton,
    configuration,
    accessibleImage,
    seoPreferences,
    formBuilder,
    formFields,
    form,
    formSubmission,
    seoSchema,
];

export default schemas;
