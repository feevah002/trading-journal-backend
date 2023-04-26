const BTtrades = require('./model')

// get all backtest data
exports.BTtrades = async (query) => {
  const data = BTtrades.find(query);
  return data;
};

// add a real time trade
exports.BTaddTrade = async (payload)=>{
  const data = BTtrades.create(payload)
  return data
}

// show trades by session
exports.BTshowBySession = async (session, userId)=>{
  const data = BTtrades.find({
    session:session,
    _createdBy: userId
  })
  return data
}

// show trades by setup
exports.BTshowBySetup = async (setup, userId)=>{
  const data = BTtrades.find({
    setup: setup,
    _createdBy: userId,
  });
  return data
}

// edit a trade
exports.BTUpdateTrade = async (id, payload) => {
  const data = BTtrades.findByIdAndUpdate(query, payload);
  return data;
};

// delete a trade
exports.BTdelTrade = async (id, userId) => {
  const data = BTtrades.findByIdAndRemove({
    _id:id,
    _createdBy:userId
  })
  return data;
};