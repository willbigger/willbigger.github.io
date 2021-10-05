const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");

app.use(express.json());

require("dotenv/config");

DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

mongoose.connect(DB_CONNECTION_STRING, (req, res) => {
  console.log("Connected to the database");
});

app.get("/", (req, res) => {
  res.send("First request");
});

app.get("/users", (req, res) => {
  let users = ["Ethan", "Abid", "Yuxi"];
  res.send({
    users: users,
  });
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

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
