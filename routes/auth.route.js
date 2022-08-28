const express = require('express');

const authRoutes = express.Router();

const authController = require('../controller/auth.controller')

authRoutes.route('/api/auth').post((req, res) => {
    authController.validateUser(req.body).then((data) => res.json(data));
});

authRoutes.route('/api/register').post((req, res) => {
    authController.createUser(req.body).then((data) => res.json(data));
});

module.exports = authRoutes;