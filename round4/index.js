const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const config = require("./utils/config");

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.getToken);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

mongoose
  .connect(
    config.mongoUrl,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected to database", config.mongoUrl);
  })
  .catch(err => {
    console.log(err);
  });

const server = http.createServer(app);

const port = config.port;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

server.on("close", async () => {
  await mongoose.connection.close(true);
});

module.exports = {
  app,
  server
};
