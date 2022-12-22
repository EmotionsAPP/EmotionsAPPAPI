import { ResourceOptions } from "adminjs";
import { validateAppointment } from "../validators";

export const appointmentOptions: ResourceOptions = {
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
      isRequired: true,
      reference: 'User',
    },
    patient: {
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
}
