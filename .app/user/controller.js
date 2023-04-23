const repository = require("./repository");
const ErrorResponse = require("../../utils/errorResponse");
const sendEmail = require("../../utils/email/sendEmail");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { signToken } = require("../../utils/signToken");
const validateInput = require("../../utils/validateInput");
const mongoose = require("mongoose");
const { matchPassword } = require("../../utils/matchPassword");
const {
  getUser,
  createNewUser,
  requestPasswordReset,
  resetPassword,
  requestDeleteAccount,
  deleteAccount,
  verifyUser,
  updateUserDetails,
  createCloudUrl,
} = require("./repository");

// -----------create and verify new account------------------
exports.signUpController = async (req, res, next) => {
  let validate = new validateInput();
  let validatedData = validate.atSignUp(req.body, req.file);
  // if avatar exist
  if (validatedData.avatar) {
    const avatarUrl = await createCloudUrl(validatedData.avatar);
    validatedData.avatar = avatarUrl;
  }
  // delete later
  const User = require("./user.model");
  await User.findOneAndDelete({ email: validatedData.email });

  let user = await getUser({ email: validatedData.email });
  if (!_.isEmpty(user)) {
    return res.status(401).json({
      status: false,
      error: `${validatedData.email} is Assigned to a user sign in instead`,
    });
  }
  // Start a Session
  const session = await mongoose.startSession();
  session.startTransaction();
  const opts = { session, new: true };

  // check if email
  if (!validatedData.email) {
    return res.status(403).json({
      status: false,
      error: "Email Address Is Required",
    });
  }
  if (!validatedData.password) {
    return res.status(403).json({
      status: false,
      error: "Password Is Required",
    });
  }
  try {
    const payload = validatedData;
    user = await createNewUser([payload], opts);

    const token = await user[0].getGenerateToken();
    await user[0].save();
    sendEmail(
      user[0].email,
      "One final step",
      {
        firstname: user.firstname,
        url: `localhost:4321/auth/verify/${user[0].id}/${token}`,
      },
      "../../utils/email/templates/verificationToken.handlebars"
    );

    await session.commitTransaction();
    session.endSession();
    signToken(user, 200, res);
  } catch (error) {
    session.endSession();
    return res.status(500).json({
      status: false,
      error: error,
    });
  }
};
/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description send verification token
 * @route `/auth/verify/:uid/:token`
 * @access Private
 * @type POST
 */
exports.verifyController = async (req, res, next) => {
  try {
    const token = req.params.token;
    const userId = req.params.uid;
    const repoResponse = await verifyUser({ _id: userId }, token);
    return res.json(repoResponse);
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
    });
  }
};

// get/edit user profile
/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description get user profile
 * @route `/auth/user/:username`
 * @access Private
 * @type GET
 */
exports.getUserProfileController = async (req, res, next) => {
  try {
    const username = req.params.username;
    const data = await getUser({ username });
    if (!data) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
    });
  }
};
/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description get user profile
 * @route `/auth/user/:username`
 * @access Private
 * @type POST
 */
exports.updateUserProfileController = async (req, res, next) => {
  try {
    // validating data
    let validate = new validateInput();
    let validatedData = validate.atEdit(req.body, req.file);
    // if avatar exist
    if (validatedData.avatar) {
      const avatarUrl = await createCloudUrl(validatedData.avatar);
      validatedData.avatar = avatarUrl;
    }
    const username = req.params.username;
    const exist = await getUser({ username });
    if (!exist) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }
    const updData = await updateUserDetails({ username }, validatedData);
    return res.status(200).json({
      status: true,
      data: updData,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
    });
  }
};

// -------------------login/logout------------------------------
/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description login authentication
 * @route `/auth/login/`
 * @access Private
 * @type POST
 */
exports.loginController = async (req, res, next) => {
  try {
    let validate = new validateInput();
    const { email, password } = validate.atLogin(req.body);
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        error: "Please provide an email and password",
      });
    }
    const data = await getUser({ email: email });

    if (_.isEmpty(data)) {
      return res.status(401).json({
        status: false,
        error: "Invalid credentials",
      });
    }
    const isMatch = await matchPassword(password, data.password);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        error: "Invalid credentials",
      });
    } else {
      const user = await getUser({ email: data.email });
      signToken(user, 200, res);
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: error,
    });
  }
};

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description Logout
 * @route `/auth/logout`
 * @access Public
 * @type POST
 */
exports.logoutController = async (req, res, next) => {
  try {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
    });
  }
};
// ------------------request/reset password--------------------
/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description requsest reset password
 * @route `/auth/requestResetPassword`
 * @access Private
 * @type POST
 */

exports.resetPasswordRequestController = async (req, res, next) => {
  try {
    const requestPasswordResetService = await requestPasswordReset(
      req.body.email,
    );

    return res.json(requestPasswordResetService);
  } catch (error) {
    return res.status(400).json({
      status: false,
      error,
    });
  }
};

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description reset password
 * @route `/auth/resetPassword/:resetPasswordToken/:userId`
 * @access Private
 * @type POST
 */

exports.resetPasswordController = async (req, res, next) => {
  try {
    const resetPasswordService = await resetPassword(
      req.params.userId,
      req.params.resetPasswordToken,
      req.body.password
    );
    return res.json(resetPasswordService);
  } catch (error) {
    return res.status(400).json({
      status: false,
      error,
    });
  }
};

// ---------------------delete account --------------------
/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description requsest reset password
 * @route `/auth/requestDeleteAccount/`
 * @access Private
 * @type POST
 */

exports.deleteAccountRequestController = async (req, res, next) => {
  try {
    const requestPasswordResetService = await requestDeleteAccount(
      req.user.id,
      req.body.password,
    );

    return res.json(requestPasswordResetService);
  } catch (error) {
    return res.status(400).json({
      status: false,
      error,
    });
  }
};

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description change password
 * @route `/auth/deleteAccount/:deleteAccountToken/:userId`
 * @access Private
 * @type POST
 */

exports.deleteAccountController = async (req, res, next) => {
  try {
    const deleteAccountResponse = await deleteAccount(
      req.params.userId,
      req.params.deleteAccountToken,
      req.body.password
    );
    return res.json(deleteAccountResponse);
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      status: false,
      error,
    });
  }
};
// ---------------------------
