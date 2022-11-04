const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isSuperAdmin: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: "",
  },
});

adminSchema.set("timestamps", true);

module.exports = mongoose.model("adminUser", adminSchema);
