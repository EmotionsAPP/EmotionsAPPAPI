import { ResourceOptions } from "adminjs";

export const articleOptions: ResourceOptions = {
  navigation: {
    name: null,
    icon: "Blog"
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
