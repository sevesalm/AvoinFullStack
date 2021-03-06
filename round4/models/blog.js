const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

BlogSchema.statics.format = blog => {
  return {
    id: blog._id,
    author: blog.author,
    title: blog.title,
    url: blog.url,
    likes: blog.likes,
    user: blog.user
  };
};

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
