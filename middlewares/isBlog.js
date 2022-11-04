const webSettings = require("../models/websiteSettingsModel");

const isBlog = async (req, res, next) => {
  try {
    const settings = await webSettings.find({});
    if (settings.length == 0 && req.originalUrl != "/admin/setup") {
      res.redirect("/admin/setup");
    } else {
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = isBlog;
