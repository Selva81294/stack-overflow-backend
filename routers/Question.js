const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const QuestionDB = require("../models/Question")

router.post('/', async(req,res)=>{
  let postDate = new Date().toJSON().slice(0,10)
    const questionData = new QuestionDB({
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tag, created_at:postDate, user: req.user.username
    })
    await questionData.save().then((doc)=>{
        res.status(201).send({
            status: true,
            data: doc
        })
    }).catch((err)=>{
      console.log(err)
        res.status(400).send({
            status: false,
            message: "Error occured in posting question"
        })
    })
})


router.get("/", async (req, res) => {
    const error = {
      message: "Error in retrieving questions",
      error: "Bad request",
    };
  
    QuestionDB.aggregate([
      {
        $lookup: {
          from: "comments",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                // user_id: 1,
                comment: 1,
                created_at: 1,
                // question_id: 1,
              },
            },
          ],
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "answers",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
              },
            },
          ],
          as: "answerDetails",
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ])
      .exec()
      .then((questionDetails) => {
        res.status(200).send(questionDetails);
      })
      .catch((e) => {
        console.log("Error: ", e);
        res.status(400).send(error);
      });
  });



  router.get("/:id", async (req, res) => {
    try {
      // const question = await QuestionDB.findOne({ _id: req.params.id });
      // res.status(200).send(question);
      QuestionDB.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
        },
        {
          $lookup: {
            from: "answers",
            let: { question_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$question_id", "$$question_id"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  user: 1,
                  answer: 1,
                  // created_at: 1,
                  question_id: 1,
                  created_at: 1,
                },
              },
            ],
            as: "answerDetails",
          },
        },
        {
          $lookup: {
            from: "comments",
            let: { question_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$question_id", "$$question_id"],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  question_id: 1,
                  user: 1,
                  comment: 1,
                  created_at: 1,
                },
              },
            ],
            as: "comments",
          },
        },
        {
          $project: {
            __v: 0,
          },
        },
      ])
        .exec()
        .then((questionDetails) => {
          res.status(200).send(questionDetails);
        })
        .catch((e) => {
          console.log("Error: ", e);
          res.status(400).send(error);
        });
    } catch (err) {
        console.log(err)
      res.status(400).send({
        message: "Question not found",
      });
    }
  });

module.exports = router;