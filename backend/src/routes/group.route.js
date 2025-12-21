const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/', authenticate, groupController.createGroup);
router.post('/expenses', authenticate, groupController.addGroupExpense);

module.exports = router;