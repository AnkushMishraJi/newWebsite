const mongoose = require("mongoose");

//Room Schema
const roomSchemaSmall = new mongoose.Schema({
  smallPrice: {
    type: String,
  },
  smallDiscountPrice:{
    type: String,
  },
  smallPic: {
    type: [String],
  },
  smallCapacity: {
    type: Number,
  },
  smallNightPrice: {
    type: String,
  },
  smallNightDiscountPrice: {
    type: String,
  },
});

const roomSchemaMedium = new mongoose.Schema({
  mediumPrice: {
    type: String,
  },
  mediumDiscountPrice: {
    type: String,
  },
  mediumPic: {
    type: [String],
  },
  mediumCapacity: {
    type: Number,
  },
  mediumNightPrice: {
    type: String,
  },
  mediumNightDiscountPrice: {
    type: String,
  },
});

const roomSchemaLarge = new mongoose.Schema({
  largePrice: {
    type: String,
  },
  largeDiscountPrice: {
    type: String,
  },
  largePic: {
    type: [String],
  },
  largeCapacity: {
    type: Number,
  },
  largeNightPrice: {
    type: String,
  },
  largeNightDiscountPrice: {
    type: String,
  },
});

const hotelWarningTagsSchema = new mongoose.Schema(
  {
    tag_name:{
      type:String,
    },
    tag_description:{
      type: String,
    }
  }
);

//Business User Schema
const businessUserSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  isNightPartyAllowed: {
    type: Boolean,
    required: true,
  },
  isBlockedOn: { type: [String] },
  girlsWithBoys: {
    type: Boolean,
    required: false,
  },
  isVerified: {
    type: Boolean,
    required: false,
  },

  roomSmallData: {
    type: roomSchemaSmall,
    required: false,
  },
  roomMediumData: {
    type: roomSchemaMedium,
    required: false,
  },
  roomLargeData: {
    type: roomSchemaLarge,
    required: false,
  },
  isCustomisable:{
    type: Boolean,
    required: true,
  },
  hotelWarningTags:{
    type: [hotelWarningTagsSchema],
    required: false,
  }
});

module.exports = businessUserSchema;
