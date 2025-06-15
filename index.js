// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

require('dotenv').config(); // যদি .env ব্যবহার করো

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  // console.log(console.log('📂 Connected Database Name:', mongoose.connection.db.databaseName));
})
.catch(err => console.error('❌ MongoDB error:', err));

// 🔽 POST route: user add করা                    
app.post('/users', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'User create failed' });
  }
});

// get
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});










app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
