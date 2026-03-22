 const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/register', authController.register);
router.post('/verify-otp', authController.verifyOTP);
router.post('/resend-otp', authController.resendOTP);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.getMe);

// Forgot Password Routes
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-reset-otp', authController.verifyResetOTP);
router.post('/reset-password', authController.resetPassword);

// Delete Account Routes
router.post('/request-delete-otp', authenticate, authController.requestDeleteOTP);
router.delete('/delete-account', authenticate, authController.deleteAccount);

module.exports = router;