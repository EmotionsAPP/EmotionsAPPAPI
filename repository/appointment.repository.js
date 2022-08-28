const { connect, disconnect } = require('../config/db.config');
const { Appointment } = require('../model//appointment.model');
const logger = require('../logger/api.logger');
const { User } = require('../model/user.model');

class AppointmentRepository {

    constructor() {
        connect();
    }

    async getAvailablePhysicians(time) {
        const physicians = await User.where({ physician: true });
        return physicians;
    }
    
    async getUserAppointments(userId) {
        const appointments = await Appointment.find({ participants: userId.id });
        return appointments;
    }

    async createAppointment(appointment) {
        let data = {};
        try {
            data = await Appointment.create(appointment);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

}

module.exports = new AppointmentRepository();