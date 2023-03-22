const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    title: String,
    body: String,
    tags: [],
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

module.exports = mongoose.model("Questions", questionSchema)