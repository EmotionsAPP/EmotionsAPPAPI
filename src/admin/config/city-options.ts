import { ResourceOptions } from "adminjs";

export const cityOptions: ResourceOptions = {
  navigation: {
    name: null,
    icon: "LocationCompany"
  },

  properties: {
    name: {
      isRequired: true,
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