const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const userBookings = require("../models/userBookings");
const confirmedUserBooking = mongoose.model("UserBookings", userBookings);

const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

require("dotenv").config();

//Email Notification SendGrid
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.EMAIL_API_KEY,
    },
  })
);

//Add confirmed booking to database
router.post("/addConfirmBookingsUser", (req, res) => {
  const {
    User,
    Hotel,
    DateOfBooking,
    ArrivalTime,
    TotalPersons,
    BillingAmount,
    OrderId,
    PaymentTime,
    TimeSlot,
    Type,
    HotelEmail,
  } = req.body;

  const UserBookings = new confirmedUserBooking({
    User,
    Hotel,
    DateOfBooking,
    ArrivalTime,
    TotalPersons,
    BillingAmount,
    OrderId,
    PaymentTime,
    TimeSlot,
    Type,
  });
  UserBookings.save()
    .then((UserBookings) => {
      transporter
        .sendMail({
          to: "meraaddacontact@gmail.com",
          from: "meraaddacontact@gmail.com",
          subject: "New Booking Recieved",
          html:
            "<div>" +
            "<b>" +
            "You have a new booking!" +
            "</b>" +
            "<p>" +
            "Hotel : " +
            Hotel +
            "</p>" +
            "<p>" +
            "Date Of Booking : " +
            DateOfBooking +
            "</p>" +
            "<p>" +
            "ArrivalTime : " +
            ArrivalTime +
            "</p>" +
            "<p>" +
            "Total Persons : " +
            TotalPersons +
            "</p>" +
            "<p>" +
            "Billing Amount : " +
            BillingAmount +
            "</p>" +
            "<p>" +
            "Payment Time : " +
            PaymentTime +
            "</p>" +
            "<p>" +
            "Time Slot : " +
            TimeSlot +
            "</p>" +
            "<p>" +
            "Type : " +
            Type +
            "</p>" +
            "</div>",
        })
        .catch((err) => {
          console.log(err);
        });
      res.status(201).json({
        message: "new confirmed booking saved to database",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get All Bookings by user
router.get("/getConfirmBookingsUser", (req, res) => {
  const { User } = req.query;
  confirmedUserBooking
    .find({ User: User })
    .populate()
    .then((currentUserBookings) => {
      return res.status(200).json(currentUserBookings);
    })
    .catch((err) => {
      // console.log(err);
    });
});

module.exports = router;
