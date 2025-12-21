const { detectWastedMoney } = require('../services/wasteDetection.service');

exports.detectWaste = async (req, res) => {
  try {
    const wasteAnalysis = await detectWastedMoney(req.user._id);

    res.json({
      message: 'Waste detection complete',
      summary: {
        totalPotentialSavings: Math.round(wasteAnalysis.totalWaste),
        unusedSubscriptionsCount: wasteAnalysis.unusedSubscriptions.length,
        duplicateSpendingCount: wasteAnalysis.duplicateSpending.length,
        impulsePurchasesCount: wasteAnalysis.impulsePurchases.length
      },
      details: wasteAnalysis,
      recommendations: [
        '🚫 Cancel unused subscriptions immediately',
        '⚠️ Review duplicate charges with bank',
        '🧘 Practice 24-hour rule for impulse buys',
        '💡 Set up spending alerts for high amounts'
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};