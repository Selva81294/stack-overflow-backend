const express = require("express")
const cors = require("cors")
// const bodyParser = require("body-parser")
// const path = require("path")
const dotenv = require("dotenv")
const db = require("./db")
const router = require("./routers")

dotenv.config()

const app = express()
const PORT = process.env.PORT

//db connections
db.connect()

app.use(express.json())
app.use(cors())

//api
app.use("/api",router)

//server listen
app.listen(PORT,()=>console.log(`Stackover flow clone is successfully running on PORT ${PORT}`))
