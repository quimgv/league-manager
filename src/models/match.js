const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    phase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Phase",
      required: true
    },
    local: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true
    },
    visitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
