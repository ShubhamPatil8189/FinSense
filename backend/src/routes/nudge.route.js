const express = require('express');
const router = express.Router();
const nudgeController = require('../controllers/nudge.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/generate', authenticate, nudgeController.getNudges);

module.exports = router;