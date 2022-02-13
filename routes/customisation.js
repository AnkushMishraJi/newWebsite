const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const speakerSchema = require("../models/speakers.js");
const speaker = mongoose.model("Speaker", speakerSchema);

const decorationSchema = require("../models/decorations");
// const { withCoalescedInvoke } = require("next/dist/lib/coalesced-function");
const decoration = mongoose.model("Decoration", decorationSchema);

router.post("/api/addSpeakers", (req, res) => {
    const {
      speaker_name,
      speaker_price,
      speaker_pic,
    } = req.body;
    const Speaker = new speaker({
        speaker_name,
        speaker_price,
        speaker_pic,
    });
    Speaker.save()
      .then((Speaker) => {
        res.status(201).json({
          message: "New Speaker added",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.get("/api/getSpeakers", (req,res)=>{
    speaker.find({})
    .populate()
    .then((speakers)=>{
      return res.status(200).json(speakers);
    })
    .catch((err)=>{
      console.log(err);
    })
  })

  router.post("/api/addDecorations",(req,res)=>{
    const {
      decoration_theme,
      decoration_tier,
      baloon_count,
      ribbon_count,
      theme_foil_count,
      name_foil_count,
      curtain_count,
      foil_balloon_count,
      hanging_photo_count,
      candle_led_count,
      rose_petal_count,
      fairy_light_count,
      price,
      decoration_pic,
    } = req.body;
    const Decoration = new decoration({
      decoration_theme,
      decoration_tier,
      baloon_count,
      ribbon_count,
      theme_foil_count,
      name_foil_count,
      curtain_count,
      foil_balloon_count,
      hanging_photo_count,
      candle_led_count,
      rose_petal_count,
      fairy_light_count,
      price,
      decoration_pic,
    });
    Decoration.save()
    .then((Decoration)=>{
      res.status(201).json({
        message: "New Decoration added",
      });
    })
    .catch((err)=>{
      console.log(err);
    })
  });
  router.get("/api/getDecorations", (req,res)=>{
    decoration.find({})
    .populate()
    .then((decorations)=>{
      return res.status(200).json(decorations);
    })
    .catch((err)=>{
      console.log(err);
    })
  })

module.exports = router;