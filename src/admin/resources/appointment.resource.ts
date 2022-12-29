import AdminJS, { ResourceWithOptions } from "adminjs";
import { IMPORT_EXPORT_FEATURE, LOGGER_FEATURE, VALIDATE_PERMISSIONS_FEATURE } from "../features";
import { validateAppointment } from "../validators";

const PROPERTY_REFERENCE_EDIT = AdminJS.bundle('../components/property/PropertyReferenceEdit');

export const createAppointmentResource = (resource: unknown): ResourceWithOptions => ({
  resource,
  options: {
    navigation: {
      name: null,
      icon: "Calendar"
    },
  
    actions: {
      new: {
        layout: ["description", "start", "end", "status", "psychologist", "patient"],
        before: [validateAppointment]
      },
      edit: {
        before: [validateAppointment]
      }
    },
  
    properties: {
      description: {
        isRequired: true,
      },
      start: {
        isRequired: true,
      },
      end: {
        isRequired: true,
      },
      psychologist: {
        components: {
          edit: PROPERTY_REFERENCE_EDIT,
        },
        custom: {
          role: "Psychologist"
        },
        isRequired: true,
        reference: 'User',
      },
      patient: {
        components: {
          edit: PROPERTY_REFERENCE_EDIT,
        },
        custom: {
          role: "Patient"
        },
        isRequired: true,
        reference: 'User',
      },
      status: {
        isRequired: true,
        availableValues: [
          { value: "Scheduled", label: "Scheduled" },
          { value: "Started", label: "Started" },
          { value: "Completed", label: "Completed" },
          { value: "Referred", label: "Referred" },
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
  },
  features: [
    IMPORT_EXPORT_FEATURE,
    LOGGER_FEATURE,
    VALIDATE_PERMISSIONS_FEATURE,
  ]
});