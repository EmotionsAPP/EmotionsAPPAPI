import AdminJS, { ResourceWithOptions } from "adminjs";
import { IMPORT_EXPORT_FEATURE, LOGGER_FEATURE, VALIDATE_PERMISSIONS_FEATURE } from "../features";
import { validateArticle } from "../validators";

export const createArticleResource = (resource: unknown): ResourceWithOptions => ({
  resource,
  options: {
    navigation: {
      name: null,
      icon: "Blog"
    },
  
    actions: {
      new: {
        layout: ["title", "body", "psychologist"],
        before: [validateArticle]
      },
      edit: {
        before: [validateArticle]
      },
    },
  
    properties: {
      title: {
        isRequired: true,
      },
      body: {
        type: 'richtext',
        isRequired: true,
      },
      psychologist: {
        components: {
          edit: AdminJS.bundle('../components/property/PropertyReferenceEdit'),
        },
        custom: {
          role: "Psychologist"
        },
        isRequired: true,
        reference: 'User',
      },
      createdAt: {
        isVisible: {
          show: true,
          list: true,
          edit: false,
          filter: true,
        },
      },
      updatedAt: {
        isVisible: {
          show: true,
          list: true,
          edit: false,
          filter: true,
        }
      }
    }
  },
  features: [
    IMPORT_EXPORT_FEATURE,
    LOGGER_FEATURE,
    VALIDATE_PERMISSIONS_FEATURE,
  ]
});