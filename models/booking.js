const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  totalPersons: {
    type: String,
    required: true,
  },
  girls: {
    type: Boolean,
    required: true,
  },
  checkIn: {
    type: String,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  hotelEmail: {
    type: String,
    required: true,
  },
  totalBill: {
    type: String,
    required: true,
  },
});

module.exports = bookingSchema;
