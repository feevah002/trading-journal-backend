const { BTtrades } = require("../.app/backtest/repository");
const { RTtrades } = require("../.app/realtimeTrades/repository");
const { getTplan } = require("../.app/trading-plan/repository");
const { getTstrategy } = require("../.app/trading-strategy/repository");

exports.checkBTTradesOwnership = async (req, res, next) => {
  try {
    const data = await BTtrades({
      _id: req.params.tid,
      _createdBy: req.user.id,
    });
    if (data._createdBy == req.user.id) {
      next();
    } else {
      return res.status(500).json({
        message: "you do not have permission to do that",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      error,
    });
  }
};
exports.checkRTTradesOwnership = async (req, res, next) => {
  try {
    const data = await RTtrades({
      _id: req.params.tid,
      _createdBy: req.user.id,
    });
    if (data._createdBy == req.user.id) {
      next();
    } else {
      return res.status(500).json({
        message: "you do not have permission to do that",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      error,
    });
  }
};
exports.checkTplanOwnership = async (req, res, next) => {
  try {
    const data = await getTplan({ _createdBy: req.user.id });
    if (data._createdBy == req.user.id) {
      next();
    } else {
      return res.status(500).json({
        message: "you do not have permission to do that",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      error,
    });
  }
};
exports.checkTstrategyOwnership = async (req, res, next) => {
  try {
    const data = await getTstrategy({
      _id: req.params.sid,
      _createdBy: req.user.id,
    });
    if (data._createdBy == req.user.id) {
      next();
    } else {
      return res.status(500).json({
        message: "you do not have permission to do that",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      error,
    });
  }
};
