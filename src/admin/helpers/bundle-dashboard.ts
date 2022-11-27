import AdminJS, { PageHandler } from "adminjs";
import { AppointmentsService } from "../../appointments/appointments.service";
import { UsersService } from "../../users/users.service";

export const bundleDashboard = (
  usersService: UsersService,
  appointmentsService: AppointmentsService
): {
  handler?: PageHandler,
  component?: string
} => ({
  handler: async () => {
    const usersQuantityByRole = await usersService.getUsersQuantityByRole();
    const appointmentsQuantitiesPerDay = await appointmentsService.getAppointmentsQuantitiesPerDay();
    const emergencyAvailablesCount = await usersService.getEmergencyAvailablePsychologiesCount();

    return {
      usersQuantityByRole,
      appointmentsQuantitiesPerDay,
      emergencyAvailablesCount
    }
  },
  component: AdminJS.bundle('../components/Dashboard'),
});
