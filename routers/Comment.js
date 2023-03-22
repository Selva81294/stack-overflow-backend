const express = require("express")

const router = express.Router()
const CommentDB = require("../models/Comment")

router.post('/:id', async (req,res)=>{
    let postDate = new Date().toJSON().slice(0,10)
    try {
        await CommentDB.create({
            question_id: req.params.id,
            comment : req.body.comment,
            created_at: postDate, 
            user: req.user.username
        }).then((doc)=>{
            res.status(201).send({
                status: true,
                data : doc
            })
        }).catch(()=>{
            res.status(400).send({
                status: false,
                message: "Error occured in posting comment"
            })
        })  
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Internal server error"
        })
    }
})

module.exports = router;

