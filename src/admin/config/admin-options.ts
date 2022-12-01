import { ResourceOptions } from "adminjs";

export const adminOptions: ResourceOptions = {
  navigation: {
    name: null,
    icon: "UserMilitary"
  },

  actions: {
    list: {
      isAccessible: ({ currentAdmin }) => currentAdmin.email === process.env.ADMIN_EMAIL
    }
  },

  properties: {
    password: {
      isVisible: false
    },
    gender: {
      availableValues: [
        { value: 'male', label: 'Male' }, 
        { value: 'female', label: 'Female' },
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


