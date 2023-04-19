const mongoose = require("mongoose");

const TradeStrategySchema = new mongoose.Schema(
  {
    _createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      // required:true,
    },
    title: {
      type: String,
      required: true,
    },
    steps: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TradeStrategy", TradeStrategySchema);
