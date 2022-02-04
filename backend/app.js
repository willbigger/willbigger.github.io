const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const InputSet = require("./models/inputSet");
const Output = require("./models/output");


app.use(express.json());

require("dotenv/config");

DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

app.get("/", (req, res) => {
  res.send("First request");
});

app.get("/users", (req, res) => {
  let users = ["Ethan", "Abid", "Yuxi"];
  res.send({
    users: users,
  });
});

app.get("/input-sets", async (req, res) => {
  try {
    const docs = await InputSet.find();
    res.send(docs);
  } catch (err) {
    res.send({ message: err });
  }
});

app.get("/outputs", async (req, res) => {
  try {
    // const docs = await Output.find();
    // const docs = await Output.find({ time_sent: "EOS", pathogen_isolated: "No", site_of_infection: "No", abdominal_involvement: "No" });
    //const docs = await Output.find({time_sent:req.params.time_sent, pathogen_isolated:req.params.pathogen_isolated, site_of_infection:req.params.site_of_infection, abdominal_involvement:req.params.abdominal_involvement });
    const docs = await Output.find({"time_sent":req.params.time_sent});

    res.send(docs);
  } catch (err) {
    res.send({ message: err });
  }
});


app.post("/create-user", async (req, res) => {
  try {
    const myuser = new User(req.body);
    await myuser.save();
    res.send(`Created your user ${myuser}`);
  } catch (err) {
    res.send({ message: err });
  }
});

app.post("/input-sets", async (req, res) => {
  try {
    const my_input_set = new InputSet(req.body);
    await my_input_set.save();
    //req.query.age
    res.send(`Created your inputSet ${my_input_set}`);
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
