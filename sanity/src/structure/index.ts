import { CogIcon } from "@sanity/icons";
import { CaseIcon } from "@sanity/icons";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const structure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.divider(),
      S.listItem()
        .title("Configurations")
        .icon(CogIcon)
        .child(
          S.document()
            .title("Configurations")
            .schemaType("configuration")
            .documentId("configuration")
        ),
      S.listItem()
        .title("SEO preferences")
        .icon(CaseIcon)
        .child(
          S.document()
            .title("SEO preferences")
            .schemaType("seoPreferences")
            .documentId("seoPreferences")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["configuration", "seoPreferences", "media.tag"].includes(
            listItem.getId()
          )
      ),
    ]);
