const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League",
      required: true
    },
    zone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
