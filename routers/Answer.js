const express = require("express")

const router = express.Router()
const AnswerDB = require("../models/Answer")

router.post("/", async (req,res)=>{
    const answerData = new AnswerDB({
        ...req.body, user: req.user.username
    })

    await answerData.save().then((doc)=>{
        res.status(201).send({
            status: true,
            data : doc
        })
    }).catch((err)=>{
        res.status(400).send({
            status: false,
            message: "Error occured in posting answer"
        })
    })
})



module.exports = router;

