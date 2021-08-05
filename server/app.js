import express from "express";
import cors from "cors";
const app = express();

// config
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());
// Routes
app.get("/", () => {
  res.status(200).send("SUCCESS");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
