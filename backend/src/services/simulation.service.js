const Expense = require('../models/expense.model');
const Income = require('../models/income.model');

const runFinancialSimulation = async (userId, scenarioData) => {
  try {
    // Get historical data
    const expenses = await Expense.find({ userId });
    const incomes = await Income.find({ userId });

    const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const currentBalance = totalIncome - totalExpenses;

    // Calculate average monthly spending
    const avgMonthlyExpense = totalExpenses / Math.max(1, expenses.length / 30);

    // Simulate scenario
    const { months = 6, newExpense = 0, newIncome = 0 } = scenarioData;

    const projections = [];
    let projectedBalance = currentBalance;

    for (let i = 1; i <= months; i++) {
      const monthlyIncome = (totalIncome / Math.max(1, incomes.length)) + newIncome;
      const monthlyExpense = avgMonthlyExpense + newExpense;
      const monthlySavings = monthlyIncome - monthlyExpense;

      projectedBalance += monthlySavings;

      projections.push({
        month: i,
        income: Math.round(monthlyIncome),
        expenses: Math.round(monthlyExpense),
        savings: Math.round(monthlySavings),
        balance: Math.round(projectedBalance),
        status: projectedBalance > 0 ? 'positive' : 'negative'
      });
    }

    return {
      currentBalance: Math.round(currentBalance),
      avgMonthlyIncome: Math.round(totalIncome / Math.max(1, incomes.length)),
      avgMonthlyExpense: Math.round(avgMonthlyExpense),
      projections,
      recommendation: projectedBalance > currentBalance 
        ? '✅ This scenario improves your financial health' 
        : '⚠️ This scenario may strain your finances'
    };
  } catch (error) {
    throw new Error('Simulation failed: ' + error.message);
  }
};

module.exports = { runFinancialSimulation };