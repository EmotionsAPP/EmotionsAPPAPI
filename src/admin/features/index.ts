import importExportFeature from "@adminjs/import-export";
import loggerFeature from "@adminjs/logger";
import { passwordsFeature } from "./password.feature";
import { hashPassword } from "../../auth/security";
import { loggerConfig } from "../config";
import { validatePassword } from "../validators";

export const LOGGER_FEATURE = loggerFeature(loggerConfig);
export const IMPORT_EXPORT_FEATURE = importExportFeature();
export const PASSWORD_FEATURE = passwordsFeature({
  properties: {
    encryptedPassword: 'password',
    password: 'userPassword'
  },
  hash: hashPassword,
  validate: (password) => validatePassword(password)
});
export { validatePermissionsFeature as VALIDATE_PERMISSIONS_FEATURE } from "./validate-permissions.feature";

export { adminFeatures } from "./admin-features";
export { appointmentFeatures } from "./appointment-features";
export { articleFeatures } from "./article-features";
export { cityFeatures } from './city-features';
export { userFeatures } from "./user-features";
