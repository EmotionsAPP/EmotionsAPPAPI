import { ResourceOptions } from "adminjs";
import { validateAdmin } from "../validators";

export const adminOptions: ResourceOptions = {
  navigation: {
    name: null,
    icon: "UserMilitary"
  },

  actions: {
    new: {
      before: [validateAdmin]
    },
    edit: {
      before: [validateAdmin]
    },
    list: {
      isAccessible: ({ currentAdmin }) => currentAdmin.email === process.env.ADMIN_EMAIL
    }
  },

  properties: {
    email: {
      isRequired: true,
    },
    password: {
      isVisible: false,
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


