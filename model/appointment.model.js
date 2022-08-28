const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({ 
    participants: 'array',
    start: 'date',
    end: 'date',
    description: 'string',
    started: 'boolean',
    completed: 'boolean',
    started_at: 'date',
    completed_at: 'date',
    created_at: 'date', 
    updated_at: 'date',
    updated_by: 'string' },
    { timestamps: { created_at: 'created_at', updated_at: 'updated_at', start: 'start', end: 'end', started_at: 'started_at', completed_at: 'completed_at' }
});

const Appointment = mongoose.model('appointment', appointmentSchema);

module.exports = { Appointment }