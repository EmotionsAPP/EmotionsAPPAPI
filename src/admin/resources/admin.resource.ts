import AdminJS, { ActionContext, ResourceWithOptions } from "adminjs";
import { IMPORT_EXPORT_FEATURE, LOGGER_FEATURE, PASSWORD_FEATURE } from "../features";
import { validateAdmin } from "../validators";

const canEditAdmin = ({
  currentAdmin,
  record
}: ActionContext
): boolean => currentAdmin.email !== record.params.email;

export const createAdminResource = (resource: unknown): ResourceWithOptions => ({
  resource,
  options: {
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
        isVisible: {
          show: true,
          list: true,
          edit: false,
          filter: true,
        },
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
          { value: "Appointment|import", label: "Appointment | Import Data" },
          { value: "Appointment|export", label: "Appointment | Export Data" },
          { value: "Article|list", label: "Article | Access to resource" },
          { value: "Article|new", label: "Article | Create" },
          { value: "Article|edit", label: "Article | Edit" },
          { value: "Article|show", label: "Article | See Details" },
          { value: "Article|delete", label: "Article | Delete" },
          { value: "Article|import", label: "Article | Import Data" },
          { value: "Article|export", label: "Article | Export Data" },
          { value: "City|list", label: "City | Access to resource" },
          { value: "City|new", label: "City | Create" },
          { value: "City|edit", label: "City | Edit" },
          { value: "City|show", label: "City | See Details" },
          { value: "City|delete", label: "City | Delete" },
          { value: "City|import", label: "City | Import Data" },
          { value: "City|export", label: "City | Export Data" },
          { value: "User|list", label: "User | Access to resource" },
          { value: "User|new", label: "User | Create" },
          { value: "User|edit", label: "User | Edit" },
          { value: "User|show", label: "User | See Details" },
          { value: "User|delete", label: "User | Delete" },
          { value: "User|import", label: "User | Import Data" },
          { value: "User|export", label: "User | Export Data" },
        ]
      },
      lastLogin: {
        isVisible: {
          show: true,
          list: true,
          edit: false,
          filter: true,
        }
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
      },
    }
  },
  features: [
    IMPORT_EXPORT_FEATURE,
    PASSWORD_FEATURE,
    LOGGER_FEATURE
  ]
});