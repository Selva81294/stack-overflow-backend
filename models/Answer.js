const mongoose = require("mongoose")

const answerSchema = new mongoose.Schema({
    question_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions"
    },
    answer: String,
    created_at: String,
    user : {
        type : mongoose.Schema.Types.String,
        ref : 'user'
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }
})

module.exports = mongoose.model("Answers", answerSchema)