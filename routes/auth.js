const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const businessUserSchema = require("../models/businessUser");
const businessUser = mongoose.model("BusinessUser", businessUserSchema);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const requireLogin = require("../middleware/requireLogin");

const userSchema = require("../models/user");
const clientUser = mongoose.model("ClientUser", userSchema);

const bookingSchema = require("../models/booking");
const booking = mongoose.model("Booking", bookingSchema);

const photosSchema = require("../models/photos");
const photo = mongoose.model("Photo", photosSchema);

const { JWT_SECRET, RZP_ID, RZP_SEC } = require("../config/keys");

const Razorpay = require("razorpay");
const shortid = require("shortid");
const razorpay = new Razorpay({
  key_id: "rzp_test_ZwIQoXjws19gWq",
  key_secret: "NScHGLsWYb8Fg5E1BpwwCSzE",
});

const userBookings = require("../models/userBookings");
const confirmedUserBooking = mongoose.model("UserBookings", userBookings);

const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

require("dotenv").config();
console.log(process.env.EMAIL_API_KEY);

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.EMAIL_API_KEY,
    },
  })
);

//RazorPay
router.post("/razorpay", async (req, res) => {
  console.log(req.body);

  const response = await razorpay.orders.create(req.body);
  console.log(response, "hello");
  res.json({
    id: response.id,
    currency: response.currency,
    amount: response.amount,
    created_at: response.created_at,
  });
});

