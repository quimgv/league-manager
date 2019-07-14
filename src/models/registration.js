const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    league: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }
},
{
    timestamps: true
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;