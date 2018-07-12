const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ username: body.username });
  const isCorrectPassword =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!user || !isCorrectPassword) {
    return res.status(401).send({ error: "Invalid username or password" });
  }

  const userData = {
    username: user.username,
    id: user._id
  };

  const token = jwt.sign(userData, process.env.SECRET);

  return res
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
