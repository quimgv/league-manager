const mongoose = require("mongoose");

const phaseSchema = new mongoose.Schema(
  {
    type: {
      type: String, // Round Robin, Single Elimination
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Phase = mongoose.model("Phase", phaseSchema);

module.exports = Phase;
