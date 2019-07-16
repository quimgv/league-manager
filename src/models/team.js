const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
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
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      }
    ],
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },
    image: {
      type: Buffer,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// userSchema.methods is for an specific "user" methods
teamSchema.methods.toJSON = function() {
  const teamImage = this;
  const teamImageObject = teamImage.toObject();

  // delete this data to not send it back as a response
  delete teamImageObject.image;

  return teamImageObject;
};

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
