const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const domPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const htmlPurify = domPurify(new JSDOM().window);

const { stripHtml } = require("string-strip-html");

mongoose.plugin(slug);
const postSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  featuredImage: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
  },
  slug: {
    type: String,
    slug: "title",
    unique: true,
    slug_padding_size: 2,
  },
});

postSchema.pre("validate", function (next) {
  if (this.content) {
    this.content = htmlPurify.sanitize(this.content);
    this.snippet = stripHtml(
      this.content.substring(0, 300).replace(/[\n\r]/g, "")
    ).result;
  }
  next();
});

postSchema.set("timestamps", true);
module.exports = mongoose.model("post", postSchema);
