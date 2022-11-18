import { ResourceOptions } from "adminjs";

export const userOptions: ResourceOptions = {
  navigation: {
    name: null,
    icon: "User"
  },

  properties: {
    "password": {
      isVisible: false
    },
    "role": {
      availableValues: [
        { value: 'Psychologist', label: 'Psychologist' },
        { value: 'Patient', label: 'Patient' },
      ]
    }
  }
}
