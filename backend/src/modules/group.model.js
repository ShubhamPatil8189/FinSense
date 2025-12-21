const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  expenses: [{
    amount: Number,
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: String,
    date: { type: Date, default: Date.now },
  }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Group', groupSchema);