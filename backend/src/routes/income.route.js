const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/income.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/', authenticate, incomeController.addIncome);
router.get('/details', authenticate, incomeController.getIncomeDetails);

module.exports = router;