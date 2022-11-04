const mongoose = require("mongoose");

const websiteSettingSchema = mongoose.Schema({
  websiteTitle: {
    type: String,
    required: true,
  },
  websiteDescription: {
    type: String,
    required: true,
  },
  websiteLogo: {
    type: String,
    required: true,
  },
});
websiteSettingSchema.set("timestamps", true);
module.exports = mongoose.model("websiteSetting", websiteSettingSchema);
