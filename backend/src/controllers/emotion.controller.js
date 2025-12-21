const Expense = require('../modules/expense.model');
const { generateFinancialInsight } = require('../config/gemini');

exports.analyzeEmotion = async (req, res) => {
  try {
    const { mood } = req.body;
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 }).limit(15);

    if (expenses.length === 0) return res.status(400).json({ error: 'No expense data found.' });

    const expenseSummary = expenses.map(e => `${e.category}: ₹${e.amount} (${e.mood})`).join('\n');
    const prompt = `You are a financial therapist. Analyze these recent expenses:\n${expenseSummary}\n\nThe user is currently feeling: ${mood}.\n\nProvide a psychological analysis of their spending and 3 tips to stay disciplined.`;

    const aiInsight = await generateFinancialInsight(prompt);

    res.json({
      message: 'Emotional analysis complete',
      aiInsight
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};