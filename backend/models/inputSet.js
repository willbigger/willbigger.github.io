const mongoose = require("mongoose");

const inputSet = new mongoose.Schema({
  gestational_age: {
    type: Number,
    required: false,
  },
  postnatal_age: {
    type: Number,
    required: false,
  },
  birth_weight: {
    type: Number,
    required: false,
  },
  current_weight: {
    type: Number,
    required: false,
  },
  time_sent: {
    type: String,
    required: false,
  },
  pathogen_isolated: {
    type: String,
    required: false,
  },
  site_of_infection: {
    type: String,
    required: false,
  },
  abdominal_involvement: {
    type: String,
    required: false,
    
  },
  
});
module.exports = mongoose.model("inputSet", inputSet);
