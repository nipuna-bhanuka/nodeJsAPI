const express = require('express');
const {getPatients, getPatient, createPatient, updatePatient, deletePatient} = require('../controller/patient.controller.js');

const patientRoutes = express.Router();

patientRoutes.route('/')
    .get(getPatients)
    .post(createPatient)

patientRoutes.route('/:id')
    .get(getPatient)
    .put(updatePatient)
    .delete(deletePatient);


module.exports = patientRoutes;