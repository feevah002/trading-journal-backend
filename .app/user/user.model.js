const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bcryptSalt = process.env.BCRYPT_SALT;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    avatar: {
      type: String,
    },
    username: {
      type: String,
      trim: true,
      //required: true,
      unique: true,
    },
    firstname: {
      type: String,
      trim: true,
      //required: true,
    },
    lastname: {
      type: String,
      trim: true,
      //required: true,
    },
    middlename: {
      type: String,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    phone:{
      type:Number
    },
    tradePlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TradePlan",
    },
    tradeStrategy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "TradeStrategy",
    }],
    trades: {
      realtime: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "RTtrades",
          //required: true,
        },
      ],
      backtest: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "BTtrades",
          //required: true,
        },
      ],
    },
    password: { type: String },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    delAccountToken: String,
    deleteAccountExpire: Date,
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
UserSchema.methods.getResetPasswordToken = async function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = await bcrypt.hash(resetToken, Number(bcryptSalt));

    
  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
// Generate and hash delte account token
UserSchema.methods.getDeleteAccountToken = async function () {
  // Generate token
  const deleteToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.delAccountToken = await bcrypt.hash(deleteToken, Number(bcryptSalt));

    
  // Set expire
  this.deleteccountExpire = Date.now() + 10 * 60 * 1000;

  return deleteToken;
};

// Generate and hash token For Any Verification
UserSchema.methods.getGenerateToken = async function () {
  // Generate token
  const genToken = crypto.randomBytes(20).toString("hex");
  
  // Hash token and set to token field
  this.token = await bcrypt.hash(genToken, Number(bcryptSalt));
  
  // Set expiring
  this.tokenExpire = Date.now() + 10 * 60 * 1000;

  return genToken;
};

// Sign JWT
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      user_id: this._id,
    },
    process.env.JWT_SECRET
  );
};
module.exports = mongoose.model("User", UserSchema);
