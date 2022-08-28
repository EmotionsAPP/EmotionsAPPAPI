const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    email: 'string', 
    password: 'string', 
    firstName: 'string', 
    taxId: 'string',
    lastName: 'string',
    physician: 'boolean', 
    created_at: 'date', 
    updated_at: 'date',
    updated_by: 'string' },
    { timestamps: { created_at: 'created_at', updated_at: 'updated_at' }
});

const User = mongoose.model('user', userSchema);

module.exports = { User }