//bsignup completed
router.post("/bsignup", (req, res) => {
  const {
    hotelName,
    email,
    password,
    location,
    address,
    girlsWithBoys,
    isNightPartyAllowed,
    roomSmallData,
    roomMediumData,
    roomLargeData,
  } = req.body;
  if (!email || !password || !hotelName || !location) {
    return res.status(400).json({
      error: "Please enter all fields",
    });
  }
  businessUser.findOne({ email: email }).then((savedBusinessUser) => {
    if (savedBusinessUser) {
      return res.status(409).json({
        error: "The hotel user already exists",
      });
    }
    bcrypt.hash(password, 12).then((hashedpassword) => {
      const BusinessUser = new businessUser({
        email,
        password: hashedpassword,
        hotelName,
        location,
        address,
        girlsWithBoys,
        isNightPartyAllowed,
        roomSmallData,
        roomMediumData,
        roomLargeData,
      });
      BusinessUser.save()
        .then((BusinessUser) => {
          res.status(201).json({
            message: "New hotel user has been created",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

//bsignin completed
router.post("/bsignin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: "Please enter all fields",
    });
  }
  businessUser.findOne({ email: email }).then((savedBusinessUser) => {
    if (!savedBusinessUser) {
      return res.status(422).json({
        error: "Invalid Email or Password",
      });
    }
    bcrypt.compare(password, savedBusinessUser.password).then((doMatch) => {
      if (doMatch) {
        const token = jwt.sign({ _id: savedBusinessUser._id }, JWT_SECRET);
        const { _id, hotelName, email } = savedBusinessUser;
        res.status(201).json({ token, user: { _id, hotelName, email } });
      } else {
        return res.status(422).json({ error: "Invalid Email or Password" });
      }
    });
  });
});

//checknum complete
router.post("/checknum", (req, res) => {
  const { phoneNumber } = req.body;
  clientUser.findOne({ phoneNumber: phoneNumber }).then((savedClientUser) => {
    if (savedClientUser) {
      console.log("User already exists");
      return res.status(202).json({ isUser: true, phoneNumber: phoneNumber });
    } else {
      const ClientUser = new clientUser({
        phoneNumber,
      });
      ClientUser.save().then((ClientUser) => {
        res.json({ isUser: false, message: "Hello new user" });
      });
    }
  });
});

//user signup complete
router.put("/usignup", (req, res) => {
  const { name, email, dob, phoneNumber } = req.body;
  // if (!email || !name || !dob ) {
  //   return res.status(400).json({
  //     "error":"Please enter all fields"
  //     });
  // }
  clientUser.findOneAndUpdate(
    { phoneNumber: phoneNumber },
    { $set: { name: name, email: email, dob: dob } },
    function (err) {
      if (err) {
        return console.log(err);
      } else {
        res.json("Saved User");
        console.log("Saved USer");
      }
    }
  );
});

//booking completed
router.post("/booking", (req, res) => {
  const {
    name,
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
      console.log(err);
    });
});

router.post("/photoUpload", (req, res) => {
  const { title, picUrl } = req.body;
  const Photo = new photo({
    title,
    picUrl,
  });
  Photo.save()
    .then((Photo) => {
      res.status(200).json({
        message: "Photo uploaded",
      });
    })
    .catch((err) => {
      console.log(err);
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
      console.log(err);
    });
});

//Search Filter Home Page User
router.get("/hotelList", (req, res) => {
  var { date, totalPersons, girls, isNightParty } = req.query;
  totalPersons = parseInt(totalPersons);
  isNightParty = isNightParty === "true";
  console.log(typeof date, typeof boys, typeof girls, isNightParty);
  console.log(totalPersons);
  var isGirlsWithBoys;
  if (girls == "true") isGirlsWithBoys = true;
  else isGirlsWithBoys = false;

  console.log(isGirlsWithBoys);
  console.log(isNightParty);

  if (isNightParty == true) {
    //isNightParty True
    console.log("isNightParty True Running");
    if (isGirlsWithBoys == true) {
      //isGirlsWithBoys true
      console.log("isGirlsWithBoys True Running");
      businessUser
        .find({
          $and: [
            { isBlockedOn: { $ne: date } },
            { girlsWithBoys: isGirlsWithBoys },
            { isNightPartyAllowed: true },
            {
              $or: [
                { "roomMediumData.mediumCapacity": { $gte: totalPersons } },
                { "roomSmallData.smallCapacity": { $gte: totalPersons } },
                { "roomLargeData.largeCapacity": { $gte: totalPersons } },
              ],
            },
          ],
        })
        .then((toListHotels) => {
          return res.status(200).json(toListHotels);
        })
        .catch((err) => {
          console.log(err);
        });
      //code
    } else {
      //code
      //is isGirlsWithBoys false
      console.log("GirlswithBoys False Running");
      businessUser
        .find({
          $and: [
            { isBlockedOn: { $ne: date } },
            { isNightPartyAllowed: true },
            {
              $or: [
                { "roomMediumData.mediumCapacity": { $gte: totalPersons } },
                { "roomSmallData.smallCapacity": { $gte: totalPersons } },
                { "roomLargeData.largeCapacity": { $gte: totalPersons } },
              ],
            },
          ],
        })
        .then((toListHotels) => {
          return res.status(200).json(toListHotels);
        })
        .catch((err) => {
          console.log(err);
        });
      //code
    }
  } else {
    //isNightParty False
    console.log("isNightParty False Running");
    if (isGirlsWithBoys == true) {
      //code
      //isGirlsWithBoys True
      console.log("GirlswithBoys True Running");
      businessUser
        .find({
          $and: [
            { isBlockedOn: { $ne: date } },
            { girlsWithBoys: isGirlsWithBoys },
            {
              $or: [
                { "roomMediumData.mediumCapacity": { $gte: totalPersons } },
                { "roomSmallData.smallCapacity": { $gte: totalPersons } },
                { "roomLargeData.largeCapacity": { $gte: totalPersons } },
              ],
            },
          ],
        })
        .then((toListHotels) => {
          return res.status(200).json(toListHotels);
        })
        .catch((err) => {
          console.log(err);
        });
      //code
    } else {
      //is Girls with Boys false
      console.log("GirlswithBoys False Running");
      businessUser
        .find({
          $and: [
            { isBlockedOn: { $ne: date } },
            {
              $or: [
                { "roomMediumData.mediumCapacity": { $gte: totalPersons } },
                { "roomSmallData.smallCapacity": { $gte: totalPersons } },
                { "roomLargeData.largeCapacity": { $gte: totalPersons } },
              ],
            },
          ],
        })
        .then((toListHotels) => {
          return res.status(200).json(toListHotels);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});

//BlockDate
router.post("/blockUnblock", (req, res) => {
  const { isBlockedOn, email } = req.body;
  businessUser
    .findOneAndUpdate(
      { email: email },
      {
        $set: { isBlockedOn: isBlockedOn },
      },
      {
        new: true,
      }
    )
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
        console.log(isBlockedOn);
      }
    });
});

//Get Block Dates
router.get("/getBlockedDates", (req, res) => {
  const { email } = req.query;
  businessUser
    .find({ email: email })
    .populate()
    .then((blockedOnDate) => {
      return res.status(200).json(blockedOnDate);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/userHotel/:id", (req, res) => {
  const _id = req.params.id;
  console.log(req.params.id);
  businessUser
    .find({ _id: _id })
    .then((thisHotel) => {
      return res.status(200).json(thisHotel);
    })
    .catch((err) => {
      console.log(err);
    });
});

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
            "<p>" +
            " Hotel: " +
            Hotel +
            "| Date Of Booking: " +
            DateOfBooking +
            "| ArrivalTime:  " +
            ArrivalTime +
            "| Total Persons " +
            TotalPersons +
            "| BillingAmount " +
            BillingAmount +
            "| OrderId " +
            OrderId +
            "| PaymentTime " +
            PaymentTime +
            "| TimeSlot " +
            TimeSlot +
            "| Type " +
            Type +
            "</p>",
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

router.get("/getConfirmBookingsUser", (req, res) => {
  const { User } = req.query;
  confirmedUserBooking
    .find({ User: User })
    .populate()
    .then((currentUserBookings) => {
      return res.status(200).json(currentUserBookings);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
