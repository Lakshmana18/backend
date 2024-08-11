import cors from 'cors';
import express, { Router } from 'express';
import { connectToDB ,db} from "./db.js";

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json("server is running successfully!");
})

app.post('/signin', async(req, res) => {
    await db.collection("login").findOne({Email:req.body.email})
    .then((result)=>{
        if(result?.Password===req.body.password){
            res.json({message:"login success", values:result})
        } else {
            res.json({error:"user not found"})
        }
    })
    .catch((e)=>console.log(e))
})

app.post('/signup', async(req, res) => {
    await db.collection("login").insertOne({Email:req.body.email,Name:req.body.name,Mobile:req.body.mobile,Password:req.body.password})
    .then((result)=>{
        if(result){
            res.json({message:"signup success", values:result})
        } else {
            res.json({error:"sign up failed"})
        }
    })
})



app.post('/forgotpassword', async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body;

    try {
        // Check if newPassword and confirmPassword match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        const result = await db.collection("login").updateOne(
            { Email: email },
            { $set: { Password: newPassword } }
        );

        if (result.matchedCount > 0) {
            res.json({ message: "Password reset successful", values: result });
        } else {
            res.json({ error: "No user found with this email address" });
        }
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ error: "An error occurred while processing your request" });
    }
});








connectToDB(() => {
    app.listen(9000, () => {
        console.log("server running at 9000");
    })
})