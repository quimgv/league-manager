const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    sponsors: {
      type: Array
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

leagueSchema.virtual("registrations", {
  ref: "Registration",
  localField: "_id",
  foreignField: "league"
});

leagueSchema.virtual("zones", {
  ref: "Zone",
  localField: "_id",
  foreignField: "league"
});

leagueSchema.virtual("categories", {
  ref: "Category",
  localField: "_id",
  foreignField: "league"
});

leagueSchema.set("toObject", { virtuals: true });

// userSchema.methods is for an specific "user" methods
leagueSchema.methods.toJSON = function() {
  const leagueImage = this;
  const leagueImageObject = leagueImage.toObject();

  // delete this data to not send it back as a response
  if (leagueImageObject.image !== null) {
    leagueImageObject.image = true;
  }

  return leagueImageObject;
};

const League = mongoose.model("League", leagueSchema);

module.exports = League;
