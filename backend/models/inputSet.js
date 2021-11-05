const mongoose = require("mongoose");

const inputSet = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gestational_age: {
    type: Number,
    required: true,
  },
  podynatal_age: {
    type: Number,
    required: true,
  },
  birth_weight: {
    type: Number,
    required: true,
  },
  current_weight: {
    type: Number,
    required: true,
  },
  time_cultures_sent: {
    type: String,
    required: true,
  },
  pathogen: {
    type: String,
    required: true,
  },
  site_of_infection: {
    type: String,
    required: true,
  },
  abdominal_involvement: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("inputSet", inputSet);
