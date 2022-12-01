import { ResourceOptions } from "adminjs";

export const appointmentOptions: ResourceOptions = {
  navigation: {
    name: null,
    icon: "Calendar"
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
    },
    patient: {
      isRequired: true,
    },
    status: {
      isRequired: true,
      availableValues: [
        { value: "Scheduled", label: "Scheduled" },
        { value: "Started", label: "Started" },
        { value: "Completed", label: "Completed" },
        { value: "Referred", label: "Referred" },
      ]
    }
  }
}
