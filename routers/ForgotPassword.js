const express = require("express");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const app = express();
const router = express.Router();


app.set("view engine", "ejs");

router.post("/", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) {
      return res.status(400).json({ message: "User not exits" });
    }

    const secret = process.env.SECERT_KEY + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "30m",
    });

    const link = `https://stack-overflow-backend-kohl.vercel.app/api/resetpassword/${oldUser._id}/${token}`;
    
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure:false,
      auth: {
        user: "selva81294@gmail.com",
        pass: "yeiomrnsgednzgnx",
      },
    });

    var mailOptions = {
      from: "selva81294@gmail.com",
      to: "kumaranselva888@gmail.com",
      subject: "Password Reset",
      text: link
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    // console.log(link)
    res.status(200).json({ message: "Link sent to your mail" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
