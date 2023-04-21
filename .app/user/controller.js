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
  signup,
  requestPasswordReset,
  resetPassword,
} = require("./repository");

exports.signUpController = async (req, res, next) => {
  let validate = new validateInput();
  const data = validate.atSignUp(req.body);

  // delete later
  const User = require("./user.model");
  await User.findOneAndDelete({ email: data.email });

  let user = await getUser({ email: data.email });
  if (!_.isEmpty(user)) {
    return next(
      new ErrorResponse(
        `${data.email} is Assigned to a user sign in instead`,
        401
      )
    );
  }
  // Start a Session
  const session = await mongoose.startSession();
  session.startTransaction();
  const opts = { session, new: true };

  // check if email
  if (!data.email) {
    return next(new ErrorResponse("Email Address Is Required", 403));
  }
  if (!data.password) {
    return next(new ErrorResponse("Password Is Required", 403));
  }
  try {
    const payload = data;
    user = await signup([payload], opts);

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
    next(error);
  }
};
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
      return next(
        new ErrorResponse("Please provide an email and password", 400)
      );
    }
    const data = await getUser({ email: email });

    if (_.isEmpty(data)) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    const isMatch = await matchPassword(password, data.password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    } else {
      const user = await getUser({ email: data.email });
      signToken(user, 200, res);
    }
  } catch (error) {
    next(error);
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
    const user = await getUser({ _id: userId });

    if (user.verified) {
      return res
        .status(401)
        .json({
          message: "user is already verified",
        })
        .end();
    }
    const isMatch = await bcrypt.compare(token, user.token);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid or Expired Token", 401));
    } else {
      user.verified = true;
      user.token = "";
      user.tokenExpire = "";
      await user.save();
      await sendEmail(
        user.email,
        "Verification Successful",
        { firstname: user.firstname },
        "../../utils/email/templates/verificationSuccess.handlebars"
      );
    }
    return res.status(200).json({
      status: "true",
      message: "verification successful",
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
