const { runFinancialSimulation } = require('../services/simulation.service');
const { genAI } = require('../config/gemini');

exports.runSimulation = async (req, res) => {
  try {
    const { months, newExpense, newIncome, scenario } = req.body;

    const simulation = await runFinancialSimulation(req.user._id, {
      months,
      newExpense,
      newIncome
    });

    let aiAdvice = '';

    if (scenario) {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
You are a smart financial advisor.
Give short, clear, actionable advice.

Scenario: ${scenario}
Current Balance: ₹${simulation.currentBalance}
Projected Balance after ${months} months: ₹${
        simulation.projections[simulation.projections.length - 1].balance
      }

Respond in 4-5 simple lines.
`;

      const result = await model.generateContent(prompt);
      aiAdvice = result.response.text();
    }

    res.json({
      message: 'Financial simulation complete',
      simulation,
      aiAdvice
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFinancialSummary = async (req, res) => {
  try {
    const Expense = require('../modules/expense.model');
    const Income = require('../modules/income.model');

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
