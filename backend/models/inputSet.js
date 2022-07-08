const mongoose = require("mongoose");

const inputSet = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  gestational_age: {
    type: Number,
    required: true,
  },
  postnatal_age: {
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
  time_sent: {
    type: String,
    required: true,
  },
  pathogen_isolated: {
    type: String,
    required: true,
  },
  site_of_infection: {
    type: String,
    required: true,
  },
  blood_dropdown_selection: {
    type: String,
    required: false,
  },
  abdominal_involvement: {
    type: String,
    required: true,
  },
  output_available: {
    type: Boolean,
    required: true
  }

});
module.exports = mongoose.model("inputSet", inputSet);
