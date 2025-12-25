const Expense = require('../models/expense.model');
const { genAI } = require('../config/gemini');

exports.analyzeSpendDNA = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id });

    if (expenses.length < 10) {
      return res.status(400).json({
        error: 'Need at least 10 expenses to analyze spending personality'
      });
    }

    /* ---------- BASIC ANALYSIS ---------- */

    const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const avgExpense = totalSpending / expenses.length;

    // Category distribution
    const categories = {};
    expenses.forEach(exp => {
      categories[exp.category] = (categories[exp.category] || 0) + 1;
    });

    // Mood distribution
    const moods = {};
    expenses.forEach(exp => {
      moods[exp.mood] = (moods[exp.mood] || 0) + 1;
    });

    // Spending frequency
    const dates = expenses.map(e => new Date(e.date).toDateString());
    const uniqueDays = [...new Set(dates)].length;
    const frequency = expenses.length / uniqueDays;

    /* ---------- RULE-BASED PERSONALITY ---------- */

    let personality = 'Balanced';
    let traits = [];

    if (avgExpense > 1000) {
      personality = 'Big Spender';
      traits = ['High-value purchases', 'Comfort seeker', 'Quality over quantity'];
    } else if (frequency > 2) {
      personality = 'Frequent Buyer';
      traits = ['Habit-driven', 'Convenience focused', 'Regular small spends'];
    } else if (moods['stressed'] && moods['stressed'] > expenses.length * 0.3) {
      personality = 'Emotional Spender';
      traits = ['Mood influenced', 'Impulse buying', 'Stress spending'];
    } else if (avgExpense < 300) {
      personality = 'Frugal Saver';
      traits = ['Budget conscious', 'Value driven', 'Minimalist habits'];
    }

    /* ---------- GEMINI AI INSIGHTS ---------- */

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are a financial behavior analyst.

User Spending Profile:
- Personality Type: ${personality}
- Average Expense: ₹${Math.round(avgExpense)}
- Spending Frequency: ${frequency.toFixed(1)} purchases/day
- Dominant Moods: ${Object.keys(moods).join(', ')}

Task:
Give exactly 3 short, personalized money tips.
Keep them practical and friendly.
No emojis.
`;

    const result = await model.generateContent(prompt);
    const aiInsights = result.response.text();

    /* ---------- RESPONSE ---------- */

    res.json({
      personalityType: personality,
      traits,
      statistics: {
        totalExpenses: expenses.length,
        totalSpending: Math.round(totalSpending),
        avgExpense: Math.round(avgExpense),
        frequency: frequency.toFixed(2),
        uniqueDays
      },
      categoryPreferences: Object.entries(categories)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([category, count]) => ({ category, count })),
      moodInfluence: Object.entries(moods).map(([mood, count]) => ({
        mood,
        count,
        percentage: Math.round((count / expenses.length) * 100)
      })),
      aiInsights
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
