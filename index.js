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

app.get('/', (req,res)=> { res.send('Slys Messenger Server is online')});

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
    const { name, email, number, password, location, image, date } = req.body;
    const newUser = new User({ name, email, number, password, location, image, date });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser).send(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'User create failed' });
  }
});

// ✅ GET Route : User data
app.get('/users', async(req, res) => {
  try {
    const users = await User.find();
    res.json(users).send(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});



// ✅ UPDATE - PUT
app.put('/users/:id', async (req, res) => {
  try {
 const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{ new: true });
    res.json(updatedUser).send(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// ✅ DELETE
app.delete('/users/:id', async (req, res) => {
  try {
   const result = await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' }).send(result);
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});



//----------------------------------------------------->
// 🔽 POST route: Conversation data                  
app.post('/conversation', async(req, res) => {
  try {
    const { sentUser, receiveUser, text, date } = req.body;
    const newConversation = new Conversation({ sentUser, receiveUser, text, date });
    const saveConversation = await newConversation.save();
    res.status(201).json(saveConversation).send(saveConversation);
  } catch (error) {
    res.status(500).json({ error: 'Conversation create failed' });
  }
});

// ✅ GET Route : Conversation data
app.get('/conversation', async (req, res) => {
  try {
    const conversation = await Conversation.find();
    res.json(conversation).send(conversation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Conversation' });
  }
});




//------------------------------------------------------------------------>

app.listen(port, () => {
  // console.log(`🚀 Slys Messenger server is Running on Port - ${port}`); 
});
