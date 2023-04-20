const JWT = require("jsonwebtoken");
const User = require("./user.model");
const sendEmail = require("../utils/email/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;

exports.signup = async (data) => {
  let user = await User.findOne({ email: data.email });
  if (user) {
    throw new Error("Email already exist", 422);
  } 
  user = new User(data);
  const token = user.getSignedJwtToken();
  await user.save();
  sendEmail(
    user.email,
    "sign up successful",
    {
      firstname: user.firstname,
    },
    "../../utils/email/templates/requestResetPassword.handlebars"
  );
  return (data = {
    userId: user._id,
    email: user.email,
    firstname: user.firstname,
    token: token,
  });
  
 
};

exports.getUser = async (id) => {
  const user = User.findOne({ email });
  return user;
};

exports.requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    if (!user) throw new Error("Email does not exist");
  } 
  let resetToken = user.getResetPasswordToken();

  const link = `${clientURL}/resetPassword?token=${resetToken}&id=${user._id}`;

  sendEmail(
    user.email,
    "Password Reset Request",
    {
      firstname: user.firstname,
      link: link,
    },
    "../../utils/email/templates/requestResetPassword.handlebars"
  );
  return link;

};

exports.resetPassword = async (userId, token, password) => {
  let userInfo = await User.findOne({ userId });

  if (!userInfo.token) {
    throw new Error("Invalid or expired password reset token");
  }

  const isValid = await bcrypt.compare(token, userInfo.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }
  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  // deleting token
  userInfo.token = ''
  sendEmail(
    userInfo.email,
    "Password Reset Successfully",
    {
      firstname: userInfo.firstname,
    },
    "../../utils/email/templates/resetPassword.handlebars"
  );

  
   return true;
};
