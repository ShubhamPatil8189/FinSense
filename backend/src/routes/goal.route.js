const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goal.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/', authenticate, goalController.addGoal);
router.get('/prioritize', authenticate, goalController.prioritizeGoals);

module.exports = router;