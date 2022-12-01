import { createLoggerResource } from "@adminjs/logger";
import { Model } from 'mongoose';
import { Log } from '../../logs/entities/log.entity';
import { loggerConfig } from "../config";

export const createLogResource = (logModel: Model<Log>) => {
  
  return createLoggerResource({
    resource: logModel,
    featureOptions: {
      ...loggerConfig,
      resourceOptions: {
        navigation: {
          name: null,
          icon: "Catalog"
        },

        actions: {
          list: {
            isAccessible: ({ currentAdmin }) => currentAdmin.email === process.env.ADMIN_EMAIL
          }
        },
      }
    }
  })
};
