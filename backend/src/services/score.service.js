const Expense = require('../modules/expense.model');
const Income = require('../modules/income.model');
const Goal = require('../modules/goal.model');

const calculateFutureProofScore = async (userId) => {
  try {
    const [expenses, incomes, goals] = await Promise.all([
      Expense.find({ userId }),
      Income.find({ userId }),
      Goal.find({ userId })
    ]);

    const score = {
      total: 0,
      breakdown: {},
      level: '',
      badges: []
    };

    // 1. Savings Rate Score (25 points)
    const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
    
    score.breakdown.savingsRate = {
      value: Math.round(savingsRate),
      score: Math.min(25, Math.round(savingsRate / 4)),
      max: 25
    };

    // 2. Financial Discipline Score (25 points)
    const avgExpense = totalExpenses / Math.max(1, expenses.length);
    const stressSpending = expenses.filter(e => e.mood === 'stressed').length;
    const disciplineScore = Math.max(0, 25 - (stressSpending * 2) - (avgExpense > 2000 ? 5 : 0));
    
    score.breakdown.discipline = {
      score: Math.round(disciplineScore),
      max: 25,
      factors: {
        emotionalSpending: stressSpending,
        avgExpense: Math.round(avgExpense)
      }
    };

    // 3. Goal Progress Score (25 points)
    const activeGoals = goals.length;
    const goalsWithProgress = goals.filter(g => g.currentAmount > 0).length;
    const goalScore = activeGoals > 0 
      ? Math.round((goalsWithProgress / activeGoals) * 25) 
      : 0;
    
    score.breakdown.goalProgress = {
      score: goalScore,
      max: 25,
      activeGoals,
      goalsWithProgress
    };

    // 4. Consistency Score (25 points)
    const uniqueDays = [...new Set(expenses.map(e => new Date(e.date).toDateString()))].length;
    const trackingConsistency = Math.min(25, uniqueDays);
    
    score.breakdown.consistency = {
      score: trackingConsistency,
      max: 25,
      daysTracked: uniqueDays
    };

    // Calculate total
    score.total = Math.round(
      score.breakdown.savingsRate.score +
      score.breakdown.discipline.score +
      score.breakdown.goalProgress.score +
      score.breakdown.consistency.score
    );

    // Determine level
    if (score.total >= 80) {
      score.level = '🏆 Financial Master';
      score.badges = ['💎 Elite Saver', '🎯 Goal Crusher', '📊 Tracking Pro'];
    } else if (score.total >= 60) {
      score.level = '⭐ Money Manager';
      score.badges = ['💰 Smart Spender', '📈 Growing Wealth'];
    } else if (score.total >= 40) {
      score.level = '📚 Learning Investor';
      score.badges = ['🌱 Getting Started'];
    } else {
      score.level = '🚀 Money Beginner';
      score.badges = ['💪 Keep Going'];
    }

    return score;
  } catch (error) {
    throw new Error('Score calculation failed: ' + error.message);
  }
};

module.exports = { calculateFutureProofScore };