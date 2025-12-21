const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/score.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/calculate', authenticate, scoreController.calculateScore);

module.exports = router;