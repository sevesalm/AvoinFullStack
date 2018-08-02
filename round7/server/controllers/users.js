const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const result = await User.find().populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1
  });
  return res.json(result.map(User.format));
});

usersRouter.post("/", async (req, res) => {
  try {
    const body = req.body;

    const findResult = await User.find({ username: body.username });
    if (findResult.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (!body.password || body.password.length < 3) {
      return res.status(400).json({ error: "Invalid or missing password" });
    }

    const passwordHash = await bcrypt.hash(body.password, 10);

    const user = new User({
      username: body.username,
      passwordHash,
      name: body.name,
      isAdult: body.isAdult || true
    });

    const saveResult = await user.save();
    res.status(201).json(User.format(saveResult));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = usersRouter;
