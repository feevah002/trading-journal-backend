const BTrepository = require("./repository");
const { getUser } = require("../user/repository");
const validateInput = require("../../utils/validateInput");
let { validateCreatedData, validateEditedData } = new validateInput();

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description get all back test data
 * @route `/trades/back-test`
 * @access Private
 * @type GET
 */
exports.getAllTrades = async (req, res, next) => {
  try {
    const data = await BTrepository.BTtrades({ _createdBy: req.user.id });
    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error,
    });
  }
};
/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description create a new trade data
 * @route `/trades/back-test/new`
 * @access Public
 * @type Post
 */
exports.create = async (req, res, next) => {
  try {
    const validatedData = await validateCreatedData(
      req.body,
      req.file,
      req.user.id
    );

    const data = await BTrepository.BTaddTrade(validatedData);

    const user = await getUser({ _id: req.user.id });
    user.trades.backtest.push(data.id);
    await user.save();

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error,
    });
  }
};

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description show trades of a particular session
 * @route `/trades/back-test/session/:session`
 * @access Public
 * @type Post
 */
exports.getBySession = async (req, res, next) => {
  try {
    const session = req.params.session;
    const data = await BTrepository.BTshowBySession(session, req.user.id);
    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error,
    });
  }
};

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description show trades of a particular setup
 * @route `/trades/back-test/setup/:setup`
 * @access Public
 * @type Post
 */
exports.getBySetup = async (req, res, next) => {
  try {
    const setup = req.params.setup;
    const data = await BTrepository.BTshowBySetup(setup, req.user.id);
    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error,
    });
  }
};

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description update an existing trade
 * @route `/trades/back-test/update/:tid`
 * @access Public
 * @type Post
 */
exports.updateTrade = async (req, res, next) => {
  try {
    const validatedData = await validateEditedData(req.body, req.file);
    const tradeID = req.params.tid;
    const data = await BTrepository.BTUpdateTrade(
      {
        _id: tradeID,
        _createdBy: req.user.id,
      },
      validatedData
    );
    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error,
    });
  }
};
/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description delete an existing trade
 * @route `/trades/back-test/delete/:tid`
 * @access Public
 * @type Post
 */
exports.deleteTrade = async (req, res, next) => {
  try {
    const tradeID = req.params.tid;
    const data = await BTrepository.BTdelTrade(tradeID, req.user.id);
    res.status(200).json({
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error,
    });
  }
};
