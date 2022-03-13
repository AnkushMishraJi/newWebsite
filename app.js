const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./config/keys");
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/bookings"));
app.use(require("./routes/businessUsers"));
app.use(require("./routes/cloudinary"));
app.use(require("./routes/userBooking"));
app.use(require("./routes/customisation"));
app.use(require("./routes/admin"));
app.use(require("./routes/testimonials"));


if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose.connect(MONGOURI);

mongoose.connection.on("connected", () => {
  console.log("Connectd to MONGODB");
});

mongoose.connection.on("error", (err) => {
  console.log("Error in connection", err);
});

app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
