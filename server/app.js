import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import ConnectRedis from "connect-redis";
import redisClient from "./config/redis.js";
import userRoutes from "./controller/user.js";
import roomRoutes from "./controller/room.js";
import messageRoutes from "./controller/message.js";

const app = express();

// config
const port = process.env.PORT || 9000;

const RedisStore = ConnectRedis(session);
// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));
app.use(
  session({
    secret: ["1231231231231231312312312"],
    name: "chatAppSid",
    cookie: {
      httpOnly: true,
      // secure: true,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: new RedisStore({ client: redisClient, ttl: 86400 }),
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/user", userRoutes);
app.use("/room", roomRoutes);
app.use("/message", messageRoutes);

app.get("*", async (req, res) => {
  return res.status(400).send({ err: "Route does not exists" });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
