const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  sentUser: { type: String, required: true },
  receiveUser: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, {
  collection: 'conversation',
  versionKey: false
});

module.exports = mongoose.model('Conversation', conversationSchema);
