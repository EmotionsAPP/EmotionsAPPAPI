const appointmentService  = require('../service/appointment.service');
const logger = require('../logger/api.logger');

class AppointmentController {

    async availablePhysicians(time) {
        logger.info('Appointment Controller: getAvailablePhysicians');
        return await appointmentService.getAvailablePhysicians(time);
    }

    async userAppointments(userId) {
        logger.info('Appointment Controller: getUserAppointments');
        return await appointmentService.getUserAppointments(userId);
    }

    async createAppointment(appointment) {
        logger.info('Appointment Controller: createAppointment');
        return await appointmentService.createAppointment(appointment);
    }

}
module.exports = new AppointmentController();