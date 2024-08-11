import express from 'express';
import { connectToDB, db } from "./db.js";
const port=8000
const app = express();

// const handleLogin=(req,res)=>{
// const user = db.collection("login").findOne(req.body.email)
// if(user.password === req.body.password){
//     res.json("success")
// } else{
//     res.json("failure")
// }
// }

app.post('/login', async(req,res)=>{
    await db.collection("login").findOne(req.body.email)
if(user.password === req.body.password){
    res.json("success")
} else{
    res.json("failure")
}
})


server.listen(port, () => {
    console.log(`Server running at ${port}`);
});