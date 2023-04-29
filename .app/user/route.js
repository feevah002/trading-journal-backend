const router = require("express").Router();
const { authprotect } = require("../../middleware/auth");
const { upload } = require("../../config/multer");
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


// create new account
router.post("/auth/signup", upload.single("avatar"), signUpController);
// verify new account
router.post("/auth/verify/:uid/:token", verifyController);

// login
router.post("/auth/login", loginController);
// logout
router.get("/auth/logout", logoutController);

//get user profile
router.get("/auth/user-profile/:username", authprotect, getUserProfileController);
// update user profile
router.post("/auth/user-profile/:username/", authprotect, upload.single("avatar"), updateUserProfileController);

// request reset password
router.post("/auth/requestResetPassword", resetPasswordRequestController);
// reset password
router.post("/auth/resetPassword/:resetPasswordToken/:userId", resetPasswordController);

// request delete account
router.post("/auth/requestDeleteAccount", authprotect, deleteAccountRequestController);
// delete account
router.post("/auth/deleteAccount/:deleteAccountToken/:userId", deleteAccountController);

module.exports = router;
