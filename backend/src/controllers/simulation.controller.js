const { runFinancialSimulation } = require('../services/simulation.service');
const { genAI } = require('../config/gemini');


exports.runSimulation = async (req, res) => {
  try {
    const { months, newExpense, newIncome, scenario } = req.body;

    const simulationResult = await runFinancialSimulation(req.user._id, {
      months,
      newExpense,
      newIncome,
    });

    /* ---------------- RECOMMENDATION (RULE-BASED) ---------------- */
    let recommendation = "✅ Your financial outlook looks stable.";

    const finalBalance =
      simulationResult.projections[
        simulationResult.projections.length - 1
      ].balance;

    if (finalBalance < 0) {
      recommendation = "⚠️ This scenario may strain your finances";
    }

    /* ---------------- AI ADVICE (OPTIONAL) ---------------- */
    let aiAdvice = "";

    if (scenario && scenario.trim().length > 5) {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const prompt = `
You are a smart financial advisor.
Give short, clear, actionable advice.

Scenario:
${scenario}

Current Balance: ₹${simulationResult.currentBalance}
Projected Balance after ${months} months: ₹${finalBalance}

Respond in 4–5 simple lines.
`;

      const result = await model.generateContent(prompt);
      aiAdvice = result.response.text();
    }

    /* ---------------- FINAL RESPONSE (MATCHES FRONTEND) ---------------- */
    res.json({
      message: "Financial simulation complete",
      simulation: {
        currentBalance: simulationResult.currentBalance,
        avgMonthlyIncome: simulationResult.avgMonthlyIncome,
        avgMonthlyExpense: simulationResult.avgMonthlyExpense,
        projections: simulationResult.projections,
        recommendation, // ✅ REQUIRED BY FRONTEND
      },
      aiAdvice, // ✅ OPTIONAL BUT SUPPORTED
    });
  } catch (error) {
    console.error("Simulation Error:", error);
    res.status(500).json({
      error: "Unable to run simulation. Please try again later.",
    });
  }
};

exports.getFinancialSummary = async (req, res) => {
  try {
    const Expense = require('../models/expense.model');
    const Income = require('../models/income.model');

    const expenses = await Expense.find({ userId: req.user._id });
    const incomes = await Income.find({ userId: req.user._id });

    const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const savings = totalIncome - totalExpenses;

    const categoryBreakdown = {};
    expenses.forEach(exp => {
      categoryBreakdown[exp.category] =
        (categoryBreakdown[exp.category] || 0) + exp.amount;
    });

    res.json({
      totalIncome,
      totalExpenses,
      savings,
      savingsRate: totalIncome > 0
        ? Math.round((savings / totalIncome) * 100)
        : 0,
      categoryBreakdown,
      expenseCount: expenses.length,
      incomeCount: incomes.length
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
