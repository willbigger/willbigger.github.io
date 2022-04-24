const express = require("express");
const cors = require("cors")
const app = express();
const mongoose = require("mongoose");
const InputSet = require("./models/inputSet");
const Output = require("./models/output");
const output = require("./models/output");

const whitelist = ["http://localhost:3000", "https://nicu-frontend-development.herokuapp.com", "https://nicu-frontend.herokuapp.com"]

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

app.use(express.json());
app.use(cors(corsOptions))

require("dotenv/config");

DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

app.get("/outputs", async (req, res) => {
  try {
    const docs = await Output.find({
      time_sent:req.query.time_sent, 
      pathogen_isolated:req.query.pathogen_isolated, 
      site_of_infection:req.query.site_of_infection, 
      abdominal_involvement:req.query.abdominal_involvement 
    });

    res.send(docs);
  } catch (err) {
    res.send({ message: err });
  }
});

app.post("/create-input", async (req, res) => {
  try {
    const new_input = new InputSet({
      gestational_age: req.body.gestationalAge,
      postnatal_age: req.body.postnatalAge,
      birth_weight: req.body.birthWeight,
      current_weight: req.body.currentWeight,
      time_sent: req.body.os,
      pathogen_isolated: req.body.pathogen,
      site_of_infection: req.body.infectionSite,
      blood_dropdown_selection: req.body.bloodDropdownSelection,
      abdominal_involvement: req.body.nec,
      output_available: req.body.output_available
    });
    console.log(JSON.stringify(new_input));
    await new_input.save();
    res.send(`Created your input ${myinput}`);
  } catch (err) {
    res.send({ message: err });
  }
});

mongoose.connect(DB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to the database");
  }).catch(() => {
    console.log("Failed to connect to database.")
  });

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
