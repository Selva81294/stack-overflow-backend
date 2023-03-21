const jwt = require("jsonwebtoken")
const {User} = require("../models/User")

//token authorization

const isSignedIn = async(req,res,next)=>{
    let token;
    if(req.headers){
    try {
            token = req.headers["x-auth-token"];
            const decode = jwt.verify(token, process.env.SECERT_KEY);
            // console.log(decode)
            req.user = await User.findById(decode.id).select("-password")
            next();
        }
     catch (error) {
        return res.status(401).json({message: "Invalid Authorization"})
    }
}
if(!token) return res.status(400).json({message: "Access Denied"})
}

module.exports = isSignedIn