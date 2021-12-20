const mongoose = require("mongoose");

const userBookingsSchema = new mongoose.Schema({
  User: {
    type: String,
    required: true,
  },
  Hotel: {
    type: String,
    required: true,
  },
  DateOfBooking: {
    type: String,
    required: true,
  },
  ArrivalTime: {
    type: String,
    required: true,
  },
  TotalPersons: {
    type: String,
    required: true,
  },
  BillingAmount: {
    type: String,
    required: true,
  },
  OrderId: {
    type: String,
    required: true,
  },
  PaymentTime: {
    type: String,
    required: true,
  },
  TimeSlot: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
});

module.exports = userBookingsSchema;
