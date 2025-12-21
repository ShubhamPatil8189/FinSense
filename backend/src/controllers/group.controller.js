const Group = require('../modules/group.model');

exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    const group = new Group({
      name,
      members: [req.user._id, ...members],
    });

    await group.save();
    res.status(201).json({ message: 'Group created', group });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addGroupExpense = async (req, res) => {
  try {
    const { groupId, amount, description } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    group.expenses.push({
      amount,
      paidBy: req.user._id,
      description,
    });

    await group.save();
    res.json({ message: 'Expense added to group', group });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};