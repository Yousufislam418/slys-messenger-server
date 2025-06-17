const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3000;
require('dotenv').config(); 
const app = express();
app.use(express.json());
app.use(cors());

const User = require('./models/User');
const Conversation = require('./models/Conversation');

app.get('/', (req,res)=> { res.send(console.log('Slys Messenger Server is online'));});

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {console.log('✅ MongoDB connected');})
  .catch(err => console.error('❌ MongoDB error:', err));

//--------------------------------------------------------------------------->

// 🔽 POST route: User data                  
app.post('/users', async (req, res) => {
  try {
    const { name, email, number, password, img, date } = req.body;
    const newUser = new User({ name, email, number, password, img, date });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'User create failed' });
  }
});

// ✅ GET Route : User data
app.get('/users', async(req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});



//----------------------------------------------------->
// 🔽 POST route: Conversation data                  
app.post('/conversation', async(req, res) => {
  try {
    const { sentUser, receiveUser, text, date } = req.body;
    const newConversation = new Conversation({ sentUser, receiveUser, text, date });
    const saveConversation = await newConversation.save();
    res.status(201).json(saveConversation);
  } catch (error) {
    res.status(500).json({ error: 'Conversation create failed' });
  }
});

// ✅ GET Route : Conversation data
app.get('/conversation', async (req, res) => {
  try {
    const conversation = await Conversation.find();
    res.json(conversation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Conversation' });
  }
});



//------------------------------------------------------------------------>

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
