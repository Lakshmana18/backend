import cors from 'cors';
import express from 'express';
import { connectToDB, db } from "./db.js";

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json("server is running successfully!");
})
app.post('/insert', async(req, res) => {
    await db.collection("ast").insertOne({Name:req.body.name,Team:req.body.team})
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})
app.post('/insertmany', async(req, res) => {
    await db.collection("ast").insertMany([req.body])
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})
app.post('/findone', async(req, res) => {
    await db.collection("ast").findOne({Name:"Kousik"})
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})
app.post('/find', async(req, res) => {
    await db.collection("ast").find().toArray()
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})
app.post('/deleteone', async(req, res) => {
    await db.collection("ast").deleteOne({Name:"Hari",gender:"male"})
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})
app.post('/deletemany', async(req, res) => {
    await db.collection("Ammu").deleteMany()
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})
app.post('/updateone', async(req, res) => {
    await db.collection("ast").updateOne({Name:"Hari"},{$set:{salary:"20k"}})
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})
app.post('/updatemany', async(req, res) => {
    await db.collection("ast").updateMany({Name:"Hari"},{$set:{grade:"A",hike:"2k"}})
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})
connectToDB(() => {
    app.listen(9001, () => {
        console.log("server running at 9001");
    })
})