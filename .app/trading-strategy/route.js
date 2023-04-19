const router = require("express").Router({ mergeParams: true });
const { getAll, get, create, update, del } = require("./controller");

// get all strategies
router.get("/", getAll);

// getone strategy
router.get("/:sid", get);

// create new strategy
router.post("/new", create);

// update a strategy
router.post("/update/:sid", update);

// delete a strategy
router.post("/delete/:sid", del);

module.exports = router;
