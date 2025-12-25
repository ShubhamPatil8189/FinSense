const Goal = require('../models/goal.model');

exports.addGoal = async (req, res) => {
  try {
    const { title, targetAmount, deadline } = req.body;

    const goal = new Goal({
      userId: req.user._id,
      title,
      targetAmount,
      deadline,
    });

    await goal.save();
    res.status(201).json({ message: 'Goal added', goal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.prioritizeGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id });

    // Simple prioritization logic
    const prioritized = goals.map(goal => {
      const daysLeft = goal.deadline ? Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)) : 365;
      const progress = (goal.currentAmount / goal.targetAmount) * 100;
      const urgencyScore = Math.max(0, 100 - daysLeft / 3.65);
      const feasibilityScore = progress;
      const priority = (urgencyScore * 0.6 + feasibilityScore * 0.4);

      return { ...goal.toObject(), priority, urgencyScore, feasibilityScore };
    }).sort((a, b) => b.priority - a.priority);

    res.json({ goals: prioritized });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
