const express = require('express');
const router = express.Router();
const negotiationController = require('../controllers/negotiation.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/generate', authenticate, negotiationController.generateNegotiation);

module.exports = router;