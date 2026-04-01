const User = require('../models/user.model');
const { generateToken } = require('../config/jwt');
const { sendOTPEmail } = require('../config/email');

// Generate 4-digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    const user = new User({
      name,
      email,
      password,
      otp,
      otpExpiry,
      isVerified: false,
    });

    await user.save();
    
    // Send plain OTP via email (before hashing)
    await sendOTPEmail(email, otp, name, 'Email Verification');

    res.status(201).json({
      message: 'Registration successful. OTP sent to email.',
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: 'Email already verified' });
    }

    // Compare hashed OTP
    const isOTPValid = await user.compareOTP(otp);
    if (!isOTPValid) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ error: 'OTP expired' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = generateToken(user._id);

    res.json({
      message: 'Email verified successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isPro: user.isPro,
        proExpiryDate: user.proExpiryDate,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: 'Email already verified' });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send plain OTP via email (before hashing in save hook)
    await sendOTPEmail(email, otp, user.name, 'Email Verification');

    res.json({ message: 'OTP resent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ error: 'Email not verified. Please verify your email.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isPro: user.isPro,
        proExpiryDate: user.proExpiryDate,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMe = async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isPro: req.user.isPro,
      proExpiryDate: req.user.proExpiryDate,
    },
  });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send plain OTP via email (before hashing in save hook)
    const emailres = await sendOTPEmail(email, otp, user.name, 'Password Reset OTP');
    console.log("BAv");

    res.json({ message: 'OTP sent successfully to email' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isOTPValid = await user.compareOTP(otp);
    if (!isOTPValid) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ error: 'OTP expired' });
    }

    res.json({ message: 'OTP is valid' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isOTPValid = await user.compareOTP(otp);
    if (!isOTPValid) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ error: 'OTP expired' });
    }

    // Update password
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    
    // Also set isVerified to true if not already, as they proved they own the email
    if (!user.isVerified) {
      user.isVerified = true;
    }

    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.requestDeleteOTP = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ error: 'User not found' });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendOTPEmail(user.email, otp, user.name, 'Account Deletion OTP');

    res.json({ message: 'Deletion OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = req.user;

    const isOTPValid = await user.compareOTP(otp);
    if (!isOTPValid) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ error: 'OTP expired' });
    }

    // Clean up related data safely
    try {
      const Expense = require('../models/expense.model');
      const Income = require('../models/income.model');
      await Expense.deleteMany({ userId: user._id });
      await Income.deleteMany({ userId: user._id });
    } catch(e) {}

    await User.findByIdAndDelete(user._id);

    res.json({ message: 'Account and associated data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

