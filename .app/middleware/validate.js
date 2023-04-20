exports.validateCreatedData = async (data, media) => {
  let validated = {};
  if (media) {
    validated.media = media;
  }
  if (data.session) {
    validated.session = data.session;
  }
 
  if (data.setup) {
    validated.setup = data.setup;
  }
  if (data.account) {
    validated.account = data.account;
  }
  if (data.riskToReward) {
    validated.riskToReward = data.riskToReward;
  }
  if (data.currencyPair) {
    validated.currencyPair = data.currencyPair;
  }
  if (data.note) {
    validated.note = data.note;
  }
  if (data.igSentimentAtTime) {
    validated.igSentimentAtTime = data.igSentimentAtTime;
  }
  if (data.time) {
    validated.time = data.time;
  }
  if (data.date) {
    validated.date = data.date;
  }
  if (data.tradeOutcomenum) {
    validated.tradeOutcomenum = data.tradeOutcomenum;
  }
  if (data.profit) {
    validated.profit = data.profit;
  }
  if (data.moneyRisked) {
    validated.moneyRisked = data.moneyRisked;
  }
  if (data.lotSize) {
    validated.lotSize = data.lotSize;
  }
  if (data.news) {
    validated.news = data.news;
  }
  if (data.newsType) {
    validated.newsType = data.newsType;
  }

  return validated;
};

exports.validateEditedData = async (data, media) => {
  let validated = {};
  if (data.session) {
    validated.session = data.session;
  }

  if (media) {
    validated.media = media;
  }
  if (data.setup) {
    validated.setup = data.setup;
  }
  if (data.account) {
    validated.account = data.account;
  }
  if (data.riskToReward) {
    validated.riskToReward = data.riskToReward;
  }
  if (data.currencyPair) {
    validated.currencyPair = data.currencyPair;
  }
  if (data.note) {
    validated.note = data.note;
  }
  if (data.igSentimentAtTime) {
    validated.igSentimentAtTime = data.igSentimentAtTime;
  }
  if (data.time) {
    validated.time = data.time;
  }
  if (data.date) {
    validated.date = data.date;
  }
  if (data.tradeOutcomenum) {
    validated.tradeOutcomenum = data.tradeOutcomenum;
  }
  if (data.profit) {
    validated.profit = data.profit;
  }
  if (data.moneyRisked) {
    validated.moneyRisked = data.moneyRisked;
  }
  if (data.lotSize) {
    validated.lotSize = data.lotSize;
  }
  if (data.news) {
    validated.news = data.news;
  }
  if (data.newsType) {
    validated.newsType = data.newsType;
  }

  return validated;
};

exports.validateCreatedStrategy = async (data) => {
  const validated = {
    steps: data.steps,
    title: data.title,
    _createdBy: data._createdBy,
  };

  return validated;
};
exports.validateEditedStrategy = async (data) => {
  let validated = {};
  if (data.steps) {
    validated.steps = data.steps;
  }
  if (data.title) {
    validated.title = data.title;
  }
  if (data._createdBy) {
    validated._createdBy = data._createdBy;
  }

  return validated;
};

exports.validateCreatedplan = async (data) => {
  const validated = {
    plan: data.plan,
    _createdBy: data._createdBy,
  };
  return validated;
};
exports.validateEditedplan = async (data) => {
  let validated = {};
  if (data.plan) {
    validated.plan = data.plan;
  }

  return validated;
};
