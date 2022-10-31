require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const app = express();

// Static folder
app.use(express.static("public"));

// set view engine
app.use(expressLayouts);
app.set("view engine", "ejs");

//parser
app.use(express.urlencoded({ extended: true }));

// database config
const database = require("./config/db");
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully."))
  .catch((error) => console.log(error));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on localhost:${port}`));
