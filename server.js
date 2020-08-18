const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// instantiate an express app
const app = express();
// cors
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/public", express.static(process.cwd() + "/public")); //make public static

const transporter = nodemailer.createTransport({
  host: "smtp.live.com", //replace with your email provider
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/send", (req, res) => {
  const mail = {
    from: `${req.body.name} <${req.body.email}>`,
    to: process.env.EMAIL, // receiver email,
    subject: req.body.subject,
    text: req.body.message,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Something went wrong.");
    } else {
      console.log(req.body);
      res.status(200).send("Email successfully sent to recipient!");
    }
  });
});

//Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

/*************************************************/
// Express server listening...
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
