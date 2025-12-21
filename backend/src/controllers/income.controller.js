const Income = require('../modules/income.model');

exports.addIncome = async (req, res) => {
  try {
    const { amount, source } = req.body;

    const income = new Income({
      userId: req.user._id,
      amount,
      source,
    });

    await income.save();
    res.status(201).json({ message: 'Income added', income });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIncomeDetails = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user._id }).sort({ date: -1 });
    const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
    res.json({ incomes, totalIncome });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};