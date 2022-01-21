const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema({
  speaker_name: {
    type: String,
    required: true,
  },
  speaker_price: {
    type: Number,
    required: true,
  },
  speaker_pic: {
      type: String,
      required: true,
  }
});

module.exports = speakerSchema;