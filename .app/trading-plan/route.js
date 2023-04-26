const router = require("express").Router({ mergeParams: true });
const { get, create, update, del } = require("./controller");
const { authprotect } = require("../../middleware/auth");
const { checkTplanOwnership } = require("../../middleware/permission");

// protect all routes
router.use(authprotect);


// geto plan
router.get("/", get);

// create new plan
router.post("/new", create);

// update a plan
router.post("/update", checkTplanOwnership, update);

// delete a plan
router.post("/delete",checkTplanOwnership,  del);

module.exports = router;
