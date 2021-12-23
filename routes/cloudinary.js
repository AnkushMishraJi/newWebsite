const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const photosSchema = require("../models/photos");
const photo = mongoose.model("Photo", photosSchema);

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
      // console.log(err);
    });
});

module.exports = router;
