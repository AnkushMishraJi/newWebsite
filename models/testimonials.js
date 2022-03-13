const mongoose = require("mongoose");

const testimonialsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  picUrl: {
    type: String,
    required: true,
  },
  content: {
      type: String,
      required: true,
  }
});

module.exports = testimonialsSchema;