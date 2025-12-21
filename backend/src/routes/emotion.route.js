const express = require('express');
const router = express.Router();
const emotionController = require('../controllers/emotion.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/analyze', authenticate, emotionController.analyzeEmotion);
module.exports = router;