const TradePlan = require("./model");

// get trade plan
exports.getTplan = async () => {
  const data = TradePlan.find({});
  return data;
};

// add a real time trade
exports.addTplan = async (payload) => {
  const check = await TradePlan.find({});
  if (check.length > 0) {
    return "plan already exist";
  }
  const data = TradePlan.create(payload);
  return data;
};

// edit a trade
exports.updTplan = async (payload) => {
  const data = await TradePlan.find({});
  data[0].plan = payload;
  data[0].save();
  return data;
};

// delete a trade
exports.delTplan = async () => {
  const data = await TradePlan.find({});
  await TradePlan.findByIdAndRemove({ _id: data[0].id });
  return data;
};
