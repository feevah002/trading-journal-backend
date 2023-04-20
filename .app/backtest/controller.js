const BTrepository = require('./repository')
const { validateCreatedData, validateEditedData } = require('../middleware/validate')







/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description get all back test data
 * @route `/trades/back-test`
 * @access Public
 * @type GET
 */
exports.getAllTrades = async (req, res, next) => {
  try {
    const data = await BTrepository.BTtrades();
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
exports.create = async (req,res,next)=>{
  try{
    const validatedData = await validateCreatedData(req.body, req.file.path);
    const data = await BTrepository.BTaddTrade(validatedData);
    res.status(200).json({
      status: true,
      data: data,
    });
  }catch(error){
    res.status(500).json({
      status: false,
      error,
    });
  }
}

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description show trades of a particular session
 * @route `/trades/back-test/session/:session`
 * @access Public
 * @type Post
 */
exports.getBySession = async (req,res,next)=>{
  try{
    const session = req.params.session
    const data = await BTrepository.BTshowBySession(session);
    res.status(200).json({
      status: true,
      data: data,
    });
  }catch(error){
    res.status(500).json({
      status: false,
      error,
    });
  }
}

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
    const data = await BTrepository.BTshowBySetup(setup);
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
exports.updateTrade = async (req,res,next)=>{
  try{
    const validatedData = await validateEditedData(req.body, req.file.path);
    const tradeID = req.params.tid
    const data = await BTrepository.BTUpdateTrade(
      {
        _id: tradeID,
      },
      validatedData,
    );
    res.status(200).json({
      status: true,
      data: data,
    });
  }catch(error){
    res.status(500).json({
      status: false,
      error,
    });
  }
}
/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description delete an existing trade
 * @route `/trades/back-test/delete/:tid`
 * @access Public
 * @type Post
 */
exports.deleteTrade = async (req,res,next)=>{
  try{
    const tradeID = req.params.tid
    const data = await BTrepository.BTdelTrade({
      _id: tradeID,
    });
    res.status(200).json({
      status: true,
    });
  }catch(error){
    res.status(500).json({
      status: false,
      error,
    });
  }
}