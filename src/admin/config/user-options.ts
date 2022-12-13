import { ResourceOptions } from "adminjs";
import { validateUser } from "../validators";

export const userOptions: ResourceOptions = {
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
      isVisible: {
        show: true,
        list: true,
        edit: false,
        filter: true
      }
    },
    profileImage: {
      isVisible: false
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
}


