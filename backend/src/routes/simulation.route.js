const express = require('express');
const router = express.Router();
const simulationController = require('../controllers/simulation.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/run', authenticate, simulationController.runSimulation);
router.get('/summary', authenticate, simulationController.getFinancialSummary);

module.exports = router;