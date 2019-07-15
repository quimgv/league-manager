const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    league: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League',
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    }
},
{
    timestamps: true
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;