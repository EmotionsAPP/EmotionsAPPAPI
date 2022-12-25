import { ActionContext, ResourceOptions } from "adminjs";
import { validateAdmin } from "../validators";

const canEditAdmin = ({ currentAdmin, record }: ActionContext) => {

  return !record.params.isSuperAdmin || currentAdmin.email === record.params.email;
};

export const adminOptions: ResourceOptions = {
  navigation: {
    name: null,
    icon: "UserMilitary"
  },

  actions: {
    new: {
      before: [validateAdmin],
    },
    edit: {
      before: [validateAdmin],
      isAccessible: canEditAdmin,
    },
    list: {
      isAccessible: ({ currentAdmin }) => currentAdmin.isSuperAdmin,
    },
    delete: {
      isAccessible: canEditAdmin,
    },
    bulkDelete: {
      isAccessible: false,
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
    isSuperAdmin: {
      isVisible: false,
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


