/*
* This code handles the server endpoints for the backend MongoDB models.
* Models:
* <testModel>: a sample test model
* <users>: the user model
* <answerModel>: the application answers model
* <teams>: the team members model
*/

// required frameworks/modules
require("dotenv").config();
const express = require("express");
const connDB = require("./config/db");
const testModel = require("./models/testModel");
const cors = require('cors');

//const bodyParser = require("body-parser");
//const answerModel = require("./models/answerModel");


const app = express();
app.use(cors());

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static("public"));
//app.use(bodyParser.json());

// connect to database
connDB();

const loginRoute = require("./routes/login");
const getAnsRoute = require("./routes/getAnswers");
const createAnsRoute = require("./routes/createAnswers");



app.get("/", (req, res) => {
  res.send("API IS RUNNING...");
});

app.use("/portal", loginRoute);
app.use("/getAnswers", getAnsRoute);
app.use("/createAnswers", createAnsRoute);




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


//End of endpoints 

app.listen(
  process.env.PORT,
  console.log(`listening on port ${process.env.PORT}`)
);

