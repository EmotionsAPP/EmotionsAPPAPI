import { ResourceOptions } from "adminjs";

export const appointmentOptions: ResourceOptions = {
  navigation: {
    name: null,
    icon: "Calendar"
  },

  properties: {
    status: {
      availableValues: [
        { value: "Scheduled", label: "Scheduled" },
        { value: "Started", label: "Started" },
        { value: "Completed", label: "Completed" },
        { value: "Referred", label: "Referred" },
      ]
    }
  }
}
