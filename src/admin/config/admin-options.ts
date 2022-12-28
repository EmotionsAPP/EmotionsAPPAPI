import AdminJS, { ActionContext, ResourceOptions } from "adminjs";
import { validateAdmin } from "../validators";

const canEditAdmin = ({ currentAdmin, record }: ActionContext) => {

  return !record.params.isSuperAdmin || currentAdmin.email === record.params.email;
};

export const adminOptions: ResourceOptions = {
  navigation: {
    name: null,
    icon: "UserMilitary"
  },

  listProperties: ["email", "_id", "firstName", "lastName", "createdAt", "updatedAt"],

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
    permissions: {
      isArray: true,
      components: {
        edit: AdminJS.bundle("../components/property/PermissionSelectBox")
      },
      availableValues: [
        { value: "Appointment|list", label: "Appointment | Access to resource" },
        { value: "Appointment|new", label: "Appointment | Create" },
        { value: "Appointment|edit", label: "Appointment | Edit" },
        { value: "Appointment|show", label: "Appointment | See Details" },
        { value: "Appointment|delete", label: "Appointment | Delete" },
        { value: "Article|list", label: "Article | Access to resource" },
        { value: "Article|new", label: "Article | Create" },
        { value: "Article|edit", label: "Article | Edit" },
        { value: "Article|show", label: "Article | See Details" },
        { value: "Article|delete", label: "Article | Delete" },
        { value: "City|list", label: "City | Access to resource" },
        { value: "City|new", label: "City | Create" },
        { value: "City|edit", label: "City | Edit" },
        { value: "City|show", label: "City | See Details" },
        { value: "City|delete", label: "City | Delete" },
        { value: "User|list", label: "User | Access to resource" },
        { value: "User|new", label: "User | Create" },
        { value: "User|edit", label: "User | Edit" },
        { value: "User|show", label: "User | See Details" },
        { value: "User|delete", label: "User | Delete" },
      ]
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


