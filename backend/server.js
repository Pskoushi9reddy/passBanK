const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv=require('dotenv')
const bodyParser = require("body-parser")
const cors=require("cors")

dotenv.config()
//console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passbank';
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

//await client.connect(); (error due to no await above async fn to be placed)
client.connect();

// get all passwords
app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// save all passwords
app.post('/', async(req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true,result:findResult})
})

// Delete a password by id
app.delete('/', async(req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true,result:findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})