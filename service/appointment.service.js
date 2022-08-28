const appointmentRepository  = require('../repository/appointment.repository');

class AppointmentService {

    constructor() {}

    async getAvailablePhysicians(time) {
        return await appointmentRepository.getAvailablePhysicians(time);
    }

    async getUserAppointments(userId) {
        return await appointmentRepository.getUserAppointments(userId);
    } 

    async createAppointment(appointment) {
        return await appointmentRepository.createAppointment(appointment);
    }

}

module.exports = new AppointmentService();