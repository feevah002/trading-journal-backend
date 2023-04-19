const mongoose = require("mongoose");

const TradePlanSchema = new mongoose.Schema(
  {
    _createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      // required:true,
    },
    plan: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TradePlan", TradePlanSchema);
