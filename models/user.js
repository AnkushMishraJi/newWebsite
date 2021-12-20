const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:false
      },
  phoneNumber: {
    type: String,
    required:false
      },
  dob: {
    type: String,
    required:false
      },
      email: {
    type: String,
    required:false
      }
    
});

module.exports = userSchema;
