require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

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
  // useCreateIndex: true,
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

app.use("/", require("./route/route-user"));

// Middleware
const isBlog = require("./middlewares/isBlog");

app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// Routes
app.use(isBlog);
// app.get("/", (req, res) => {
//   res.render("index", { title: "Express" });
// });

app.use("/admin", require("./route/route-admin"));
