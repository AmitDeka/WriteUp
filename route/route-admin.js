const express = require("express");
const router = express.Router();

router.get("/404", function (req, res) {
  res.render("admin/404", { title: "Error 404" });
});
router.get("/500", function (req, res) {
  res.render("admin/500", { title: "Error 500" });
});
router.get("/dashboard", function (req, res) {
  res.render("admin/index", { title: "Dashboard" });
});
router.get("/all-admin", function (req, res) {
  res.render("admin/all-admin", { title: "Admins" });
});
router.get("/register", function (req, res) {
  res.render("admin/register", { title: "Add Admin" });
});
router.get("/login", function (req, res) {
  res.render("admin/login", { title: "Log in" });
});
router.get("/all-post", function (req, res) {
  res.render("admin/all-post", { title: "All Post" });
});

module.exports = router;
