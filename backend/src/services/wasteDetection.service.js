const Expense = require('../models/expense.model');

const detectWastedMoney = async (userId) => {
  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    const wasteAnalysis = {
      unusedSubscriptions: [],
      duplicateSpending: [],
      impulsePurchases: [],
      totalWaste: 0
    };

    // Detect unused subscriptions (no activity for 60+ days)
    const subscriptionKeywords = ['netflix', 'prime', 'spotify', 'gym', 'subscription'];
    const subscriptions = {};

    expenses.forEach(exp => {
      const desc = exp.description?.toLowerCase() || '';
      subscriptionKeywords.forEach(keyword => {
        if (desc.includes(keyword)) {
          if (!subscriptions[keyword]) {
            subscriptions[keyword] = [];
          }
          subscriptions[keyword].push(exp.date);
        }
      });
    });

    Object.entries(subscriptions).forEach(([service, dates]) => {
      const lastUsed = new Date(Math.max(...dates.map(d => new Date(d))));
      const daysSince = Math.ceil((new Date() - lastUsed) / (1000 * 60 * 60 * 24));
      
      if (daysSince > 60) {
        const avgCost = expenses
          .filter(e => e.description?.toLowerCase().includes(service))
          .reduce((sum, e) => sum + e.amount, 0) / dates.length;
        
        wasteAnalysis.unusedSubscriptions.push({
          service,
          lastUsed: lastUsed.toDateString(),
          daysSince,
          avgMonthlyCost: Math.round(avgCost),
          potentialSavings: Math.round(avgCost * 12)
        });
        wasteAnalysis.totalWaste += avgCost * 12;
      }
    });

    // Detect duplicate spending (same amount & category within 24 hours)
    for (let i = 0; i < expenses.length - 1; i++) {
      const current = expenses[i];
      const next = expenses[i + 1];
      
      const timeDiff = Math.abs(new Date(current.date) - new Date(next.date)) / (1000 * 60 * 60);
      
      if (timeDiff <= 24 && 
          current.category === next.category && 
          Math.abs(current.amount - next.amount) < 50) {
        wasteAnalysis.duplicateSpending.push({
          category: current.category,
          amount: current.amount,
          dates: [current.date, next.date],
          potentialWaste: current.amount
        });
        wasteAnalysis.totalWaste += current.amount;
      }
    }

    // Detect impulse purchases (stressed/sad mood + high amount)
    const impulsive = expenses.filter(exp => 
      (exp.mood === 'stressed' || exp.mood === 'sad') && 
      exp.amount > 1000
    );

    wasteAnalysis.impulsePurchases = impulsive.slice(0, 5).map(exp => ({
      category: exp.category,
      amount: exp.amount,
      mood: exp.mood,
      date: exp.date,
      description: exp.description
    }));

    const impulseTotal = impulsive.reduce((sum, exp) => sum + exp.amount, 0);
    wasteAnalysis.totalWaste += impulseTotal * 0.3; // 30% considered waste

    return wasteAnalysis;
  } catch (error) {
    throw new Error('Waste detection failed: ' + error.message);
  }
};

module.exports = { detectWastedMoney };