const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/', authenticate, groupController.createGroup);
router.post('/expenses', authenticate, groupController.addGroupExpense);
router.post('/split/predict', authenticate, groupController.predictSplit);
router.get('/:groupId', authenticate, groupController.getGroupDetails);

module.exports = router;