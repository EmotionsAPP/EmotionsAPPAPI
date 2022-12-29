import { buildFeature } from "adminjs";
import { validatePermissions } from "../validators";

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
    import: {
      isAccessible: validatePermissions,
    },
    export: {
      isAccessible: validatePermissions,
    },
  }
});
