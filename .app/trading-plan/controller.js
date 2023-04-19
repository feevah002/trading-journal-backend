const repository = require("./repository");
const {
  validateCreatedplan,
  validateEditedplan,
} = require("../middleware/validate");

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description get all user's trading plan
 * @route `/trades/trade-plan`
 * @access Private
 * @type GET
 */
exports.get = async (req, res, next) => {
  try {
    const data = await repository.getTplan();
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
 * @description create a new trading plan
 * @route `/trades/trade-plan/new`
 * @access Private
 * @type Post
 */
exports.create = async (req, res, next) => {
  try {
    const validatedData = await validateCreatedplan(req.body);
    const data = await repository.addTplan(validatedData);
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
 * @description update an existing  plan
 * @route `/trades/trade-plan/update`
 * @access Private
 * @type Post
 */
exports.update = async (req, res, next) => {
  try {
    const validatedData = await validateEditedplan(req.body);
    const data = await repository.updTplan(validatedData.plan);
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
 * @description delete an existing trade plan
 * @route `/trades/trade-plan/delete`
 * @access Private
 * @type Post
 */
exports.del = async (req, res, next) => {
  try {
    const data = await repository.delTplan();
    res.status(200).json({
      status: true,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      error,
    });
  }
};
