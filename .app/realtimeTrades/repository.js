const RTtrades = require("./model");

// get all real time trades
exports.RTtrades = async () => {
  const data = RTtrades.find({});
  return data;
};

// add a real time trade
exports.RTaddTrade = async (payload) => {
  const data = RTtrades.create(payload);
  return data;
};

// show trades by session
exports.RTshowBySession = async (session) => {
  const data = RTtrades.find({
    session: session,
  });
  return data;
};

// show trades by setup
exports.RTshowBySetup = async (setup) => {
  const data = await RTtrades.find({
    setup: setup,
  });
  return data;
};

// edit a trade
exports.RTUpdateTrade = async (id, payload) => {
  const data = await RTtrades.findOneAndUpdate(id, payload);
  return data;
};

// delete a trade
exports.RTdelTrade = async (id) => {
  const data = await RTtrades.findByIdAndRemove(id);
  return data;
};
