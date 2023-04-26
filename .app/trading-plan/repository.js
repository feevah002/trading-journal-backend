const TradePlan = require("./model");

// get trade plan
exports.getTplan = async (query) => {
  const data = TradePlan.find(query);
  return data;
};

// add a real time trade
exports.addTplan = async (payload, userId) => {
  const check = await TradePlan.find({ _createdBy: userId });
  let data;
  if (check) {
    await TradePlan.findOneAndDelete({ _createdBy: userId });
    data = TradePlan.create(payload);
    return data;
  }
  data = await TradePlan.create(payload);
  return data;
};

// edit a trade
exports.updTplan = async (payload) => {
  const data = await TradePlan.findOneAndUpdate(query, payload);
  return data;
};

// delete a trade
exports.delTplan = async (userId) => {
  const data = await TradePlan.findOneAndDelete({ _createdBy: userId});
  return data;
};
