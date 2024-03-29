/**
 *
 * @param {Array} user `Array` Or `Object` Conataining The User Data Or Model
 * @param {Number} statusCode The Server Response Code
 * @param {Function} res The Response Function
 */
exports.signToken = (user, statusCode, res) => {
  // Create token
  const token = Array.isArray(user)
    ? user[0].getSignedJwtToken()
    : user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }
  let userInfo
  Array.isArray(user)?userInfo = user[0]:userInfo=user
  res.status(statusCode).cookie("token", token, options).json({
    token,
    user:userInfo,
    message: "sign up successful",
    status: true,
  });
};
