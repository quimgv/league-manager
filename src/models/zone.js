const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League",
      required: true
    }
  },
  {
    timestamps: true
  }
);

zoneSchema.virtual("categories", {
  ref: "Category",
  localField: "_id",
  foreignField: "zone"
});

const Zone = mongoose.model("Zone", zoneSchema);

module.exports = Zone;
