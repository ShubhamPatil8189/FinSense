const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  isPro: { type: Boolean, default: false },
  proExpiryDate: { type: Date },
  otp: { type: String },
  otpExpiry: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function () {
  if (!this.isModified('password') && !this.isModified('otp')) return;
  
  // Hash password if modified
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  
  // Hash OTP if modified
  if (this.isModified('otp') && this.otp) {
    this.otp = await bcrypt.hash(this.otp, 10);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.compareOTP = async function (otp) {
  return await bcrypt.compare(otp, this.otp);
};

module.exports = mongoose.model('User', userSchema);