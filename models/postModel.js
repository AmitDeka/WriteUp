const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
// const domPurify = require("dompurify");
// const { JSDOM } = require("jsdom");
// const htmlPurify = domPurify(new JSDOM().window);

// const stripHtml = require("string-strip-html");

mongoose.plugin(slug);
const postSchema = mongoose.Schema({
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
  // snippet: {
  //   type: String,
  // },
  slug: {
    type: String,
    slug: "title",
    unique: true,
    slug_padding_size: 2,
  },
});

// postSchema.pre("validate", function (next) {
//   if (this.content) {
//     this.content = htmlPurify.sanitize(this.description);
//     this.snippet = stripHtml(this.description.substring(0, 300)).result;
//   }
//   next();
// });

postSchema.set("timestamps", true);
module.exports = mongoose.model("post", postSchema);
