import { ResourceWithOptions } from "adminjs";
import { IMPORT_EXPORT_FEATURE, LOGGER_FEATURE, VALIDATE_PERMISSIONS_FEATURE } from "../features";

export const createCityResource = (resource: unknown): ResourceWithOptions => ({
  resource,
  options: {
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
  },
  features: [
    IMPORT_EXPORT_FEATURE,
    LOGGER_FEATURE,
    VALIDATE_PERMISSIONS_FEATURE,
  ]
});