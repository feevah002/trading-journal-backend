const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./database/database");
require("dotenv").config({ path: "./.env/config.env" });

// DB conector
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// routes
const RTtrades = require("./.app/realtimeTrades/route");
const BTtrades = require("./.app/backtest/route");
const tradingStrategy = require("./.app/trading-strategy/route");
const tradeplan = require("./.app/trading-plan/route");
const userRoute = require("./.app/user/route");

app.use("/trades/real-time", RTtrades);
app.use("/trades/back-test", BTtrades);
app.use("/trades/strategy", tradingStrategy);
app.use("/trades/trade-plan", tradeplan);
app.use("/", userRoute);

module.exports = app;
