const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bcryptSalt = process.env.BCRYPT_SALT;
const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    trades: {
      realtime: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "RTtrades",
        },
      ],
      backtest: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "BTtrades",
        },
      ],
    },
    password: { type: String },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    token: String,
    tokenExpire: Date,
    lastlogin: Date,
  },

  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
  this.password = hash;
  next();
});

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Generate and hash token For Any Verification
UserSchema.methods.getGenerateToken = function () {
  // Generate token
  const genToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to token field
  this.token = crypto.createHash('sha256').update(genToken).digest('hex');

  // Set expiring
  this.tokenExpire = Date.now() + 10 * 60 * 1000;

  return genToken;
};

// Sign JWT
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      user_id: this._id
    },
    process.env.JWT_SECRET
  );
};
module.exports = mongoose.model("User", UserSchema);
