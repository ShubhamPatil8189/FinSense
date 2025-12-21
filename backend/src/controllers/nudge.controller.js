const { generateSmartNudges } = require('../services/nudge.service');

exports.getNudges = async (req, res) => {
  try {
    const nudges = await generateSmartNudges(req.user._id);

    res.json({
      message: 'Smart nudges generated',
      count: nudges.length,
      nudges,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};