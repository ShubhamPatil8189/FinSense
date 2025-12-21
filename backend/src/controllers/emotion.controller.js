const Expense = require("../modules/expense.model");
const { genAI } = require("../config/gemini");

exports.analyzeEmotion = async (req, res) => {
  try {
    const { mood } = req.body;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const expenses = await Expense.find({
      userId: req.user._id,
      date: { $gte: thirtyDaysAgo },
    }).sort({ date: -1 });

    if (!expenses.length) {
      return res.status(400).json({
        error: "Not enough data.",
      });
    }

    /* ---------------- BASIC STATS ---------------- */
    const totalExpenses = expenses.length;

    const totalSpending = expenses.reduce(
      (sum, e) => sum + Number(e.amount),
      0
    );

    const avgPerExpense =
      totalExpenses > 0 ? Math.round(totalSpending / totalExpenses) : 0;

    /* ---------------- MOOD BREAKDOWN ---------------- */
    const moodBreakdown = {};
    expenses.forEach((e) => {
      const m = e.mood || "unknown";
      moodBreakdown[m] = (moodBreakdown[m] || 0) + 1;
    });

    /* ---------------- EMOTIONAL TRIGGERS ---------------- */
    const triggerMap = {};
    expenses.forEach((e) => {
      const key = `${e.category}-${e.mood}`;
      triggerMap[key] = (triggerMap[key] || 0) + e.amount;
    });

    const topEmotionalTriggers = Object.entries(triggerMap)
      .map(([key, amount]) => {
        const [category, mood] = key.split("-");
        return { category, mood, amount };
      })
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    /* ---------------- GEMINI PROMPT ---------------- */
    const expenseData = expenses
      .map((e) => `${e.category}: ₹${e.amount} (Mood: ${e.mood})`)
      .join("\n");

    const prompt = `
You are a financial psychology expert.

Analyze the following spending data:
${expenseData}

User current mood: ${mood}

Provide:
1. Spending patterns
2. Emotional triggers
3. Clear, actionable advice
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiInsight = response.text();

    /* ---------------- FINAL RESPONSE ---------------- */
    res.json({
      message: "Analysis complete",
      data: {
        totalExpenses,
        totalSpending,
        avgPerExpense,
        topEmotionalTriggers,
        moodBreakdown,
        aiInsight,
      },
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({
      error:
        "AI Service temporarily unavailable. Please check your API Key and Model permissions.",
    });
  }
};
