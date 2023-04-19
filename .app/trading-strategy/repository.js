const TradeStrategy = require("./model");

// get all trade strategies
exports.getTstrategies = async (id) => {
  const data = TradeStrategy.find({});
  return data;
};
// get info about a trade strategy
exports.getTstrategy = async (id) => {
  const data = TradeStrategy.findById(id);
  return data;
};

// create a strategy
exports.addTstrategy = async (payload) => {
  const data = TradeStrategy.create(payload);
  return data;
};


// edit a strategy
exports.updTstrategy = async (id, payload) => {
  const data = await TradeStrategy.findOneAndUpdate(id, payload);
  return data;
};

// delete a strategy
exports.delTstrategy = async (id) => {
  const data = await TradeStrategy.findByIdAndRemove(id);
  return data;
};
