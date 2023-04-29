const mongoose = require("mongoose");

const BTtradesSchema = new mongoose.Schema(
  {
    _createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position:{
      type:String,
      enum:['Long', 'Short'],
      required:true
    },
    session: {
      type: String,
      enum: ["Asian", "New York", "London"],
      required: true,
    },
    media: {
      type: String,
    },
    setup: {
      type: String,
      // required: true,
    },
    riskToReward: {
      type: Number,
      // required: true,
    },
    currencyPair: {
      type: String,
      // required: true,
    },
    note: {
      type: String,
    },
    igSentimentAtTime: {
      type: String,
    },
    time: {
      type: Date,
    },
    date: {
      type: String,
    },
    tradeOutcome: {
      type: String,
      // required: true,
      enum: ["Profit", "Loss"],
    },
    profit: {
      type: Number,
    },
    moneyRisked: {
      type: Number,
    },
    lotSize: {
      type: Number,
    },
    news: {
      type: String,
      enum: ["yes", "no"],
    },
    newsType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BTtrades", BTtradesSchema);
