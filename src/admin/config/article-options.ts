import AdminJS, { ResourceOptions } from "adminjs";
import { validateArticleHandler } from "../validators";

export const articleOptions: ResourceOptions = {
  navigation: {
    name: null,
    icon: "Blog"
  },

  actions: {
    new: {
      layout: ["title", "body", "psychologist"],
      before: [validateArticleHandler]
    },
    edit: {
      before: [validateArticleHandler]
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
}
