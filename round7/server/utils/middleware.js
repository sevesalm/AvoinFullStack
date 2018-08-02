const morgan = require("morgan");

const getToken = (req, res, next) => {
  let token = null;
  const authorization = req.get("Authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    token = authorization.substring(7);
  }
  req.token = token;
  next();
};

module.exports = {
  getToken,
  morgan
};
