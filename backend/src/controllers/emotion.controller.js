const Expense = require('../models/expense.model');
const { model } = require('../config/gemini');

exports.analyzeEmotion = async (req, res) => {
  try {
    const { mood } = req.body;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const expenses = await Expense.find({
      userId: req.user._id,
      date: { $gte: thirtyDaysAgo }
    }).sort({ date: -1 });

    if (expenses.length === 0) {
      return res.status(400).json({ error: 'Not enough data.' });
    }

    const expenseData = expenses
      .map(e => `${e.category}: ₹${e.amount} (Mood: ${e.mood})`)
      .join('\n');

    const prompt = `You are a financial psychology expert. Analyze this spending:
    ${expenseData}
    User mood: ${mood}.
    Provide: 1) Pattern analysis 2) Emotional triggers 3) Actionable advice.`;

    // Standard generateContent call
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      message: 'Analysis complete',
      data: { aiInsight: text }
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "AI Service temporarily unavailable. Please check your API Key and Model permissions." });
  }
};