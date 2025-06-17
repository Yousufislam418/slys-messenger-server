const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  number: { type: String, required: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  img: { type: String, default: '' },
  date: { type: Date, default: Date.now }
}, {
  collection: 'users',
  versionKey: false
});

module.exports = mongoose.model('User', userSchema);
