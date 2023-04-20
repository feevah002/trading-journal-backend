const RTrepository = require("./repository");
const {
  validateCreatedData, validateEditedData,
} = require("../middleware/validate");

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description get all real time trade data
 * @route `/trades/real-time`
 * @access Public
 * @type GET
 */
exports.getAllTrades = async (req, res, next) => {
  try {
    const data = await RTrepository.RTtrades();
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
 * @route `/trades/real-time/new`
 * @access Public
 * @type Post
 */
exports.create = async (req, res, next) => {
  try {
    const validatedData = await validateCreatedData(req.body, req.file.path);
    const data = await RTrepository.RTaddTrade(validatedData);
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
 * @route `/trades/real-time/session/:session`
 * @access Public
 * @type GET
 */
exports.getBySession = async (req, res, next) => {
  try {
    const session = req.params.session;
    const data = await RTrepository.RTshowBySession(session);
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
 * @route `/trades/real-time/setup/:setup`
 * @access Public
 * @type GET
 */
exports.getBySetup = async (req, res, next) => {
  try {
    const setup = req.params.setup;
    const data = await RTrepository.RTshowBySetup(setup);
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
 * @route `/trades/real-time/update/:tid`
 * @access Public
 * @type Post
 */
exports.updateTrade = async (req, res, next) => {
  try {
    const validatedData = await validateEditedData(req.body, req.file.path);
    const tradeID = req.params.tid;
    const data = await RTrepository.RTUpdateTrade(
      {
        _id: tradeID,
      },
        validatedData,
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
 * @route `/trades/real-time/delete/:tid`
 * @access Public
 * @type Post
 */
exports.deleteTrade = async (req, res, next) => {
  try {
    const tradeID = req.params.tid;
    const data = await RTrepository.RTdelTrade({
      _id: tradeID,
    });
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
