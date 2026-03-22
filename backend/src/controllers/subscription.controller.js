const User = require('../models/user.model');
const { sendReceiptEmail } = require('../config/email');

exports.upgradeToPro = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isPro) {
      return res.status(400).json({ error: 'User is already a Pro member' });
    }

    // In a real application, you would verify the Stripe/Razorpay payment intent here.
    // For this fake gateway, we just assume payment was successful if the request arrives.

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1); // 1 year of Pro

    user.isPro = true;
    user.proExpiryDate = expiryDate;
    
    await user.save();

    await sendReceiptEmail(user.email, user.name, 299, expiryDate);

    res.json({
      message: 'Successfully upgraded to Pro',
      isPro: true,
      proExpiryDate: expiryDate
    });

  } catch (error) {
    console.error("Subscription Error:", error);
    res.status(500).json({ error: 'Failed to process subscription' });
  }
};
