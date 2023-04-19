const BTtrades = require('./model')

// get all backtest data
exports.BTtrades = async () => {
  const data = BTtrades.find({});
  return data;
};

// add a real time trade
exports.BTaddTrade = async (payload)=>{
  const data = BTtrades.create(payload)
  return data
}

// show trades by session
exports.BTshowBySession = async (session)=>{
  const data = BTtrades.find({
    session:session
  })
  return data
}

// show trades by setup
exports.BTshowBySetup = async (setup)=>{
  const data = BTtrades.find({
    setup:setup
  })
  return data
}

// edit a trade
exports.BTUpdateTrade = async (id, payload) => {
  const data = BTtrades.findByIdAndUpdate(id, payload);
  return data;
};

// delete a trade
exports.BTdelTrade = async (id) => {
  const data = BTtrades.findByIdAndRemove(id)
  return data;
};