import express from "express";
import cors from "cors";
import userRoutes from "./controller/user.js";

const app = express();
// config
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", async (req, res) => {
  return res.status(200).send("SUCCESS");
});
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
