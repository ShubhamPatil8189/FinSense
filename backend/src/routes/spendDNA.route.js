const express = require('express');
const router = express.Router();
const spendDnaController = require('../controllers/spendDNA.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/analyze', authenticate, spendDnaController.analyzeSpendDNA);

module.exports = router;