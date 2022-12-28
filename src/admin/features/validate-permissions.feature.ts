import { buildFeature } from "adminjs";
import { validatePermissions } from "../actions";

export const validatePermissionsFeature = buildFeature({
  actions: {
    list: {
      isAccessible: validatePermissions,
    },
    edit: {
      isAccessible: validatePermissions,
    },
    new: {
      isAccessible: validatePermissions,
    },
    show: {
      isAccessible: validatePermissions,
    },
    delete: {
      isAccessible: validatePermissions,
    },
    bulkDelete: {
      isAccessible: validatePermissions,
    },
  }
});
