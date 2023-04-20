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

// get all real time trades
router.get("/", getAllTrades);

// create new
router.post("/new", multerInstance.upload.single("media"), create);

// get by session
router.get("/session/:session", getBySession);

// get by setup
router.get("/setup/:setup", getBySetup);

// update a trade
router.post("/update/:tid", multerInstance.upload.single("media"),  updateTrade);

// delete a trade
router.post("/delete/:tid", deleteTrade);

module.exports = router;
