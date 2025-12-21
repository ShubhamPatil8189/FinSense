const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['rent', 'insurance', 'emi', 'festival', 'subscription', 'custom'],
    required: true 
  },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  nextDueDate: { type: Date, required: true },
  frequency: { 
    type: String, 
    enum: ['monthly', 'quarterly', 'yearly', 'one-time'],
    default: 'monthly' 
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', eventSchema);