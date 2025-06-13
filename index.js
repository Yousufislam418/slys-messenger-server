const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://127.0.0.1:5500','http://127.0.0.1:7700'],
  credentials: "include"
}));

app.get('/', async(req,res)=> {
    res.send('This is Slys Messenger Server');
});

//----------------------------------------------------------------> 
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.idipp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
//----------------------------------------------------->

 const userCollection = client.db('slys-messenger').collection('user-datas');
 const messageCollection = client.db('slys-messenger').collection('message-datas');

// Post User datas
app.post('/user-datas', async(req,res)=> {
  const datas = req.body;
  const result = await userCollection.insertOne(datas);
  res.send(result);
 });
// Get User Datas
app.get('/user-datas', async(req,res)=> {
  const cursor = userCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

// Message datas Post
app.post('/message-datas', async(req,res)=> {
  const datas = req.body;
  const result = await messageCollection.insertOne(datas);
  res.send(result); 
});
// Message datas Get
app.get('/message-datas', async(req,res)=> {
  const cursor = messageCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

//----------------------------------------------------->
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


//---------------------------------------------------------------->

app.listen(port, ()=> console.log('Slys Messenger Server is Running on port -', port));
