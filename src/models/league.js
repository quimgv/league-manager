const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    sponsors: {
        type: Array
    },
    registrations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }]
},
{
    timestamps: true
});

const League = mongoose.model('League', leagueSchema);

module.exports = League;