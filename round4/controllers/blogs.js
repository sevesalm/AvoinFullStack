const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (_, res) => {
  const result = await Blog.find().populate("user", { username: 1, name: 1 });
  return res.json(result.map(Blog.format));
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;

  try {
    const token = req.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: "Token missing or invalid" });
    }

    if (!body.title || !body.url) {
      return res.status(400).json({ error: "Title or url missing" });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      ...body,
      likes: body.likes ? body.likes : 0,
      user: user._id
    });

    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    return res.status(201).json(Blog.format(result));
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({ error: err.message });
    } else {
      console.log(err);
      res.status(500).json({ error: "something went wrong..." });
    }
  }
});

blogsRouter.delete("/:id", async (req, res) => {
  try {
    const token = req.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: "Token missing or invalid" });
    }

    const blog = await Blog.findById(req.params.id);
    if (blog.user.toString() !== decodedToken.id) {
      return res.status(403).send({ error: "Not authorized" });
    }
    await Blog.findByIdAndRemove(req.params.id);
    return res.status(204).end();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({ error: err.message });
    } else {
      console.log(err);
      return res.status(400).send({ error: "Invalid id" });
    }
  }
});

blogsRouter.put("/:id", async (req, res) => {
  try {
    const result = await Blog.findByIdAndUpdate(
      req.params.id,
      { likes: req.body.likes },
      {
        new: true
      }
    );
    res.json(Blog.format(result));
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Invalid id" });
  }
});

module.exports = blogsRouter;
