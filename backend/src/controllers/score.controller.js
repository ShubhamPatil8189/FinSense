const { calculateFutureProofScore } = require('../services/score.service');

exports.calculateScore = async (req, res) => {
  try {
    const score = await calculateFutureProofScore(req.user._id);

    res.json({
      message: 'Future-proof score calculated',
      score,
      insights: generateScoreInsights(score),
      nextMilestone: getNextMilestone(score.total)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function generateScoreInsights(score) {
  const insights = [];

  if (score.breakdown.savingsRate.value < 20) {
    insights.push('💡 Increase your savings rate to 20% for better financial health');
  }

  if (score.breakdown.discipline.factors.emotionalSpending > 5) {
    insights.push('🧘 Consider mindfulness techniques to reduce emotional spending');
  }

  if (score.breakdown.goalProgress.activeGoals === 0) {
    insights.push('🎯 Set at least 3 financial goals to stay motivated');
  }

  if (score.breakdown.consistency.daysTracked < 15) {
    insights.push('📱 Track expenses daily for better insights');
  }

  return insights;
}

function getNextMilestone(currentScore) {
  const milestones = [
    { score: 40, level: '📚 Learning Investor' },
    { score: 60, level: '⭐ Money Manager' },
    { score: 80, level: '🏆 Financial Master' }
  ];

  for (const milestone of milestones) {
    if (currentScore < milestone.score) {
      return {
        target: milestone.score,
        level: milestone.level,
        pointsNeeded: milestone.score - currentScore
      };
    }
  }

  return { message: 'You\'ve reached the top level! 🎉' };
}