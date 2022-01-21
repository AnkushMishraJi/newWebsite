const mongoose = require("mongoose");

const decorationSchema = new mongoose.Schema({
  decoration_theme: {
    type: String,
    required: true,
  },
  decoration_tier: {
    type: String,
    required: true,
  },
  baloon_count:{
      type: Number,
      required: false,
  },
  ribbon_count:{
    type: Number,
    required: false,
  },
  theme_foil_count:{
      type: Number,
      required: false,
  },
  name_foil_count:{
    type: Number,
    required: false,
},
  curtain_count:{
      type: Number,
      required: false,
  },
  foil_balloon_count:{
    type: Number,
    required: false,
  },
  hanging_photo_count:{
      type: Number,
      required: false,
  },
  candle_led_count:{
      type: Number,
      required: false,
  },
  rose_petal_count:{
      type: Number,
      required: false,
  },
  fairy_light_count:{
      type: Number,
      required: false,
  },
  decoration_pic:{
      type: String,
      required: true,
  },
  price:{
    type: Number,
    required: true,
  }
});

module.exports = decorationSchema;