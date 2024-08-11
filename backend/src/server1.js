import cors from 'cors';
import express, { Router } from 'express';
import { connectToDB ,db} from "./db.js";

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json("server is running successfully!");
})

//signin

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

//signup

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

//forgotpass

app.post('/forgotpassword', async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body;

    try {
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        const result = await db.collection("login").updateOne(
            { Email: req.body.email },
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









// const express = require('express');
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 5000;

// // Basal Metabolic Rate (BMR) Calculation
// const calculateBMR = (weight, height, age, gender) => {
//   if (gender === 'male') {
//     return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
//   } else {
//     return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
//   }
// };

// // Total Daily Energy Expenditure (TDEE) Calculation
// const calculateTDEE = (bmr, activityLevel) => {
//   const activityMultipliers = {
//     sedentary: 1.2,
//     light: 1.375,
//     moderate: 1.55,
//     active: 1.725,
//     very_active: 1.9,
//   };
//   return bmr * activityMultipliers[activityLevel];
// };

// // Macronutrient Ratios Calculation
// const calculateMacros = (calories, goal) => {
//   let proteinPercentage, fatPercentage, carbsPercentage;

//   if (goal === 'maintain') {
//     proteinPercentage = 0.3;
//     fatPercentage = 0.3;
//     carbsPercentage = 0.4;
//   } else if (goal === 'lose') {
//     proteinPercentage = 0.4;
//     fatPercentage = 0.35;
//     carbsPercentage = 0.25;
//   } else if (goal === 'gain') {
//     proteinPercentage = 0.25;
//     fatPercentage = 0.3;
//     carbsPercentage = 0.45;
//   }

//   const protein = (calories * proteinPercentage) / 4;
//   const fat = (calories * fatPercentage) / 9;
//   const carbs = (calories * carbsPercentage) / 4;

//   return {
//     protein: Math.round(protein),
//     fat: Math.round(fat),
//     carbs: Math.round(carbs),
//   };
// };

// // Hydration Needs Calculation
// const calculateHydration = (weight) => {
//   return (weight * 0.033).toFixed(2); // Liters per day
// };

// // Endpoint to handle calculation requests
// app.post('/calculate', (req, res) => {
//   const { weight, height, age, gender, activityLevel, goal } = req.body;

//   const bmr = calculateBMR(weight, height, age, gender);
//   const tdee = calculateTDEE(bmr, activityLevel);
//   const macros = calculateMacros(tdee, goal);
//   const hydration = calculateHydration(weight);

//   res.json({
//     calories: Math.round(tdee),
//     macros: macros,
//     hydration: hydration,
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


connectToDB(() => {
    app.listen(9000, () => {
        console.log("server running at 9000");
    })
})