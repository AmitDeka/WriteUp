require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Static folder
app.use(express.static("public"));

// set view engine
app.set("view engine", "ejs");

//parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database Config
const database = require("./config/db").mongoURI;
const dbOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(database, dbOption)
  .then(() => {
    console.log("MongoDB Connected Successfully.");
    // Running port
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on localhost:${port}`));
  })
  .catch((error) => console.log(error));

// Middleware
const isBlog = require("./middlewares/isBlog");

// Routes
app.use(isBlog);
app.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});
app.use("/admin", require("./route/route-admin"));
