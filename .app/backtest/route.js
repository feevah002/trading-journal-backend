const router = require("express").Router({ mergeParams: true });
const multerInstance = require("../../config/multer");
const {
  create,
  getAllTrades,
  getBySession,
  getBySetup,
  deleteTrade,
  updateTrade,
} = require("./controller");

// get all backtest data
router.get("/", getAllTrades);

// create new
router.post("/new", multerInstance.upload.single("media"), create);

// show by session
router.get("/session/:session", getBySession);

// show by setup
router.get("/setup/:setup", getBySetup);

// update a trade
router.post("/update/:tid", multerInstance.upload.single("media"), updateTrade);

// delete a trade
router.post("/delete/:tid", deleteTrade);

module.exports = router;
