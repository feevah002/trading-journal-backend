const router = require("express").Router({ mergeParams: true });
const { get, create, update, del } = require("./controller");



// geto plan
router.get("/", get);

// create new plan
router.post("/new", create);

// update a plan
router.post("/update", update);

// delete a plan
router.post("/delete", del);

module.exports = router;
