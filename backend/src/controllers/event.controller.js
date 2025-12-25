const Event = require('../models/event.model');
const Expense = require('../models/expense.model');

exports.predictEvents = async (req, res) => {
  try {
    const userId = req.user._id;
    const currentDate = new Date();
    const next90Days = new Date();
    next90Days.setDate(next90Days.getDate() + 90);

    // Get stored events
    const upcomingEvents = await Event.find({
      userId,
      isActive: true,
      nextDueDate: { $lte: next90Days }
    }).sort({ nextDueDate: 1 });

    // Detect patterns from expenses
    const expenses = await Expense.find({ userId });
    const recurringExpenses = detectRecurringExpenses(expenses);

    // Predict festivals/special events
    const festivalPredictions = predictFestivals(currentDate);

    res.json({
      message: 'Life events predicted',
      upcomingEvents: upcomingEvents.map(e => ({
        ...e.toObject(),
        daysUntil: Math.ceil((new Date(e.nextDueDate) - currentDate) / (1000 * 60 * 60 * 24))
      })),
      detectedRecurring: recurringExpenses,
      festivalPredictions,
      totalImpact: calculateTotalImpact(upcomingEvents, recurringExpenses, festivalPredictions)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addEvent = async (req, res) => {
  try {
    const { type, name, amount, nextDueDate, frequency } = req.body;

    const event = new Event({
      userId: req.user._id,
      type,
      name,
      amount,
      nextDueDate,
      frequency
    });

    await event.save();
    res.status(201).json({ message: 'Event added', event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper functions
function detectRecurringExpenses(expenses) {
  const patterns = {};
  
  expenses.forEach(exp => {
    const key = `${exp.category}-${exp.amount}`;
    if (!patterns[key]) {
      patterns[key] = [];
    }
    patterns[key].push(new Date(exp.date));
  });

  const recurring = [];
  Object.entries(patterns).forEach(([key, dates]) => {
    if (dates.length >= 3) {
      const [category, amount] = key.split('-');
      const avgGap = calculateAverageDaysBetween(dates);
      
      if (avgGap >= 25 && avgGap <= 35) { // Monthly pattern
        recurring.push({
          category,
          amount: parseFloat(amount),
          frequency: 'monthly',
          confidence: 'high',
          lastOccurrence: dates[dates.length - 1]
        });
      }
    }
  });

  return recurring;
}

function calculateAverageDaysBetween(dates) {
  if (dates.length < 2) return 0;
  
  const sorted = dates.sort((a, b) => a - b);
  let totalDays = 0;
  
  for (let i = 1; i < sorted.length; i++) {
    totalDays += (sorted[i] - sorted[i-1]) / (1000 * 60 * 60 * 24);
  }
  
  return Math.round(totalDays / (sorted.length - 1));
}

function predictFestivals(currentDate) {
  const festivals = [
    { name: 'Diwali', month: 10, estimatedCost: 5000 },
    { name: 'Holi', month: 2, estimatedCost: 2000 },
    { name: 'Christmas', month: 11, estimatedCost: 3000 },
    { name: 'New Year', month: 0, estimatedCost: 4000 }
  ];

  const upcoming = [];
  const currentMonth = currentDate.getMonth();

  festivals.forEach(festival => {
    if (festival.month >= currentMonth || festival.month <= currentMonth + 3) {
      upcoming.push({
        ...festival,
        monthsAway: festival.month >= currentMonth 
          ? festival.month - currentMonth 
          : 12 - currentMonth + festival.month
      });
    }
  });

  return upcoming.slice(0, 2); // Next 2 festivals
}

function calculateTotalImpact(events, recurring, festivals) {
  const eventTotal = events.reduce((sum, e) => sum + e.amount, 0);
  const recurringTotal = recurring.reduce((sum, r) => sum + r.amount, 0);
  const festivalTotal = festivals.reduce((sum, f) => sum + f.estimatedCost, 0);
  
  return {
    events: Math.round(eventTotal),
    recurring: Math.round(recurringTotal),
    festivals: Math.round(festivalTotal),
    total: Math.round(eventTotal + recurringTotal + festivalTotal)
  };
}