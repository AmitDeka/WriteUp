require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Static folder
// app.use("/public", express.static(__dirname + "public"));
app.use(express.static("public"));

// set view engine
app.set("view engine", "ejs");

//parser
app.use(express.urlencoded({ extended: true }));

// Router
app.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

app.use("/admin", require("./route/route-admin"));

// Database Config
const database = require("./config/db").mongoURI;
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully."))
  .catch((error) => console.log(error));

// Running port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on localhost:${port}`));
