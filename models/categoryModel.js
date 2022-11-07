const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    slug: "title",
    unique: true,
    slug_padding_size: 1,
  },
});

module.exports = mongoose.model("category", categorySchema);
