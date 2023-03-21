const express = require("express")
const bcrypt = require("bcrypt");
const { generateAuthToken, User } = require("../models/User");


const router = express.Router();

router.post ("/", async (req,res)=>{
    try {
        let user = await User.findOne({email: req.body.email});
        if(user) return res.status(409).json({message: "Email already exits"});
    
        //generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        //new user updation
        user = await new User({
               username : req.body.username,
               email : req.body.email,
               password : hashedPassword 
            }).save();  

        //token using
        const token =  generateAuthToken(user._id)

        res.status(201).json({message: "Successfully signed up", token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }

})

//get all users
router.get("/users", async (req,res)=>{
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
