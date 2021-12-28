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

const { JWT_SECRET, RZP_ID, RZP_SEC } = require("../config/keys");

const Razorpay = require("razorpay");
const shortid = require("shortid");
const razorpay = new Razorpay({
  key_id: "rzp_test_ZwIQoXjws19gWq",
  key_secret: "NScHGLsWYb8Fg5E1BpwwCSzE",
});

//RazorPay
router.post("/razorpay", async (req, res) => {
  // console.log(req.body);

  const response = await razorpay.orders.create(req.body);
  res.json({
    id: response.id,
    currency: response.currency,
    amount: response.amount,
    created_at: response.created_at,
  });
});

//Business User Sign-up
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
          // console.log(err);
        });
    });
  });
});

//Business User Sign-in
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

//User Sign-in Phone number check in DB
router.post("/checknum", (req, res) => {
  const { phoneNumber } = req.body;
  clientUser.findOne({ phoneNumber: phoneNumber }).then((savedClientUser) => {
    if (savedClientUser) {
      // console.log("User already exists");
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

//User Signup
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
        return;
      } else {
        res.json("Saved User");
        console.log("Saved USer");
      }
    }
  );
});

//Username get
router.get("/getname", (req, res) => {
  const { phoneNumber } = req.query;
  clientUser
    .findOne({ phoneNumber: phoneNumber })
    .then((currentUser) => {
      return res.status(200).json(currentUser.name);
    })
    .catch((err) => {
      // console.log(err);
    });
});

module.exports = router;
