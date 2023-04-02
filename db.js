const mongoose = require("mongoose")

module.exports.connect= () =>{
    const URL = process.env.MONGO_URL.toString()
    const params = {
       useNewUrlParser : true,
       useUnifiedTopology : true,
    };
    try {
        mongoose.connect(URL, params)
        console.log("Mongo DB is Connected")
    } catch (error) {
        console.log("Mongodb connection error", error)
    }
}