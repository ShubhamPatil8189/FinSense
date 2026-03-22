const Expense = require('../models/expense.model');
const { genAI } = require('../config/gemini');

const generateSmartNudges = async (userId) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayExpenses = await Expense.find({
      userId,
      date: { $gte: today }
    });

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentExpenses = await Expense.find({
      userId,
      date: { $gte: sevenDaysAgo }
    });

    const todayTotal = todayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const weeklyTotal = recentExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const avgDaily = weeklyTotal / 7;

    const nudges = [];

    /* ---------- RULE-BASED NUDGES (FAST & RELIABLE) ---------- */

    // 1️⃣ High spending today
    if (todayTotal > avgDaily * 1.5) {
      nudges.push({
        type: 'warning',
        priority: 'high',
        message: `You've spent ₹${todayTotal} today, which is much higher than usual.`,
        action: 'Pause non-essential spending today'
      });
    }

    // 2️⃣ Food category check
    const foodToday = todayExpenses
      .filter(e => e.category === 'Food')
      .reduce((sum, e) => sum + e.amount, 0);

    if (foodToday > 500) {
      nudges.push({
        type: 'suggestion',
        priority: 'medium',
        message: `Food spending reached ₹${foodToday} today.`,
        action: 'Home-cooked meals tomorrow could save money'
      });
    }

    // 3️⃣ Mood-based spending
    const stressedExpenses = todayExpenses.filter(e => e.mood === 'stressed');
    if (stressedExpenses.length > 0) {
      nudges.push({
        type: 'insight',
        priority: 'medium',
        message: 'Stress-related purchases detected today.',
        action: 'Take a short break before making another purchase'
      });
    }

    // 4️⃣ Positive reinforcement
    if (todayTotal < avgDaily * 0.7) {
      nudges.push({
        type: 'positive',
        priority: 'low',
        message: 'You spent less than usual today.',
        action: 'Great job maintaining mindful spending'
      });
    }

    /* ---------- GEMINI AI INSIGHT NUDGE ---------- */
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
      });

      const prompt = todayExpenses.length > 0 ? `
You are a financial assistant.
Generate ONE short, actionable spending nudge.

Data:
- Today's spending: ₹${todayTotal}
- Average daily spending: ₹${Math.round(avgDaily)}
- Main categories today: ${[
        ...new Set(todayExpenses.map(e => e.category))
      ].join(', ')}

Rules:
- Max 2 lines
- No emojis
- Friendly and practical
` : `
You are a friendly financial assistant.
The user has not logged any expenses today, which is great!
Generate ONE short, actionable, and encouraging financial tip to help them stay on track with their savings goals or remind them to log their expenses.

Rules:
- Max 2 lines
- No emojis
- Friendly and practical
`;

      const result = await model.generateContent(prompt);

      nudges.push({
        type: 'insight',
        priority: 'medium',
        message: result.response.text().trim(),
        action: todayExpenses.length > 0 ? 'Apply this suggestion today' : 'Keep up the good work!'
      });
    } catch (aiError) {
      console.error('Gemini AI failed to generate nudge:', aiError);
      // Fail silently for AI if it crashes, rule-based nudges might still exist
    }

    if (nudges.length === 0) {
      nudges.push({
        type: 'insight',
        priority: 'medium',
        message: "We're still analyzing your patterns. Stay tuned for AI-powered hints!",
        action: "Keep tracking your expenses"
      });
    }

    return nudges;

  } catch (error) {
    console.error('Nudge generation error:', error);
    return [];
  }
};

module.exports = { generateSmartNudges };
