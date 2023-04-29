const createImgUrl = require("./createImgUrl");
const { createTradeImageUrl, createAvatarUrl } = new createImgUrl();
class ValidateInput {
  constructor(inputObj) {}
  // capitalize string
  capitalize(string) {
    string.toLowerCase();
    let capitalized = string.charAt(0).toUpperCase() + string.slice(1);
    return capitalized;
  }
  async atSignUp(data, avatar) {
    let validated = {};
    // email
    if (data.email) {
      validated.email = data.email;
    }
    // profile pic
    if (avatar) {
      validated.avatar = await createAvatarUrl(avatar.path);
    }
    // firstname
    if (data.firstname) {
      validated.firstname = this.capitalize(data.firstname);
    }
    // lastname
    if (data.lastname) {
      validated.lastname = this.capitalize(data.lastname);
    }
    // middlename
    if (data.middlename) {
      validated.middlename = this.capitalize(data.middlename);
    }
    // username
    if (data.username) {
      validated.username = data.username;
    }
    // password
    if (data.password) {
      validated.password = data.password;
    }
    return validated;
  }
  async atEdit(data, avatar) {
    let validated = {};
    // email
    if (data.email) {
      validated.email = data.email;
    }
    // profile pic
    if (avatar) {
      validated.avatar = await createAvatarUrl(avatar.path);
    }
    // firstname
    if (data.firstname) {
      validated.firstname = this.capitalize(data.firstname);
    }
    // lastname
    if (data.lastname) {
      validated.lastname = this.capitalize(data.lastname);
    }
    // middlename
    if (data.middlename) {
      validated.middlename = this.capitalize(data.middlename);
    }
    // username
    if (data.username) {
      validated.username = data.username;
    }
    return validated;
  }
  atLogin(data) {
    let validated = {};
    // email
    if (data.email) {
      validated.email = data.email.toLowerCase();
    }
    // password
    if (data.password) {
      validated.password = data.password;
    }
    return validated;
  }

  async validateCreatedData(data, media, creatorId) {
    let validated = {};
    validated._createdBy = creatorId;
    if (media) {
      validated.media = await createTradeImageUrl(media.path);
    }
    if(data.position){
      validated.position = data.position
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
    if (data.tradeOutcome) {
      validated.tradeOutcome = data.tradeOutcome;
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
  }
  async validateEditedData(data, media) {
    let validated = {};
    if (data.session) {
      validated.session = data.session;
    }
      if (data.position) {
        validated.position = data.position;
      }
    if (media) {
      validated.media = await createTradeImageUrl(media.path);
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
    if (data.tradeOutcome) {
      validated.tradeOutcome = data.tradeOutcome;
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
  }
  validateCreatedStrategy(data, creatorId) {
    let validated = {
      steps: data.steps,
      title: data.title,
    };
    validated._createdBy = creatorId

    return validated;
  }
  validateEditedStrategy(data, userId) {
    let validated = {};
    if (data.steps) {
      validated.steps = data.steps;
    }
    if (data.title) {
      validated.title = data.title;
    }
    validated._createdBy = userId
    return validated;
  }
  validateCreatedplan(data, creatorId) {
    let validated = {
      plan: data.plan,
    };
    validated._createdBy = creatorId;
    return validated;
  }
  validateEditedplan(data, userId) {
    let validated = {};
    if (data.plan) {
      validated.plan = data.plan;
    }
    validated._createdBy = userId

    return validated;
  }
}

module.exports = ValidateInput;
