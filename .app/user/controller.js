const repository = require("./repository");
const {
  getUser,
  signup,
  requestPasswordReset,
  resetPassword,
} = require("./repository");

exports.signUpController = async (req, res, next) => {
  const signupService = await signup(req.body);
  return res.json(signupService);
};

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description requsest reset password
 * @route `/auth/requestResetPassword`
 * @access Private
 * @type POST
 */

exports.resetPasswordRequestController = async (req, res, next) => {
  const requestPasswordResetService = await requestPasswordReset(
    req.body.email
  );
  return res.json(requestPasswordResetService);
};

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description change password
 * @route `/auth/resetPassword/:token/:userId`
 * @access Private
 * @type POST
 */

exports.resetPasswordController = async (req, res, next) => {
  const resetPasswordService = await resetPassword(
    req.params.userId,
    req.params.token,
    req.body.password
  );
  return res.json(resetPasswordService);
};

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description login authentication
 * @route `/auth/login/`
 * @access Private
 * @type POST
 */
exports.loginController = async (req, res, next) => {
  // coming soon
};

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description send verification token
 * @route `/auth/send-verification-token/`
 * @access Private
 * @type POST
 */
exports.generateVerificationToken = asyncHandler(async (req, res, next) => {
  const user = await getUser({ _id: req.user._id });
  const token = user.getGenerateToken();
  const message = { firstname: user.firstname, token: token };
  await sendEmail(
    user.email,
    "verification code",
    message,
    "../../utils/email/templates/resetPassword.handlebars"
  );
  return res.status(200).json({
    message: "Verification is Sent",
  });
});
