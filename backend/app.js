const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const InputSet = require("./models/inputSet");

require("dotenv/config");

DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

app.use(express.json());

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
    const docs = await InputSet.find({ birth_weight: { $gt: 8 } });
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

mongoose.connect(DB_CONNECTION_STRING, (req, res) => {
  console.log("Connected to the database");
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
