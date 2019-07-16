const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    phase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Phase",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
