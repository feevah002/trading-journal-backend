const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { connectDB } = require("./database/database");
require("dotenv").config({ path: "./.env/config.env" });

// DB conector
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const RTtrades = require("./.app/realtimeTrades/route");
const BTtrades = require("./.app/backtest/route");
const tradingStrategy = require("./.app/trading-strategy/route");
const tradeplan = require("./.app/trading-plan/route");

app.use("/trades/real-time", RTtrades);
app.use("/trades/back-time", BTtrades);
app.use("/trades/strategy", tradingStrategy);
app.use("/trades/trade-plan", tradeplan);

module.exports = app;