import { ResourceOptions } from "adminjs";
import { validateArticle } from "../validators";

export const articleOptions: ResourceOptions = {
  navigation: {
    name: null,
    icon: "Blog"
  },

  actions: {
    new: {
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
      isRequired: true,
    },
    psychologist: {
      isRequired: true,
    },
  }
}
