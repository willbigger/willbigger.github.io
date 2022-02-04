const mongoose = require("mongoose");

const output = new mongoose.Schema({
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
  abdominal_involvement: {
    type: String,
    required: true,
  },
  antibiotic_treatment: {
    type: String,
    required: true,
  },
  antibiotic_treatment_1: {
    type: String,
    required: true,
  },
  antibiotic_treatment_2: {
    type: String,
    required: true,
  },
  antibiotic_treatment_3: {
    type: String,
    required: true,
  },
  antibiotic_treatment_4: {
    type: String,
    required: true,
  },
  antibiotic_duration: {
    type: String,
    required: true,
  },
  additional_recommendations: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model("output", output);