const RTtrades = require("./model");

// get all real time trades
exports.RTtrades = async (query) => {
  const data = RTtrades.find(query);
  return data;
};

// add a real time trade
exports.RTaddTrade = async (payload) => {
  const data = RTtrades.create(payload);
  return data;
};

// show trades by session
exports.RTshowBySession = async (session, userId) => {
  const data = RTtrades.find({
    session: session,
    _createdBy: userId,
  });
  return data;
};

// show trades by setup
exports.RTshowBySetup = async (setup, userId) => {
  const data = await RTtrades.find({
    setup: setup,
    _createdBy: userId,
  });
  return data;
};

// edit a trade
exports.RTUpdateTrade = async (id, payload) => {
  const data = await RTtrades.findOneAndUpdate(query, payload);
  return data;
};

// delete a trade
exports.RTdelTrade = async (id, userId) => {
  const data = await RTtrades.findByIdAndRemove({
    _id: id,
    _createdBy: userId,
  });
  return data;
};
