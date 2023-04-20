const controller = require("./controller");

const router = require("express").Router();

router.post("/auth/signup", controller.signUpController);
router.post("/auth/login", controller.loginController);
router.post(
  "/auth/requestResetPassword",
  controller.resetPasswordRequestController
);
router.post(
  "/auth/resetPassword/:token/:userId",
  controller.resetPasswordController
);

module.exports = router;
