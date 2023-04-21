const {
  signUpController,
  loginController,
  resetPasswordRequestController,
  resetPasswordController,
  verifyController,
  logoutController,
} = require("./controller");

const router = require("express").Router();

router.post("/auth/signup", signUpController);
router.post("/auth/login", loginController);
router.post("/auth/logout", logoutController);
router.post("/auth/verify/:uid/:token", verifyController);
router.post("/auth/requestResetPassword",resetPasswordRequestController);
router.post("/auth/resetPassword/:token/:userId",resetPasswordController);

module.exports = router;
