const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const mongoose = require("mongoose");
const businessUserSchema = require("../models/businessUser");
const BusinessUser = mongoose.model("User", businessUserSchema);

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in" });
    }
    const { _id } = payload;
    BusinessUser.findById(_id).then((userdata) => {
      req.businessUser = businessuserdata;
      next();
    });
  });
};
