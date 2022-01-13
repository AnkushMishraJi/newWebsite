const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const bookingSchema = require("../models/booking");
const booking = mongoose.model("Booking", bookingSchema);

//booking completed
router.post("/booking", (req, res) => {
  const {
    name,
    phone,
    totalPersons,
    girls,
    checkIn,
    slot,
    hotelEmail,
    roomtype,
    totalBill,
  } = req.body;
  const Booking = new booking({
    name,
    phone,
    totalPersons,
    girls,
    checkIn,
    slot,
    hotelEmail,
    roomtype,
    totalBill,
  });
  Booking.save()
    .then((Booking) => {
      res.status(201).json({
        message: "User Booking has been generatd",
      });
    })
    .catch((err) => {
      // console.log(err);
    });
});

//hotel booking get completed
router.get("/hotelBooking", (req, res) => {
  const { hotelEmail } = req.query;
  booking
    .find({ hotelEmail: hotelEmail })
    .then((thisHotelBookings) => {
      return res.status(200).json(thisHotelBookings);
    })
    .catch((err) => {
      // console.log(err);
    });
});

module.exports = router;
