import importExportFeature from "@adminjs/import-export";
import loggerFeature from "@adminjs/logger";
import passwordsFeature from "@adminjs/passwords";
import { loggerConfig } from "../config";

export const LOGGER_FEATURE = loggerFeature(loggerConfig);
export const IMPORT_EXPORT_FEATURE = importExportFeature();
export const PASSWORD_FEATURE = passwordsFeature({
  properties: {
    encryptedPassword: 'password',
    password: 'newPassword'
  },
  hash: (password: string) => password,
});

export { adminFeatures } from "./admin-features";
export { appointmentFeatures } from "./appointment-features";
export { articleFeatures } from "./article-features";
export { cityFeatures } from './city-features';
export { userFeatures } from "./user-features";
