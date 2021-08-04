import express from "express";
import session from "express-session";
import db from "./mongodb";
const app = express();

// config
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(
  session({
    secret: "add a random secret string here",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.get("/", () => {
  res.status(200).send("SUCCESS");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
