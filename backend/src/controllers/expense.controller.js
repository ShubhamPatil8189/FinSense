const Expense = require('../modules/expense.model');

exports.addExpense = async (req, res) => {
  try {
    const { amount, category, mood, description } = req.body;

    const expense = new Expense({
      userId: req.user._id,
      amount,
      category,
      mood,
      description,
    });

    await expense.save();
    res.status(201).json({ message: 'Expense added', expense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExpenseHistory = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
    res.json({ expenses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};