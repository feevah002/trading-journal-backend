const router = require("express").Router({ mergeParams: true });
const { upload } = require("../../config/multer");
const { authprotect } = require("../../middleware/auth");
const { checkBTTradesOwnership } = require("../../middleware/permission");

const {
  create,
  getAllTrades,
  getBySession,
  getBySetup,
  deleteTrade,
  updateTrade,
} = require("./controller");

// protect all routes
router.use(authprotect);

// get all backtest data
router.get("/", getAllTrades);

// create new
router.post("/new", upload.single("media"), create);

// show by session
router.get("/session/:session", getBySession);

// show by setup
router.get("/setup/:setup", getBySetup);

// update a trade
router.post(
  "/update/:tid",
  upload.single("media"),
  checkBTTradesOwnership,
  updateTrade
);

// delete a trade
router.post("/delete/:tid", checkBTTradesOwnership, deleteTrade);

module.exports = router;
