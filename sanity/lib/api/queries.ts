import { defineQuery } from "next-sanity";
import { type Page } from "@/sanity.types";
import { groq } from "next-sanity";

export const getConfigurations = defineQuery(`
  *[_type == "configuration"][0]{
      _id,
      logo,
      offcanvasBackground
    }
`);

export const getPageSlug = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

export const getForm = defineQuery(`
*[_type == "form" && slug.current == $slug][0]{
      field,
      title,
      slug,
      submitButtonText,
      webhookUrl,
      onRedirect {
      ...,
      internalLink->{_type, slug, title}
      },
    }
`);

export const getSiteMetadata = defineQuery(`
*[_type == "seoPreferences"][0]{
      fallbackTitle,
      titleSuffix,
      fallbackDescription,
      noindex,
      websiteName,
      fallbackSocialImage,
      fallbackPageAddress,
      twitterAccount,
      defaultTwitter
    }
  `);

export const getPages = defineQuery(`
  *[_type == "page"]{
      _id,
      _createdAt,
      title,
      "slug": slug.current
    }
  `);

export const getPage = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
      _id,
      _type,
      _createdAt,
      seo {
        _type,
        metaTitle, 
        metaImage,  
        metaDescription,
        nofollowAttributes,
        openGraph{
          _type,
          title,
          url,
          description,
          siteName,
          image,
        },
        seoKeywords,
        twitter{
          _type,
          cardType,
          handle,
          site,
          creator
        }
      },
      title,
      "slug": slug.current,
      content[]{
        ...,
        link {
          ...,
          internalLink->{_type, slug, title}
        },
        form->{
          _id,
          title,
          slug,
          field,
          submitButtonText,
          webhookUrl,
          onRedirect {
            ...,
            internalLink->{_type, slug, title}
          },
        },
      }
    }
`);