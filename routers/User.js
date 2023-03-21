const express = require("express");
const User = require("../models/User");

const router = express.Router();


//get all users
router.get("/", async (req,res)=>{
    try {
        const user = await User.find()
        if(!user) return res.status(400).json({message:"Could not fetch your data"}) 
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

module.exports = router;