const bcrypt = require('bcryptjs');
/**
 * This Is Used To Compare The Password type and The Hash Data
 * @param {String} enteredPassword
 * @param {String} password
 * @returns {Boolean}
 */
exports.matchPassword = async function (enteredPassword, password) {
  return await bcrypt.compare(enteredPassword, password);
};
