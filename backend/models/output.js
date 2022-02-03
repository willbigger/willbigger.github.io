const mongoose = require("mongoose");

const Output = new mongoose.Schema({
  time_cultures_sent: {
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
  abdominal_involvement_present: {
    type: String,
    required: true,
  },
  treatment_pending_susceptibility: {
    type: String,
    required: true,
  },
  treatment1: {
    type: String,
    required: true,
  },
  treatment2: {
    type: String,
    required: true,
  },
  treatment3: {
    type: String,
    required: true,
  },
  treatment4: {
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
module.exports = mongoose.model("output", Output);