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
    },
    "city": {
      isVisible: {
        show: true,
        list: true,
        edit: false,
        filter: true
      }
    },
    "profileImage": {
      isVisible: false
    },
    "gender": {
      availableValues: [
        { value: 'male', label: 'Male' }, 
        { value: 'female', label: 'Female' },
      ]
    }
  }
}


