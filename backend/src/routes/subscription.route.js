const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/upgrade', authenticate, subscriptionController.upgradeToPro);

module.exports = router;
