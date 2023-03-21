const express = require("express")
const router = express.Router()
const questionRouter = require('./Question')
const answerRouter = require('./Answer')
const commentRouter = require('./Comment')
const loginRouter = require("./LoginUser")
const signupRouter = require("./SignupUser")
const isSignedIn = require("../Controllers/auth")
const usersRouter = require("./User")

router.get("/",(req,res)=>{
    res.send("Welcome to stack overflow clone")
})

router.use('/question', isSignedIn , questionRouter)
router.use('/answer',isSignedIn, answerRouter)
router.use('/comment',isSignedIn, commentRouter)
router.use('/login', loginRouter)
router.use('/signup', signupRouter)
router.use('/users', usersRouter)

module.exports = router;
