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
    }],
    image: {
        type: Buffer,
        default: null
    }
},
{
    timestamps: true
});

// userSchema.methods is for an specific "user" methods
leagueSchema.methods.toJSON = function() {
    
    const leagueImage = this;
    const leagueImageObject = leagueImage.toObject();

    // delete this data to not send it back as a response
    delete leagueImageObject.image;   

    return leagueImageObject;
};

const League = mongoose.model('League', leagueSchema);

module.exports = League;