// required frameworks/modules
require("dotenv").config();
const express = require("express");
const connDB = require("./config/db");
const testModel = require("./models/testModel");
const bodyParser = require("body-parser");

//answerModel
const answerModel = require("./models/answerModel");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

// connect to database
connDB();

app.get("/", (req, res) => {
  res.send("API IS RUNNING...");
});

app.get("/data", (req, res) => {
  testModel
    .find({})
    .then((data) => res.json(data))
    .catch((e) => console.log(e));
});

app.post("/", (req, res) => {
  console.log(req.body.test);
  testModel.create({ name: req.body.test }).then((id) => {
    console.log(`inserted: ${id}`);
  });
  res.send("inserted");
});


//connect the endpoints for answerModel
app.get("/getAnswers", (req, res) => {
    answerModel
      .find({})
      .then((data) => res.json(data))
      .catch((e) => console.log(e));
  });
  
app.post("/createAnswers", (req, res) => {
    console.log(req.body.test);
    answerModel
        .create({ 
            uid: req.body.uid,
            yearofstudy: req.body.yearofstudy,
            interests: req.body.interests,
            experience: req.body.experience,
            courses: req.body.courses,
            optional: req.body.optional
         })
        .then((id) => {
      console.log(`inserted: ${id}`);
    })
        .catch((e) => console.log(e));
    res.send("inserted");
});
//End of endpoints 

app.listen(
  process.env.PORT,
  console.log(`listening on port ${process.env.PORT}`)
);
