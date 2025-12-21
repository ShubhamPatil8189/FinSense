const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/predict', authenticate, eventController.predictEvents);
router.post('/add', authenticate, eventController.addEvent);

module.exports = router;