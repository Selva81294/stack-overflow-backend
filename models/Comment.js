const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const commentSchema = new mongoose.Schema({
    question_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Qustions"
    },
    comment: String,
    created_at:{
        type: Date,
        default: String
    },
    user : {
        type : ObjectId,
        ref : 'user'
    }
})

module.exports = mongoose.model("Comments", commentSchema)