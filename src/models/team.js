const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    club: {
        type: String,
        required: true,
        trim: true
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }]
},
{
    timestamps: true
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;