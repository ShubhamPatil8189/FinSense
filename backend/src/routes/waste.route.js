const express = require('express');
const router = express.Router();
const wasteController = require('../controllers/waste.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/detect', authenticate, wasteController.detectWaste);

module.exports = router;