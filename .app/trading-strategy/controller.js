const repository = require("./repository");
const {
  validateCreatedStrategy,
  validateEditedStrategy,
} = require("../middleware/validate");

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description get all user's trading strategies
 * @route `/trades/strategy`
 * @access Private
 * @type GET
 */
exports.getAll = async (req, res, next) => {
  try {
    const data = await repository.getTstrategies();
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
 * @description get all user's trading strategies
 * @route `/trades/strategy/:sid`
 * @access Private
 * @type GET
 */
exports.get = async (req, res, next) => {
  try {
    const data = await repository.getTstrategy({
      _id: req.params.sid,
    });
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
 * @description create a new trading strategy
 * @route `/trades/strategy/new`
 * @access Private
 * @type Post
 */
exports.create = async (req, res, next) => {
  try {
    const validatedData = await validateCreatedStrategy(req.body);
    const data = await repository.addTstrategy(validatedData);
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
 * @description update an existing  strategy
 * @route `/trades/strategy/update/:sid`
 * @access Private
 * @type Post
 */
exports.update = async (req, res, next) => {
  try {
    const validatedData = await validateEditedStrategy(req.body);
    const strategyID = req.params.sid;
    const data = await repository.updTstrategy(
      {
        _id: strategyID,
      },
      validatedData
    );
    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      error,
    });
  }
};
/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description delete an existing trade strategy
 * @route `/trades/strategy/delete/:sid`
 * @access Private
 * @type Post
 */
exports.del = async (req, res, next) => {
  try {
    const strategyID = req.params.sid;
    const data = await repository.delTstrategy({
      _id: strategyID,
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
