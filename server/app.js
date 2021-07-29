const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();

app.use(
  session({
    secret: "add a random secret string here",
    resave: false,
    saveUninitialized: true,
  })
);

mongoose
  .connect("mongodb://localhost/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to DB");
  });

app.use(require("./controller/user.js"));

app.listen(3000, () => {
  console.log("server running on port 3000");
});
