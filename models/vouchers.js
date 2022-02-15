const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
    coupon_code: {
      type: String,
      required:true
    },
    hotel_id: {
      type: String,
      required:true
    },
    percent_discount:{
        type: Number,
        required: false
    },
    flat_discount:{
        type: Number,
        required: false
    }
  });
  
  module.exports = voucherSchema;