const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const superAdminSchema = require('../models/superadmin');
const admin = mongoose.model("SuperAdmin", superAdminSchema);

const voucherSchema = require('../models/vouchers');
const voucher= mongoose.model("Voucher", voucherSchema);

router.post("/api/postSuperAdmin", (req, res) => {
    const {
      name,
      email,
      password
    } = req.body;
    const Admin = new admin({
            name,
            email,
            password,
    });
    Admin.save()
      .then((Admin) => {
        res.status(201).json({
          message: "Super Admin Created",
        });
      })
      .catch((err) => {
        // console.log(err);
      });
});

  router.get("/api/getSuperAdmin", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "Please enter all fields",
      });
    }
    admin.findOne({ email: email }).then((savedAdmin) => {
      if (!savedAdmin) {
        return res.status(422).json({
          error: "Invalid Email or Password",
        });
      }
      else{
        return res.status(200).json(savedAdmin);
      }

    })
  });


  router.post("/api/addVoucher", (req, res) => {
    const {
      coupon_code,
      hotel_id,
      percent_discount,
      flat_discount
    } = req.body;
    const Voucher = new voucher({
        coupon_code,
        hotel_id,
        percent_discount,
        flat_discount
    });
    Voucher.save()
      .then((Voucher) => {
        res.status(201).json({
          message: "New Voucher added",
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  });

  module.exports = router;
  

