const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./config/keys");
const PORT = process.env.PORT || 6000;

// require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
// app.use(require("./routes/post"));

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
