import { ResourceWithOptions } from "adminjs";
import { IMPORT_EXPORT_FEATURE, LOGGER_FEATURE, PASSWORD_FEATURE, VALIDATE_PERMISSIONS_FEATURE } from "../features";
import { validateUser } from "../validators";

export const createUserResource = (resource: unknown): ResourceWithOptions => {

  return { 
    resource, 
    options: {
      navigation: {
        name: null,
        icon: "User"
      },
    
      actions: {
        new: {
          before: [validateUser]
        },
        edit: {
          before: [validateUser]
        }
      },
    
      properties: {
        firstName: {
          isRequired: true,
        },
        lastName: {
          isRequired: true,
        },
        email: {
          isRequired: true,
        },
        password: {
          isRequired: true,
          isVisible: false,
        },
        role: {
          isRequired: true,
          availableValues: [
            { value: 'Psychologist', label: 'Psychologist' },
            { value: 'Patient', label: 'Patient' },
          ]
        },
        city: {
          reference: 'City',
        },
        profileImage: {
          isVisible: false,
        },
        gender: {
          availableValues: [
            { value: 'M', label: 'Male' }, 
            { value: 'F', label: 'Female' },
            { value: 'O', label: 'Other' }
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
        },
      }
    }, 
    features: [
      IMPORT_EXPORT_FEATURE,
      PASSWORD_FEATURE,
      LOGGER_FEATURE,
      VALIDATE_PERMISSIONS_FEATURE,
    ],
  }
}
