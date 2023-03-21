const express = require("express")
const bcrypt = require("bcrypt")
const { generateAuthToken, User } = require("../models/User");



const router = express.Router();

router.post("/", async (req,res)=>{
    try {
        //email validation
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(400).json({message: "Invalid Credentials"})
        
        //password validation
        const validatePassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!validatePassword) return res.status(400).json({message: "Invalid Credentials"})

        //token using
        const token =  generateAuthToken(user._id)

        res.status(200).json({message: "Loged in Successfully", token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

module.exports = router;