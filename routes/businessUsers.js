const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const businessUserSchema = require("../models/businessUser");
const businessUser = mongoose.model("BusinessUser", businessUserSchema);

//Search Filter Home Page User
router.get("/hotelList", (req, res) => {
  var { date, totalPersons, girls, isNightParty } = req.query;
  totalPersons = parseInt(totalPersons);
  isNightParty = isNightParty === "true";
  // console.log(typeof date, typeof boys, typeof girls, isNightParty);
  // console.log(totalPersons);
  var isGirlsWithBoys;
  if (girls == "true") isGirlsWithBoys = true;
  else isGirlsWithBoys = false;

  // console.log(isGirlsWithBoys);
  // console.log(isNightParty);

  if (isNightParty == true) {
    //isNightParty True
    // console.log("isNightParty True Running");
    if (isGirlsWithBoys == true) {
      //isGirlsWithBoys true
      // console.log("isGirlsWithBoys True Running");
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
          // console.log(err);
        });
      //code
    } else {
      //code
      //is isGirlsWithBoys false
      // console.log("GirlswithBoys False Running");
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
          // console.log(err);
        });
      //code
    }
  } else {
    //isNightParty False
    // console.log("isNightParty False Running");
    if (isGirlsWithBoys == true) {
      //code
      //isGirlsWithBoys True
      // console.log("GirlswithBoys True Running");
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
          // console.log(err);
        });
      //code
    } else {
      //is Girls with Boys false
      // console.log("GirlswithBoys False Running");
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
          // console.log(err);
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
        // console.log(isBlockedOn);
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
      // console.log(err);
    });
});

//Single Hotel
router.get("/userHotel/:id", (req, res) => {
  const _id = req.params.id;
  // console.log(req.params.id);
  businessUser
    .find({ _id: _id })
    .then((thisHotel) => {
      return res.status(200).json(thisHotel);
    })
    .catch((err) => {
      // console.log(err);
    });
});

module.exports = router;
