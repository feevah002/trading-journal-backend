const {
  signUpController,
  loginController,
  resetPasswordRequestController,
  resetPasswordController,
  verifyController,
  logoutController,
  deleteAccountRequestController,
  deleteAccountController,
  getUserProfileController,
  updateUserProfileController,
} = require("./controller");
const { upload } = require("../../config/multer");
const { protect } = require("../../middleware/auth");

const router = require("express").Router();

// create and verify new account
router.post("/auth/signup", upload.single("avatar"), signUpController);
router.post("/auth/verify/:uid/:token", verifyController);

// login/logout
router.post("/auth/login", loginController);
router.post("/auth/logout", logoutController);

// reset password
router.post("/auth/requestResetPassword", resetPasswordRequestController);
router.post(
  "/auth/resetPassword/:resetPasswordToken/:userId",
  resetPasswordController
);

// delete account 
router.post(
  "/auth/deleteAccount/:deleteAccountToken/:userId",
  deleteAccountController
);

// routes to be protected
router.use(protect)

//get/edit user profile
router.get("/auth/user-profile/:username", getUserProfileController);
router.post(
  "/auth/user-profile/:username/",
  upload.single("avatar"),
  updateUserProfileController
);

// request delete account 
router.post("/auth/requestDeleteAccount", deleteAccountRequestController);


module.exports = router;
