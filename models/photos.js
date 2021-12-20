const mongoose = require("mongoose");

const photosSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  picUrl: {
    type: String,
    required: true,
  },
});

module.exports = photosSchema;
