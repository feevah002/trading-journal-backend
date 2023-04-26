const { getTplan, updTplan, addTplan, delTplan } = require("./repository");
const validateInput = require("../../utils/validateInput");
let { validateCreatedplan, validateEditedplan } = new validateInput();
const { getUser } = require("../user/repository");

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description get all user's trading plan
 * @route `/trades/trade-plan`
 * @access Private
 * @type GET
 */
exports.get = async (req, res, next) => {
  try {
    const data = await getTplan({ _createdBy: req.user.id });
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
    const validatedData = await validateCreatedplan(req.body, req.user.id);
    const data = await addTplan(validatedData, req.user.id);

    const user = await getUser({ _id: req.user.id });
    user.tradePlan = data.id;
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
 * @description update an existing  plan
 * @route `/trades/trade-plan/update`
 * @access Private
 * @type Post
 */
exports.update = async (req, res, next) => {
  try {
    const validatedData = await validateEditedplan(req.body, req.user.id);
    const data = await updTplan({ _createdBy: req.user.id }, validatedData);

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
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
    const data = await delTplan(req.user.id);
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
