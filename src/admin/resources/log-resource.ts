import {
  ADMINJS_LOGGER_DEFAULT_RESOURCE_ID,
  bundleComponents,
  LoggerFeatureOptions,
  LoggerPropertiesMapping
} from "@adminjs/logger";
import { ResourceWithOptions } from "adminjs";
import { Model } from 'mongoose';
import { Log } from '../../logs/entities/log.entity';
import { loggerConfig } from "../config";

export const createLogResource = (logModel: Model<Log>) => {

  return buildLoggerResource({
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

const { RECORD_DIFFERENCE, RECORD_LINK } = bundleComponents();

const getLogPropertyName = (
  property: string,
  mapping: LoggerPropertiesMapping = {}
) => {
  if (!mapping[property]) {
    return property;
  }

  return mapping[property];
};

const buildLoggerResource = <T = unknown>({
  resource,
  featureOptions,
}: {
  resource: T;
  featureOptions?: LoggerFeatureOptions;
}): ResourceWithOptions => {
  const { resourceOptions = {}, propertiesMapping = {} } = featureOptions ?? {};
  const { resourceId, navigation, actions = {} } = resourceOptions;

  return {
    resource,
    options: {
      id: resourceId ?? ADMINJS_LOGGER_DEFAULT_RESOURCE_ID,
      navigation: navigation ?? null,
      sort: {
        direction: 'desc',
        sortBy: getLogPropertyName('createdAt', propertiesMapping),
      },
      listProperties: [
        getLogPropertyName('user', propertiesMapping),
        getLogPropertyName('recordId', propertiesMapping),
        getLogPropertyName('resource', propertiesMapping),
        getLogPropertyName('action', propertiesMapping),
        getLogPropertyName('createdAt', propertiesMapping),
      ],
      actions: {
        edit: { isAccessible: false },
        new: { isAccessible: false },
        delete: { isAccessible: false },
        bulkDelete: { isAccessible: false },
        show: {
          showInDrawer: true,
          containerWidth: '700px',
          ...(actions.show ?? {}),
        },
        list: {
          ...(actions.list ?? {}),
        },
      },
      properties: {
        [getLogPropertyName('id', propertiesMapping)]: {
          isVisible: {
            list: false,
          },
        },
        [getLogPropertyName('difference', propertiesMapping)]: {
          components: {
            show: RECORD_DIFFERENCE,
          },
          custom: {
            propertiesMapping,
          },
          position: 110,
        },
        [getLogPropertyName('recordId', propertiesMapping)]: {
          components: {
            list: RECORD_LINK,
            show: RECORD_LINK,
          },
          custom: {
            propertiesMapping,
          },
        },
        [getLogPropertyName('updatedAt', propertiesMapping)]: {
          isVisible: false,
        },
        [getLogPropertyName('user', propertiesMapping)]: {
          reference: 'Admin',
        },
        [getLogPropertyName('resource', propertiesMapping)]: {
          availableValues: [
            { value: 'Admin', label: 'Admin' },
            { value: 'Appointment', label: 'Appointment' },
            { value: 'Article', label: 'Article' },
            { value: 'City', label: 'City' },
            { value: 'User', label: 'User' },
          ],
        },
        [getLogPropertyName('action', propertiesMapping)]: {
          availableValues: [
            { value: 'new', label: 'new' },
            { value: 'edit', label: 'edit' },
            { value: 'delete', label: 'delete' },
          ],
        },
      },
    },
  };
}
