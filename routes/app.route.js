const express = require('express');

const appRoutes = express.Router();

const appointmentController = require('../controller/appointment.controller')

appRoutes.route('/api/appointment/availablePhysicians').post((req, res) => {
    appointmentController.availablePhysicians(req.body).then((data) => res.json(data));
});

appRoutes.route('/api/appointment/userAppointments').post((req, res) => {
    appointmentController.userAppointments(req.body).then((data) => res.json(data));
});

appRoutes.route('/api/appointment/create').post((req, res) => {
    appointmentController.createAppointment(req.body).then((data) => res.json(data));
});

module.exports = appRoutes;