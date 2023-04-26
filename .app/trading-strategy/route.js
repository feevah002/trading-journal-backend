const router = require("express").Router({ mergeParams: true });
const { getAll, get, create, update, del } = require("./controller");
const { authprotect } = require("../../middleware/auth");
const { checkTstrategyOwnership } = require("../../middleware/permission");

// protect all routes
router.use(authprotect);

// get all strategies
router.get("/", getAll);

// getone strategy
router.get("/:sid", checkTstrategyOwnership, get);

// create new strategy
router.post("/new", create);

// update a strategy
router.post("/update/:sid",checkTstrategyOwnership, update);

// delete a strategy
router.post("/delete/:sid", checkTstrategyOwnership, del);

module.exports = router;
