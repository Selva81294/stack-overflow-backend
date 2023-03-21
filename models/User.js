const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
    {
        username: {
            type : String,
            required : true, 
            maxlength : 32,
            trim : true
        },
        email: {
            type : String,
            required : true,
            unique: true,
            trim : true
        },
        password: {
            type : String,
            required : true
        }
    }
)

const generateAuthToken = (id) =>{
    return jwt.sign({id},process.env.SECERT_KEY)
}

const User = mongoose.model("user", userSchema);

module.exports = {
    generateAuthToken : generateAuthToken,
    User : User
}

