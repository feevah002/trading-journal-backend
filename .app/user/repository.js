const User = require("./user.model");
const sendEmail = require("../../utils/email/sendEmail");
const bcrypt = require("bcrypt");
const { matchPassword } = require("../../utils/matchPassword");

const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;

// creates a new user
exports.createNewUser = async (data, options) => {
  const user = await User.create(data, options);
  return user;
};

// user verification
exports.verifyUser = async (query, token) => {
  let user = User.findOne(query);

  if (user.verified) {
    return {
      message: "user is already verified",
    };
  }
  const isMatch = await bcrypt.compare(token, user.token);
  if (!isMatch) {
    return {
      status: false,
      error: "Invalid or Expired Token",
    };
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
    return {
      status: true,
      message: "verification successful",
    };
  }
};

// finding user
exports.getUser = async (query) => {
  const user = await User.findOne(query);
  return user;
};

// update user details
exports.updateUserDetails = async (query, updData) => {
  const newData = await User.findOneAndUpdate(query, updData);
  return newData;
};

// sends reset password link to  email
exports.requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      status: false,
      error: "Email does not exist",
    };
  }
  let resetToken = await user.getResetPasswordToken();
  await user.save();
  const link = `${clientURL}/auth/reset-password/${resetToken}/${user._id}`;
  await sendEmail(
    user.email,
    "Password Reset Request",
    {
      firstname: user.firstname,
      link: link,
    },
    "../../utils/email/templates/requestResetPassword.handlebars"
  );
  return {
    status: true,
    data: link,
  };
};

// reset password
exports.resetPassword = async (userId, resetPasswordToken, password) => {
  let userInfo = await User.findOne({ _id: userId });
  if (!userInfo.resetPasswordToken) {
    return {
      status: false,
      error: "Invalid or expired password reset token",
    };
  }
  const isValid = await bcrypt.compare(
    resetPasswordToken,
    userInfo.resetPasswordToken
  );

  if (!isValid) {
    return {
      status: false,
      error: "Invalid or expired password reset token",
    };
  }
  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  // deleting password reset token
  userInfo.resetPasswordToken = "";
  userInfo.resetPasswordExpire = "";
  await sendEmail(
    userInfo.email,
    "Password Reset Successfully",
    {
      firstname: userInfo.firstname,
    },
    "../../utils/email/templates/resetPassword.handlebars"
  );
  return {
    status: true,
    message: "password uccessfully changed",
  };
};

// sends delete account link to email
exports.requestDeleteAccount = async (id, password) => {
  const user = await User.findById(id);

  const isMatch = await matchPassword(password, user.password);
  if (!isMatch) {
    return {
      status: false,
      error: "Wrong Password",
    };
  }
  let deleteToken = await user.getDeleteAccountToken();
  await user.save();
  const link = `${clientURL}/auth/deleteAccount/${deleteToken}/${user._id}`;
  await sendEmail(
    user.email,
    "Delete Account Request",
    {
      firstname: user.firstname,
      link: link,
    },
    "../../utils/email/templates/requestDeleteAccount.handlebars"
  );
  return {
    status: true,
    data: link,
  };
};

// deletes account
exports.deleteAccount = async (userId, deleteAccountToken, password) => {
  let user = await User.findById(userId);
  if (!user) {
    return {
      status: false,
      error: "account already deleted or doesn't exist",
    };
  }
  const isMatch = await matchPassword(password, user.password);
  if (!isMatch) {
    return {
      status: false,
      error: "Wrong Password",
    };
  }
  if (!user.delAccountToken) {
    return {
      status: false,
      error: "Invalid or expired token, please request another link",
    };
  }
  const isValid = await bcrypt.compare(
    deleteAccountToken,
    user.delAccountToken
  );

  if (!isValid) {
    return {
      status: false,
      error: "Invalid or expired token, please request another link",
    };
  }

  await sendEmail(
    user.email,
    "Account deleted successfully",
    {
      firstname: user.firstname,
    },
    "../../utils/email/templates/deleteAccount.handlebars"
  );

  await User.findByIdAndDelete(userId);

  return {
    status: true,
    message: "account deleted successfully",
  };
};
