const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const userBookings = require("../models/userBookings");
const confirmedUserBooking = mongoose.model("UserBookings", userBookings);

const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

require("dotenv").config();

//Email Notification SendGrid
const transporterHotel = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.EMAIL_API_KEY,
    },
  })
);

const transporterOperation = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.EMAIL_API_KEY,
    },
  })
);

//Add confirmed booking to database
router.post("/api/addConfirmBookingsUser", (req, res) => {
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
    Speaker,
    Decoration,
    UserName,
    CollectAmount,
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
    Speaker,
    Decoration,
    UserName,
    CollectAmount,
  });
  console.log(User); 
  UserBookings.save()
    .then((UserBookings) => {
      transporterHotel
        .sendMail({
          to: HotelEmail,
          from: "meraaddacontact@gmail.com",
          cc: "meraaddacontact@gmail.com",
          subject: "New Booking Recieved - Hotel",
          html:
            "<div>" +
            "<b>" +
            "You have a new booking!" +
            "</b>" +
            "<p>" +
            "Customer Name : " +
            UserName +
            "</p>" +
            "<p>" +
            "Customer Mobile Number : " +
            User +
            "</p>" +
            "<p>" +
            "Date Of Booking : " +
            DateOfBooking +
            "</p>" +
            "<p>" +
            "Collect Amount : " +
            CollectAmount +
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
            "Type : " +
            Type +
            "</p>" +
            "<p>" +
            "Speaker : " +
            Speaker +
            "</p>" +
            "<p>" +
            "Decoration : " +
            Decoration +
            "</p>" +
            "</div>",
        })
        
        .catch((err) => {
          console.log(err);
        });
          transporterOperation
          .sendMail(
            {
            to: "ankush.rdso@gmail.com",
            from: "meraaddacontact@gmail.com",
            cc: "meraaddacontact@gmail.com",
            subject: "New Booking Recieved - Operations",
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
              "Type : " +
              Type +
              "</p>" +
              "<p>" +
              "Speaker : " +
              Speaker +
              "</p>" +
              "<p>" +
              "Decoration : " +
              Decoration +
              "</p>" +
              "</div>",
            }
          )
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
router.get("/api/getConfirmBookingsUser", (req, res) => {
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
