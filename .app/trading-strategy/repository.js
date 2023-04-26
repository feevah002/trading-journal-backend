const TradeStrategy = require("./model");

// get all trade strategies
exports.getTstrategies = async (query) => {
  const data = TradeStrategy.find(query);
  return data;
};
// get info about a trade strategy
exports.getTstrategy = async (query) => {
  const data = TradeStrategy.findById(query);
  return data;
};

// create a strategy
exports.addTstrategy = async (payload) => {
  const data = TradeStrategy.create(payload);
  return data;
};

// edit a strategy
exports.updTstrategy = async (query, payload) => {
  const data = await TradeStrategy.findOneAndUpdate(
    query,
    payload
  );
  return data;
};

// delete a strategy
exports.delTstrategy = async (query) => {
  const data = await TradeStrategy.findByIdAndRemove(query);
  return data;
};
