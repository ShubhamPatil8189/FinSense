const Group = require('../models/group.model');

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

exports.predictSplit = async (req, res) => {
  try {
    const { groupId } = req.body;

    const group = await Group.findById(groupId).populate('members', 'name email');
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Calculate total expenses and who paid
    const totalExpenses = group.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const memberCount = group.members.length;
    
    // Calculate each member's share
    const memberBalances = {};
    group.members.forEach(member => {
      memberBalances[member._id] = {
        name: member.name,
        paid: 0,
        owes: 0,
        balance: 0
      };
    });

    // Calculate what each member paid
    group.expenses.forEach(exp => {
      if (memberBalances[exp.paidBy]) {
        memberBalances[exp.paidBy].paid += exp.amount;
      }
    });

    // Calculate fair share and balance
    const fairShare = totalExpenses / memberCount;
    
    Object.keys(memberBalances).forEach(memberId => {
      const member = memberBalances[memberId];
      member.owes = fairShare;
      member.balance = member.paid - fairShare;
    });

    // Predict future shared costs based on history
    const avgMonthlyExpense = totalExpenses / Math.max(1, group.expenses.length / 30);
    const predictions = [];

    for (let i = 1; i <= 3; i++) {
      predictions.push({
        month: i,
        estimatedTotal: Math.round(avgMonthlyExpense),
        perPerson: Math.round(avgMonthlyExpense / memberCount)
      });
    }

    // Settlement recommendations
    const settlements = calculateOptimalSettlements(memberBalances);

    res.json({
      message: 'Split prediction complete',
      groupName: group.name,
      summary: {
        totalExpenses: Math.round(totalExpenses),
        memberCount,
        fairSharePerPerson: Math.round(fairShare)
      },
      memberBalances,
      settlements,
      futureProjections: predictions,
      tips: [
        '💡 Rotate who pays to avoid confusion',
        '📱 Use UPI for instant settlements',
        '📊 Review balances monthly',
        '🤝 Communicate expenses clearly'
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGroupDetails = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId).populate('members', 'name email');
    
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.json({ group });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function
function calculateOptimalSettlements(memberBalances) {
  const settlements = [];
  const creditors = [];
  const debtors = [];

  Object.entries(memberBalances).forEach(([id, data]) => {
    if (data.balance > 0) {
      creditors.push({ id, name: data.name, amount: data.balance });
    } else if (data.balance < 0) {
      debtors.push({ id, name: data.name, amount: Math.abs(data.balance) });
    }
  });

  // Simple settlement algorithm
  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  let i = 0, j = 0;
  while (i < creditors.length && j < debtors.length) {
    const credit = creditors[i];
    const debt = debtors[j];
    const amount = Math.min(credit.amount, debt.amount);

    if (amount > 0) {
      settlements.push({
        from: debt.name,
        to: credit.name,
        amount: Math.round(amount)
      });
    }

    credit.amount -= amount;
    debt.amount -= amount;

    if (credit.amount === 0) i++;
    if (debt.amount === 0) j++;
  }

  return settlements;
}